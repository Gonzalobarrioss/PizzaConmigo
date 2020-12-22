<?php
    include('database.php');
    if(isset($_POST['nombre'])) {
        $nombre = $_POST['nombre'];
        $dni = $_POST['dni'];
        $nacimiento = $_POST['nacimiento'];
        $telefono = $_POST['telefono'];
        $direccion = $_POST['direccion'];
        $tipoPersona = $_POST['tipo'];
        $query = "INSERT into persona(nombre_persona, fecha_nacimiento,telefono,tipo_persona,direccion,dni,status) 
            VALUES ('$nombre', '$nacimiento', '$telefono', '$tipoPersona', '$direccion', '$dni','1')";
        $result = mysqli_query($connection, $query);
        if (!$result) {
          die(mysqli_error($connection));
        }
        echo "Proceso satisfactorio.";  
      }
?>