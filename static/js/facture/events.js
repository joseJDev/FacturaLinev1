/* Eventis de los elementos del DOM */
/* Evento cuando escriben en input */
$( "#payment" ).keyup(function() {
    calculateBalance()
  });


/* Evento cuando se escribe en descuento */

$('#discount').keyup(function(){
    calculateBalance();
});

$('#quote').change(function(){
    calculateBalance();
});

