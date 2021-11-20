""" ReportClientView """
# Django
from django.views import View, generic
from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from django.core import serializers
from django.db.models import Count, F, Value as V
from django.db.models.functions import Concat

# Models 
from apps.factura.models import (
    FactureLine, Client
)


# Python
import json

# Utils
from core.utils.generate_pdf import render_to_pdf

# Config
from django.conf import settings

class ReportClientTemplate(generic.TemplateView):
    template_name = "reports/report.html"


class GetReportView(View):
    def get(self, request, *args, **kwargs): 
        document_client = request.GET.get('document', None)
        
        if not document_client:
            response = JsonResponse({'message': "Debes enviar un documento"})
            response.status_code = 400
            return response
        
        factures = self.get_queryset(document_client)
        
        if len(factures) > 0:

            response = JsonResponse({'data': factures})
            response.status_code = 200
            return response
        else:
            response = JsonResponse({
                'message': "Ups. No existen reportes con el client de documento: {}".format(document_client)
            })
            response.status_code = 400
            return response 
    
    def get_queryset(self, document_client):
        query = (
            FactureLine.objects
            .filter(
                client__num_doc = document_client
            )
            .annotate(
                name_client = Concat('client__first_name', V(' '), 'client__last_name'),
                document_client = F('client__num_doc'),
                name_product = F('product__name'),
                value_product = F('product__value'),
            )
        )

        # print(query.first().name_client)
        factures = []

        for q in query:
            facture_json = {
                "id": q.id,
                "document_client": q.document_client,
                "name_client": q.name_client,
                "name_product": q.name_product,
                "value_product": q.value_product,
                "balance": q.balance,
            }

            factures.append(facture_json)
        
        return factures