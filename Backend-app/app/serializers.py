from django.contrib.auth.models import User
from rest_framework import serializers
from app.models import Profile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class UserSerializer(serializers.ModelSerializer):
    fullname = serializers.CharField(max_length=30, write_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'fullname', 'email', 'password', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True},
            'first_name': {'read_only': True},
            'last_name': {'read_only': True}
        }

    def create(self, validated_data):
        # Extract fullname and generate username
        fullname = validated_data.pop('fullname')
        username = fullname.split(" ")[0].lower() + "@PLP"
        
        # Split fullname into first_name and last_name
        name_parts = fullname.split()
        first_name = name_parts[0]
        last_name = ' '.join(name_parts[1:]) if len(name_parts) > 1 else ''

        # Create user with all fields
        user = User.objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=validated_data.get('email'),
            password=validated_data.get('password')
        )
        return user

    def to_representation(self, instance):
        # Customize the output representation
        ret = super().to_representation(instance)
        # Remove write_only fields from output
        ret.pop('fullname', None)
        ret['fullname'] = f"{instance.first_name} {instance.last_name}".strip()
        return ret
        
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'username', 'email']#, 'phone','address', 'city', 'state', 'country', 'zipcode']
        extra_kwargs = {'email': {'write_only': True}}
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    # @classmethod
    # def get_token(cls, user):
    #     token = super().get_token(user)
        
    #     token['username'] = user.username
    #     token['email'] = user.email
    #     token['is_staff'] = user.is_staff
    #     return token    
    
    def validate(self, attrs):
        # Call the parent validate method to get the default tokens
        data = super().validate(attrs)

        # Add custom user-specific fields to the response
        data['is_staff'] = self.user.is_staff  # Example: Check if the user is an admin
        # print(data)

        return data
    
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer