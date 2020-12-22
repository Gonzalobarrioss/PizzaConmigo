$(document).ready(function(){


    //obtengo num comprobante
    fecthNumComprobante();

    //defino variables para editar luego
    let id = 0;
    let idPersona;
    let nombrePersona;
    let totalFactura;
    let descripcionFactura;
    //consigo la fecha
    var hoy = new Date();
    fecha = hoy.getDate()+"-"+(hoy.getMonth()+1)+"-"+hoy.getFullYear();
    $('#fecha').html(fecha);
    

    //defino las variables
    var btnAgregarPersona = document.getElementById('btnAgregarPersona'),
    overlay = document.getElementById('overlay'),
    popup = document.getElementById('popup'),
    btnCerrarPopUpPersona = document.getElementById('btn-cerrar-popup'),
    selectTipoFactura = document.getElementById('letra'),
    btnExportarPDF = document.getElementById('pdf')
    btnCantidad = document.getElementById('btnOperacionCantidadCaja');
    btnDescripcion = document.getElementById('btnOperacionDescripcionCaja');
    btnAceptar = document.getElementById('btnOperacionAceptarCaja');


    //POPUP Persona
    btnAgregarPersona.addEventListener('click', function(){
        overlay.classList.add('active');
        popup.classList.add('active');
        fetchlistaPersona();
    });

    btnCerrarPopUpPersona.addEventListener('click', function(){
        overlay.classList.remove('active');
        popup.classList.remove('active');
    });

    btnCantidad.addEventListener('click',function(){
        fecthNumComprobante();
        totalFactura = prompt("Cantidad de operacion");
    })

    btnDescripcion.addEventListener('click',function(){
        descripcionFactura = prompt("descripcion de la operacion.")
    })

    btnAceptar.addEventListener('click', function(){
        $('#totalFactura').html(totalFactura);
        $('#descripcionFactura').html(descripcionFactura);
        $('#letraFactura').html(tipoLetra);
        $('#cod-persona').html(idPersona);
        $('#nom-persona').html(nombrePersona);
        $('#comprobante').html(numComprobante);
    })

    //SELECCIONO TIPO FACTURA
    let tipoFactura = selectTipoFactura.options[selectTipoFactura.selectedIndex].value;
    let tipoLetra = selectTipoFactura.options[selectTipoFactura.selectedIndex].text;
    //OBTENGO TIPO FACTURA
    selectTipoFactura.addEventListener('change', function(){
        tipoLetra = selectTipoFactura.options[selectTipoFactura.selectedIndex].text;
        tipoFactura = selectTipoFactura.options[selectTipoFactura.selectedIndex].value;
        $('#letraFactura').html(tipoLetra);
    })


    //BOTON EXPORTAR PDF
    btnExportarPDF.addEventListener('click', function(){
       
        HTMLtoPDF();
        //CARGO CAJA   
        
        if(tipoFactura == 1){
            alert("salio dinero");
            const postDataCaja = {
                fecha : fecha,
                comprobante: numComprobante,
                total: totalFactura
            }
            $.post('php/cajaCompra.php', postDataCaja, function(response){
                console.log(response);
            });
            
           
            //CABECERA FACTURA
            const postDataCabecera = {
                numComprobante: numComprobante,
                fecha: fecha,
                id_persona: idPersona,
                neto: 0,
                iva: 0,
                total: totalFactura,
                letra: tipoLetra,
                tipo: 3,
                status: 1,
                descripcion: descripcionFactura
            }
            $.post('php/facturaCabecera.php', postDataCabecera, function(response){
                console.log(response);
            });
        }
        else if(tipoFactura == 2){
            alert("entro dinero");
            const postDataCaja = {
                fecha : fecha,
                comprobante: numComprobante,
                total: totalFactura
            }
            $.post('php/cajaVenta.php', postDataCaja, function(response){
                console.log(response);
            });
            
           
            //CABECERA FACTURA
            const postDataCabecera = {
                numComprobante: numComprobante,
                fecha: fecha,
                id_persona: idPersona,
                neto: 0,
                iva: 0,
                total: totalFactura,
                letra: tipoLetra,
                tipo: 4,
                status: 1,
                descripcion: descripcionFactura
            }
            $.post('php/facturaCabecera.php', postDataCabecera, function(response){
                console.log(response);
            });
        }

        
        
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




  //defino funcion proveedores
  function fetchlistaPersona() {
    $.ajax({
    url: 'php/listaPersonaOperacionCaja.php',
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
                    <a href="#" class="task-item">
                    ${persona.nombre} 
                    </a>
                </td>
                <td>${persona.direccion}</td>S
                <td>${persona.telefono}</td>
                <td>
                    <button class="task-agregarPersona btn btn-success">
                        Agregar
                    </button>
                </td>
            </tr>
            `
    });
    $('#persona').html(template);
  }
});
}

//busqueda de clientes
$('#searchPersona').keyup(function() {
    if($('#searchPersona').val()) {
      let search = $('#searchPersona').val();
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
                        <a href="#" class="task-item">
                        ${persona.nombre} 
                        </a>
                    </td>
                    <td>${persona.direccion}</td>
                    <td>${persona.telefono}</td>
                    <td>
                        <button class="task-agregarPersona btn btn-success">
                            Agregar
                        </button>
                    </td>
                </tr>
                ` 
            }); 
            $('#persona').html(template);           
          }
        } 
      })
    }
    if(!($('#searchPersona').val())) {
    fetchlistaPersona();
    }
  });


  //AGREGAR PROVEEDOR A CARRITO
  $(document).on('click', '.task-agregarPersona', function() {
    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr('personaId');
    idPersona = id;

    let elementTagName = element.getElementsByTagName("td");
    nombrePersona = elementTagName[2].textContent;

        $('#nombrePersona').html(nombrePersona);
        overlay.classList.remove('active');
        popup.classList.remove('active');

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