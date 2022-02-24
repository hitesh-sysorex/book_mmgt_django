from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required

from .models import Book
from .forms import BookForm


def home_page(request):
    books = Book.objects.all()
    search = request.GET.get("search")
    if search:
        books = books.filter(name__icontains=search)

    context = {"books": books}
    return render(request, "index.html", context)


def about_page(request):
    return render(request, "about.html")


def detail_view(request, id):
    book = Book.objects.get(id=id)
    return render(request, "detail.html", {"book": book})


def create_book(request):

    if not request.user.is_authenticated:
        messages.error(request, "User not logged in")
        return redirect("/")

    form = BookForm(request.POST or None)

    if request.method == "POST":
        if form.is_valid():
            form.save()
            messages.success(request, "Your book has been created")
            return redirect("/")
        else:
            messages.error(request, "Invalid input")

    return render(request, "create.html", {"form": form})


@login_required
def edit_view(request, id):
    book = Book.objects.get(id=id)
    form = BookForm(request.POST or None, instance=book)

    if request.method == "POST":
        if form.is_valid():
            form.save()
            return redirect("/")
        else:
            print("invalid")

    context = {"book": book, "form": form}
    return render(request, "edit.html", context)


@login_required
def delete_view(request, id):
    book = Book.objects.get(id=id)

    if request.method == "POST":
        book.delete()
        return redirect("/")

    context = {
        "book": book,
    }
    return render(request, "delete.html", context)
