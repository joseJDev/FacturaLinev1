function listTableReport(data){
    if(data.length > 0){
        for (let i = 0; i < data.length; i++) {
            let row = '<tr>';
            row += '<td>' + data[i]['id'] +'</td>'
            row += '<td>' + data[i]['client_fullname'] +'</td>'
            row += '<td>' + data[i]['consultory'] +'</td>'
            row += '<td>' + data[i]['date'] +'</td>'
            row += '<td>' + data[i]['value'] +'</td>'
            row += '</tr>'
            $('#reportTable tbody').append(row);
        }
    }
}

function viewTotalValue(data){
    console.log(data)
    const spanTotal = $(`
        <h4 class="text-secondary">
            <b>$${data}</b>
        </h4>
    `);

    $('#totalValue').append(spanTotal);
}