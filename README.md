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

2. **Set up a virtual environment and install backend dependencies**
   ```bash
   # Create and activate a virtual environment (Linux/macOS)
   python -m venv venv
   source venv/bin/activate
   
   # For Windows
   python -m venv venv
   venv\Scripts\activate
   
   # Install dependencies
   pip install -r requirements.txt
   ```

3. **Create a `.env` file**
   ```bash
   cp .env.example .env
   # Update the `.env` file:
   # - Set `MODEL_NAME` to the name of the model you want to use (required).
   # - Adjust database settings (e.g., `DB_URL`) if not using the default SQLite (optional).
   # - Configure other settings as needed for your environment.
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

The frontend should open at http://localhost:3000 and communicate with the FastAPI
server running on port 8000. If it does not open automatically, please navigate to the URL manually.

## 📈 Usage

- Visit `http://localhost:3000` to view the dashboard.
- Check the **Metrics** panel for loss and accuracy curves.
- Use the **Embeddings Explorer** to visualize text embeddings.
- Try out predictions in the **Inference** panel.
