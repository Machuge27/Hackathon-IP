import google.generativeai as genai
import chromadb

from dotenv import load_dotenv
import os
from pathlib import Path
from generators.utils.create_chroma_db import GeminiEmbeddingFunction  




def get_response(query):
    BASE_DIR = Path(__file__).resolve().parent
    DB_PATH = str(BASE_DIR / "chroma_db")
    DB_NAME = "storage"

    # Load the API key from the .env file
    load_dotenv()
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    genai.configure(api_key=GOOGLE_API_KEY)

    # for m in genai.list_models():
    #     if "embedContent" in m.supported_generation_methods:
    #         print(m.name)

    # Reinitialize the PersistentClient
    chroma_client = chromadb.PersistentClient(path=DB_PATH)
    embed_fn = GeminiEmbeddingFunction()
    embed_fn.document_mode = False
    db = chroma_client.get_or_create_collection(name=DB_NAME, embedding_function=embed_fn)

    print("query", query)
    # Search the Chroma DB using the specified query.
    print(db.count())
    result = db.query(query_texts=[query], n_results=1)
    [[passage]] = result["documents"]
    
    passage_oneline = passage.replace("\n", " ")
    query_oneline = query.replace("\n", " ")

    # This prompt is where you can specify any guidance on tone, or what topics the model should stick to, or avoid.
    # prompt = f"""
    # You are a friendly and knowledgeable assistant, here to provide clear and helpful answers in a natural, engaging way. 
    # Your goal is to explain concepts in simple terms, making even complex topics easy to understand. 
    # Keep your tone warm, conversational, and approachable—like a helpful friend who happens to be really well-informed. 

    # If relevant information is available, seamlessly integrate it into your response as if you already knew it, without referencing any external source or context. 
    # Make your response feel direct and confident, avoiding phrases like "in the context of", "likely refers to.", "The regular expression `(Dedan|Univer|Shaandre)` would match these names in any text.", or any other phrases that will indicate the use of this prompt.

    # Do not use phrases like "in the context of the 1 Million Devs For Africa program", "as part of the 1 Million Devs For Africa program", "Hey there!" or "as mentioned in the 1 Million Devs For Africa program".
    # Include regular expressions.

    # Now, here's the question you need to answer:

    # QUESTION: {query_oneline}
    # PASSAGE: {passage_oneline}
    # """
    
    prompt = f"""
                You are a friendly and knowledgeable assistant, dedicated to providing clear and helpful answers in an engaging and approachable manner.  
                Your goal is to simplify complex concepts, making them easy to understand. Keep your tone warm and conversational—like a helpful friend who knows a lot.  

                When relevant information is available, integrate it naturally as if you already knew it, without referencing any external sources or context.  
                Make your response confident and direct, avoiding phrases that suggest reliance on external information.  
                Do **not** mention or refer to the "1 Million Devs For Africa program" and how the regular expressions are used in any way.  
 
                When applicable, include regular expressions.  

                Now, here’s the question you need to answer:  

                **QUESTION:** {query_oneline}  
                **PASSAGE:** {passage_oneline}  
            """  
    

    model = genai.GenerativeModel("gemini-1.5-flash-latest")
    
    response = model.generate_content(prompt)
    
    return response.text

if __name__ == "__main__":
    query = "Who is the Executive Director at PLP?"
    query = "can you give me some important PLP links"
    query = "How would you describe plp in less than 50 words?"
    query = "What is the 1 Million Devs For Africa program?"
    query = "Give some testimonials"
    response = get_response(query)
    print("Response", response)
