/* STORAGE */
function updateStorage(data){
    // Conversion de array a string
    const jsonString = JSON.stringify(data);
        
    //Guardar localstorage
    localStorage.setItem("products", jsonString)
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