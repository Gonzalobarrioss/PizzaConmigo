<?php
    include("database.php");
    $id = $_POST['producto'];
    $descripcion = "";
    $query = "SELECT * from `producto e insumo` where id_producto='$id'";
    $resul = mysqli_query($connection,$query);
    if(!$resul){
        die(mysqli_error($connection));
    }
    while($row = mysqli_fetch_array($resul)){
        $descripcion = $row['nombre_producto'];
    }
    echo $descripcion;
?>