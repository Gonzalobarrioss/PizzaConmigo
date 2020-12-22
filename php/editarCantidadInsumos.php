<?php
    include('database.php');
    if(isset($_POST['id_insumo'])) {
        $id_insumo = $_POST['id_insumo'];
        $id_producto = $_POST['id_producto'];
        $cantidad = $_POST['cantidad'];
        echo "id insumo: ". $id_insumo;
        echo "id producto: ". $id_producto;
        echo "cantidad: ". $cantidad;
        $query = "UPDATE receta SET cantidad = '$cantidad' WHERE producto_id = '$id_producto' and id_insumo = '$id_insumo'";
        $result = mysqli_query($connection, $query);
        if (!$result) {
          die('Query Failed.');
        }
        echo "Proceso satisfactorio.";  
        
    }
?>