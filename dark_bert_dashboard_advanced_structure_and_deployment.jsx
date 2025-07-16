// Project File Structure
```
darkbert-dashboard/
├── bootstrap-local.ps1
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── package.json
├── tsconfig.json
├── vite.config.ts
├── postcss.config.js
├── tailwind.config.ts
├── .eslintrc.cjs
├── .prettierrc
├── .github/
│   └── workflows/
│       └── ci.yml
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── routes/
    │   └── index.tsx
    ├── components/
    │   ├── Layout.tsx
    │   ├── Header.tsx
    │   ├── Sidebar.tsx
    │   └── DashboardChart.tsx
    ├── services/
    │   └── api.ts
    ├── hooks/
    │   └── useMetrics.ts
    ├── theme/
    │   └── theme.ts
    └── styles/
        └── index.css
```

---

// bootstrap-local.ps1
```powershell
<#!
.SYNOPSIS
  Scaffold DarkBERT Dashboard folder and files locally.
#>

param(
    [string]$root = "C:\Users\knoks\darkbert-dashboard"
)

# Helper to write files with proper content
function Write-File {
    param(
        [string]$path,
        [string]$content
    )
    $dir = Split-Path $path
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    $content | Out-File -FilePath $path -Encoding utf8 -Force
}

# Create directories
$dirs = @(
    "$root",
    "$root\.github\workflows",
    "$root\src\routes",
    "$root\src\components",
    "$root\src\services",
    "$root\src\hooks",
    "$root\src\theme",
    "$root\src\styles"
)
$dirs | ForEach-Object { if (-not (Test-Path $_)) { New-Item -ItemType Directory -Path $_ -Force | Out-Null } }

# Write files
Write-File "$root\.env.example" @"
VITE_API_BASE_URL=https://api.example.com
VITE_DARK_MODE=false
"@

Write-File "$root\Dockerfile" @"
# base image
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# production image
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
"@

Write-File "$root\docker-compose.yml" @"
version: '3.8'
services:
  dashboard:
    build: .
    ports:
      - '3000:80'
    env_file:
      - .env.example
"@

Write-File "$root\package.json" @"
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

Write-File "$root\tsconfig.json" @"
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

# Continue writing remaining files similarly (vite.config.ts, postcss.config.js, tailwind.config.ts, .eslintrc.cjs, .prettierrc, .github/workflows/ci.yml, src files)...

Write-Host "`n✅ Scaffold complete! Run `cd $root; npm ci; npm run dev` (and `docker-compose up -d` if you have Docker) to start your app." -ForegroundColor Green
```
