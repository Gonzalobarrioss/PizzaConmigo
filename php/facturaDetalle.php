<?php
    include('database.php');
    $arrayProducto = array(); 
    $arrayProducto = $_POST['arrayProducto'];
    $arrayCantidad = array();
    $arrayCantidad = $_POST['arrayCantidad'];
    $arrayPrecioUnitario = array();
    $arrayPrecioUnitario = $_POST['precioUnitario'];
    $x = 0;
    if(isset($_POST['numComprobante'])) {
        $numComprobante = $_POST['numComprobante'];
        $fecha = $_POST['fecha'];
        $fecha = date("Y/m/d", strtotime($fecha));
        $id_persona = $_POST['id_persona'];
        $tipo = $_POST['tipo'];
        echo "num comprobante:".$numComprobante;
        foreach($arrayProducto as $id){
            $cantidad = $arrayCantidad[$x];
            $precioUnitario = $arrayPrecioUnitario[$x];
            $x += 1;

            $query = "INSERT into detalle(codigo_persona, num_comprobante,fecha,num_detalle,id_producto,cantidad,precio_unit,tipo) 
            VALUES('$id_persona','$numComprobante','$fecha','$x','$id','$cantidad','$precioUnitario','$tipo')";
            $result = mysqli_query($connection,$query);
            if(!$result){
                die(mysqli_error($connection));
            }
            echo "Proceso satisfactorio.";
        }
    }
?>