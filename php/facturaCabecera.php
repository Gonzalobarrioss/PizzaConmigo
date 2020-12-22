<?php
    include('database.php');
    if(isset($_POST['numComprobante'])) {
        $numComprobante = $_POST['numComprobante'];
        $fecha = $_POST['fecha'];
        $fecha = date("Y/m/d", strtotime($fecha));
        $id_persona = $_POST['id_persona'];
        $neto = $_POST['neto'];
        $iva = $_POST['iva'];
        $total= $_POST['total'];
        $letra = $_POST['letra'];
        $tipo = $_POST['tipo'];
        $status = $_POST['status'];
        $descripcion = $_POST['descripcion'];

        $query = "INSERT into factura(num_comprobante,fecha,persona_id_persona,neto,iva,total,letra,tipo_factura,status,descripcion) 
            VALUES ('$numComprobante', '$fecha','$id_persona','$neto','$iva','$total','$letra','$tipo','$status','$descripcion')";
        $result = mysqli_query($connection, $query);
        if (!$result) {
          die(mysqli_error($connection));
        }
        echo "Proceso satisfactorio.";  
    }
?>