<?php
    include('database.php');
    $id = $_POST['id'];
    $diferencia = 0;
    $query = "SELECT * from detalle as det inner join persona as per on det.codigo_persona = per.id_persona
     and det.id_producto = '$id' and det.tipo='1'";
    $result = mysqli_query($connection, $query);
    if(!$result) {
        die('Query Failed'. mysqli_error($connection));
    }
    $json = array();
    while($row = mysqli_fetch_array($result)) {
        $json[] = array(
        'fecha' => $row['fecha'],
        'nombre' => $row['nombre_persona'],
        'cantidad' => $row['cantidad'],
        'importe' => $row['precio_unit'] * $row['cantidad']
        );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring; 
?>