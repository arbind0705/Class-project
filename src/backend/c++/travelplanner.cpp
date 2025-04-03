#include <iostream>
#include <vector>
#include <algorithm>
#include <map>
#include <cmath>
#include "../../includes/json.hpp"

using json = nlohmann::json;
using namespace std;

// Structure to store hotel information
struct Hotel {
    string name;
    double rating;
    double pricePerNight;  // Changed from price to pricePerNight to match JSON
};

// Structure to store activity information
struct Activity {
    string name;
    double cost;
};

// Structure to store place information
struct Place {
    string name;
    string country;
    vector<Activity> activities;
    double rating;
    double priority;  // Higher priority for places selected in preferences
    vector<Hotel> hotels;  // Array of hotel objects
    double totalCost;  // Total cost of activities
    int daysNeeded;   // Days needed to visit this place
};

// Function to calculate total value for a place
double calculatePlaceValue(const Place& place) {
    // Value calculation: (rating * 1000) - (totalCost * 10) + (priority * 500)
    return (place.rating * 1000.0) - (place.totalCost * 10.0) + (place.priority * 500.0);
}

// Dynamic programming knapsack implementation with days constraint
vector<Place> knapsackPlanner(vector<Place>& places, int budget, int days, int& remainingBudget, int& remainingDays) {
    int n = places.size();
    
    // Sort places by value per day
    sort(places.begin(), places.end(), [](const Place& a, const Place& b) {
        return calculatePlaceValue(a) / a.daysNeeded > calculatePlaceValue(b) / b.daysNeeded;
    });
    
    vector<Place> selectedPlaces;
    remainingBudget = budget;
    remainingDays = days;
    
    // Select places while we have enough budget and days
    for (const auto& place : places) {
        if (remainingDays >= place.daysNeeded && remainingBudget >= place.totalCost) {
            selectedPlaces.push_back(place);
            remainingBudget -= place.totalCost;
            remainingDays -= place.daysNeeded;
        }
        
        // Stop if we don't have enough days left
        if (remainingDays < 2) {  // Keep at least 2 days as buffer
            break;
        }
    }
    
    return selectedPlaces;
}

// Main function to process travel data
json processTravelPlan(const json& inputData) {
    try {
        int budget = inputData.at("budget");
        int days = inputData.at("days");
        vector<string> selectedCountries = inputData.at("selectedCountries").get<vector<string>>();
        vector<string> preferredPlaces = inputData.at("preferredPlaces").get<vector<string>>();
        
        vector<Place> allPlaces;
        
        // Process places data from input
        for (const auto& placeData : inputData.at("places")) {
            Place place;
            place.name = placeData.at("name");
            place.country = placeData.at("country");
            place.rating = placeData.at("rating").get<double>();
            
            // Set priority based on whether it's in preferred places
            place.priority = (find(preferredPlaces.begin(), preferredPlaces.end(), place.name) != preferredPlaces.end()) ? 2.0 : 1.0;
            
            // Process activities and calculate total cost
            place.totalCost = 0;
            for (const auto& activityData : placeData.at("activities")) {
                Activity activity;
                activity.name = activityData.at("name");
                activity.cost = activityData.at("cost").get<double>();
                place.activities.push_back(activity);
                place.totalCost += activity.cost;
            }
            
            // Process hotels
            for (const auto& hotelData : placeData.at("hotels")) {
                Hotel hotel;
                hotel.name = hotelData.at("name");
                hotel.rating = hotelData.at("rating").get<double>();
                hotel.pricePerNight = hotelData.at("pricePerNight").get<double>();
                place.hotels.push_back(hotel);
            }
            
            // Calculate days needed based on number of activities
            place.daysNeeded = max(1, min(3, (int)ceil(place.activities.size() / 3.0)));
            
            allPlaces.push_back(place);
        }
        
        int remainingBudget, remainingDays;
        vector<Place> selectedPlaces = knapsackPlanner(allPlaces, budget, days, remainingBudget, remainingDays);
        
        // Prepare output JSON
        json outputData;
        outputData["selectedPlaces"] = json::array();
        
        for (const auto& place : selectedPlaces) {
            json placeData;
            placeData["name"] = place.name;
            placeData["country"] = place.country;
            placeData["rating"] = place.rating;
            placeData["daysNeeded"] = place.daysNeeded;
            placeData["totalCost"] = place.totalCost;
            placeData["activities"] = json::array();
            
            // Add activities with costs
            for (const auto& activity : place.activities) {
                json activityData;
                activityData["name"] = activity.name;
                activityData["cost"] = activity.cost;
                placeData["activities"].push_back(activityData);
            }
            
            // Add hotels
            placeData["hotels"] = json::array();
            for (const auto& hotel : place.hotels) {
                json hotelData;
                hotelData["name"] = hotel.name;
                hotelData["rating"] = hotel.rating;
                hotelData["pricePerNight"] = hotel.pricePerNight;
                placeData["hotels"].push_back(hotelData);
            }
            
            outputData["selectedPlaces"].push_back(placeData);
        }
        
        outputData["remainingBudget"] = remainingBudget;
        outputData["remainingDays"] = remainingDays;
        
        return outputData;
    } catch (const exception& e) {
        cerr << "Error processing travel plan: " << e.what() << endl;
        throw;
    }
}

int main() {
    try {
        string line;
        string input;
        while (getline(cin, line)) {
            input += line;
        }
        
        json inputData = json::parse(input);
        json result = processTravelPlan(inputData);
        cout << result.dump(2) << endl;
        return 0;
    } catch (const exception& e) {
        cerr << "Error: " << e.what() << endl;
        return 1;
    }
}
