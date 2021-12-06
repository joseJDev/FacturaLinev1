/* Eventis de los elementos del DOM */
/* Evento cuando escriben en input */
$( "#payment" ).keyup(function() {
    calculateBalance();
    viewButtons();
  });


/* Evento cuando se escribe en descuento */

$('#discount').keyup(function(){
    calculateBalance();
    viewButtons();
});

$('#quote').change(function(){
    calculateBalance();
    viewButtons();
});

