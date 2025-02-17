from django.shortcuts import render
from app.models import Profile
from django.contrib.auth.models import User
from app.serializers import UserSerializer, UserProfileSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated

from generators.RAG import get_response
from generators.suggestions import suggestionsGenerator

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
class CreateUserProfile(generics.CreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [AllowAny]  
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()   
        print(serializer.errors)            
    
class UserQuestionView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        question = request.data.get('question')
        if not question:
            return Response({"error": "Question is required"}, status=400)
        
        response = get_response(question)
        
        return Response(response, status=200)

