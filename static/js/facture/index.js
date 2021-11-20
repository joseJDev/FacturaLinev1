$(document).ready(function (){
    $('.js-example-basic-single').select2({
        with: "50%"
    });
    
    viewButtons(false)

    listTableProducts();
    calculateTotal();
});


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

function viewButtons(view){
    if(view == true){
        $('.generate-facture').show();
    }else{
        $('.generate-facture').hide();
    }
}

function getStorage(){
    const productsArray = localStorage.getItem('products')
    
    if(productsArray){
        let newArray = JSON.parse(productsArray);
        return newArray
    }else{
        return []
    }
}

function addProduct(){
    //datos
    let nameProduct = $('#product option:selected').attr("nameP");
    let valueProduct = $('#product option:selected').attr("valueP");
    let amount = $('#amount').val()
    
    // Json
    let total = parseInt(valueProduct) * parseInt(amount);
    const productObj = {
        id: uuid.v4(), 
        nameProduct,
        valueProduct,
        amount,
        total
    }

    // Actualizar Storage
    const productsStorage = getStorage();

    let productsArray = [...productsStorage, productObj];
    
    // Actualizar Storage
    updateStorage(productsArray)

    // listar tabla
    listTableProducts()

    // Calcular valores
    calculateTotal()
    
    // Limpiar inputs
}

function updateStorage(data){
    // Conversion de array a string
    const jsonString = JSON.stringify(data);
        
    //Guardar localstorage
    localStorage.setItem("products", jsonString)
}

function listTableProducts(){
    $('#listProducts tbody').empty();

    const products = getStorage();
    products.forEach(product => {
        let row = '<tr>';
        row += '<td class="text-center">' + product.amount +'</td>'
        row += '<td class="text-center">' + product.nameProduct +'</td>'
        row += '<td class="text-center"> $' + numeral(product.valueProduct).format() +'</td>'
        row += '<td class="text-center"> $' + numeral(product.amount * product.valueProduct).format() +'</td>'
        row += 
            `<td class="text-center">
                <button class="btn" type="button"
                    onclick="deleteProduct('${product.id}')"
                >
                    <i
                        title="Eliminar Producto"
                        class="fas fa-times text-danger">
                    </i>
                </button>
            </td>`
        row += '</tr>'
        $('#listProducts tbody').append(row);
    });
}

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
    
    localStorage.setItem('totalProducts', stringTotal)
    
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

function deleteProduct(id){
    console.log("Entra")
    console.log(id)
    // Traer datos del Storage
    const products = getStorage();

    // Eliminar
    const result = products.filter( product => product.id != id );
    
    // Actualizar Storage
    updateStorage(result);

    // Listar productos
    listTableProducts();

    // Actualizar calculo
    calculateTotal();
}

$( "#payment" ).keyup(function() {
    let payment = parseInt($( "#payment" ).val());
    let totalProducts = parseInt(localStorage.getItem('totalProducts')); 
    let balance = totalProducts - payment
    let balanceString = balance.toString()
    let balanceStrFormat = numeral(balance).format()
    localStorage.setItem('totalBalance', balanceString)
    
    // Mostrar valor en el DOM
    $('#balance').empty();
    

    const spanText = $(`
        <span class="text-dark">
            <b>Total: </b>
        </span>
    `);

    const spanTotal = $(`
        <span class="text-secondary">
            <b>$${balanceStrFormat}</b>
        </span>
    `);

    $('#balance').append(spanText);
    $('#balance').append(spanTotal);
  });