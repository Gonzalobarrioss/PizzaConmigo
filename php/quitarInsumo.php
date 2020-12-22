<?php
    include('database.php');

    if(isset($_POST['id_insumo'])){
        $id = $_POST['id_insumo'];
        $id_producto = $_POST['id_producto'];
        $query = "DELETE FROM receta WHERE id_insumo = $id and producto_id = '$id_producto'";
        $result = mysqli_query($connection,$query);
        if(!$result){
            die('Query Failed.');
        }
        echo "Insumo quitado.";
    }
    

?>