from django.urls import path
from app.views import UserQuestionView

urlpatterns =[
    path('query/', UserQuestionView.as_view(), name='query'),
    
]