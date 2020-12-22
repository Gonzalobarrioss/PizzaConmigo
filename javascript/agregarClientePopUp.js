$(document).ready(function(){
    // llamo a la funcion mostrar clientes
    fetchPersonas();
    //defino variables para editar luego
    let edit = false;
    let id = 0;

    //defino las variables
    var btnAbrirPopUp = document.getElementById('btnAgregarCliente'),
    overlay = document.getElementById('overlay'),
    popup = document.getElementById('popup'),
    btnCerrarPopUp = document.getElementById('btn-cerrar-popup'),
    btnGuardarRegistro = document.getElementById('btn-guardarRegistro'),
    btnAltaPopUp = document.getElementById('btnAltaCliente'),
    btnCerrarPopUpAlta = document.getElementById('btn-cerrar-popupAlta'),
    btnMostrarPersonas = document.getElementById('mostrarTodos'),
    btnMostrarClientes = document.getElementById('mostrarClientes'),
    btnMostrarProveedores = document.getElementById('mostrarProveedores');

    btnMostrarPersonas.addEventListener('click', function(e){
        e.preventDefault();
        fetchPersonas();
    })

    btnMostrarClientes.addEventListener('click', function(e){
        e.preventDefault();
        fetchClientes();
    })

    btnMostrarProveedores.addEventListener('click', function(e){
        e.preventDefault();
        fetchProveedores();
    })

    //creo los botones popup
    btnAbrirPopUp.addEventListener('click', function(){
        overlay.classList.add('active');
        popup.classList.add('active');
        edit = false;
        console.log(edit);
    });

    btnCerrarPopUp.addEventListener('click', function(){
        overlay.classList.remove('active');
        popup.classList.remove('active');
    });

    btnAltaPopUp.addEventListener('click', function(){
        overlayAlta.classList.add('active');
        popupAlta.classList.add('active');
        fetchClientesBajas();
    })

    btnCerrarPopUpAlta.addEventListener('click', function(){
        overlayAlta.classList.remove('active');
        popupAlta.classList.remove('active');
    });

    //Agregar cliente con submit
    $('#formulario-persona').submit(function(e){
        e.preventDefault();
        let url = edit === false ? 'php/agregarCliente.php' : 'php/editarCliente.php';
        if(edit ===false){
            const postData = {
                nombre : $('#nombre').val(),
                dni: $('#dni').val(),
                nacimiento: $('#nacimiento').val(),
                telefono: $('#telefono').val(),
                direccion: $('#direccion').val(),
                tipo: $('#tipoPersona').val()
            }
            $.post(url, postData, function(response){
                console.log(response);
                $('#formulario-persona').trigger('reset');
                alert('Proceso satisfactorio.');
                fetchPersonas();
            });
        }
        if(edit ===true){
            const postData = {
                nombre : $('#nombre').val(),
                dni: $('#dni').val(),
                nacimiento: $('#nacimiento').val(),
                telefono: $('#telefono').val(),
                direccion: $('#direccion').val(),
                tipo: $('#tipoPersona').val(),
                id: id
            }
            $.post(url, postData, function(response){
                console.log(response);
                $('#formulario-persona').trigger('reset');
                fetchPersonas();
            });
        }
    })

    //defino funcion llamar personas
    function fetchPersonas() {
        $.ajax({
        url: 'php/listaPersonas.php',
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
  //defino funcion llamar clientes
  function fetchClientes() {
    $.ajax({
    url: 'php/listaCliente.php',
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
 //defino funcion llamar proveedores
 function fetchProveedores() {
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


  //defino funcion clientes con bajas
  function fetchClientesBajas() {
    $.ajax({
    url: 'php/listaClienteBaja.php',
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
                    <button class="task-alta btn btn-success">
                        Alta 
                    </button>
                </td>
            </tr>
            `
    });
    $('#clientesAlta').html(template);
  }
});
}

//busqueda de clientes
  $('#searchCliente').keyup(function() {
    if($('#searchCliente').val()) {
      let search = $('#searchCliente').val();
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
                    <button class="task-delete btn btn-danger">
                        Baja 
                    </button>
                    </td>
                </tr>
                ` 
            }); 
            $('#personas').html(template);           
          }
          
        } 
      })
    }
    if(!($('#searchCliente').val())) {
    fetchPersonas();
    }
  });

//busqueda de clientes dados de baja
$('#searchClienteBaja').keyup(function() {
    if($('#searchClienteBaja').val()) {
      let search = $('#searchClienteBaja').val();
      $.ajax({
        url: 'php/searchClienteBaja.php',
        data: {search},
        type: 'POST',
        success: function (response) {
          if(!response.error) {
            let clientes = JSON.parse(response);
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
                        <button class="task-alta btn btn-success">
                            Alta 
                        </button>
                    </td>
                </tr>
                ` 
            }); 
            $('#clientesAlta').html(template);           
          }
          
        } 
      })
    }
    if(!($('#searchClienteBaja').val())) {
    fetchClientesBajas();
    }
  });


  //funcion boton dar de baja clientes
  $(document).on('click', '.task-delete', function() {
      if(confirm('Seguro que desea dar de baja?')){
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('clienteId');
        $.post('php/bajaCliente.php', {id}, function(response){
          console.log(response);
          fetchPersonas();
      })
      }
      
  });

  //funcion dar de alta clientes y llamo para mostrar funcion de clientes con bajas
  $(document).on('click', '.task-alta', function() {
    if(confirm('Acepta dar de alta?')){
      let element = $(this)[0].parentElement.parentElement;
      let id = $(element).attr('clienteId');
      $.post('php/altaCliente.php', {id}, function(response){
        console.log(response);
        fetchPersonas();
        fetchClientesBajas();
    })
    }
    
});

//boton editar clientes
$(document).on('click', '.task-edit', function() {
    edit = true;
    let element = $(this)[0].parentElement.parentElement;
    id = $(element).attr('clienteId');
    overlay.classList.add('active');
    popup.classList.add('active');
});

});

