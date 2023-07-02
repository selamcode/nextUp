from django.urls import path
from . import views

urlpatterns = [
    path('chores/', views.chore_list, name='chore-list'),
    path('chores/<int:pk>/', views.chore_detail, name='chore-detail'),
    path('chores/new/', views.chore_create, name='chore-create'),
    path('chores/<int:pk>/edit/', views.chore_update, name='chore-update'),
    path('chores/<int:pk>/delete/', views.chore_delete, name='chore-delete'),
]
