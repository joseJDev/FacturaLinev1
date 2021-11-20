from django.contrib import admin

# Models
from apps.factura.models import (
    Client, FactureLine, Product,
    QuotaFacture
)

admin.site.register(Client)
admin.site.register(FactureLine)
admin.site.register(Product)
admin.site.register(QuotaFacture)