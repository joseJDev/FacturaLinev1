/* Calculacio de valores */

function calculateTotal(){
    // Extraer productos del localstorage
    const products = getStorage();

    // Calculo total
    let total = 0;
    products.forEach(product => {
        total += product.total;
    });
    
    // Enviar al localStorage
    let stringTotal = total.toString();
    
    localStorage.setItem('totalProducts', stringTotal);
    localStorage.setItem('totalBalance', stringTotal);
    
    // Convertir a miles
    let totalString = numeral(total).format();    
    
    // Mostrar valor en el DOM
    $('#totalPayment').empty();

    const spanText = $(`
        <span class="text-dark">
            <b>Total: </b>
        </span>
    `);

    const spanTotal = $(`
        <span class="text-secondary">
            <b>$${totalString}</b>
        </span>
    `);
    
    $('#totalPayment').append(spanText);
    $('#totalPayment').append(spanTotal);
}

function calculateBalance(){
    /* Recoger valores de los 3 inputs */

    // Inicializar vairables
    let payment = 0;
    let discount = 0;
    let quotes = 0;

    // abono
    if(parseInt($( "#payment" ).val())){
        payment = parseInt($( "#payment" ).val());
    }

    // descuento
    if(parseInt($( "#discount" ).val())){
        discount = parseInt($( "#discount" ).val());
    }

    // Cuotas
    if(parseInt($( "#quote" ).val())){
        quotes = parseInt($( "#quote" ).val());
    }

    // Calucular balance en base a descuento y abono
    let totalProducts = parseInt(localStorage.getItem('totalProducts')); 
    let balance = (totalProducts - payment) - discount
    let balanceStrFormat = "";

    if(!balance){
        let balanceString = totalProducts.toString()
        balanceStrFormat = numeral(totalProducts).format()
        localStorage.setItem('totalBalance', balanceString)
    }else{
        let balanceString = balance.toString()
        balanceStrFormat = numeral(balance).format()
        localStorage.setItem('totalBalance', balanceString)
    }

    // Calculate Cuotas
    let valueCoutes = calculateQuote(quotes);

    // Mostrar balance en el DOM
    viewBalanceNew(balanceStrFormat);

    // Mostrar abono en el DOM
    viewPayment(payment.toString());

    // Mostrar descuento en el DOM
    viewDiscount(discount.toString());

    // Mostrar cuotas en el DOM
    viewValueQuote(valueCoutes.toString());

    // Mistrar numero cuota en el DOM
    viewQuote(quotes.toString());
}


function calculateQuote(quotes){
    let balance = localStorage.getItem('totalBalance')
    let valueCuotes = balance / quotes;
    if(quotes > 0){
        return valueCuotes;
    }else{
        return balance;
    }
}