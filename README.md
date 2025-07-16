# DarkBERT Dashboard

A web-based dashboard for visualizing and monitoring DarkBERT model performance and outputs.

## 🚀 Features

- **Model Metrics**: Track training/validation loss and accuracy over time  
- **Confusion Matrix**: Visualize per-class performance  
- **Embeddings Explorer**: Project and inspect hidden-layer embeddings with t-SNE or UMAP  
- **Inference Panel**: Paste text and see DarkBERT predictions in real time  
- **Dark Mode UI**: Sleek, dark-themed interface for comfortable long-term usage

## 🛠️ Tech Stack

- **Frontend**: React + Tailwind CSS  
- **Backend**: FastAPI (Python)  
- **Data Storage**: SQLite / Postgres (configurable)  
- **Visualization**: Chart.js, Plotly  
- **Containerization**: Docker & Docker Compose  

## 🚧 Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/knoksen/darkbert-dashboard.git
   cd darkbert-dashboard
   ```

2. **Install backend dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Create a `.env` file**
   ```bash
   cp .env.example .env
   # adjust MODEL_NAME or other settings if needed
   ```

4. **Start the backend**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

5. **Install and run the frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

The frontend will open at http://localhost:3000 and communicate with the FastAPI
server running on port 8000.

## 📈 Usage

- Visit `http://localhost:3000` to view the dashboard.
- Check the **Metrics** panel for loss and accuracy curves.
- Use the **Embeddings Explorer** to visualize text embeddings.
- Try out predictions in the **Inference** panel.
