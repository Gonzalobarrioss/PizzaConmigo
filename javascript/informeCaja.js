$(document).ready(function(){
    // llamo a la funcion mostrar todo
    fetchCaja();

    //defino las variables
    var btnMostrarTodos = document.getElementById('mostrarTodos'),
    btnMostrarFCompra = document.getElementById('mostrarFCompra'),
    btnMostrarFVenta = document.getElementById('mostrarFVenta'),
    fechaDesde = document.getElementById('fechaDesde'),
    fechaHasta = document.getElementById('fechaHasta'),
    search = document.getElementById('search');

    btnMostrarTodos.addEventListener('click', function(e){
        e.preventDefault();
        fetchCaja();
        $('#saldoAnterior').hide()
    })

    btnMostrarFCompra.addEventListener('click', function(e){
        e.preventDefault();
        fetchCajaCompra();
        $('#saldoAnterior').hide()
    })

    btnMostrarFVenta.addEventListener('click', function(e){
        e.preventDefault();
        fetchCajaVenta();
        $('#saldoAnterior').hide()
    })

    search.addEventListener('click', function(e){
        const postData = {
            fechaDesde: fechaDesde.value,
            fechaHasta: fechaHasta.value
        }
        $.post('php/informeCajaFechas.php', postData, function(response){
            const cajaFecha = JSON.parse(response);
            let template = '';
            let saldoAnterior;
            var totalIngreso = 0;
            var totalEgreso = 0;
            var Saldo = 0;
            cajaFecha.forEach(caja => {
            totalIngreso += parseFloat(caja.ingreso);
            totalEgreso += parseFloat(caja.egreso);
            saldoAnterior = caja.saldoAnterior;
            template += `
                <tr>
                    <td>${caja.fecha}</td>
                    <td>${caja.numComprobante}</td>
                    <td>${caja.ingreso}</td>
                    <td>${caja.egreso}</td>
                    <td>${caja.diferencia}</td>
                    <td>${caja.tipo}</td>
                    <td>${caja.descripcion}</td>
                </tr>
                `});
            Saldo = totalIngreso - totalEgreso;
            Saldo = Saldo.toFixed(2)
            totalIngreso = totalIngreso.toFixed(2)
            totalEgreso = totalEgreso.toFixed(2)
            $('#saldoAnterior').html("Saldo anterior: "+saldoAnterior)
            $('#saldoAnterior').show()
            $('#caja').html(template);
            $('#ingreso').html(totalIngreso)
            $('#egreso').html(totalEgreso)
            $('#saldo').html(Saldo)
        });

    })

    //defino funcion mostrar caja
    function fetchCaja() {
        $.ajax({
        url: 'php/informeCajaCompleta.php',
        type: 'GET',
        success: function(response) {
            const cajaCompleta = JSON.parse(response);
            let template = '';
            var totalIngreso = 0;
            var totalEgreso = 0;
            var Saldo = 0;
            cajaCompleta.forEach(caja => {
            totalIngreso += parseFloat(caja.ingreso);
            totalEgreso += parseFloat(caja.egreso);
            template += `
                <tr>
                    <td>${caja.fecha}</td>
                    <td>${caja.numComprobante}</td>
                    <td>${caja.ingreso}</td>
                    <td>${caja.egreso}</td>
                    <td>${caja.diferencia}</td>
                    <td>${caja.tipo}</td>
                    <td>${caja.descripcion}</td>
                </tr>
                `
        });
        Saldo = totalIngreso - totalEgreso
        Saldo = Saldo.toFixed(2)
        totalIngreso = totalIngreso.toFixed(2)
        totalEgreso = totalEgreso.toFixed(2)
        $('#caja').html(template);
        $('#ingreso').html(totalIngreso)
        $('#egreso').html(totalEgreso)
        $('#saldo').html(Saldo)
      }
    });
  }
  //defino funcion mostrar factura de compra
  function fetchCajaCompra() {
    $.ajax({
    url: 'php/informeCajaCompra.php',
    type: 'GET',
    success: function(response) {
        const cajaCompra = JSON.parse(response);
        let template = '';
        var totalEgreso = 0;
        var totalIngreso = 0;
        var Saldo = 0;
        cajaCompra.forEach(caja => {
        totalEgreso += parseFloat(caja.egreso)
        template += `
            <tr>
                <td>${caja.fecha}</td>
                <td>${caja.numComprobante}</td>
                <td>${caja.ingreso}</td>
                <td>${caja.egreso}</td>
                <td>-</td>
                <td>-</td>
            </tr>
            `
    });
    Saldo = totalEgreso;
    Saldo = Saldo.toFixed(2)
    totalIngreso = totalIngreso.toFixed(2)
    totalEgreso = totalEgreso.toFixed(2)
    $('#caja').html(template);
    $('#ingreso').html(totalIngreso)
    $('#egreso').html(totalEgreso)    
    $('#saldo').html(Saldo)
  }
});
}
 //defino funcion mostrar factura venta
 function fetchCajaVenta() {
    $.ajax({
    url: 'php/informeCajaVenta.php',
    type: 'GET',
    success: function(response) {
        const cajaVenta = JSON.parse(response);
        let template = '';
        var totalEgreso = 0;
        var totalIngreso = 0;
        var Saldo = 0;
        cajaVenta.forEach(caja => {
        totalIngreso += parseFloat(caja.ingreso);
        template += `
            <tr>
                <td>${caja.fecha}</td>
                <td>${caja.numComprobante}</td>
                <td>${caja.ingreso}</td>
                <td>${caja.egreso}</td>
                <td>-</td>
                <td>-</td>
            </tr>
            `
    });
    Saldo = totalIngreso;
    Saldo = Saldo.toFixed(2)
    totalIngreso = totalIngreso.toFixed(2)
    totalEgreso = totalEgreso.toFixed(2)
    $('#caja').html(template);
    $('#ingreso').html(totalIngreso)
    $('#egreso').html(totalEgreso)    
    $('#saldo').html(Saldo)
  }
});
}
});

