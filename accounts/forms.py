from django.contrib.auth import forms
from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.contrib.auth.models import User


class LoginForm(forms.Form):
    username = forms.CharField(
        widget=forms.TextInput(
            attrs={
                "class": "w-full py-2 px-4 rounded border border-gray-200 focus:border-purple-300 focus:outline-none"
            }
        )
    )
    password = forms.CharField(
        widget=forms.PasswordInput(
            attrs={
                "class": "w-full py-2 px-4 rounded border border-gray-200 focus:border-purple-300 focus:outline-none"
            }
        )
    )


class RegisterForm(UserCreationForm):
    email = forms.EmailField(
        widget=forms.EmailInput(
            attrs={
                "class": "w-full py-2 px-4 rounded border border-gray-200 focus:border-purple-300 focus:outline-none"
            }
        )
    )

    class Meta:
        model = User
        fields = ("username", "email", "password1", "password2")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields["username"].widget = forms.TextInput(
            attrs={
                "class": "w-full py-2 px-4 rounded border border-gray-200 focus:border-purple-300 focus:outline-none"
            }
        )
        self.fields["password1"].widget = forms.PasswordInput(
            attrs={
                "class": "w-full py-2 px-4 rounded border border-gray-200 focus:border-purple-300 focus:outline-none"
            }
        )
        self.fields["password2"].widget = forms.PasswordInput(
            attrs={
                "class": "w-full py-2 px-4 rounded border border-gray-200 focus:border-purple-300 focus:outline-none"
            }
        )


    def clean_email(self):
        email = self.cleaned_data['email']

        if '@gmail.com' not in email:
            raise forms.ValidationError('Email does not contain gmail.com')

        return email