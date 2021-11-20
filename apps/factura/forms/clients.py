""" FormClients """

# Django
from django import forms
from django.core import validators

# Models 
from apps.factura.models import Client

class ClientForm(forms.ModelForm):
    phone = forms.CharField(
        validators=[
            validators.RegexValidator(
                '/^([0-9])*$/',
                message="El numero de telefono no es valido"
            )
        ]
    )
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
