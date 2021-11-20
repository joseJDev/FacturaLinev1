""" ProductsViews """
# Django
from django.views import View, generic
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.core import serializers

# Models 
from apps.factura.models import Product

# Forms
from apps.factura.forms import ProductForm

# Python
import json

class ProductListTemplate(generic.TemplateView):
    template_name = "products/list_products.html"

class ProductListView(View):
    
    def get(self, request, *args, **kwargs):
        query = Product.objects.all().order_by('-id')

        # Convert to json
        query_json = serializers.serialize('json', query)
        query_json = json.loads(query_json)

        response = JsonResponse({'data': query_json})
        response.status_code = 200
        
        return response


class ProductCreateView(View):
    template_name = "products/create_product.html"
    model_class = Product
    form_class = ProductForm

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)
    
    def post(self, request, *args, **kwargs):
        data = request.POST
        form = self.form_class(data)

        if form.is_valid():
            data = form.cleaned_data
            new_product = self.model_class.objects.create(**data)    
        else:
            errors = form.errors.as_json()
            errors = json.loads(errors)
            
            response = JsonResponse(errors)
            response.status_code = 400
            return response
        
        # Convertir query a JSON
        response = JsonResponse({"message": "Producto agregado exitosamente."})
        response.status_code = 201
        return response


class ProductUpdateView(View):
    template_name = "products/edit_product.html"
    form_class = ProductForm
    
    def get(self, request, *args, **kwargs):
        product = self.get_object(kwargs.get('pk'))
        data = {
            'product': product
        }
        return render(request, self.template_name, data)
    
    
    def post(self, request, *args, **kwargs):
        product = self.get_object(kwargs.get('pk'))
        
        data = request.POST
        form = self.form_class(data)

        if form.is_valid():
            data = form.cleaned_data

            product.name = data.get('name')
            product.value = data.get('value')
            product.description = data.get('description')
            product.save()
        else:
            errors = form.errors.as_json()
            errors = json.loads(errors)
            
            response = JsonResponse(errors)
            response.status_code = 400
            return response

        # Convertir query a JSON
        response = JsonResponse({"message": "Producto actualizado exitosamente."})
        response.status_code = 201
        return response

    def get_object(self, pk):
        return Product.objects.filter(id=pk).first()


class ProductDeleteView(View):
    template_name = "products/delete_product.html"
    form_class = ProductForm

    def get(self, request, *args, **kwargs):
        product = self.get_object(kwargs.get('pk'))
        return render(request, self.template_name, {'product': product})

    def post(self, request, *args, **kwargs):
        product = self.get_object(kwargs.get('pk'))
        product.delete()
        response = JsonResponse({'message': 'Producto Eliminado exitosamente'})
        response.status_code = 200
        return response
        
    def get_object(self, pk):
        return Product.objects.filter(id=pk).first()