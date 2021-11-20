// Modales
function openCreateProduct(url){
    $('#createProduct').load(url,function(){
        $(this).modal('show'); 
    });
}

function openEditProduct(url){
    $('#editProduct').load(url,function(){
        $(this).modal('show'); 
    });
}

function openDeleteProduct(url){
    $('#deleteProduct').load(url,function(){
        $(this).modal('show'); 
    });
}

function closeModalCreate(){
    $('#createProduct').modal('hide');
}
function closeModalEdit(){
    $('#editProduct').modal('hide');
}
function closeModalDelete(){
    $('#deleteProduct').modal('hide');
}


function listProducts(){
    console.log('Ready')
    $.ajax({
        url: '/product-list/',
        type: 'GET',
        success: function (response){
            $('#productTable tbody').html("");
            if(response.data.length > 0 ){
                $('#messageError').append("");
                for (let i = 0; i < response.data.length; i++) {
                    let row = '<tr>';
                    row += '<td>' + response.data[i]['pk'] +'</td>'
                    row += '<td>' + response.data[i]['fields']['code'] + '</td>'
                    row += '<td>' + response.data[i]['fields']['name'] +'</td>'
                    row += '<td>'+ response.data[i]['fields']['value']+ '</td>'
                    row += '<td>'+ response.data[i]['fields']['description']+ '</td>'
                    row += 
                        '<td>'+
                        `<button 
                            class="btn btn-primary btn-sm"
                            onclick="openEditProduct('/product-edit/${response.data[i]['pk']}')"
                        >
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                            
                        <button 
                            class="btn btn-danger btn-sm"
                            onclick="openDeleteProduct('/product-delete/${response.data[i]['pk']}')"
                        >
                            <i class="far fa-times-circle"></i>
                        </button>`
                        '</td>'
                    
                    row += '</tr>'
                    $('#productTable tbody').append(row);
                }
            }else{
                $('#productTable').remove();
                $('#messageError').append("NO HAY DATOS");
            }
            
        }, 
        error: function (error){
            console.log(error)
        }
    });
}


function createProduct(){
    $.ajax({
        data: $('#formProduct').serialize(),
        url: '/product-create/',
        type: 'POST',
        success: function (response){
            closeModalCreate();
            listProducts();
            notification(response.message, 'success');
        },
        error: function(error){
            console.log(error)
            // Verificar validaciones
            // Mostrar los errores en el modal
        }
    });
}

function editProduct(pk){
    $.ajax({
        data: $('#formProduct').serialize(),
        url: '/product-edit/'+pk,
        type: 'POST',
        success: function (response){
            closeModalEdit();
            listProducts();
            notification(response.message, 'success');
        },
        error: function(error){
            console.log(error)
            // Verificar validaciones
            // Mostrar los errores en el modal
        }
    });
}

function deleteProduct(pk){
    $.ajax({
        data: {
            'csrfmiddlewaretoken': $("[name='csrfmiddlewaretoken']").val()
        },
        url: '/product-delete/'+pk,
        type: 'POST',
        success: function (response){
            closeModalDelete();
            listProducts();
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
    listProducts();
});