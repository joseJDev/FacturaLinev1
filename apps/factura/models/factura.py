# Django
from django.db import models

# Core
from core.base_model import FacturaModel

# Models
from apps.factura.models import Client, Product

class FactureLine(FacturaModel):
    quota = models.IntegerField(help_text='Cuotas en meses')
    
    client = models.ForeignKey(
        Client,
        related_name='facture_client', 
        on_delete=models.DO_NOTHING
    )

    payment          = models.IntegerField(null=True, blank=True)
    balance          = models.IntegerField(null=True, blank=True)
    value_quote      = models.IntegerField(null=True, blank=True)
    total_payment    = models.IntegerField(null=True, blank=True)
    interest         = models.IntegerField(null=True, blank=True)
    discount         = models.IntegerField(null=True, blank=True)

    # Campos paciente
    doc_patient      = models.CharField(max_length=12, null=True, blank=True)
    fullname_patient = models.CharField(max_length=150, null=True, blank=True)

    class Meta:
        db_table = 'facture_line'
        verbose_name = 'Factura'
        verbose_name_plural = 'Facturas'
    

    def __str__(self) -> str:
        return '{} - {}'.format(
            self.client.first_name,
            self.balance
        )


class QuotaFacture(FacturaModel):
    num_quota = models.IntegerField()
    value     = models.IntegerField()
    balance   = models.IntegerField()
    facture   = models.ForeignKey(
        FactureLine,
        related_name='quote_facture',
        on_delete=models.DO_NOTHING
    )
    iva = models.IntegerField(null=True, blank=True)
    subtotal = models.IntegerField(null=True, blank=True)

    class Meta:
        db_table            = 'quota_facture'
        verbose_name        = 'Cuotas de Factura'
        verbose_name_plural = 'Cuotas de Facturas'
    
    def __str__(self) -> str:
        return '{} - {} - {}'.format(
            self.num_quota,
            self.value,
            self.balance
        )


class ProductsFacture(FacturaModel):
    """ Productos adquiridos en una factura """
    num_products = models.IntegerField(default=1)
    
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    facture = models.ForeignKey(
        FactureLine,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )


    class Meta:
        db_table            = 'products_facture'
        verbose_name        = 'Productos Factura'
        verbose_name_plural = 'Productos Facturas'
    
    def __str__(self) -> str:
        return "{} - {}".format(
            self.product,
            self.facture
        )
