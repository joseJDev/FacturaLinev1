""" ClientsViews """
# Django
from django.views import View, generic
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.core import serializers

# Models 
from apps.factura.models import Client

# Forms
from apps.factura.forms import ClientForm

# Python
import json

class ClientListTemplate(generic.TemplateView):
    template_name = "clients/list_clients.html"


class ClientListView(View):
    
    def get(self, request, *args, **kwargs):
        query = Client.objects.all().order_by('-id')

        # Convert to json
        query_json = serializers.serialize('json', query)
        query_json = json.loads(query_json)

        response = JsonResponse({'data': query_json})
        response.status_code = 200
        
        return response

class ClientCreateView(View):
    template_name = "clients/create_client.html"
    model_class = Client
    form_class = ClientForm

    def get(self, request, *args, **kwargs):
        type_doc = self.model_class.TYPE_DOC
        return render(request, self.template_name, {'type_doc': type_doc})
    
    def post(self, request, *args, **kwargs):
        data = request.POST
        form = self.form_class(data)

        if form.is_valid():
            data = form.cleaned_data
            new_client = self.model_class.objects.create(**data)    
        else:
            errors = form.errors.as_json()
            errors = json.loads(errors)
            
            response = JsonResponse(errors)
            response.status_code = 400
            return response
        
        # Convertir query a JSON
        response = JsonResponse({"message": "Cliente agregado exitosamente."})
        response.status_code = 201
        return response


class ClientUpdateView(View):
    template_name = "clients/edit_client.html"
    form_class = ClientForm
    
    def get(self, request, *args, **kwargs):
        type_doc = Client.TYPE_DOC
        client = self.get_object(kwargs.get('pk'))
        data = {
            'client': client,
            'type_doc': type_doc
        }
        return render(request, self.template_name, data)
    
    
    def post(self, request, *args, **kwargs):
        client = self.get_object(kwargs.get('pk'))
        
        data = request.POST
        form = self.form_class(data)

        if form.is_valid():
            data = form.cleaned_data

            client.type_document = data.get('type_document')
            client.num_doc = data.get('num_doc')
            client.first_name = data.get('first_name')
            client.last_name = data.get('last_name')
            client.name_consultory = data.get('name_consultory')
            client.email = data.get('email')
            client.direction = data.get('direction')
            client.phone = data.get('phone')
            client.save()
        else:
            errors = form.errors.as_json()
            errors = json.loads(errors)
            
            response = JsonResponse(errors)
            response.status_code = 400
            return response

        # Convertir query a JSON
        response = JsonResponse({"message": "Cliente actualizado exitosamente."})
        response.status_code = 201
        return response

    def get_object(self, pk):
        return Client.objects.filter(id=pk).first()


class ClientDeleteView(View):
    template_name = "clients/delete_client.html"
    form_class = ClientForm

    def get(self, request, *args, **kwargs):
        client = self.get_object(kwargs.get('pk'))
        return render(request, self.template_name, {'client': client})

    def post(self, request, *args, **kwargs):
        client = self.get_object(kwargs.get('pk'))
        client.delete()
        response = JsonResponse({'message': 'Cliente Eliminado exitosamente'})
        response.status_code = 200
        return response
        
    def get_object(self, pk):
        return Client.objects.filter(id=pk).first()
