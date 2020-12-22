<?php
    include('database.php');

    if(isset($_POST['id'])){
        $id = $_POST['id'];
        $query = "UPDATE persona SET status = '1' WHERE id_persona = '$id'";
        $result = mysqli_query($connection,$query);
        if(!$result){
            die('Query Failed.');
        }
        echo "Dado de alta.";
    }
    

?>