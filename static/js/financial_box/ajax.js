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


function reportBox(){
    console.log($('#first_date').val())
    console.log($('#last_date').val())
    $.ajax({
        data: {
            first_date: $('#first_date').val(),
            last_date: $('#last_date').val()
        },
        url: '/get-report-box/',
        type: 'GET',
        success: function (response){
            console.log(response)
            listTableReport(response.data);
            viewTotalValue(response.total);
        },
        error: function(error){
            console.log(error)
        }
    }); 
}
