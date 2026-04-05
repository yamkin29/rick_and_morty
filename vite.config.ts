import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';
import svgr from 'vite-plugin-svgr';

const repositoryName = 'rick_and_morty';
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true';
const isAnalyze = process.env.ANALYZE === 'true';

export default defineConfig({
  base: isGitHubPagesBuild ? `/${repositoryName}/` : '/',
  plugins: [
    react(),
    svgr(),
    isAnalyze &&
      analyzer({
        analyzerMode: 'server',
        openAnalyzer: false
      })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
