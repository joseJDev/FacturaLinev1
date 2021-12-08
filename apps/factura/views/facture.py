""" FactureLine View """

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
from apps.factura.models.factura import PaymentsFacture

# Utils
from core.utils.generate_quotes import generate_facture_quotes
from core.utils.generate_pdf import render_to_pdf, render_pdf_docraptor
from core.utils.create_consecutive import create_consective

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


@method_decorator(csrf_exempt, name='dispatch')
class GenerateQuotes(View):
    form = FactureForm
    def post(self, request, *args, **kwargs):
        data = request.POST
        form = self.form(data)
        
        if form.is_valid():
            cleaned_data = form.cleaned_data

            # Crear consecutivo
            n_invoice = create_consective(FactureLine)
            cleaned_data['n_invoice'] = n_invoice

            # Guardar info factura
            facture = FactureLine.objects.create(**cleaned_data)

            # Guardar productos
            products = data.get('product')
            products = json.loads(products)

            list_products = []

            for product in products:
                pp = Product.objects.filter(id=product['id']).first()
                new_product = ProductsFacture.objects.create(
                    num_products = product['count'],
                    product = pp,
                    facture = facture,
                    total_value = total_value(pp, product['count'])
                )

                list_products.append(new_product)

            # Generar cuotas
            final_quotes = generate_facture_quotes(facture, list_products)

            # URL para descargar PDF
            url_facture = settings.DOMAIN+"facture-gen-pdf/?facture={}".format(facture.id)
            url_payment = settings.DOMAIN+"financial-box/{}".format(facture.id)

            data_response = {
                "url_facture": url_facture,
                "url_payment":url_payment
            }

            response = JsonResponse(data_response)
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
        products_facture = ProductsFacture.objects.filter(facture__id = facture.id)

        if not facture:
            return redirect('factura:facture')

        # Generar PDF
        filename = "{}_{}_factura.pdf".format(
            facture.client.first_name,
            facture.client.last_name,
        )

        # Data Render
        data_render = {
            "facture": facture,
            "products_facture": products_facture
        }

        pdf = render_pdf_docraptor('facture/pdf/facture.html', filename, data_render)
        response = HttpResponse(pdf, content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename=' + filename
        return response


class DetailFactureView(View):
    template_name = 'reports/detail.html'
    def get(self, request, *args, **kwargs):
        facture = FactureLine.objects.filter(id=kwargs.get('pk')).first()
        products = ProductsFacture.objects.filter(facture__id = facture.id)
        payments_facture = PaymentsFacture.objects.filter(facture__id=facture.id)
        data = {
            'facture': facture,
            'products': products,
            'payment_facture': payments_facture
        }
        return render(request, self.template_name, data)



def total_value(product, count):
    return int(product.value) * int(count)