/* Funciones que modifican el DOM */

function setValuesInput(data){
    $('#idClient').val(data['pk']);
    $('#typeDoc').val(data['fields']['type_document']);
    $('#completeName').val(data['fields']['first_name']);
    $('#nameConsultory').val(data['fields']['name_consultory']);
    $('#email').val(data['fields']['email']);
    $('#phone').val(data['fields']['phone']);
    $('#addres').val(data['fields']['direction']);
}

function clearValuesInput(){
    $('#typeDoc').val("");
    $('#completeName').val("");
    $('#nameConsultory').val("");
    $('#email').val("");
    $('#phone').val("");    
    $('#addres').val("");
    $('#idClient').val("");
    $('#product').val(null).trigger('change');
    $('#quote').val(null).trigger('change');
    $('#payment').val("");
    $('#discount').val("");
}

function viewError(message, view){
    $('#errorClient p').remove();
    viewButtons(false)
    if(view == true){
        let element = `
            <p class="text-danger mt-2 text-center">${message}</p>
        `
        $('#errorClient').append(element);
        viewButtons(false)
    }else{
        viewButtons(true)
        $('#errorClient p').remove();
    }
}

function viewButtons(){
    // Selects llenos
    let payment = $( "#payment" ).val();
    let discount = $( "#discount" ).val();
    let quotes = $( "#quote" ).val();

    if(payment && discount && quotes){
        $('.generate-facture').show();
        $('.info-patient').show();
    }else{
        $('.generate-facture').hide();
        $('.info-patient').hide();
    }
}

function viewBalanceNew(balanceStr){
    // Mostrar valor en el DOM
    $('#balance').empty();

    const spanText = $(`
        <span class="text-dark">
            <b>Total: </b>
        </span>
    `);

    const spanTotal = $(`
        <span class="text-secondary">
            <b>$${balanceStr}</b>
        </span>
    `);

    $('#balance').append(spanText);
    $('#balance').append(spanTotal);
}

function viewPayment(paymentStr){
    paymentStr = numeral(paymentStr).format();
    
    $('#paymentText').empty();

    const spanText = $(`
        <span class="text-dark">
            <b>Abono: </b>
        </span>
    `);

    const spanTotal = $(`
        <span class="text-secondary">
            <b>$${paymentStr}</b>
        </span>
    `);

    $('#paymentText').append(spanText);
    $('#paymentText').append(spanTotal);
}

function viewDiscount(discountStr){
    discountStr = numeral(discountStr).format();
    
    $('#discountText').empty();

    const spanText = $(`
        <span class="text-dark">
            <b>Descuento: </b>
        </span>
    `);

    const spanTotal = $(`
        <span class="text-secondary">
            <b>$${discountStr}</b>
        </span>
    `);

    $('#discountText').append(spanText);
    $('#discountText').append(spanTotal);
}

function viewValueQuote(quoteStr){
    quoteStr = numeral(quoteStr).format();
    
    $('#quoteValueText').empty();

    const spanText = $(`
        <span class="text-dark">
            <b>Valor Cuota: </b>
        </span>
    `);

    const spanTotal = $(`
        <span class="text-secondary">
            <b>$${quoteStr}</b>
        </span>
    `);

    $('#quoteValueText').append(spanText);
    $('#quoteValueText').append(spanTotal);
}

function viewQuote(quoteStr){
    
    $('#quoteText').empty();
    
    const spanText = $(`
        <span class="text-dark">
        <b>N° Cuota: </b>
        </span>
        `);
        
    const spanTotal = $(`
    <span class="text-secondary">
    <b>${quoteStr}</b>
    </span>
    `);

    $('#quoteText').append(spanText);
    $('#quoteText').append(spanTotal);
}

function clearElements(){
    $('#balance').empty();
    $('#quoteValueText').empty();
    $('#paymentText').empty();
    $('#discountText').empty();
    $('#quoteText').empty();
}