<?php
    include('database.php');
    $fechaDesde = $_POST['fechaDesde'];
    $fechaHasta = $_POST['fechaHasta'];
    $id = $_POST['id'];
    $diferencia = 0;
    $query = "SELECT * from detalle as det inner join `producto e insumo` as prod on det.id_producto = prod.id_producto  and det.tipo = '2' and det.fecha BETWEEN '$fechaDesde' and '$fechaHasta'
     inner join persona on persona.id_persona = det.codigo_persona and persona.id_persona = '$id';";
    $result = mysqli_query($connection, $query);
    if(!$result) {
        die('Query Failed'. mysqli_error($connection));
    }
    $json = array();
    while($row = mysqli_fetch_array($result)) {
        $json[] = array(
        'fecha' => $row['fecha'],
        'numComprobante' => $row['num_comprobante'],
        'descripcion' => $row['nombre_producto'],
        'id' => $row['id_producto'],
        'precio' => $row['precio_producto'],
        'cantidad' => $row['cantidad'],
        'total' => $row['precio_producto'] * $row['cantidad']
        );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring; 
?>