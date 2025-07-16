# DarkBERT Dashboard

A web-based dashboard for visualizing and monitoring DarkBERT model performance and outputs.

## Tech Stack

- **Frontend**: React (Vite + Tailwind CSS)
- **Backend**: FastAPI (Python)
- **Data Storage**: SQLite / Postgres (configurable)
- **Visualization**: Chart.js, Plotly
- **Containerization**: Docker & Docker Compose

## Getting Started

Install the frontend and backend dependencies:

```bash
npm install
pip install -r requirements.txt
```

Copy the example environment file and add your HuggingFace token:

```bash
cp .env.example .env
# edit .env and set HUGGINGFACE_HUB_TOKEN
```

Start the frontend development server:

```bash
npm run dev
```

Run the FastAPI backend in another terminal while the frontend is running:

```bash
uvicorn app.main:app --reload
```

### Docker Compose

Build and start both services:

```bash
docker-compose up --build
```

