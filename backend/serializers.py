from rest_framework import serializers
from .models import User, Message, Response, Text

class ResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Response
        fields = ['id', 'text', 'timestamp']
        
class TextSerializer(serializers.ModelSerializer):  
    # responses = ResponseSerializer(many=True)    
    class Meta:
        model = Text
        fields = ['text', 'timestamp']
        
class MessageSerializer(serializers.ModelSerializer):
    messages = TextSerializer(many=True) 
    class Meta:
        model = Message
        fields = ['user', 'messages']

class UserSerializer(serializers.ModelSerializer):
    message = MessageSerializer(many=True) 
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['id', 'message', 'username', 'password']

        
class UserMessagesSerializer(serializers.Serializer):     
    message = MessageSerializer(many=True) 
    