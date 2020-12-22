<?php
    include("database.php");
    if(isset($_REQUEST['usuario'])){
        $resultado;
        $usuario = $_REQUEST['usuario'];
        $password = $_REQUEST['password'];
        $query = "SELECT * FROM loggin WHERE nombre_cuenta='$usuario' and password='$password'";
        $resul = mysqli_query($connection,$query);
        if(!$resul){
            die(mysqli_error($connection));
        }
        if($resul->num_rows == 0){
            $resultado = " ";
        }
        else{
            $resultado = "Conectado";
        }
        echo $resultado;
    }
?>