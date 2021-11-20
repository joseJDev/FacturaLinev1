""" HomeView Facturacion """

# Django
from django.shortcuts import render, redirect
from django.views import View

# Models 
from apps.factura.models import (
    Client, Product, FactureLine
)

class HomeView(View):
    template_name = 'index.html'

    def get(self, request, *args, **kwargs):
        count_clients = Client.objects.all().count()
        count_products = Product.objects.all().count()
        count_factures = FactureLine.objects.all().count()
        data = {
            "clients": count_clients,
            "products": count_products,
            "factures": count_factures
        }

        return render(request, self.template_name, data)