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
        $.post('php/obtenerMercaderiaClienteFechas.php', postData, function(response){
            const informe = JSON.parse(response);
            let template = '';
            var totalPorCliente = 0;
            informe.forEach(inf => {
            totalPorCliente += inf.total;
            template += `
                <tr>
                  <td>${inf.fecha}</td>
                  <td>${inf.numComprobante}</td>
                  <td>${inf.id}</td>
                  <td>${inf.cantidad}</td>
                  <td>${inf.descripcion}</td>
                  <td>${inf.precio}</td>
                  <td>${inf.total}</td>
                </tr>
                `});
            $('#mercaderiaCliente').html(template);
            $('#total').html(totalPorCliente);
        });

    })

function fetchMercaderiaCliente(){
        $.ajax({
        url: 'php/obtenerMercaderiaCliente.php',
        type: 'POST',
        data: {id},
        success: function(response) {
            const informe = JSON.parse(response);
            let template = '';
            var totalPorCliente = 0;
            informe.forEach(inf => {
            totalPorCliente += inf.total;
            template += `
            <tr>
                <td>${inf.fecha}</td>
                <td>${inf.numComprobante}</td>
                <td>${inf.id}</td>
                <td>${inf.cantidad}</td>
                <td>${inf.descripcion}</td>
                <td>${inf.precio}</td>
                <td>${inf.total}</td>
            </tr>
                `
        });
        $('#mercaderiaCliente').html(template);
        $('#total').html(totalPorCliente);
      }
    });
}

//busqueda de clientes
  $('#searchProductoCliente').keyup(function() {
    if($('#searchProductoCliente').val()) {
      let search = $('#searchProductoCliente').val();
      $.ajax({
        url: 'php/searchPersona.php',
        data: {search},
        type: 'POST',
        success: function (response) {
          if(!response.error) {
            let clientes = JSON.parse(response);
            let template = '';
            clientes.forEach(cliente => {
                template += `
                    <li clienteId=${cliente.id}>
                        <a href="#" class="cliente-search">
                        ${cliente.nombre} 
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
    if(!($('#searchProductoCliente').val())) {
        $('#resultadoSearch').hide();
    }
  });

  $(document).on('click', '.cliente-search', function() {
        let element = $(this)[0].parentElement;
        id = $(element).attr('clienteId');
        let elementTagName = element.getElementsByTagName("a");
        nombreCliente = elementTagName[0].textContent;
        $('#codCliente').html(id);
        $('#nomCliente').html(nombreCliente);
        fetchMercaderiaCliente();
      });   


});

