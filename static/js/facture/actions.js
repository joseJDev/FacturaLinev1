/* Acciones guardar y eliminar productos */

/* Agregar producto */
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

/* Listar productos */
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

/* Eliminar productos del Storage */
function deleteProduct(id){
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
