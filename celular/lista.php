<?php
    include("database.php");
        $nombre = " ";
        $query = "SELECT * FROM `producto e insumo` where tipo_producto <> '2'";
        $resul = mysqli_query($connection,$query);
        if(!$resul){
            die(mysqli_error($connection));
        }
        while($row=mysqli_fetch_array($resul)){
            $producto = $row['nombre_producto'];
            $id = $row['id_producto'];
            echo $producto.",";
        }      
?>