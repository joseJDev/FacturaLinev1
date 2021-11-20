// Modales
function openCreateClient(url){
    $('#createClient').load(url,function(){
        $(this).modal('show'); 
    });
}

function openEditClient(url){
    $('#editClient').load(url,function(){
        $(this).modal('show'); 
    });
}

function openDeleteClient(url){
    $('#deleteClient').load(url,function(){
        $(this).modal('show'); 
    });
}

function closeModalCreate(){
    $('#createClient').modal('hide');
}
function closeModalEdit(){
    $('#editClient').modal('hide');
}
function closeModalDelete(){
    $('#deleteClient').modal('hide');
}

// METODOS
function listClients(){
    $.ajax({
        url: '/client-list/',
        type: 'GET',
        success: function (response){
            $('#clientTable tbody').html("");
            if(response.data.length > 0 ){
                $('#messageError').append("");
                for (let i = 0; i < response.data.length; i++) {
                    let row = '<tr>';
                    row += '<td>' + response.data[i]['pk'] +'</td>'
                    row += '<td>' + response.data[i]['fields']['type_document'] + '</td>'
                    row += '<td>' + response.data[i]['fields']['num_doc'] +'</td>'
                    row += 
                        '<td>' +
                            response.data[i]['fields']['first_name'] +
                            ' ' +
                            response.data[i]['fields']['last_name'] +
                        '</td>'
                    
                    row += '<td>'+ response.data[i]['fields']['name_consultory']+ '</td>'
                    row += '<td>'+ response.data[i]['fields']['email']+ '</td>'
                    row += '<td>'+ response.data[i]['fields']['direction']+ '</td>'
                    row += '<td>'+ response.data[i]['fields']['phone']+ '</td>'
                    row += 
                        '<td>'+
                        `<button 
                            class="btn btn-primary btn-sm"
                            onclick="openEditClient('/client-update/${response.data[i]['pk']}')"
                        >
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                            
                        <button 
                            class="btn btn-danger btn-sm"
                            onclick="openDeleteClient('/client-delete/${response.data[i]['pk']}')"
                        >
                            <i class="far fa-times-circle"></i>
                        </button>`
                        '</td>'
                    
                    row += '</tr>'
                    $('#clientTable tbody').append(row);
                }
            }else{
                $('#clientTable').remove();
                $('#messageError').append("NO HAY DATOS");
            }
            
        }, 
        error: function (error){
            console.log(error)
        }
    });
}

function createClient(){
    $.ajax({
        data: $('#formClient').serialize(),
        url: '/client-create/',
        type: 'POST',
        success: function (response){
            closeModalCreate();
            listClients();
            notification(response.message, 'success');
        },
        error: function(error){            
            // Mostrar los errores en el modal
            viewErrors(error.responseJSON);
            disableButton();
        }
    });
}

function updateClient(pk){
    $.ajax({
        data: $('#formClient').serialize(),
        url: '/client-update/'+pk,
        type: 'POST',
        success: function (response){
            closeModalEdit();
            listClients();
            notification(response.message, 'success');
        },
        error: function(error){
            console.log(error)
            // Verificar validaciones
            // Mostrar los errores en el modal
        }
    });
}
function deleteClient(pk){
    $.ajax({
        data: {
            'csrfmiddlewaretoken': $("[name='csrfmiddlewaretoken']").val()
        },
        url: '/client-delete/'+pk,
        type: 'POST',
        success: function (response){
            closeModalDelete();
            listClients();
            notification(response.message, 'success');
        },
        error: function(error){
            let errorResponse = error.responseJSON
            
        }
    });
}


$(document).ready(function (){
    listClients();
});

function viewErrors(errors){
    console.log(errors)
    if(errors.type_document){
        $('div.error-type-doc').empty();

        errors.type_document.forEach(error => {
            let p = `<span class="text-danger ">${error.message}</span>`
            $('div.error-type-doc').append(p);
        });
    }
    
    if(errors.num_doc){
        $('div.error-doc').empty();

        errors.num_doc.forEach(error => {
            let p = `<span class="text-danger ">${error.message}</span>`
            $('div.error-doc').append(p);
        });
    }
    
    if(errors.first_name){
        $('div.error-name').empty();

        errors.first_name.forEach(error => {
            let p = `<span class="text-danger ">${error.message}</span>`
            $('div.error-name').append(p);
        });
    }
    
    if(errors.last_name){
        $('div.error-last-name').empty();

        errors.last_name.forEach(error => {
            let p = `<span class="text-danger ">${error.message}</span>`
            $('div.error-last-name').append(p);
        });
    }
    
    if(errors.name_consultory){
        $('div.error-name-consultory').empty();

        errors.name_consultory.forEach(error => {
            let p = `<span class="text-danger ">${error.message}</span>`
            $('div.error-name-consultory').append(p);
        });
    }
    
    if(errors.email){
        $('div.error-email').empty();

        errors.email.forEach(error => {
            let p = `<span class="text-danger ">${error.message}</span>`
            $('div.error-email').append(p);
        });
    }
    
    if(errors.phone){
        $('div.error-phone').empty();

        errors.phone.forEach(error => {
            let p = `<span class="text-danger ">${error.message}</span>`
            $('div.error-phone').append(p);
        });
    }
    
    if(errors.direction){
        $('div.error-addres').empty();

        errors.direction.forEach(error => {
            let p = `<span class="text-danger ">${error.message}</span>`
            $('div.error-addres').append(p);
        });
    }
}

function disableButton(){
    $(".save-client").prop('disabled', true);

    setTimeout(() => {
        $(".save-client").prop('disabled', false);
    }, 5000);
}