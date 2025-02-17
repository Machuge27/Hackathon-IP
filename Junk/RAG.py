import google.generativeai as genai
from IPython.display import Markdown, HTML, display
from dotenv import load_dotenv
import os
from PyPDF2 import PdfReader

# Load the API key from the .env file
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

def read_docs(doc_paths):
    doc_texts = []
    
    for doc_path in doc_paths:
        with open(doc_path, "rb") as file:
            reader = PdfReader(file)
            doc_content = ""
            
            for page in reader.pages:
                content = page.extract_text()
                if content:
                    lines = content.split('\n')
                    if lines:
                        #print(lines[0])  # Print the first line of each page
                        doc_content += content + "\n"
            
            doc_texts.append(doc_content.strip())  # Append the text of the document
    
    return doc_texts

# Example usage:
links = ["./docs/Document1(1).pdf"]#, "./docs/Document2.pdf", "./docs/Document3.pdf"]
documents = read_docs(links)

for m in genai.list_models():
    if "embedContent" in m.supported_generation_methods:
        print(m.name)
        
from chromadb import Documents, EmbeddingFunction, Embeddings
from google.api_core import retry


class GeminiEmbeddingFunction(EmbeddingFunction):
    # Specify whether to generate embeddings for documents, or queries
    document_mode = True

    def __call__(self, input: Documents) -> Embeddings:
        if self.document_mode:
            embedding_task = "retrieval_document"
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
    
import chromadb

DB_NAME = "storedb"
embed_fn = GeminiEmbeddingFunction()
embed_fn.document_mode = True

chroma_client = chromadb.Client()
db = chroma_client.get_or_create_collection(name=DB_NAME, embedding_function=embed_fn)

db.add(documents=documents, ids=[str(i) for i in range(len(documents))])            
        
# print("First Line", documents[0].split("\n")[0])
print("First Line", documents)