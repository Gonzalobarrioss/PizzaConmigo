$(document).ready(function(){
    let id;
    $('#resultadoSearch').hide();
    //defino las variables
    var fechaDesde = document.getElementById('fechaDesde'),
    fechaHasta = document.getElementById('fechaHasta'),
    search = document.getElementById('search');

    search.addEventListener('click', function(e){
        const postData = {
            fechaDesde: fechaDesde.value,
            fechaHasta: fechaHasta.value,
            id: id
        }
        $.post('php/obtenerStockDetallado.php', postData, function(response){
            const stocks = JSON.parse(response);
            let template = '';
            var totalEntrada = 0;
            let totalSalida = 0;
            let totalStock = 0;
            stocks.forEach(stock => {
            totalEntrada += parseFloat(stock.entrada);
            totalSalida += parseFloat(stock.salida);
            if (stock.tipo == 2) stock.stock = (stock.stock).toFixed(3)
            template += `
                <tr>
                    <td>${stock.fecha}</td>
                    <td>${stock.numComprobante}</td>
                    <td>${stock.descripcion}</td>
                    <td>${stock.entrada}</td>
                    <td>${stock.salida}</td>
                    <td>${stock.stock} </td>
                </tr>
                `});
            totalStock = totalEntrada - totalSalida
            $('#stockDetallado').html(template);
            $('#entrada').html(totalEntrada);
            $('#salida').html(totalSalida);
            $('#stock').html(totalStock);
        });

    })



//busqueda de clientes
  $('#searchProductoStock').keyup(function() {
    if($('#searchProductoStock').val()) {
      let search = $('#searchProductoStock').val();
      $.ajax({
        url: 'php/searchProductoStockDetallado.php',
        data: {search},
        type: 'POST',
        success: function (response) {
          if(!response.error) {
            let productos = JSON.parse(response);
            let template = '';
            productos.forEach(producto => {
                template += `
                    <li productoId=${producto.id}>
                        <a href="#" class="prod-search">
                        ${producto.descripcion} 
                        </a>
                    </li>
                ` 
            }); 
            $('#resultadoSearch').html(template);
            $('#resultadoSearch').show();
                       
          }
          
        } 
      })
    }
    if(!($('#searchProductoStock').val())) {
        $('#resultadoSearch').hide();
    }
  });

  $(document).on('click', '.prod-search', function() {
        let element = $(this)[0].parentElement;
        id = $(element).attr('productoId');
        console.log(id);
        $('#codProducto').html(id);
      });   


});

