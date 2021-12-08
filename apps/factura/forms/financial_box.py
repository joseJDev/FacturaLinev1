""" FormFinancialBox """

# Django
from django import forms

# Models 
from apps.factura.models import PaymentsFacture

class FormFinancialBox(forms.ModelForm):
    class Meta:
        model = PaymentsFacture
        fields = ['facture', 'type_payment', 'total_payment'] 
