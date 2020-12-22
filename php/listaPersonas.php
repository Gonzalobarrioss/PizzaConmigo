<?php
  include('database.php');
  $query = "SELECT * from persona WHERE status='1'";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'id' => $row['id_persona'],
      'nombre' => $row['nombre_persona'],
      'dni' => $row['dni'],
      'direccion' => $row['direccion'],
      'telefono' => $row['telefono'],
      'nacimiento' => $row['fecha_nacimiento']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
?>