<?php
    include('database.php');
    $arrayProducto = array(); 
    $arrayProducto = $_POST['arrayProducto'];
    $arrayCantidad = array();
    $arrayCantidad = $_POST['arrayCantidad'];
    $x = 0;
    foreach($arrayProducto as $id){
        $query = "SELECT entrada from `producto e insumo` where id_producto='$id'";
        $result = mysqli_query($connection,$query);
        if(!$result){
            die(mysqli_error($connection));
        }
        $row = mysqli_fetch_array($result);

        $stockCargado = $arrayCantidad[$x] + $row['entrada'];
        $x += 1;
        
        $query = "UPDATE `producto e insumo` SET entrada = '$stockCargado' WHERE id_producto = '$id'";
        $result = mysqli_query($connection,$query);
        if(!$result){
            die(mysqli_error($connection));
        }
        echo "Proceso satisfactorio.";   
    }
?>