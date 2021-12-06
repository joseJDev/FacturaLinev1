""" Funcion para generar consecutivos de la factura """

# Models 
from apps.factura.models import FactureLine


def create_consective():
    factures = FactureLine.objects.all().count()
    return factures + 1