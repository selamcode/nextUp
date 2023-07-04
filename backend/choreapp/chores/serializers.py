# chores/serializers.py

from rest_framework import serializers
from .models import Chore

class ChoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chore
        fields = ['id', 'title', 'description', 'due_date', 'priority', 'status']
