from django.shortcuts import redirect, render
from django.urls import reverse
from django.contrib.auth import login, authenticate, logout

from .forms import LoginForm, RegisterForm


def login_view(request):

    if request.user.is_authenticated:
        return redirect("/")

    form = LoginForm(request.POST or None)

    if request.method == "POST":
        if form.is_valid():
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password"]

            try:
                user = authenticate(request, username=username, password=password)
                login(request, user)
                return redirect(reverse("home_page"))
            except:
                print("invalid credentials")

        else:
            print("invalid")

    context = {"form": form}
    return render(request, "accounts/login.html", context)


def logout_view(request):
    if request.method == "POST":
        logout(request)
        return redirect(reverse("login_page"))


def register_view(request):

    if request.user.is_authenticated:
        return redirect("/")

    form = RegisterForm(request.POST or None)

    if request.method == "POST":
        if form.is_valid():
            form.save()
            # username = form.cleaned_data['username']
            # password1 = form.cleaned_data['password1']
            # user = User.objects.create(
            #     username=username,
            # )
            # user.set_password(password1)
            # user.save()
            return redirect(reverse("login_page"))
        else:
            print("invalid")

    context = {"form": form}
    return render(request, "accounts/register.html", context)
