""" FactureLine View """

# Django
from django.views import View, generic
from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from django.core import serializers


# Models 
from apps.factura.models import (
    FactureLine, QuotaFacture,
    Client, Product
)

# Forms
from apps.factura.forms import FactureForm

# Python
import json

# Utils
from core.utils.generate_quotes import generate_facture_quotes
from core.utils.generate_pdf import render_to_pdf

# Config
from django.conf import settings

class FactureView(View):
    template_name = "facture/facture.html"

    def get(self, request, *args, **kwargs):
        products = Product.objects.all()
        
        # Conmvert To Json
        query_json = serializers.serialize('json', products)
        query_json = json.loads(query_json)
        
        # Data
        data = {
            "products": products,
            "quotes": range(0, 49)
        }

        return render(request, self.template_name, data)



class GetInfoClientView(View):
    def get(self, request, *args, **kwargs): 
        document_client = request.GET.get('document', None)
        
        if not document_client:
            response = JsonResponse({'message': "Debes enviar un documento"})
            response.status_code = 400
            return response
        
        client = Client.objects.filter(num_doc=document_client)
        
        if client.exists():
            query_json = serializers.serialize('json', client)
            query_json = json.loads(query_json)

            response = JsonResponse({'data': query_json})
            response.status_code = 200
            return response
        else:
            response = JsonResponse({
                'message': "Ups. No existe el cliente con el documento: {}".format(document_client)
            })
            response.status_code = 400
            return response 


class GenerateQuotes(View):
    form = FactureForm
    def post(self, request, *args, **kwargs):
        data = request.POST
        print(data)
        form = self.form(data)
        
        if form.is_valid():
            cleaned_data = form.cleaned_data
            
            # Calcular Balance
            balance = cleaned_data.get('product').value - cleaned_data.get('payment') 
            
            # Guardar informacion de la factura
            cleaned_data['balance'] = balance
            cleaned_data['total_payment'] = cleaned_data.get('product').value

            facture = FactureLine.objects.create(**cleaned_data)

            # Generar cuotas
            final_quotes = generate_facture_quotes(facture)

            # URL para descargar PDF
            url = settings.DOMAIN+"facture-gen-pdf/?facture={}".format(facture.id)

            response = JsonResponse({'url': url})
            response.status_code = 200
            return response
            
        else:
            errors = form.errors.as_json()
            errors = json.loads(errors)
            
            response = JsonResponse(errors)
            response.status_code = 400
            return response
        
class GeneratePDF(View):
    def get(self, request, *args, **kwargs):
        facture_id = request.GET.get('facture', None)
        facture = FactureLine.objects.filter(id=facture_id).first()

        if not facture:
            return redirect('factura:facture')

        final_quotes = QuotaFacture.objects.filter(facture__id = facture_id)

        # Generar PDF
        filename = "{}_{}_cuotas.pdf".format(
            facture.client.first_name,
            facture.client.last_name,
        )
        response = render_to_pdf('facture/pdf/quotes.html', {"quotes": final_quotes})
        response['Content-Disposition'] = 'attachment; filename=' + filename
        return response
