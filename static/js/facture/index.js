$(document).ready(function (){
    $('.js-example-basic-single').select2({
        with: "50%"
    });
    
    viewButtons(false)

    listTableProducts();
    calculateTotal();
});
