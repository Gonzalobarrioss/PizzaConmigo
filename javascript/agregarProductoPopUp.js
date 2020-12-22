$(document).ready(function(){
    
    // llamo a la funcion mostrar productos
    fetchProductosInsumos();
    //defino variables para editar luego
    let edit = false;
    let id = 0;
    let tipoProductoId= 0;
    //defino las variables */
    var btnAbrirPopUp = document.getElementById('btnAgregarProducto'),
    overlay = document.getElementById('overlay'),
    popup = document.getElementById('popup'),
    btnCerrarPopUp = document.getElementById('btn-cerrar-popup'),
    btnGuardarRegistro = document.getElementById('btn-guardarRegistro'),
    btnAltaPopUp = document.getElementById('btnAltaProducto'),
    btnCerrarPopUpAlta = document.getElementById('btn-cerrar-popupAlta')
    btnMostrarTodos = document.getElementById('mostrarTodos'),
    btnMostrarProductos = document.getElementById('mostrarProductos'),
    btnMostrarInsumos = document.getElementById('mostrarInsumos');

    btnMostrarTodos.addEventListener('click', function(e){
        e.preventDefault();
        fetchProductosInsumos();
    })

    btnMostrarProductos.addEventListener('click', function(e){
        e.preventDefault();
        fetchProductos();
    })

    btnMostrarInsumos.addEventListener('click', function(e){
        e.preventDefault();
        fetchInsumos();
    })


    //creo los botones popup
    btnAbrirPopUp.addEventListener('click', function(){
        overlay.classList.add('active');
        popup.classList.add('active');
        edit = false;
    });

    btnCerrarPopUp.addEventListener('click', function(){
        overlay.classList.remove('active');
        popup.classList.remove('active');
    });

    btnAltaPopUp.addEventListener('click', function(){
        overlayAlta.classList.add('active');
        popupAlta.classList.add('active');
        fetchProductosBajas();
    })

    btnCerrarPopUpAlta.addEventListener('click', function(){
        overlayAlta.classList.remove('active');
        popupAlta.classList.remove('active');
    });

    //Agregar producto con submit

    $('#formulario-producto').submit(function(e){
        e.preventDefault();
        let url = edit === false ? 'php/agregarProducto.php' : 'php/editarProducto.php';
        if(edit ===false){
            const postData = {
                descripcion : $('#descripcion').val(),
                precio: $('#precio').val(),
                tipo: $('#tipoProducto').val(),
                uni_medida: $('#uni_medida').val()
            }
            $.post(url, postData, function(response){
                console.log(response);
                $('#formulario-producto').trigger('reset');
                fetchProductosInsumos();
            });
        }
        if(edit ===true){
            const postData = {
                descripcion : $('#descripcion').val(),
                precio: $('#precio').val(),
                tipo: $('#tipoProducto').val(),
                uni_medida: $('#uni_medida').val(),
                id: id
            }
            $.post(url, postData, function(response){
                console.log(response);
                $('#formulario-producto').trigger('reset');
                fetchProductosInsumos();
            });
            }
            
        })


    //defino funcion mostrar  todos los productos
    function fetchProductosInsumos() {
        $.ajax({
        url: 'php/listaProductoInsumo.php',
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
                    <td>${producto.precio}</td>
                    <td>${producto.uni_medida}</td>
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
        $('#productos').html(template);
      }
    });
  }

  //defino funcion mostrar los productos
  function fetchProductos() {
    $.ajax({
    url: 'php/listaProducto.php',
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
                <td>${producto.precio}</td>
                <td>${producto.uni_medida}</td>
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
    $('#productos').html(template);
  }
});
}

 //defino funcion mostrar los Insumos
 function fetchInsumos() {
    $.ajax({
    url: 'php/listaInsumo.php',
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
                <td>${producto.precio}</td>
                <td>${producto.uni_medida}</td>
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
    $('#productos').html(template);
  }
});
}
  //defino funcion productos con bajas
  function fetchProductosBajas() {
    $.ajax({
    url: 'php/listaProductoBaja.php',
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
                <td>${producto.precio}</td>
                <td tipoId="${producto.tipo}">${producto.tipo}</td>
                <td>${producto.uni_medida}</td>
                <td>
                    <button class="task-alta btn btn-success">
                        Alta 
                    </button>
                </td>
            </tr>
            `
    });
    $('#productosAlta').html(template);
  }
});
}

//busqueda de productos
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
                <tr productoId="${producto.id}">
                    <td>${producto.id}</td>
                    <td>
                        <a href="#" class="task-item">
                        ${producto.descripcion} 
                        </a>
                    </td>
                    <td>${producto.precio}</td>
                    <td>${producto.tipo}</td>
                    <td>${producto.uni_medida}</td>
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
            $('#productos').html(template);           
          }
          
        } 
      })
    }
    if(!($('#searchProducto').val())) {
    fetchProductosInsumos();
    }
  });

//search productos dado de baja popup
$('#searchProductoBaja').keyup(function() {
    if($('#searchProductoBaja').val()) {
      let search = $('#searchProductoBaja').val();
      $.ajax({
        url: 'php/searchProductoBaja.php',
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
                    <td>${producto.precio}</td>
                    <td tipoId="${producto.tipo}">${producto.tipo}</td>
                    <td>${producto.uni_medida}</td>
                    <td>
                        <button class="task-alta btn btn-success">
                            Alta 
                        </button>
                    </td>
                </tr>
                `
            }); 
            $('#productosAlta').html(template);           
          }
        } 
      })
    }
    if(!($('#searchProductoBaja').val())) {
    fetchProductosBajas();
    }
  });


  //funcion boton dar de baja productos
  $(document).on('click', '.task-delete', function() {
      if(confirm('Seguro que desea dar de baja?')){
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('productoId');
        $.post('php/bajaProducto.php', {id}, function(response){
          console.log(response);
          fetchProductosInsumos();
      })
      }
      
  });

  //funcion dar de alta productos y llamo para mostrar funcion de productos con bajas
  $(document).on('click', '.task-alta', function() {
    if(confirm('Acepta dar de alta?')){
      let element = $(this)[0].parentElement.parentElement;
      let id = $(element).attr('productoId');
      $.post('php/altaProducto.php', {id}, function(response){
        console.log(response);
        fetchProductosInsumos();
        fetchProductosBajas();
    })
    }
    
});

//boton editar clientes
$(document).on('click', '.task-edit', function() {
    edit = true;

    let element = $(this)[0].parentElement.parentElement;
    id = $(element).attr('productoId');

    //obtengo el tipo de producto, si es receta no se edita
    let elementId = $(this)[0].parentElement.parentElement;
    let elementTagName = elementId.getElementsByTagName("td");
    tipoProductoId = elementTagName[3].textContent;


    if(tipoProductoId == 3){
        alert('Las modificaciones de recetas se realizan en el area de recetas.');
    }
    else{
        overlay.classList.add('active');
        popup.classList.add('active');
    }


});

});

