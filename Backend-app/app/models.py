from django.db import models

# Create your models here.
class Profile(models.Model):
    fullname = models.CharField(max_length=30)
    Phone = models.CharField(max_length=10)
    email = models.EmailField(max_length=50)
    
    def __str__(self):
        return self.Username