/* Alertas SweetAlert2 */

function alertPayment(urlPayment){
    Swal.fire({
        title: '¿Quieres pasar al módulo de caja?',
        text: "Serás redireccionado...",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí'
      }).then((result) => {
        if (result.isConfirmed) {
            window.open(urlPayment, '_blank');
        }
      })
}