import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // Matches your GitHub Pages URL
  plugins: [
    react(), // Enable React plugin
    tailwindcss(),
  ],
  build: {
    outDir: 'dist', // Ensure output goes to dist (matches workflow)
  },
});