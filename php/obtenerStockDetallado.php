<?php
    include('database.php');
    $fechaDesde = $_POST['fechaDesde'];
    $fechaHasta = $_POST['fechaHasta'];
    $id = $_POST['id'];
    $diferencia = 0;
    $query = "SELECT * from detalle as det inner join `producto e insumo` as prod on det.id_producto = prod.id_producto where det.fecha BETWEEN '$fechaDesde' and '$fechaHasta' and det.id_producto = '$id'";
    $result = mysqli_query($connection, $query);
    if(!$result) {
        die('Query Failed'. mysqli_error($connection));
    }
    $json = array();
    while($row = mysqli_fetch_array($result)) {
        if($row['tipo']==1){
            $entrada = $row['cantidad'];
            $salida = 0;
            $diferencia += $entrada;
        }
        else{
            $entrada = 0;
            $salida = $row['cantidad'];
            $diferencia -= $salida;
        }
        $json[] = array(
        'fecha' => $row['fecha'],
        'numComprobante' => $row['num_comprobante'],
        'descripcion' => $row['nombre_producto'],
        'entrada' => $entrada,
        'salida' => $salida,
        'stock' => $diferencia,
        'tipo' => $row['tipo_producto']
        );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring; 
?>