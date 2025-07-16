import os
from dotenv import load_dotenv
from transformers import AutoTokenizer, AutoModelForSequenceClassification, AutoModel
import torch
from sklearn.manifold import TSNE

load_dotenv()
MODEL_NAME = os.getenv(""MODEL_NAME"")
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
clf_model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
embed_model = AutoModel.from_pretrained(MODEL_NAME)

def predict(text: str):
    inputs = tokenizer(text, return_tensors=""pt"", truncation=True, padding=True)
    outputs = clf_model(**inputs)
    probs = torch.softmax(outputs.logits, dim=-1).detach().numpy().tolist()[0]
    return {{""predictions"": probs}}

def get_embedding(text: str):
    inputs = tokenizer(text, return_tensors=""pt"", truncation=True, padding=True)
    last_hidden = embed_model(**inputs).last_hidden_state
    emb = last_hidden.mean(dim=1).detach().numpy()[0]
    return emb.tolist()

def reduce_embeddings(embeddings):
    tsne = TSNE(n_components=2, random_state=42)
    reduced = tsne.fit_transform(embeddings).tolist()
    return reduced
