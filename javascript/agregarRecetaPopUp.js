$(document).ready(function(){
   
    // llamo a la funcion mostrar productos
    fetchRecetas();
    $('#CajaInsumos').hide();
    //defino variables para editar luego
    
    let edit = false;
    let id = 0;

    //defino las variables 
    var btnAbrirPopUp = document.getElementById('btnAgregarReceta'),
    overlay = document.getElementById('overlay'),
    popup = document.getElementById('popup'),
    btnCerrarPopUp = document.getElementById('btn-cerrar-popup'),
    btnGuardarRegistro = document.getElementById('btn-guardarRegistro'),
    btnAltaPopUp = document.getElementById('btnAltaReceta'),
    btnCerrarPopUpAlta = document.getElementById('btn-cerrar-popupAlta'),
    btnCerrarPopUpInsumo = document.getElementById('btn-cerrar-popupInsumo'),
    btnVolver = document.getElementById('volver');

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
        fetchRecetasBajas();
    })

    btnCerrarPopUpAlta.addEventListener('click', function(){
        overlayAlta.classList.remove('active');
        popupAlta.classList.remove('active');
    });

    btnCerrarPopUpInsumo.addEventListener('click', function(){
        overlayInsumo.classList.remove('active');
        popupInsumo.classList.remove('active');
    });

    btnVolver.addEventListener('click', function(){
        $('#CajaInsumos').hide();
        $('#CajaRecetas').show();
        fetchRecetas();
    });

    //Agregar producto con submit

    $('#formulario-receta').submit(function(e){
        e.preventDefault();
        
        let url = edit === false ? 'php/agregarReceta.php' : 'php/editarReceta.php';
        if(edit ===false){
            const postData = {
                descripcion : $('#descripcion').val(),
                precio: $('#precio').val(),
                uni_medida: $('#uni_medida').val()
            }
            $.post(url, postData, function(response){
                console.log(response);
                $('#formulario-receta').trigger('reset');
                fetchRecetas();
            });
        }
        if(edit ===true){
            const postData = {
                descripcion : $('#descripcion').val(),
                precio: $('#precio').val(),
                uni_medida: $('#uni_medida').val(),
                id: id
            }
            $.post(url, postData, function(response){
                console.log(response);
                $('#formulario-receta').trigger('reset');
                fetchRecetas();
            });
        }
    });

    //defino funcion mostrar productos
    function fetchRecetas() {
        $.ajax({
        url: 'php/listaReceta.php',
        type: 'GET',
        success: function(response) {
            const recetas = JSON.parse(response);
            let template = '';
            recetas.forEach(receta => {
            template += `
                <tr recetaId="${receta.id}">
                    <td>${receta.id}</td>
                    <td>
                        <a href="#" class="task-item">
                        ${receta.descripcion} 
                        </a>
                    </td>
                    <td>${receta.precio}</td>
                    <td>${receta.uni_medida}</td>
                    <td>
                        <button class="task-add btn btn-info">
                            Agregar Insumo
                        </button>
                    </td>
                    <td>
                        <button class="task-edit-insumos btn btn-warning">
                            Editar insumos
                        </button>
                    </td>
                    <td>
                        <button class="task-edit btn btn-warning">
                            Editar Receta
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
        $('#recetas').html(template);
      }
    });
  }

  //defino funcion recetas con bajas 
  
  function fetchRecetasBajas() {
    $.ajax({
    url: 'php/listaRecetaBaja.php',
    type: 'GET',
    success: function(response) {
        const recetas = JSON.parse(response);
        let template = '';
        recetas.forEach(receta => {
        template += `
            <tr recetaId="${receta.id}">
                <td>${receta.id}</td>
                <td>
                    <a href="#" class="task-item">
                    ${receta.descripcion} 
                    </a>
                </td>
                <td>${receta.precio}</td>
                <td>${receta.uni_medida}</td>
                <td>
                    <button class="task-alta btn btn-success">
                        Alta 
                    </button>
                </td>
            </tr>
            `
    });
    $('#recetasAlta').html(template);
  }
});
}

function fetchInsumos() {
    $.ajax({
        url: 'php/listaInsumos.php',
        data: {id},
        type: 'POST',
    success: function(response) {
        const insumos = JSON.parse(response);
        let template = '';
        insumos.forEach(insumo => {
        template += `
            <tr insumoId="${insumo.id}">
                <td>${insumo.id}</td>
                <td>
                    <a href="#" class="task-item">
                    ${insumo.descripcion} 
                    </a>
                </td>
                <td>${insumo.precio}</td>
                <td>${insumo.uni_medida}</td>
                <td>
                    <button class="task-addInsumo btn btn-success">
                        Agregar 
                    </button>
                </td>
            </tr>
            `
    });
    $('#insumos').html(template);
  }
});
}

function fetchEditarInsumos() {
    $.ajax({
        url: 'php/editarInsumos.php',
        data: {id},
        type: 'POST',
        success: function (response) {
          if(!response.error) {

            let insumos = JSON.parse(response);
            let template = '';
            insumos.forEach(insumo => {
                template += `
                <tr editarInsumoId="${insumo.id_insumo}">
                    <td>${insumo.num_receta}</td>
                    <td>${insumo.id_producto}</td>
                    <td>${insumo.id_insumo}</td>
                    <td>${insumo.descripcionInsumo}</td>
                    <td>${insumo.cantidad}</td>
                    <td>${insumo.uni_medida}</td>
                    <td>
                        <button class="task-edit-insumos-cantidad btn btn-warning">
                            Editar cantidad
                        </button>
                    </td>
                    <td>
                        <button class="task-quitar btn btn-danger">
                            Quitar 
                        </button>
                    </td>
                </tr>
                `
            }); 
            $('#CajaRecetas').hide();
            $('#CajaInsumos').show();
            $('#recetasInsumos').html(template);           
          }
          
        } 
      })
}

//busqueda de productos
  $('#searchReceta').keyup(function() {
    if($('#searchReceta').val()) {
      let search = $('#searchReceta').val();
      $.ajax({
        url: 'php/searchReceta.php',
        data: {search},
        type: 'POST',
        success: function (response) {
          if(!response.error) {
            let recetas = JSON.parse(response);
            let template = '';
            recetas.forEach(receta => {
                template += `
                <tr recetaId="${receta.id}">
                    <td>${receta.id}</td>
                    <td>
                        <a href="#" class="task-item">
                        ${receta.descripcion} 
                        </a>
                    </td>
                    <td>${receta.precio}</td>
                    <td>${receta.uni_medida}</td>
                    <td>
                        <button class="task-add btn btn-info">
                            Agregar Insumo
                        </button>
                    </td>
                    <td>
                        <button class="task-edit-insumos btn btn-warning">
                            Editar insumos
                        </button>
                    </td>
                    <td>
                        <button class="task-edit btn btn-warning">
                            Editar Receta
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
            $('#recetas').html(template);           
          }
          
        } 
      })
    }
    if(!($('#searchReceta').val())) {
    fetchRecetas();
    }
  });

