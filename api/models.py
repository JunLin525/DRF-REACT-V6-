from django.db import models

# Create your models here.
class Note(models.Model):
    body = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True) # after first time every time
    created = models.DateTimeField(auto_now_add=True)# first time create

    def __str__(self):
        return self.body[0:50]