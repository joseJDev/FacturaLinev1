function listReport(data){
    if(data.length > 0){
        for (let i = 0; i < data.length; i++) {
            let row = '<tr>';
            row += '<td>' + data[i]['id'] +'</td>'
            row += '<td>' + data[i]['document_client'] +'</td>'
            row += '<td>' + data[i]['name_client'] +'</td>'
            row += '<td>' + data[i]['name_product'] +'</td>'
            row += '<td>' + data[i]['value_product'] +'</td>'
            row += '<td>' + data[i]['balance'] +'</td>'
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