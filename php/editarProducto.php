<?php
    include('database.php');
    if(isset($_POST['descripcion'])) {
        $descripcion = $_POST['descripcion'];
        $precio = $_POST['precio'];
        $tipoProducto = $_POST['tipo'];
        $uni_medida = $_POST['uni_medida'];
        $id = $_POST['id'];
        $query = "UPDATE `producto e insumo` SET nombre_producto = '$descripcion', precio_producto = '$precio',
            tipo_producto = '$tipoProducto', uni_medida = '$uni_medida' WHERE id_producto = '$id'";
        $result = mysqli_query($connection, $query);
        if (!$result) {
          die('Query Failed.');
        }
        echo "Proceso satisfactorio.";  
      }
?>