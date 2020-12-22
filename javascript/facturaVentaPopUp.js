$(document).ready(function(){
    //CREO ARRAY PARA ALMACENAR LOS ID Y CANTIDAD DE PRODUCTOS DE LA FACTURA PARA PODER GRABRA LUEGO
    let arrayIdProducto = [];
    let arrayCantidadProducto = [];
    let arrayPrecioUnitario = [];

    //obtengo num comprobante
    fecthNumComprobante();

    //defino variables para editar luego
    let id = 0;
    let idCliente;
    let nombreCliente;
    let totalPrecioUnit;
    let totalPrecio;
    let totalIva;
    let totalFactura;

    //comiendo de nuevo el carrito
    $.post('php/empezarNuevoCarrito.php', {id}, function(response){
        console.log(response);
    })

    //consigo la fecha
    var hoy = new Date();
    fecha = hoy.getDate()+"-"+(hoy.getMonth()+1)+"-"+hoy.getFullYear();
    $('#fecha').html(fecha);
    
    //defino iva y lo muestro
    let iva = 21;
    $('#iva').html(iva);

    //muestro el carrito
    fetchCarrito();

    //defino las variables
    var btnAgregarCliente = document.getElementById('btnAgregarCliente'),
    overlay = document.getElementById('overlay'),
    popup = document.getElementById('popup'),
    btnCerrarPopUpCliente = document.getElementById('btn-cerrar-popup'),
    btnGuardarRegistro = document.getElementById('btn-guardarRegistro'),
    btnAgregarProducto = document.getElementById('btnAgregarProducto'),
    btnCerrarPopUpProducto = document.getElementById('btn-cerrar-popupProducto'),
    btniva = document.getElementById('iva'),
    selectTipoPago = document.getElementById('tipoPago'),
    selectTipoFactura = document.getElementById('letra'),
    btnExportarPDF = document.getElementById('pdf');

    //POPUP CLIENTES
    btnAgregarCliente.addEventListener('click', function(){
        overlay.classList.add('active');
        popup.classList.add('active');
        fetchlistaClientes();
    });

    btnCerrarPopUpCliente.addEventListener('click', function(){
        overlay.classList.remove('active');
        popup.classList.remove('active');
    });

    //POPUP PRODUCTOS
    btnAgregarProducto.addEventListener('click', function(){
        overlayProducto.classList.add('active');
        popupProducto.classList.add('active');
        fetchlistaProductos();
    })

    btnCerrarPopUpProducto.addEventListener('click', function(){
        overlayProducto.classList.remove('active');
        popupProducto.classList.remove('active');
    });

    //CAMBIAR IVA
    btniva.addEventListener('click', function(){
        iva = prompt('ingrese %iva');
        $('#iva').html(iva);
        fetchFactura();
    })

    //SELECCIONO TIPO FACTURA
    let tipoLetra = selectTipoFactura.options[selectTipoFactura.selectedIndex].text;
    //OBTENGO TIPO FACTURA
    selectTipoFactura.addEventListener('change', function(){
        tipoLetra = selectTipoFactura.options[selectTipoFactura.selectedIndex].text;
        $('#letraFactura').html(tipoLetra);
    })

    //SELECCIONO TIPO PAGO
    let tipoPago = selectTipoPago.options[selectTipoPago.selectedIndex].text;
    //OBTENER TIPO DE PAGO
    selectTipoPago.addEventListener('change',function(){
        tipoPago = selectTipoPago.options[selectTipoPago.selectedIndex].text;
        $('#metodoPago').html(tipoPago);
    })

    //ARREGLAR CONFIRMAR STOCK
    function getStock(){
        const postData = {
            arrayProducto : arrayIdProducto,
            arrayCantidad: arrayCantidadProducto
        }
        if(arrayIdProducto.length > 0){
            $.post('php/consultaStock.php', postData, function(response){
                if(response.length > 0){
                    alert(response);
                }
                
            });
        }   
    }
    
    //BOTON EXPORTAR PDF
    btnExportarPDF.addEventListener('click', function(){
            HTMLtoPDF();
            //GRABO EN CAJA
            const postDataCaja = {
                fecha : fecha,
                comprobante: numComprobante,
                total: totalFactura
            }
            $.post('php/cajaVenta.php', postDataCaja, function(response){
                console.log(response);
            });

            //GRABO SALIDA DE STOCK      
            const postDataStock = {
                arrayProducto : arrayIdProducto,
                arrayCantidad: arrayCantidadProducto
            }
            $.post('php/ventaQuitaStock.php', postDataStock, function(response){
                console.log(response);
            });
            //CABECERA DE FACTURA
            const postDataCabecera = {
                numComprobante: numComprobante,
                fecha: fecha,
                id_persona: idCliente,
                neto: totalPrecio,
                iva: totalIva,
                total: totalFactura,
                letra: tipoLetra,
                tipo: 2,
                status: 1,
                descripcion: " "
            }
            $.post('php/facturaCabecera.php', postDataCabecera, function(response){
                console.log(response);
            });
            //DETALLE DE PRODUCTOS
            const postDataDetalle = {
                numComprobante: numComprobante,
                fecha: fecha,
                id_persona: idCliente,
                arrayProducto: arrayIdProducto,
                arrayCantidad: arrayCantidadProducto,
                precioUnitario: arrayPrecioUnitario,
                tipo: 2,
            }
            $.post('php/facturaDetalle.php', postDataDetalle, function(response){
                console.log(response);
            });
            //DETALLE DE INSUMOS
            const postDataDetalleInsumos = {
                numComprobante: numComprobante,
                fecha: fecha,
                id_persona: idCliente,
                arrayProducto: arrayIdProducto,
                arrayCantidad: arrayCantidadProducto,
                tipo: 3,
            }
            $.post('php/facturaDetalleInsumos.php', postDataDetalleInsumos, function(response){
                console.log(response);
            });
            fecthNumComprobante();
    })

    //obtener numero de comprobante
    var numComprobante;
    function fecthNumComprobante(){
        $.ajax({
            url: 'php/numComprobante.php',
            type: 'GET',
            success: function(response) {
                numComprobante = response;

            }
        })
    }


    // funcion mostrar carrito
    function fetchCarrito() {
        $.ajax({
        url: 'php/listaCarrito.php',
        type: 'GET',
        success: function(response) {
            const productos = JSON.parse(response);
            let template = '';
            let totalPrecioUnit=0;
            let totalPrecio= 0;
            productos.forEach(producto => {
            totalPrecioUnit = producto.precio * producto.cantidad;
            totalPrecio += totalPrecioUnit;
            template += `
                <tr productoCarritoId="${producto.id_producto}">
                    <td>${producto.id_producto}</td>asd
                    <td>${producto.descripcion}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.cantidad}</td>
                    <td>${totalPrecioUnit}</td>

                    <td>
                        <button class="task-quitarCarrito btn btn-danger">
                            Quitar
                        </button>
                    </td>
                </tr>      
                `
            });
            let button = `<button class="task-agregarCarrito btn btn-success" style="margin-left:45%">
                        Agregar
                        </button>`;
            
            let totalIva = (totalPrecio * iva) / 100;
            totalFactura = totalPrecio + totalIva;
            let templateTotal = `TOTAL FACTURA = ${totalFactura}`;
        $('#carrito').html(template);
        $('#button').html(button);
        $('#totales').html(templateTotal);

      }
    });
  }

  //fetch FACTURA
  function fetchFactura(){
    $.ajax({
        url: 'php/listaCarrito.php',
        type: 'GET',
        success: function(response) {
            const productos = JSON.parse(response);
            let template = '';
            totalPrecioUnit=0;
            totalPrecio=0;
            arrayIdProducto = [];
            arrayCantidadProducto = [];
            arrayPrecioUnitario = [];
            productos.forEach(producto => {
            //CARGO LOS ID  Y CANTIDAD PRODUCTO AL ARRAY
            arrayIdProducto.push(producto.id_producto);
            arrayCantidadProducto.push(producto.cantidad);
            arrayPrecioUnitario.push(producto.precio);
            totalPrecioUnit = producto.precio * producto.cantidad;
            totalPrecio += totalPrecioUnit;
            template += `
                <tr productoFacturaId="${producto.id_producto}">
                    <td>${producto.id_producto}</td>
                    <td>${producto.descripcion}</td>               
                    <td>${producto.cantidad}</td>
                    <td>${producto.precio}</td>
                    <td> ${totalPrecioUnit} </td>
                </tr>
                `

        });
        

        totalIva = (totalPrecio * iva) / 100;
        totalFactura = totalPrecio + totalIva;

        getStock();

        $('#subtotalFactura').html(totalPrecio);
        $('#totalIVA').html(totalIva);
        $('#totalFactura').html(totalFactura);
        $('#detalleFactura').html(template);
        $('#cod-cliente').html(idCliente);
        $('#nom-cliente').html(nombreCliente);
        $('#comprobante').html(numComprobante);
        $('#metodoPago').html(tipoPago);
        $('#letraFactura').html(tipoLetra);
      }
    });

  }

    //defino funcion llamar productos
    function fetchlistaProductos() {
        $.ajax({
        url: 'php/listaProductoFacturacionVenta.php',
        type: 'GET',
        success: function(response) {
            const productos = JSON.parse(response);
            let template = '';
            productos.forEach(producto => {
            template += `
                <tr productoId="${producto.id}">
                    <td>${producto.id}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.precio}</td>
                    <td>
                        <button class="task-elegir btn btn-success">
                            Elegir
                        </button>
                    </td>
                </tr>
                `
        });
        $('#producto').html(template);
      }
    });
  }

  //defino funcion clientes
  function fetchlistaClientes() {
    $.ajax({
    url: 'php/listaClienteFacturacionVenta.php',
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
                <td>
                    <button class="task-agregarCliente btn btn-success">
                        Agregar
                    </button>
                </td>
            </tr>
            `
    });
    $('#cliente').html(template);
  }
});
}


//busqueda de clientes
$('#searchClientes').keyup(function() {
    if($('#searchClientes').val()) {
      let search = $('#searchClientes').val();
      $.ajax({
        url: 'php/searchCliente.php',
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
                    <td>
                        <button class="task-agregarCliente btn btn-success">
                            Agregar
                        </button>
                    </td>
                </tr>
                ` 
            }); 
            $('#cliente').html(template);           
          }
        } 
      })
    }
    if(!($('#searchClientes').val())) {
    fetchlistaClientes()
    }
  });

