""" Funcion que crear las cuotas de un credito """

# Models
from apps.factura.models import QuotaFacture


def generate_facture_quotes(facture):
    print('Entra')
    # Borrar cuotas existentes 
    exist_quotes = QuotaFacture.objects.filter(
        facture__id = facture.id
    )
    print(exist_quotes)
    exist_quotes.delete()

    # Valor del producto
    product_value = facture.product.value
    iva = product_value * 0.19
    subtotal = product_value - iva
    
    # ABONO CLIENTE
    payment = facture.payment

    # TOTAL CREDITO
    total_credit = facture.balance

    # Cuaotas PAGO
    quotes = facture.quota

    # Valor Cuota
    value_quote = total_credit / quotes

    # Balance
    balance = facture.balance

    for i in range(1, quotes + 1):
        # Restar balance en base a la cuota
        balance = balance - value_quote
        
        new_cuote = QuotaFacture.objects.create(
            num_quota = i,
            value     = value_quote,
            balance   = balance,
            facture   = facture,
            iva       = iva,
            subtotal  = subtotal
        )
    
    final_quotes = QuotaFacture.objects.filter(facture__id = facture.id)
    
    return final_quotes
