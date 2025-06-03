import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/POCKET-PANTRY2/', 
  plugins: [
    react(), 
    tailwindcss(),
  ],
  build: {
    outDir: 'dist', 
  },
});
