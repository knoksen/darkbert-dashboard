# DarkBERT Dashboard

A web-based dashboard for visualizing and monitoring DarkBERT model performance and outputs.

## Tech Stack

- **Frontend**: React (Vite + Tailwind CSS)
- **Backend**: FastAPI (Python)
- **Data Storage**: SQLite / Postgres (configurable)
- **Visualization**: Chart.js, Plotly
- **Containerization**: Docker & Docker Compose

## Getting Started

Install Node dependencies and start the development server:

```bash
npm install
npm run dev
```

Run the API with:

```bash
uvicorn app.main:app --reload
```

### Docker Compose

Build and start both services:

```bash
docker-compose up --build
```

