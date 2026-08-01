# DarkBERT Dashboard

[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)](https://github.com/knoksen/darkbert-dashboard/releases/tag/v1.1.0)
[![License](https://img.shields.io/badge/license-Apache%202.0-green.svg)](LICENSE)
[![Build](https://img.shields.io/badge/build-verified-brightgreen.svg)](#quickstart)
[![Docs](https://img.shields.io/badge/docs-quickstart-orange.svg)](#quickstart)

A modern dashboard for inspecting DarkBERT model activity, metrics, and inference outputs with a React/Vite frontend and FastAPI backend.

Quick links: [Quickstart](#quickstart) • [Docker](#docker-quickstart) • [Desktop launcher](#desktop-launcher) • [Release notes](https://github.com/knoksen/darkbert-dashboard/releases)

## Usage Disclaimer

The model referenced by this project is trained on data collected from the dark web. Review the model card and license before deploying it in production.

## Features

- Interactive metrics and dashboard views
- FastAPI prediction and embedding endpoints
- Docker-based local development workflow
- Desktop launcher support for local development environments

## Quickstart

### 1. Install prerequisites

- Node.js 18+
- npm 9+
- Python 3.11+
- Docker (optional, for containerized runs)

### 2. Install dependencies

```bash
npm install
pip install -r requirements.txt
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Set at least:

- `HUGGINGFACE_HUB_TOKEN=your_token_here`
- `VITE_API_BASE_URL=http://localhost:8000`
- `VITE_DARK_MODE=false`

### 4. Run the stack

Start the backend in one terminal:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Start the frontend in another terminal:

```bash
npm run dev
```

Open the dashboard at `http://localhost:3000` (or the Vite port shown in the terminal).

## Docker Quickstart

```bash
docker compose up --build
```

Then visit:

- Dashboard: `http://localhost:3000`
- Backend API: `http://localhost:8000`

To stop the stack:

```bash
docker compose down
```

## Desktop Launcher

A desktop installation helper is included at [scripts/install-desktop.sh](scripts/install-desktop.sh). It creates a launcher entry for Linux desktop environments so the project can be started from the application menu.

```bash
bash scripts/install-desktop.sh
```

## Common Commands

```bash
npm run dev      # start the Vite development server
npm run build    # build production assets to dist/
npm run preview  # preview the build locally
npm run lint     # lint the TypeScript frontend
npm run test     # run the Vitest suite
```

## Environment Variables

| Variable | Used by | Example | Purpose |
|---|---|---|---|
| `VITE_API_BASE_URL` | Frontend | `http://localhost:8000` | Base URL used by the frontend API client. |
| `VITE_DARK_MODE` | Frontend | `false` | Default appearance for the dashboard UI. |
| `MODEL_NAME` | Backend/runtime | `knoksen/darkbert-approved` | Model identifier used by the backend. |
| `HUGGINGFACE_HUB_TOKEN` | Backend/runtime | `hf_xxx...` | Authentication token for model access. |

## Build and Deploy

### Frontend deployment

```bash
npm run build
```

Deploy the generated `dist/` folder to any static host or CDN, and ensure `VITE_API_BASE_URL` points to the deployed backend.

### Backend deployment

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## API Quick Reference

- `POST /predict`
- `POST /embeddings`
- `POST /embeddings/reduce`
- `GET /metrics`
- `GET /confusion`

## Troubleshooting

- If the frontend reports a network error, confirm the backend is running and `VITE_API_BASE_URL` is correct.
- If Docker services cannot be reached, check for port conflicts on `3000` and `8000`.
- After changing environment variables, restart the relevant process.

  ```bash
  docker compose logs -f
  ```
- Ensure compose is using the intended env file and values.

## Build fails on frontend

- Reinstall dependencies:
  ```bash
  npm ci
  ```
- Then retry:
  ```bash
  npm run build
  ```

## Backend startup fails due to model/auth issues

- Verify `HUGGINGFACE_HUB_TOKEN` is set and valid.
- Verify `MODEL_NAME` points to an accessible model.
- Confirm outbound network access to model hosting.

## API returns timeout errors in frontend

- Backend may be overloaded or still initializing model artifacts.
- Retry after backend warm-up.
- Check backend logs for long inference duration or failures.

---

## Contribution Guidelines

See [CONTRIBUTING.md](CONTRIBUTING.md) for development workflow, code style, testing, and pull request requirements.

## Security

For responsible disclosure and security policy, see [SECURITY.md](SECURITY.md).

## Unity Desktop App

A minimal Unity project is provided in the `Assets` folder. It contains a
`DashboardController` script under `Assets/Scripts` and the UI layout in
`Assets/UI`. An example configuration file `Assets/StreamingAssets/backend_config.json`
controls which backend the desktop build communicates with.

To change the backend URL edit the JSON file and set the `base_url` value or set
`PlayerPrefs` key `backend_url` at runtime.

To build the desktop app for Windows 10:

1. Open the Unity editor.
2. Import the `Assets` folder from this repository.
3. Modify the backend URL in the configuration file if needed.
4. Choose build target **PC, Mac & Linux Standalone → Windows** and build.

### Building From Source

The Unity project contains only the assets. After importing, create an empty
scene and drop the `DashboardController` on to a `GameObject`. Assign the UI
elements from `Dashboard.uxml` to the script fields through the inspector. Make
sure `backend_config.json` resides under `StreamingAssets` so the runtime can
resolve the backend URL.

### Configuration

The backend URL is loaded in the following order:

1. The `backend_url` `PlayerPrefs` key if present.
2. `Assets/StreamingAssets/backend_config.json` with a `base_url` field.
3. `http://localhost:8000` as a fallback.

## Advanced Structure and Deployment

For a detailed example of scaffolding the project and deployment-oriented structure notes, see [docs/advanced_structure_and_deployment.md](docs/advanced_structure_and_deployment.md).
