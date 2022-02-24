from django import forms

from .models import Book


class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = "__all__"
        widgets = {
            "name": forms.TextInput(
                attrs={
                    "class": "w-full py-2 px-4 rounded border border-gray-200 focus:border-purple-300 focus:outline-none"
                }
            ),
            "isbn": forms.TextInput(
                attrs={
                    "class": "w-full py-2 px-4 rounded border border-gray-200 focus:border-purple-300 focus:outline-none"
                }
            ),
        }
        help_texts = {"name": "Enter bookname"}
