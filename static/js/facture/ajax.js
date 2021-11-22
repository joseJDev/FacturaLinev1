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
    $.ajax({
        data: {
            'client': $('#idClient').val(),
            'product': $('#product').val(),
            'quota': $('#quote').val(),
            'payment': $('#payment').val(),
            'discount': $('#discount').val(),
            'csrfmiddlewaretoken': $("[name='csrfmiddlewaretoken']").val()
        },
        url: '/facture-gen-quotes/',
        type: 'POST',
        success: function (response){
            url = response['url'];
            let win =  window.open(url, '_blank');
            win.focus();

            // Limpiar inputs
            clearValuesInput();
        },
        error: function(error){
            viewError(error.responseJSON['message'], true)
            // Limpiar los campos
            // Mostrar los errores en el modal
        }
    });
}