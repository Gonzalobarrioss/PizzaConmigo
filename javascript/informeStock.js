$(document).ready(function(){
    // llamo a la funcion mostrar productos
    fetchProductosInsumos();
    //defino variables para editar luego
    fetchStockMin();
    let tipoProductoId= 0;
    //defino las variables */
    var btnMostrarPedidos = document.getElementById('mostrarPedidos'),
    btnMostrarProductos = document.getElementById('mostrarProductos'),
    btnMostrarInsumos = document.getElementById('mostrarInsumos'),
    btnChangeStockMin = document.getElementById('stockmin');

    btnMostrarPedidos.addEventListener('click', function(e){
        e.preventDefault();
        fetchPedidos();
    })

    btnMostrarProductos.addEventListener('click', function(e){
        e.preventDefault();
        fetchProductos();
    })

    btnMostrarInsumos.addEventListener('click', function(e){
        e.preventDefault();
        fetchInsumos();
    })

    btnChangeStockMin.addEventListener('click', function(e){
        e.preventDefault();
        let stockmin = prompt("Ingrese nuevo stock minimo");
        const postData = {
            stockmin: stockmin
        }

        $.post('php/changeStockMin.php',postData,function(response){
            console.log(response)
        })
        fetchStockMin();
    })
    //defino funcion mostrar  todos los productos
    function fetchProductosInsumos() {
        $.ajax({
        url: 'php/obtenerStockTotalProductoInsumo.php',
        type: 'GET',
        success: function(response) {
            const productos = JSON.parse(response);
            let template = '';
            productos.forEach(producto => {
            template += `
                <tr productoId="${producto.id}">
                    <td>${producto.id}</td>
                    <td>
                        <a href="#" class="task-item">
                        ${producto.descripcion} 
                        </a>
                    </td>
                    <td>${producto.entrada}</td>
                    <td>${producto.salida}</td>
                    <td>${producto.stock}</td>
                    <td>${producto.tipo}</td>
                </tr>
                `
        });
        $('#stock').html(template);
      }
    });
  }

  //defino funcion mostrar los productos
  function fetchProductos() {
    $.ajax({
    url: 'php/obtenerStockTotalProducto.php',
    type: 'GET',
    success: function(response) {
        const productos = JSON.parse(response);
        let template = '';
        productos.forEach(producto => {
        template += `
            <tr productoId="${producto.id}">
                <td>${producto.id}</td>
                <td>
                    <a href="#" class="task-item">
                    ${producto.descripcion} 
                    </a>
                </td>
                <td>${producto.entrada}</td>
                <td>${producto.salida}</td>
                <td>${producto.stock}</td>
                <td>${producto.tipo}</td>
            </tr>
            `
    });
    $('#stock').html(template);
  }
});
}

 //defino funcion mostrar los Insumos
 function fetchInsumos() {
    $.ajax({
    url: 'php/obtenerStockTotalInsumo.php',
    type: 'GET',
    success: function(response) {
        const productos = JSON.parse(response);
        let template = '';
        productos.forEach(producto => {
        template += `
            <tr productoId="${producto.id}">
                <td>${producto.id}</td>
                <td>
                    <a href="#" class="task-item">
                    ${producto.descripcion} 
                    </a>
                </td>
                <td>${producto.entrada}</td>
                <td>${producto.salida}</td>
                <td>${producto.stock}</td>
                <td>${producto.tipo}</td>
            </tr>
            `
    });
    $('#stock').html(template);
  }
});
}

function fetchPedidos() {
    $.ajax({
    url: 'php/obtenerPedidosStock.php',
    type: 'GET',
    success: function(response) {
        const productos = JSON.parse(response);
        let template = '';
        productos.forEach(producto => {
        template += `
            <tr productoId="${producto.id}">
                <td>${producto.id}</td>
                <td>
                    <a href="#" class="task-item">
                    ${producto.descripcion} 
                    </a>
                </td>
                <td>${producto.entrada}</td>
                <td>${producto.salida}</td>
                <td>${producto.stock}</td>
                <td>${producto.tipo}</td>
            </tr>
            `
    });
    $('#stock').html(template);
  }
});
}

//busqueda de productos
  $('#searchProducto').keyup(function() {
    if($('#searchProducto').val()) {
      let search = $('#searchProducto').val();
      $.ajax({
        url: 'php/searchProductoStock.php',
        data: {search},
        type: 'POST',
        success: function (response) {
          if(!response.error) {
            let productos = JSON.parse(response);
            let template = '';
            productos.forEach(producto => {
                template += `
                <tr productoId="${producto.id}">
                    <td>${producto.id}</td>
                    <td>
                        <a href="#" class="task-item">
                        ${producto.descripcion} 
                        </a>
                    </td>
                    <td>${producto.entrada}</td>
                    <td>${producto.salida}</td>
                    <td>${producto.stock}</td>
                    <td>${producto.tipo}</td>
                </tr>
                `
            }); 
            $('#stock').html(template);           
          }
          
        } 
      })
    }
    if(!($('#searchProducto').val())) {
    fetchProductosInsumos();
    }
  });

  function fetchStockMin() {
    $.ajax({
    url: 'php/getStockMin.php',
    type: 'GET',
    success: function(response) {
        $('#stockmin').html(response);
    }
});
}

});