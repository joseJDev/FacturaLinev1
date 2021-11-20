# Django
from django.db import models

# Core
from core.base_model import FacturaModel

class Client(FacturaModel):

    TYPE_DOC = (
        ("CC", "Cédula de Ciudadanía"),
        ("TI", "Tarjeta de Identidad"),
        ("CE", "Cédula De Extranjería"),
        ("PS", "Pasaporte")
    )

    type_document   = models.CharField(max_length=20, 
                                    choices=TYPE_DOC)
    num_doc         = models.CharField(max_length=20)
    first_name      = models.CharField(max_length=150)
    last_name       = models.CharField(max_length=150)
    email           = models.EmailField(max_length=150)
    direction       = models.CharField(max_length=150)
    phone           = models.CharField(max_length=150, null=True)
    name_consultory = models.CharField(max_length=150, null=True)

    class Meta:
        db_table            = 'client'
        verbose_name        = 'Cliente'
        verbose_name_plural = 'Clientes'
    

    def __str__(self) -> str:
        return "{} {} - {}".format(
            self.first_name,
            self.last_name,
            self.email
        )