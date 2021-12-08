/* Funciones Ajax */


function createPayment(){
    $.ajax({
        data: $('#formPayment').serialize(),
        url: '/financial-box-create/',
        type: 'POST',
        success: function (response){
            url = response['url_financial'];
            let win =  window.open(url, '_blank');
            win.focus();
        },
        error: function(error){            
            // Mostrar los errores en el modal
            viewErrors(error.responseJSON);
            disableButton();
        }
    });
}
