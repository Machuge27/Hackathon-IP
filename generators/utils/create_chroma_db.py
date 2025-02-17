import google.generativeai as genai
from chromadb import Documents, EmbeddingFunction, Embeddings
from google.api_core import retry
import chromadb

from generators.utils.pdfReader import document_processor
from pathlib import Path

class GeminiEmbeddingFunction(EmbeddingFunction):
    # Specify whether to generate embeddings for documents, or queries
    document_mode = True

    def __call__(self, input: Documents) -> Embeddings:
        if self.document_mode:            embedding_task = "retrieval_document"
        else:
            embedding_task = "retrieval_query"

        retry_policy = {"retry": retry.Retry(predicate=retry.if_transient_error)}

        response = genai.embed_content(
            model="models/text-embedding-004",
            content=input,
            task_type=embedding_task,
            request_options=retry_policy,
        )
        return response["embedding"]

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = str(BASE_DIR / "chroma_db")
DB_NAME = "storage"

def create_chroma_db(documents):
    embed_fn = GeminiEmbeddingFunction()
    embed_fn.document_mode = True

    # Use PersistentClient for persistence
    chroma_client = chromadb.PersistentClient(path=DB_PATH)
    db = chroma_client.get_or_create_collection(name=DB_NAME, embedding_function=embed_fn)

    # Extract only the text content
    document_texts = [doc["content"] for doc in documents]  # Extract content

    db.add(documents=document_texts, ids=[str(i) for i in range(len(document_texts))])

if __name__ == "__main__":
    documents = document_processor('./docs')
    print(documents[0]['content'][:30])
    print(documents[-1]['content'][:30])
    
    try:
        create_chroma_db(documents)
        print("DB created and Documents added successfully!")
    except Exception as e:
        print(f"An error occurred: {e}")
