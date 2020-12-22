<?php
    include("database.php");
    if(isset($_POST['codigo'])){
        $nombre = " ";
        $codigo = $_POST['codigo'];
        $query = "SELECT * FROM persona WHERE id_persona='$codigo'";
        $resul = mysqli_query($connection,$query);
        if(!$resul){
            die(mysqli_error($connection));
        }
        while($row=mysqli_fetch_array($resul)){
            $nombre = $row['nombre_persona'];
        }
        echo $nombre;
    }

?>