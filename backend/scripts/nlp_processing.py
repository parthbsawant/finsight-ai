import spacy
import pandas as pd

nlp = spacy.load("en_core_web_sm")

df = pd.read_csv("backend/data/processed/news.csv")

texts = df["headline"].astype(str).tolist()

entities_list = []

# FAST processing using pipe
for i, doc in enumerate(nlp.pipe(texts, batch_size=1000)):
    if i % 1000 == 0:
        print(f"Processed {i} headlines")

    entities = [(ent.text, ent.label_) for ent in doc.ents]
    entities_list.append(entities)

df["entities"] = entities_list

df.to_csv("backend/data/processed/news_with_entities.csv", index=False)

print("NLP processing completed.")