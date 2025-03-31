import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src', // Set the root directory where Vite should look for files
  build: {
    outDir: '../dist', // Output directory after building the project
  },
  server: {
    port: 5173, // The port on which the Vite dev server will run
    open: true, // Automatically open the app in the browser when the server starts
  },
});
