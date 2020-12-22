<?php
    include('database.php');

    if(isset($_POST['id'])){
        $id = $_POST['id'];
        $query = "UPDATE `producto e insumo` SET status = '0' WHERE id_producto = '$id'";
        $result = mysqli_query($connection,$query);
        if(!$result){
            die('Query Failed.');
        }
        echo "Dado de baja.";
    }
    

?>