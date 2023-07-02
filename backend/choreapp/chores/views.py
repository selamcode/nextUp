from django.shortcuts import render, get_object_or_404, redirect
from .models import Chore
from .forms import ChoreForm

def chore_list(request):

    chores = Chore.objects.all()
    return render(request, 'chores/chore_list.html', {'chores': chores})

def chore_detail(request, pk):

    chore = get_object_or_404(Chore, pk=pk)
    return render(request, 'chores/chore_detail.html', {'chore': chore})

def chore_create(request):

    if request.method == 'POST':
        form = ChoreForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('chore-list')
    else:
        form = ChoreForm()
    return render(request, 'chores/chore_form.html', {'form': form})
def chore_update(request, pk):

    chore = get_object_or_404(Chore, pk=pk)
    if request.method == 'POST':
        form = ChoreForm(request.POST, instance=chore)
        if form.is_valid():
            form.save()
            return redirect('chore-list')
    else:
        form = ChoreForm(instance=chore)
    return render(request, 'chores/chore_form.html', {'form': form, 'chore': chore})

def chore_delete(request, pk):
    chore = get_object_or_404(Chore, pk=pk)
    if request.method == 'POST':
        chore.delete()
        return redirect('chore-list')
    return render(request, 'chores/chore_confirm_delete.html', {'chore': chore})


