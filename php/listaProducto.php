<?php
  include('database.php');
  $query = "SELECT * from `producto e insumo` WHERE status='1' and tipo_producto = '1'";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'id' => $row['id_producto'],
      'descripcion' => $row['nombre_producto'],
      'precio' => $row['precio_producto'],
      'uni_medida' => $row['uni_medida']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
?>