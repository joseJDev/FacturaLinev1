/* Funciones que interactuan con Django */

function getInfoUser(){
    
    clearValuesInput()
    
    let value = $('#searchClient').val()
    $.ajax({
        data: {
            'csrfmiddlewaretoken': $("[name='csrfmiddlewaretoken']").val()
        },
        url: '/facture-get-client/?document='+value,
        type: 'GET',
        success: function (response){
            setValuesInput(response.data[0]);
            viewError("", false);
        },
        error: function(error){
            viewError(error.responseJSON['message'], true)
            // Limpiar los campos
            // Mostrar los errores en el modal
        }
    });
}

function generateQuotes(){
    // Traer productos 
    let products = getStorage();
    let productsArray = []
    
    products.forEach(product => {
        let json = {
            id: product.id_product,
            count: product.amount
        }
        productsArray.push(json)
    });

    const arrayString = JSON.stringify(productsArray)
    console.log(arrayString)
    console.log(typeof(arrayString))

    $.ajax({
        data: {
            'client': $('#idClient').val(),
            'product': `${arrayString}`,
            'quota': $('#quote').val(),
            'payment': $('#payment').val(),
            'discount': $('#discount').val(),
            'doc_patient': $('#docPatient').val(),
            'fullname_patient': $('#namePatient').val(),
            'csrfmiddlewaretoken': $("[name='csrfmiddlewaretoken']").val()
        },
        url: '/facture-gen-quotes/',
        type: 'POST',
        success: function (response){
            url = response['url'];
            let win =  window.open(url, '_blank');
            win.focus();
            clearValuesInput();
            clearStorage()
            listTableProducts();
            calculateTotal();
            clearElements();
        },
        error: function(error){
            viewError(error.responseJSON['message'], true)
            //Limpiar los campos
            //Mostrar los errores en el modal
        }
    });
}
function generateQuotesRec(){
    // Traer productos 
    let products = getStorage();
    let productsArray = []
    
    products.forEach(product => {
        let json = {
            id: product.id_product,
            count: product.amount
        }
        productsArray.push(json)
    });

    const arrayString = JSON.stringify(productsArray)
    console.log(arrayString)
    console.log(typeof(arrayString))

    $.ajax({
        data: {
            'client': $('#idClient').val(),
            'product': `${arrayString}`,
            'quota': $('#quote').val(),
            'payment': $('#payment').val(),
            'discount': $('#discount').val(),
            'doc_patient': $('#docPatient').val(),
            'fullname_patient': $('#namePatient').val(),
            'csrfmiddlewaretoken': $("[name='csrfmiddlewaretoken']").val()
        },
        url: '/facture-gen-quotes/',
        type: 'POST',
        success: function (response){
            url = response['url'];
            let win =  window.open(url, '_blank');
            win.focus();
            clearValuesInput();
            clearStorage()
            listTableProducts();
            calculateTotal();
            clearElements();
        },
        error: function(error){
            viewError(error.responseJSON['message'], true)
            //Limpiar los campos
            //Mostrar los errores en el modal
        }
    });
}