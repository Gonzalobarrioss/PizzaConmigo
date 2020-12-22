<?php
    include('database.php');
    if(isset($_POST['descripcion'])) {
        $descripcion = $_POST['descripcion'];
        $precio = $_POST['precio'];
        $tipoProducto = '3';
        $uni_medida = $_POST['uni_medida'];
        $query = "INSERT into `producto e insumo`(nombre_producto, precio_producto,tipo_producto,uni_medida,entrada,salida,status) 
            VALUES ('$descripcion', '$precio','$tipoProducto','$uni_medida','0', '0','1')";
        $result = mysqli_query($connection, $query);
        if (!$result) {
          die(mysqli_error($connection));
        }
        echo "Proceso satisfactorio.";  
    }
    else{
        echo "Proceso fallido.";
    }
?>