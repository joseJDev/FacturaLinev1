""" FormProducts """

# Django
from django import forms

# Models 
from apps.factura.models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        exclude = '__all__' 
