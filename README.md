# DarkBERT Dashboard

A web-based dashboard for visualizing and monitoring DarkBERT model performance and outputs.

## Tech Stack

- **Frontend**: React (Vite + Tailwind CSS)
- **Backend**: FastAPI (Python)
- **Data Storage**: SQLite / Postgres (configurable)
- **Visualization**: Recharts
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

Copy the example environment file and update the environment variables:

```bash
cp .env.example .env
# edit .env and set values such as
# HUGGINGFACE_HUB_TOKEN=your_token_here
# VITE_API_BASE_URL=http://localhost:8000
# VITE_DARK_MODE=false
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

Make sure you have created a `.env` file containing the following variables:

- `MODEL_NAME`
- `HUGGINGFACE_HUB_TOKEN`
- `VITE_API_BASE_URL`
- `VITE_DARK_MODE`

Then, build and start both services:
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

### Building From Source

The Unity project contains only the assets. After importing, create an empty
scene and drop the `DashboardController` on to a `GameObject`. Assign the UI
elements from `Dashboard.uxml` to the script fields through the inspector. Make
sure `backend_config.json` resides under `StreamingAssets` so the runtime can
resolve the backend URL.

#### Configuration

The backend URL is loaded in the following order:

1. The `backend_url` `PlayerPrefs` key if present.
2. `Assets/StreamingAssets/backend_config.json` with a `base_url` field.
3. `http://localhost:8000` as a fallback.


