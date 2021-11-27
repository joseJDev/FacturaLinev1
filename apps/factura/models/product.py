# Django
from django.db import models

# Core
from core.base_model import FacturaModel

class Product(FacturaModel):
    code = models.CharField(max_length=10, null=True, blank=True)
    name = models.CharField(max_length=150)
    description = models.TextField(null=True, blank=True)
    value = models.IntegerField()

    class Meta:
        db_table = 'product'
        verbose_name = 'Productos'
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'

    def __str__(self) -> str:
        return "{} - {} - {}".format(
            self.name,
            self.code,
            self.value
        )
    

    def save(self, *args, **kwargs):
        count = Product.objects.all().count() + 1
        name_product = self.name[0:2].upper()
        self.code = "{}{}".format(name_product, count)
        super(Product, self).save(*args, **kwargs)