//search de recetas dadas de baja
$('#searchRecetaBaja').keyup(function() {
    if($('#searchRecetaBaja').val()) {
      let search = $('#searchRecetaBaja').val();
      $.ajax({
        url: 'php/searchRecetaBaja.php',
        data: {search},
        type: 'POST',
        success: function (response) {
          if(!response.error) {
            let recetas = JSON.parse(response);
            let template = '';
            recetas.forEach(receta => {
                template += `
                <tr recetaId="${receta.id}">
                    <td>${receta.id}</td>
                    <td>
                        <a href="#" class="task-item">
                        ${receta.descripcion} 
                        </a>
                    </td>
                    <td>${receta.precio}</td>
                    <td>${receta.uni_medida}</td>
                    <td>
                        <button class="task-alta btn btn-success">
                            Alta 
                        </button>
                    </td>
                </tr>
                `
            }); 
            $('#recetasAlta').html(template);           
          }
          
        } 
      })
    }
    if(!($('#searchRecetaBaja').val())) {
    fetchRecetasBajas();
    }
  });


  //funcion boton dar de baja recetas
  $(document).on('click', '.task-delete', function() {
      if(confirm('Seguro que desea dar de baja?')){
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('recetaId');
        $.post('php/bajaReceta.php', {id}, function(response){
          console.log(response);
          fetchRecetas();
      })
      }
      
  });

  $(document).on('click', '.task-quitar', function() {
    if(confirm('Seguro que desea quitar?')){
      let element = $(this)[0].parentElement.parentElement;
      let id_insumo = $(element).attr('editarInsumoId');
      let elementTagName = element.getElementsByTagName("td");
      id_producto = elementTagName[1].textContent;
      /*console.log(id);
      console.log(id_producto);*/
      $.post('php/quitarInsumo.php', {id_insumo,id_producto}, function(response){
        console.log(response);
        fetchEditarInsumos();
    
    })

    }
    
});

  //funcion dar de alta recetas y llamo para mostrar funcion de recetas con bajas
  $(document).on('click', '.task-alta', function() {
    if(confirm('Acepta dar de alta?')){
      let element = $(this)[0].parentElement.parentElement;
      let id = $(element).attr('recetaId');
      $.post('php/altaReceta.php', {id}, function(response){
        console.log(response);
        fetchRecetas();
        fetchRecetasBajas();
    })
    }
    
});

