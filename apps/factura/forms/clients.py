""" FormClients """

# Django
from django import forms

# Models 
from apps.factura.models import Client

class ClientForm(forms.ModelForm):
    class Meta:
        model = Client
        exclude = '__all__' 
    
    def validate_num_doc(self, data):
        exist_client = Client.objects.filter(
            num_doc = data,
            type_document=self.data.get('type_document')
        )

        if exist_client.exists():
            raise forms.ValidationError(
                'Ya existe un cliente con este tipo y N° de documento'
            )
        else:
            return data