//busqueda de productos
$('#searchProductos').keyup(function() {
    if($('#searchProductos').val()) {
      let search = $('#searchProductos').val();
      $.ajax({
        url: 'php/searchProductoVenta.php',
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
                    <td>${producto.descripcion}</td>
                    <td>
                        <button class="task-elegir btn btn-success">
                            Elegir
                        </button>
                    </td>
                </tr>
                `
            }); 
            $('#producto').html(template);           
          }
        } 
      })
    }
    if(!($('#searchProductos').val())) {
    fetchlistaProductos();
    }
  });



  //AGREGAR CLIENTE A CARRITO
  $(document).on('click', '.task-agregarCliente', function() {
    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr('clienteId');
    idCliente = id;

    let elementTagName = element.getElementsByTagName("td");
    nombreCliente = elementTagName[2].textContent;
    
    if(confirm('Desea iniciar un nuevo carrito?')){
        $('#nombreCliente').html(nombreCliente);
        overlay.classList.remove('active');
        popup.classList.remove('active');
        $.post('php/empezarNuevoCarrito.php', {id}, function(response){
        console.log(response);
        })
        fetchCarrito();
    }
    
});

//AGREGAR DE CARRITO A DETALLE FACTURA
$(document).on('click', '.task-agregarCarrito', function() { 
    fetchFactura();
    fecthNumComprobante();
});

//QUITAR PRODUCTOS DEL CARRITO
$(document).on('click', '.task-quitarCarrito', function() { 
    if(confirm('Desea quitar del carrito?')){
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('productoCarritoId');
    
        $.post('php/quitarCarrito.php', {id}, function(response){
          console.log(response);
          fetchCarrito();
          fetchFactura();
        })
    }
    
    
    
});

//AGREGAR PRODUCTOS AL CARRITO
$(document).on('click', '.task-elegir', function() {
    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr('productoId');
    let elementTagName = element.getElementsByTagName("td");
    precio = elementTagName[2].textContent;

    let cantidad = prompt('CANTIDAD');

    const postData = {
        id_persona : idCliente,
        id_producto: id,
        tipo_pago: $('#tipoPago').val(),
        cantidad: cantidad,
        precio: precio
    }
    
    $.post('php/agregarCarrito.php', postData, function(response){
        console.log(response);
        fetchCarrito();
    });

});

//EXPORTAR A PDF
function HTMLtoPDF(){
    var pdf = new jsPDF('p', 'pt', 'letter');
    source = $('#HTMLtoPDF')[0];
    specialElementHandlers = {
        '#bypassme': function(element, renderer){
            return true
        }
    }
    margins = {
        top: 50,
        left: 60,
        width: 545
      };
    pdf.fromHTML(
          source // HTML string or DOM elem ref.
          , margins.left // x coord
          , margins.top // y coord
          , {
              'width': margins.width // max width of content on PDF
              , 'elementHandlers': specialElementHandlers
          },
          function (dispose) {
            // dispose: object with X, Y of the last line add to the PDF
            //          this allow the insertion of new lines after html
            pdf.save('html2pdf.pdf');
          }
      )		
    }


});