<?php
    include("database.php");
    if(isset($_REQUEST['codigo'])){
        $codigo = $_REQUEST['codigo'];
        $usuario = $_REQUEST['usuario'];
        $password = $_REQUEST['password'];
        $tipo_usuario = $_REQUEST['tipo_usuario'];
        $query = "INSERT INTO loggin(nombre_cuenta,password,tipo_loggin,persona_id_persona) VALUES('$usuario','$password'
        ,'$tipo_usuario','$codigo')";
        $resul = mysqli_query($connection,$query);
        if(!$resul){
            die(mysqli_error($connection));
        }
    }
?>