//boton editar recetas
$(document).on('click', '.task-edit', function() {
    edit = true;
    let element = $(this)[0].parentElement.parentElement;
    id = $(element).attr('recetaId');
    overlay.classList.add('active');
    popup.classList.add('active');
});

//boton agregar insumos
$(document).on('click', '.task-add', function() {
    let element = $(this)[0].parentElement.parentElement;
    id = $(element).attr('recetaId');

    overlayInsumo.classList.add('active');
    popupInsumo.classList.add('active');
    fetchInsumos();
});
//editar cantidad insumos en tabla recetas
$(document).on('click', '.task-edit-insumos', function() {
    let element = $(this)[0].parentElement.parentElement;
    id = $(element).attr('recetaId');
    fetchEditarInsumos();
    //overlay.classList.add('active');
    //  popup.classList.add('active');
});

$(document).on('click', '.task-edit-insumos-cantidad', function() {
    let element = $(this)[0].parentElement.parentElement;
    let idInsumo = $(element).attr('editarInsumoId');
    let elementTagName = element.getElementsByTagName("td");
    id_producto = elementTagName[1].textContent;
    let cantidadInsumo = prompt('Nueva cantidad');
    /*console.log(id);
    console.log(id_producto);
    console.log(cantidadInsumo);*/

    const postData = {
        id_insumo : idInsumo,
        id_producto: id_producto,
        cantidad: cantidadInsumo
    }
    $.post('php/editarCantidadInsumos.php', postData, function(response){
        console.log(response);
        fetchEditarInsumos();

    });

    //fetchEditarInsumos();
    //overlay.classList.add('active');
    //  popup.classList.add('active');*/
});

$(document).on('click', '.task-addInsumo', function() {

    let element = $(this)[0].parentElement.parentElement;
    idInsumo = $(element).attr('insumoId');

    let elementTagName = element.getElementsByTagName("td");
    uniMedidaInsumoNName = elementTagName[3].textContent;

    let cantidadInsumo = prompt('Ingrese cantidad');

    const postData = {
        id_producto_receta : id,
        id_insumo: idInsumo,
        uni_medida: uniMedidaInsumoNName,
        cantidad: cantidadInsumo
    }
    $.post('php/agregarInsumo.php', postData, function(response){
        console.log(response);
    });


  /*  console.log('ID PRODUCTO: ',id);
    console.log('ID INSUMO: ',idInsumo);
    console.log('Unidad de medida: ',uniMedidaInsumoNName);
    console.log('Cantidad: ',cantidadInsumo);*/

});

});
