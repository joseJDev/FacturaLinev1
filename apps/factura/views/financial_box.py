""" Views Financial Box """
# Django
from django.views import View, generic
from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from django.core import serializers

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

# Models 
from apps.factura.models import (
    FactureLine, QuotaFacture,
    Client, Product, ProductsFacture
)

# Forms
from apps.factura.forms import FactureForm

# Python
import json


class FinancialBoxDetailView(View):
    template_name = 'financial_box/financial.html'

    def get(self, request, *args, **kwargs):
        facture = FactureLine.objects.filter(id=kwargs.get('pk')).first()
        products = ProductsFacture.objects.filter(facture__id = facture.id)
        data = {
            'facture': facture,
            'products': products
        }
        return render(request, self.template_name, data)