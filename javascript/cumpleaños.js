$(document).ready(function(){
    $('#tabla-productos').hide();
    $('#total').hide();
    $('#productoPreferido').hide()
    // llamo a la funcion mostrar clientes
    fetchCumpleDeHoy();
    //defino variables para editar luego
    var id = 0;
    //defino las variables
    var 
    //btnCumplesDeLaSemana = document.getElementById('cumplenEstaSemana'),
    btnMostrarCumplesDelMes = document.getElementById('cumplenEsteMes'),
    btnMostrarCumplesDeHoy = document.getElementById('cumplenHoy');
    
    btnMostrarCumplesDelMes.addEventListener('click', function(e){
        e.preventDefault();
        fetchCumpleDelMes();
    })

    btnMostrarCumplesDeHoy.addEventListener('click', function(e){
        e.preventDefault();
        fetchCumpleDeHoy();
    })
/*
    btnCumplesDeLaSemana.addEventListener('click', function(e){
        e.preventDefault();
        fetchCumpleDeSemana();
    })*/

   
    function fetchCumpleDeHoy() {
        $.ajax({
        url: 'php/listaCumpleañosDeHoy.php',
        type: 'GET',
        success: function(response) {
            const personas = JSON.parse(response);
            let template = '';
            personas.forEach(persona => {
            template += `
                <tr personaId="${persona.id}">
                    <td>${persona.id}</td>
                    <td>${persona.dni}</td>
                    <td>
                        <a href="#" class="task-cumpleañero">
                        ${persona.nombre} 
                        </a>
                    </td>
                    <td>${persona.direccion}</td>
                    <td>${persona.telefono}</td>
                    <td>${persona.nacimiento}</td>
                </tr>
                `
        });
        $('#tabla-productos').hide();
        $('#total').hide();
        $('#productoPreferido').hide()
        $('#personas').html(template);
        $('#tabla-personas').show();
    }
    });
  }
  
  function fetchCumpleDelMes() {
    $.ajax({
    url: 'php/listaCumpleañosDelMes.php',
    type: 'GET',
    success: function(response) {
        const personas = JSON.parse(response);
        let template = '';
        personas.forEach(persona => {
        template += `
            <tr personaId="${persona.id}">
                <td>${persona.id}</td>
                <td>${persona.dni}</td>
                <td>
                    <a href="#" class="task-cumpleañero">
                    ${persona.nombre} 
                    </a>
                </td>
                <td>${persona.direccion}</td>
                <td>${persona.telefono}</td>
                <td>${persona.nacimiento}</td>
            </tr>
            `
    });
    $('#tabla-productos').hide();
    $('#total').hide();
    $('#productoPreferido').hide()
    $('#personas').html(template);
    $('#tabla-personas').show();
  }
});
}
/*
 function fetchCumpleDeSemana() {
    $.ajax({
    url: 'php/listaProveedor.php',
    type: 'GET',
    success: function(response) {
        const clientes = JSON.parse(response);
        let template = '';
        clientes.forEach(cliente => {
        template += `
            <tr clienteId="${cliente.id}">
                <td>${cliente.id}</td>
                <td>${cliente.dni}</td>
                <td>
                    <a href="#" class="task-item">
                    ${cliente.nombre} 
                    </a>
                </td>
                <td>${cliente.direccion}</td>
                <td>${cliente.telefono}</td>
                <td>${cliente.nacimiento}</td>
                <td>
                    <button class="task-edit btn btn-warning">
                        Editar
                    </button>
                </td>
                <td>
                    <button class="task-delete btn btn-danger">
                        Baja 
                    </button>
                </td>
            </tr>
            `
    });
    $('#personas').html(template);
  }
});
}
*/

function fetchMercaderiaCliente(){
    $.ajax({
    url: 'php/productosVendidosACumpleañero.php',
    type: 'POST',
    data: {id},
    success: function(response) {
        const informe = JSON.parse(response);
        let template = '';
        var totalPorCliente = 0;
        var productoPreferido = []
        informe.forEach(inf => {
            if(productoPreferido[inf.id]==undefined){
                productoPreferido[inf.id] =  parseInt(inf.cantidad);
            }
            else{
                productoPreferido[inf.id] += parseInt(inf.cantidad);
            }
        
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
    let mayorProducto = 0
    let producto = 0
    for (i = 1; i <= productoPreferido.length -1 ; i++) {
        if (productoPreferido[i] > mayorProducto){
            mayorProducto = productoPreferido[i]
            producto = i
        }
    };
    $.post('php/obtenerProductoPreferido.php',{producto},function(response){
        $('#productoPreferido').html(response)
    })

    $('#productos').html(template);
    $('#total').html(totalPorCliente);
    $('#tabla-personas').hide();
    $('#tabla-productos').show()
    $('#total').show()
    $('#productoPreferido').show()
  }
});
}



  $('#searchCumpleañero').keyup(function() {
    if($('#searchCumpleañero').val()) {
      let search = $('#searchCumpleañero').val();
      $.ajax({
        url: 'php/searchPersona.php',
        data: {search},
        type: 'POST',
        success: function (response) {
          if(!response.error) {
            let personas = JSON.parse(response);
            let template = '';
            personas.forEach(persona => {
                template += `
                <tr personaId="${persona.id}">
                    <td>${persona.id}</td>
                    <td>${persona.dni}</td>
                    <td>
                        <a href="#" class="task-cumpleañero">
                        ${persona.nombre} 
                        </a>
                    </td>
                    <td>${persona.direccion}</td>
                    <td>${persona.telefono}</td>
                    <td>${persona.nacimiento}</td>
                </tr>
                ` 
            });
            $('#tabla-productos').hide();
            $('#total').hide();
            $('#productoPreferido').hide()
            $('#personas').html(template);           
            $('#tabla-personas').show();
        }
          
        } 
      })
    }
    if(!($('#searchCumpleañero').val())) {
    fetchCumpleDeHoy();
    }
  });


    $(document).on('click', '.task-cumpleañero', function() {
        let element = $(this)[0].parentElement.parentElement;
        id = $(element).attr('personaId');
        fetchMercaderiaCliente()
    });
});

