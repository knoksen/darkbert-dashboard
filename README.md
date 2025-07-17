# DarkBERT Dashboard

A web-based dashboard for visualizing and monitoring DarkBERT model performance and outputs.

## Tech Stack

- **Frontend**: React (Vite + Tailwind CSS)
- **Backend**: FastAPI (Python)
- **Data Storage**: SQLite / Postgres (configurable)
- **Visualization**: Chart.js, Plotly
- **Containerization**: Docker & Docker Compose

## Usage Disclaimer

The `knoksen/darkbert-approved` model is trained on data collected from the dark
web. You can find more details on the model card at
[Hugging Face](https://huggingface.co/knoksen/darkbert-approved) along with the
license (currently Apache 2.0). Because of the nature of its training data,
use of the model may have ethical or legal implications depending on your
jurisdiction and intended purpose. Review the license and model card before
deploying it in production.

## Getting Started

Install the frontend and backend dependencies:

```bash
npm install
pip install -r requirements.txt
```

Copy the example environment file and add your HuggingFace token:

```bash
cp .env.example .env
# edit .env and set HUGGINGFACE_HUB_TOKEN, e.g., HUGGINGFACE_HUB_TOKEN=your_token_here
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

Make sure you have created a `.env` file containing at least `MODEL_NAME` and
`HUGGINGFACE_HUB_TOKEN` and then build and start both services:

```bash
docker-compose up --build
```


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



## Advanced Structure and Deployment

For a detailed example of scaffolding the project and deploying with Docker, see [docs/advanced_structure_and_deployment.md](docs/advanced_structure_and_deployment.md).
