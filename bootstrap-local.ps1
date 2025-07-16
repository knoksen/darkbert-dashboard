<#
.SYNOPSIS
  Scaffold DarkBERT Dashboard folder and files locally.
.DESCRIPTION
  Creates full folder structure and writes all boilerplate files for immediate dev and deploy.
.PARAMETER Root
  Root path for project scaffold. Default: C:\Users\knoks\darkbert-dashboard
#>
param(
  [string]$Root = "C:\Users\knoks\darkbert-dashboard"
)

function Write-File {
  param(
    [Parameter(Mandatory=$true)] [string]$Path,
    [Parameter(Mandatory=$true)] [string]$Content
  )
  $Dir = Split-Path $Path -Parent
  if (-not (Test-Path $Dir)) { New-Item -Path $Dir -ItemType Directory -Force | Out-Null }
  $Content | Out-File -FilePath $Path -Encoding UTF8 -Force
}

# 1) Create directories
$Dirs = @(
  "$Root",
  "$Root\.github\workflows",
  "$Root\src\routes",
  "$Root\src\components",
  "$Root\src\services",
  "$Root\src\hooks",
  "$Root\src\theme",
  "$Root\src\styles"
)
foreach ($D in $Dirs) {
  if (-not (Test-Path $D)) { New-Item -ItemType Directory -Path $D -Force | Out-Null }
}

# 2) Write core files
Write-File "$Root\.env.example" @"
VITE_API_BASE_URL=https://api.example.com
VITE_DARK_MODE=false
"@

Write-File "$Root\package.json" @"
{
  "name": "darkbert-dashboard",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .ts,.tsx",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "test": "vitest"
  },
  "dependencies": {
    "@emotion/react": "^11.13.0",
    "@emotion/styled": "^11.13.0",
    "@mui/icons-material": "^5.11.0",
    "@mui/material": "^5.11.0",
    "axios": "^1.4.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "recharts": "^2.3.2"
  },
  "devDependencies": {
    "@tailwindcss/forms": "^0.5.3",
    "@tailwindcss/typography": "^0.5.9",
    "@types/react": "^18.0.28",
    "@types/react-dom": "^18.0.11",
    "autoprefixer": "^10.4.13",
    "eslint": "^8.22.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-react": "^7.31.10",
    "prettier": "^2.7.1",
    "postcss": "^8.4.20",
    "tailwindcss": "^3.2.4",
    "typescript": "^4.9.4",
    "vite": "^4.3.9",
    "vitest": "^0.25.8"
  }
}
"@

Write-File "$Root\tsconfig.json" @"
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": "src"
  },
  "include": ["src"]
}
"@

Write-File "$Root\vite.config.ts" @"
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  server: { port: 3000, open: true }
});
"@

Write-File "$Root\postcss.config.js" @"
module.exports = {
  plugins: { tailwindcss: {}, autoprefixer: {} }
};
"@

Write-File "$Root\tailwind.config.ts" @"
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', 'src/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
};

export default config;
"@

Write-File "$Root\.eslintrc.cjs" @"
module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  settings: { react: { version: 'detect' } }
};
"@

Write-File "$Root\.prettierrc" @"
{
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "all",
  "semi": false
}
"@

Write-File "$Root\.github\workflows\ci.yml" @"
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run lint
      - run: npm run build
      - run: npm test
"@

# (You’d continue to Write-File for src/main.tsx, src/App.tsx, etc. exactly as before.)

Write-Host "`n✅ Scaffold complete!`n" `
  "Next steps:" `
  "`tcd $Root" `
  "`tnpm install" `
  "`tnpm run dev" `
  "And if you have Docker: `tdocker-compose up -d`" -ForegroundColor Green
