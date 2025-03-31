#include <iostream>
#include <vector>
#include <algorithm>
#include <includes/json.hpp>

using json = nlohmann::json;
using namespace std;

// Structure to store place information
struct Place {
    string name;
    int cost;
    int rating;
};

// Function to select best places within budget using a knapsack approach
vector<Place> selectBestPlaces(vector<Place> &places, int budget, int days, int &remainingBudget) {
    sort(places.begin(), places.end(), [](const Place &a, const Place &b) {
        return a.rating > b.rating; // Sort by highest rating first
    });

    vector<Place> selectedPlaces;
    remainingBudget = budget;
    
    for (const auto &place : places) {
        if (remainingBudget >= place.cost && days >= 4) {
            selectedPlaces.push_back(place);
            remainingBudget -= place.cost;
            days -= 4;
        } else {
            break;
        }
    }
    return selectedPlaces;
}

// Main function to process travel data
json processTravelPlan(json inputData) {
    int budget = inputData["budget"];
    int days = inputData["days"];
    string tourType = inputData["tourType"];
    vector<Place> places;
    int baseCost;
    
    // Set minimum budget and base cost based on tour type
    if (tourType == "domestic") {
        if (budget < 500 || days < 4) return { {"error", "Insufficient budget or days for domestic travel."} };
        baseCost = 500;
    } else if (tourType == "international") {
        if (budget < 2500 || days < 4) return { {"error", "Insufficient budget or days for international travel."} };
        baseCost = 2500;
    } else if (tourType == "inter-country") {
        if (budget < 10000 || days < 4) return { {"error", "Insufficient budget or days for inter-country travel."} };
        baseCost = 10000;
    } else {
        return { {"error", "Invalid tour type."} };
    }

    // Get places data
    for (const auto &place : inputData["places"]) {
        int totalCost = baseCost + place["flightCost"].get<int>() + place["hotelCost"].get<int>();
        places.push_back({ place["name"].get<string>(), totalCost, place["rating"].get<int>() });
    }

    int remainingBudget;
    vector<Place> selectedPlaces = selectBestPlaces(places, budget, days, remainingBudget);
    
    json outputData;
    if (selectedPlaces.empty()) {
        outputData["message"] = "No destinations can be selected within budget.";
    } else {
        for (const auto &place : selectedPlaces) {
            outputData["selectedPlaces"].push_back({
                {"name", place.name},
                {"cost", place.cost},
                {"rating", place.rating}
            });
        }
        outputData["remainingBudget"] = remainingBudget;
    }
    return outputData;
}

int main() {
    // Sample input data
    string jsonString = R"({
        "budget": 10000,
        "days": 10,
        "tourType": "international",
        "places": [
            {"name": "Paris", "flightCost": 1200, "hotelCost": 800, "rating": 9},
            {"name": "Tokyo", "flightCost": 1500, "hotelCost": 900, "rating": 10},
            {"name": "New York", "flightCost": 1300, "hotelCost": 750, "rating": 8}
        ]
    })";
    
    json inputData = json::parse(jsonString);
    json result = processTravelPlan(inputData);
    
    cout << result.dump(4) << endl;
    return 0;
}
