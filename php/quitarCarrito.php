<?php
    include('database.php');

    if(isset($_POST['id'])){
        $id = $_POST['id'];
        $query = "DELETE FROM carrito WHERE id_producto = $id";
        $result = mysqli_query($connection,$query);
        if(!$result){
            die('Query Failed.');
        }
        echo "Producto removido del carrito.";
    }
    

?>