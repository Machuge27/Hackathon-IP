from flask import Flask, render_template, jsonify, request
from suggestions import suggestionsGenerator
from chat import  get_response

import random

app = Flask(__name__)

# Initial suggestions
initial_suggestions = [
    "Hello there.",
    "E-Learning.",
    "Fees inquiries.",
    "Students portal.",
    "Curriculum offered.",
    "Exam bank.",
    "Units registration.",
]

# Function to generate response
def generate_response(prompt):
    # Placeholder response generation logic
    response = get_response(prompt)  + ''#'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a> or check out our documentation  <a href="https://docs.chatgpt.com">here</a>. You can visit our website <a href="https://chatgpt.com">https://chatgpt.com</a> or check out our documentation  <a href="https://docs.chatgpt.com">here</a>. You can visit our website <a href="https://chatgpt.com">here</a> or check out our documentation  <a href="https://docs.chatgpt.com">here</a>.'
    # response = ''
    # response = get_response(prompt)
    return response

# Function to generate suggestions
def generate_suggestions():
    selected_suggestions = random.sample(initial_suggestions, 4)
    return selected_suggestions

@app.route("/")
def index():
    suggestions = generate_suggestions()
    return render_template("chat.html", initial_suggestions=generate_suggestions())

@app.route("/getResponse", methods=["POST"])
def getResponse():
        
    if request.method == "POST":
        data = request.get_json()
        prompt = data.get("prompt")
        print(prompt)
        response = generate_response(prompt)
        # response = ''
        # response = get_response(prompt)
        print("RESPONSE:\n ", response)
        matches, possible_suggestions, matching_values = suggestionsGenerator(prompt, None, partial_matching=True, case_sensitive=True)
        fps = []
        if matches:
            # for match in matches:
                # print("MAtch:\n",match)                    
            for ps in possible_suggestions:
                for key in ps:
                    fps.append(key)          
                    # print("PS:",key)          
        else:
            print("No matching values found.")

        # print("Method:\n ", request.method)
        # print("Prompt:\n ", prompt)
        # print("FPS:\n",fps)    
        if (len(fps)  < 4):
            x = 4 - len(fps)
            suggestions = fps + generate_suggestions()[:x]
            print("Suggestions:\n",suggestions)  
            return jsonify({"response": response, "suggestions": suggestions})
        suggestions = random.sample(fps, 4)
        print("Suggestions: \n", suggestions)
        return jsonify({"response": response, "suggestions": suggestions})
    return jsonify({"error": "Invalid request method"}), 400

if __name__ == "__main__":
    app.run(port=2220)