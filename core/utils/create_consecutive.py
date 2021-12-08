""" Funcion para generar consecutivos de la factura """

# Models 
from apps.factura.models import FactureLine


def create_consective(model) -> int:
    count = model.objects.all().count()
    return count + 1