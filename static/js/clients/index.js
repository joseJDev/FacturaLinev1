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
            console.log(error)
            // Verificar validaciones
            // Mostrar los errores en el modal
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
            console.log(error)
            // Verificar validaciones
            // Mostrar los errores en el modal
        }
    });
}


$(document).ready(function (){
    listClients();
});

