function openDetailClient(url){
    console.log('ISASAS')
    $('#detailFacture').load(url,function(){
        $(this).modal('show'); 
    });

}

function closeDetailFacture(){
    $('#detailFacture').modal('hide');
}

function listReport(data){
    if(data.length > 0){
        for (let i = 0; i < data.length; i++) {
            let row = '<tr>';
            row += '<td>' + data[i]['id'] +'</td>'
            row += '<td>' + data[i]['document_client'] +'</td>'
            row += '<td>' + data[i]['name_client'] +'</td>'
            row += '<td>' + data[i]['doc_patient'] +'</td>'
            row += '<td>' + data[i]['name_patient'] +'</td>'
            row += '<td> $' + numeral(data[i]['value_product']).format() +'</td>'
            row += '<td> $' + numeral(data[i]['balance']).format() +'</td>'
            row += 
                `<td>
                    <button class="btn btn-primary btn-sm text-center"
                        onclick="openDetailClient('/detail-facture/${data[i]['id']}')"
                    >
                        <i class="fas fa-eye"></i>
                    </button>
                </td>`
            row += '</tr>'
            $('#reportTable tbody').append(row);
        }
    }
}


function getReport(){
    let value = $('#searchReport').val()
    console.log($('#searchReport').val())
    console.log(value)
    $.ajax({
        url: '/get-report/?document='+value,
        type: 'GET',
        success: function (response){
            $('#reportTable tbody tr').remove()
            listReport(response.data)
            $('.btn-pdf').show();
        },
        error: function(error){
            
        }
    });
}

function clearValuesInput(){
    $('#searchReport').val("");
}

$(document).ready(function (){
    $('.btn-pdf').hide();
});