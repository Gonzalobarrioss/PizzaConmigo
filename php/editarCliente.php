<?php
    include('database.php');
    if(isset($_POST['nombre'])) {
        $nombre = $_POST['nombre'];
        $dni = $_POST['dni'];
        $nacimiento = $_POST['nacimiento'];
        $telefono = $_POST['telefono'];
        $direccion = $_POST['direccion'];
        $tipoPersona = $_POST['tipo'];
        $id = $_POST['id'];
        $query = "UPDATE persona SET nombre_persona = '$nombre', fecha_nacimiento = '$nacimiento', telefono = '$telefono',
            tipo_persona = '$tipoPersona', direccion = '$direccion', dni = '$dni', status = '1' WHERE id_persona = '$id'";
        //$query = "INSERT into persona(nombre_persona, fecha_nacimiento,telefono,tipo_persona,direccion,dni,status) 
         //   VALUES ('$nombre', '$nacimiento', '$telefono', '$tipoPersona', '$direccion', '$dni','1')";
        $result = mysqli_query($connection, $query);
        if (!$result) {
          die('Query Failed.');
        }
        echo "Proceso satisfactorio.";  
      }
?>