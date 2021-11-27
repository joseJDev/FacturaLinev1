""" FormFacture """

# Django
from django import forms

# Models 
from apps.factura.models import FactureLine

class FactureForm(forms.ModelForm):
    class Meta:
        model = FactureLine
        exclude = ['products', 'created', 'modified'] 
