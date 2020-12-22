$(document).ready(function(){
    let id;
    $('#resultadoSearch').hide();
    //defino las variables

function fetchProductoVenta(){
        $.ajax({
        url: 'php/obtenerProductosVendidos.php',
        type: 'POST',
        data: {id},
        success: function(response) {
            const informe = JSON.parse(response);
            let template = '';
            var totalProductoVendido = 0;
            informe.forEach(inf => {
            totalProductoVendido += inf.importe;
            template += `
            <tr>
                <td>${inf.fecha}</td>
                <td>${inf.nombre}</td>
                <td>${inf.cantidad}</td>
                <td>${inf.importe}</td>
            </tr>
                `
        });
        $('#resumenProductoVenta').html(template);
        $('#total').html(totalProductoVendido);
      }
    });
}

//busqueda de clientes
  $('#searchProducto').keyup(function() {
    if($('#searchProducto').val()) {
      let search = $('#searchProducto').val();
      $.ajax({
        url: 'php/searchProducto.php',
        data: {search},
        type: 'POST',
        success: function (response) {
          if(!response.error) {
            let productos = JSON.parse(response);
            let template = '';
            productos.forEach(producto => {
                template += `
                    <li productoId=${producto.id}>
                        <a href="#" class="producto-search">
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
    if(!($('#searchProducto').val())) {
        $('#resultadoSearch').hide();
    }
  });

  $(document).on('click', '.producto-search', function() {
        let element = $(this)[0].parentElement;
        id = $(element).attr('productoId');
        let elementTagName = element.getElementsByTagName("a");
        nombreProducto = elementTagName[0].textContent;
        $('#codProd').html(id);
        $('#nomProd').html(nombreProducto);
        fetchProductoVenta();
      });   


});