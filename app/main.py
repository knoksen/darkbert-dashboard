from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from .model import predict, get_embedding, reduce_embeddings

app = FastAPI()


class TextIn(BaseModel):
    text: str


class EmbedsIn(BaseModel):
    texts: List[str]


@app.post("/predict")
def inference(payload: TextIn):
    return predict(payload.text)


@app.post("/embeddings")
def embeddings(payload: EmbedsIn):
    embs = [get_embedding(t) for t in payload.texts]
    return {"embeddings": embs}


@app.post("/embeddings/reduce")
def embeddings_reduce(payload: EmbedsIn):
    embs = [get_embedding(t) for t in payload.texts]
    return {"reduced": reduce_embeddings(embs)}


@app.get("/metrics")
def metrics():
    return {
        "epochs": [1, 2, 3, 4, 5],
        "train_loss": [0.9, 0.7, 0.5, 0.3, 0.2],
        "val_loss": [1.0, 0.8, 0.6, 0.4, 0.35],
    }


@app.get("/confusion")
def confusion():
    return {"labels": ["neg", "pos"], "matrix": [[50, 10], [5, 35]]}
