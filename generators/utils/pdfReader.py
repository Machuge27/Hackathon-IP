import pypdf
import os

# def read_pdf(file_path):

#     # creating a pdf reader object
#     reader = pypdf.PdfReader(file_path)

#     # print the number of pages in pdf file
#     print(len(reader.pages))

#     # print the text of the first page
#     print(reader.pages[0].extract_text())

# if __name__ == "__main__":
#     file_path = './docs/Document1(1).pdf'
#     text = read_pdf(file_path)
#     print(text)


def document_processor(doc_path):
    """
    Process all PDF documents in the specified directory
    Returns a list of texts from each document
    """
    texts = []
    
    # Check if directory exists
    if not os.path.exists(doc_path):
        print(f"Directory {doc_path} does not exist")
        return texts
    
    # Process each PDF file in the directory
    for filename in os.listdir(doc_path):
        if filename.endswith('.pdf'):
            file_path = os.path.join(doc_path, filename)
            try:
                text = read_pdf(file_path)
                texts.append({
                    'filename': filename,
                    'content': text
                })
                print(f"Successfully processed {filename}")
            except Exception as e:
                print(f"Error processing {filename}: {str(e)}")
    
    return texts

def read_pdf(file_path):
    """
    Read and extract text from all pages of a PDF file
    Returns concatenated text from all pages or empty string if PDF is empty
    """
    try:
        reader = pypdf.PdfReader(file_path)
        
        # Check if PDF has any pages
        if len(reader.pages) == 0:
            print(f"PDF is empty: {file_path}")
            return ""
        
        full_text = []
        for page_num in range(len(reader.pages)):
            page = reader.pages[page_num]
            text = page.extract_text()
            
            # Only append if there's actual text
            if text and text.strip():
                full_text.append(text.strip())
        
        # If no text was extracted from any page, return empty string
        if not full_text:
            print(f"No text content found in: {file_path}")
            return ""
            
        return ' '.join(full_text)
        
    except Exception as e:
        print(f"Error reading PDF {file_path}: {str(e)}")
        raise

if __name__ == "__main__":
    # Process single file
    file_path = './docs/Document1(1).pdf'
    try:
        text = read_pdf(file_path)
        print("\nExtracted text from single file:")
        print(text[:500] + "...") # Print first 500 characters as preview
    except Exception as e:
        print(f"Error processing single file: {str(e)}")
    
    # Process all files in directory
    doc_path = './docs/'
    try:
        all_texts = document_processor(doc_path)
        print(f"\nProcessed {len(all_texts)} documents in total")
        
        # Print preview of each document
        for doc in all_texts:
            print(f"\nPreview of {doc['filename']}:")
            preview = doc['content'][:200] + "..."
            print(preview)
    except Exception as e:
        print(f"Error processing directory: {str(e)}")