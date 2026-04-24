from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import pandas as pd

tokenizer = AutoTokenizer.from_pretrained("ProsusAI/finbert")
model = AutoModelForSequenceClassification.from_pretrained("ProsusAI/finbert")

labels = ["negative", "neutral", "positive"]

df = pd.read_csv("backend/data/processed/news_with_entities.csv")

def get_sentiment(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True)
    outputs = model(**inputs)
    probs = torch.nn.functional.softmax(outputs.logits, dim=1)
    score = probs.detach().numpy()[0]

    # Convert to numeric score
    sentiment_score = score[2] - score[0]  # positive - negative
    return sentiment_score

df["sentiment_score"] = df["headline"].apply(get_sentiment)

df.to_csv("backend/data/processed/news_with_sentiment.csv", index=False)

print("FinBERT sentiment completed.")
