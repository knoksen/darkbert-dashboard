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


## Model Disclaimer

The dashboard relies on the [`knoksen/darkbert-approved`](https://huggingface.co/knoksen/darkbert-approved) language model. This model was trained on text sourced from the dark web and may contain illegal, harmful, or disturbing content. Ensure you understand and comply with all legal and ethical obligations before using DarkBERT. Review the license and terms on the model's Hugging Face page for additional details.
