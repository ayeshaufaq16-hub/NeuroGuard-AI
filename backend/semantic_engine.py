from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

from intents import INTENTS

model = SentenceTransformer("all-MiniLM-L6-v2")

examples = []
labels = []

for intent, data in INTENTS.items():
    for pattern in data["patterns"]:
        examples.append(pattern)
        labels.append(intent)

example_embeddings = model.encode(examples)

def detect_intent(user_message):

    user_embedding = model.encode([user_message])

    similarities = cosine_similarity(
        user_embedding,
        example_embeddings
    )[0]

    best_index = np.argmax(similarities)

    confidence = float(similarities[best_index])

    intent = labels[best_index]

    return intent, confidence