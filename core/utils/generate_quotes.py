""" Funcion que crear las cuotas de un credito """

# Models
from apps.factura.models import QuotaFacture


def generate_facture_quotes(facture, list_products):
    # Borrar cuotas existentes 
    exist_quotes = QuotaFacture.objects.filter(
        facture__id = facture.id
    )
    
    exist_quotes.delete()
    
    # Valor del producto
    product_value = 0
    
    for product in list_products:
        product_value += int(product.num_products) * int(product.product.value)

    print('VALOR P: ', product_value)

    # ABONO CLIENTE
    payment = facture.payment

    # DESCUENTO
    discount = facture.discount

    # CALCULAR BALANCE
    balance = (product_value - payment) - discount

    print('BALANCE: ', balance)

    # TOTAL CREDITO
    total_credit = balance

    # Cuaotas PAGO
    quotes = facture.quota

    # Valor Cuota
    value_quote = round(total_credit / quotes)

    print('VALOR CUATOAS ', value_quote)

    # Balance
    balanceFacture = balance

    for i in range(1, quotes + 1):
        # Restar balance en base a la cuota
        balanceFacture = balanceFacture - value_quote
        
        new_cuote = QuotaFacture.objects.create(
            num_quota = i,
            value     = value_quote,
            balance   = balanceFacture,
            facture   = facture
        )
    
    # Actualizar info factura
    facture.balance       = balance
    facture.total_payment = product_value
    facture.value_quote   = value_quote
    facture.save()

    final_quotes = QuotaFacture.objects.filter(facture__id = facture.id)

    return final_quotes
