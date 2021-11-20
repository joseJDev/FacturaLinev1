# TOTAL DEL PRODUCTO
total = 5000000
iva = total * 0.19
subtotal = total - iva

# ABONO DEL CLIENTE
abono = 1000000

# TOTAL DEL CREDITO
total_credito = total - abono

# CUTOAS DE PAGO
cuotas = 24

# VALOR DE LA CUOTA
valor_cuota = total_credito / cuotas

balance = total_credito


for i in range(1, cuotas + 1):
    print('N Cuota::', i)
    print('Valor Cuota: $',round(valor_cuota))
    
    balance = balance - valor_cuota
    print('Saldo: $',round(balance))    
    print('IVA: $',iva)
    print('Subtotal: $', subtotal)
    print('Total: $', total)
    print('---------------------------------')
