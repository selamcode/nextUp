from django import forms
from .models import Chore

class ChoreForm(forms.ModelForm):
    assignee = forms.CharField(max_length=100)  # Update this line

    class Meta:
        model = Chore
        fields = ['title', 'description', 'assignee', 'due_date', 'priority', 'status']
