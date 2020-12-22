<?php
    include('database.php');
    if(isset($_POST['id'])){
        $query = "DELETE FROM carrito";
        $result = mysqli_query($connection,$query);
        if(!$result){
            die('Query Failed.');
        }
        echo "Carrito nuevo.";
    }
    

?>