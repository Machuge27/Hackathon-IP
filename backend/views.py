from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
from .forms import CustomSignUpForm, CustomSignInForm
from .models import User, Text, Message, Response
from .serializers import UserMessagesSerializer
import json, random
from generators.utils.RAG import get_response
from generators.suggestions import suggestionsGenerator


# Initial suggestions
initial_suggestions = [
    "Tell me about PLP",
    "Who is the Board Chairperson?",
    "Is the program free?",
    "What is CIDP?",
    "Who are PLP's successful graduates?",
]

# Function to generate suggestions
def generate_suggestions():
    selected_suggestions = random.sample(initial_suggestions, 4)
    return selected_suggestions

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }

def index(request):
    return render(request, "backend/index.html")

def sign_up(request):
    if request.method == "POST":
        form = CustomSignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            # User.objects.create(user=user)
            tokens = get_tokens_for_user(user)
            login(request, user)
            response = redirect("chat_page")
            response.set_cookie("access_token", tokens["access"], httponly=True)
            response.set_cookie("refresh_token", tokens["refresh"], httponly=True)
            print(response)
            return response
    else:
        form = CustomSignUpForm()
    return render(request, "backend/custom_sign_up.html", {"form": form})


def sign_in(request):
    if request.method == "POST":
        messages_data = [
            {
                "message": [
                    {
                        "text": "text",
                        "responses": ["good morning", "good morning too"],
                        "id": 1,
                        "timestamp": "22:20",
                    },
                    {
                        "text": "text1",
                        "responses": ["good evening"],
                        "id": 2,
                        "timestamp": "12:43",
                    },
                ]
            },
            {
                "message": [
                    {
                        "text": "text",
                        "responses": ["good morning", "good morning too"],
                        "id": 1,
                        "timestamp": "18:48",
                    },
                    {
                        "text": "text1",
                        "responses": ["good evening"],
                        "id": 2,
                        "timestamp": "5:16",
                    },
                ]
            },
        ]
        messages_data1 = [
    {
        'message': [
            {
                'text': "text",
                'responses': [
                    'Sure, I\'d be happy to help you understand the differences between Django and React.js: ### Django:###  Let\'s start with Django which is a well know python library for rapid development and deployment of web servers:-#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Type: -* -| Django is a high-level Python web framework that encourages rapid development and clean , pragmatic design. -| -*Backend: -* -| Django is primarily used for server-side development. It follows the Model-View-Template (MVT) architecture pattern. -| -*Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -* -*Features: -* -| Django provides a built-in ORM (Object-Relational Mapping) system, admin panel, authentication, and security features out of the box. -| -*Scalability: -* -| Django is known for its scalability and is suitable for building complex, data-driven websites. -| -# You can find the documentation -# <a href="https://chatgpt.com">here</a>  ### React.js: ### -*Type: -* -| React.js is a JavaScript library for building user interfaces, specifically for single-page applications. -|  -*Frontend:-* -| React.js is used for client-side development. It follows the component-based architecture. You can learn more <a href="https://chatgpt.com">here</a>. -| -*Features:-* -| React.js allows for the creation of reusable UI components, making the development process more efficient and modular. -|  -* You can find the documentation <a href="https://chatgpt.com">here</a>.-* I hope this was helpful in getting you know the difference between Django and react, please feel free to ask anything related to this. Otherwise you can visit <a href="https://chatgpt.com">this site</a> for more info  ',
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            },
            {
                'text': "text1",
                'responses': [
                    'Sure, I\'d be happy to help you understand the differences between Django and React.js: ### Django:###  Let\'s start with Django which is a well know python library for rapid development and deployment of web servers:-#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Type: -* -| Django is a high-level Python web framework that encourages rapid development and clean , pragmatic design. -| -*Backend: -* -| Django is primarily used for server-side development. It follows the Model-View-Template (MVT) architecture pattern. -| -#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Features: -* -| Django provides a built-in ORM (Object-Relational Mapping) system, admin panel, authentication, and security features out of the box. -| -*Scalability: -* -| Django is known for its scalability and is suitable for building complex, data-driven websites. -| -# You can find the documentation -# <a href="https://chatgpt.com">here</a>  ### React.js: ### -*Type: -* -| React.js is a JavaScript library for building user interfaces, specifically for single-page applications. -|  -*Frontend:-* -| React.js is used for client-side development. It follows the component-based architecture. You can learn more <a href="https://chatgpt.com">here</a>. -| -*Features:-* -| React.js allows for the creation of reusable UI components, making the development process more efficient and modular. -|  -* You can find the documentation <a href="https://chatgpt.com">here</a>.-* I hope this was helpful in getting you know the difference between Django and react, please feel free to ask anything related to this. Otherwise you can visit <a href="https://chatgpt.com">this site</a> for more info  ',
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            },
            {
                'text': "text1",
                'responses': [
                    'Sure, I\'d be happy to help you understand the differences between Django and React.js: ### Django:###  Let\'s start with Django which is a well know python library for rapid development and deployment of web servers:-#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Type: -* -| Django is a high-level Python web framework that encourages rapid development and clean , pragmatic design. -| -*Backend: -* -| Django is primarily used for server-side development. It follows the Model-View-Template (MVT) architecture pattern. -| -#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Features: -* -| Django provides a built-in ORM (Object-Relational Mapping) system, admin panel, authentication, and security features out of the box. -| -*Scalability: -* -| Django is known for its scalability and is suitable for building complex, data-driven websites. -| -# You can find the documentation -# <a href="https://chatgpt.com">here</a>  ### React.js: ### -*Type: -* -| React.js is a JavaScript library for building user interfaces, specifically for single-page applications. -|  -*Frontend:-* -| React.js is used for client-side development. It follows the component-based architecture. You can learn more <a href="https://chatgpt.com">here</a>. -| -*Features:-* -| React.js allows for the creation of reusable UI components, making the development process more efficient and modular. -|  -* You can find the documentation <a href="https://chatgpt.com">here</a>.-* I hope this was helpful in getting you know the difference between Django and react, please feel free to ask anything related to this. Otherwise you can visit <a href="https://chatgpt.com">this site</a> for more info  ',
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            },
            {
                'text': "text1",
                'responses': [
                    'Sure, I\'d be happy to help you understand the differences between Django and React.js: ### Django:###  Let\'s start with Django which is a well know python library for rapid development and deployment of web servers:-#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Type: -* -| Django is a high-level Python web framework that encourages rapid development and clean , pragmatic design. -| -*Backend: -* -| Django is primarily used for server-side development. It follows the Model-View-Template (MVT) architecture pattern. -| -#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Features: -* -| Django provides a built-in ORM (Object-Relational Mapping) system, admin panel, authentication, and security features out of the box. -| -*Scalability: -* -| Django is known for its scalability and is suitable for building complex, data-driven websites. -| -# You can find the documentation -# <a href="https://chatgpt.com">here</a>  ### React.js: ### -*Type: -* -| React.js is a JavaScript library for building user interfaces, specifically for single-page applications. -|  -*Frontend:-* -| React.js is used for client-side development. It follows the component-based architecture. You can learn more <a href="https://chatgpt.com">here</a>. -| -*Features:-* -| React.js allows for the creation of reusable UI components, making the development process more efficient and modular. -|  -* You can find the documentation <a href="https://chatgpt.com">here</a>.-* I hope this was helpful in getting you know the difference between Django and react, please feel free to ask anything related to this. Otherwise you can visit <a href="https://chatgpt.com">this site</a> for more info  ',
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            }
        ]
    }]   
        try:
            user_details = json.loads(request.body)
            username = user_details["username"]
            password = user_details["password"]
            print(username, password)
            user = authenticate(request, username=username, password=password)
            print(user)
            if user is not None:
                print("signed in")
                tokens = get_tokens_for_user(user)
                login(request, user)
                # Return JSON response with tokens and redirect URL
                for message in messages_data1:
                    messageInstance = Message.objects.create(user=request.user)
                    messageList = message["message"]
                    for message in messageList:
                        textInstance = Text.objects.create(text = message['text'], message=messageInstance)
                        for response in message['responses']:
                            responseInstance = Response.objects.create(
                                text=response, response=textInstance
                            )
                    print("data added")
                return JsonResponse(
                    {
                        "access": tokens["access"],
                        "refresh": tokens["refresh"],
                        "redirect_url": "/chat/",  # URL to redirect to after successful login
                    }
                )
            else:
                print("not signed in")
                return JsonResponse({"detail": "Invalid credentials"}, status=400)
        except Exception as e:
            return JsonResponse({"detail": str(e)}, status=500)
        
    return render(request, "backend/login.html")


def messages_view1(request):
    if not request.user.is_authenticated:
        return redirect("sign_in")

    messages = request.user.user_message.all().prefetch_related("message_text")

    # messages_data = [
    #     {
    #         "message": [
    #             {
    #                 "text": message.text,
    #                 "responses": [
    #                     response.text for response in message.responses.all()
    #                 ],
    #                 "id": message.id,
    #                 "timestamp": message.timestamp,
    #             }
    #             for message in messages
    #         ]
    #     } 
    # ]
    
    messages_data = []
    message = []
    data = Message.objects.filter(user=request.user).all().prefetch_related('message_text').all()#.prefetch_related('responses').all()
    msg = UserMessagesSerializer(data, many = True)
    print('msgg', msg.data)
    
    for messageTxt in messages:
        # print('messageTxt', json.loads(messageTxt))
        for Texts in messageTxt.message_text.all():  # Access related Text objects
            for text in Texts.all():
                messageObj = {
                    "text": text.text,
                    "responses": [response.text for response in text.responses.all()],  # Access related Response objects
                    "id": text.id,  # Use the Text model's ID
                    "timestamp": text.timestamp,
                }
                message.append(messageObj)
            messages_data.append(message)
    print('user_message', messages_data)

    return JsonResponse({"messages": messages_data})

def messages_view(request):
    # if not request.user.is_authenticated:
    #     return redirect("sign_in")

    # Fetch all messages with related Text and Response objects
    messages = request.user.user_message.all().prefetch_related("message_text__responses")

    messages_data = []

    # Iterate over each Message object
    for message in messages:
        message_group = {"message": []}  # Create a new group for each message set

        # Iterate over each Text object related to the current Message
        for text in message.message_text.all():
            # Construct the message data including the responses
            message_text = {
                "text": text.text,
                "responses": [response.text for response in text.responses.all()],
                "id": text.id,
                "timestamp": text.timestamp,
            }
            message_group["message"].append(message_text)  # Append the message to the group

        messages_data.append(message_group)  # Add the group to the overall messages_data

    print('user_message', messages_data)

    return JsonResponse({"messages": messages_data})


def chat_page(request):
    if not request.user.is_authenticated:
        return redirect("sign_in")
    user = request.user
    return render(
        request,
        "backend/messages.html",
        {"user": user, "suggestions": initial_suggestions},
    )


def log_out(request):
    logout(request)
    return redirect("sign_in")


# from .models import Notice, Message

# def notices(request):
#     notices = Notice.objects.all()
#     messages = Message.objects.all()
#     print(notices)
#     return render(request, 'index.html', {
#         'notices': notices,
#         'messages': messages,
#     })


def getResponse(request):
    if (request.method == "POST"):
        data = json.loads(request.body)
        prompt = data["prompt"]
        response = get_response(prompt)
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

        if (len(fps)  < 4):
            x = 4 - len(fps)
            suggestions = fps + generate_suggestions()[:x]
            print("Suggestions:\n",suggestions)  
            return JsonResponse({"response": response, "suggestions": suggestions})
        suggestions = random.sample(fps, 4)
        print("Suggestions: \n", suggestions)    

        return JsonResponse({"response": response, "suggestions": suggestions})
    return jsonify({"error": "Invalid request method"}), 400

    # pass

    if request.method == "GET":
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

    # pass
