<?php
  include('database.php');
  $query = "SELECT * from carrito as ca INNER JOIN `producto e insumo` as pr ON ca.id_producto=pr.id_producto";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'id_persona' => $row['id_persona'],
      'id_producto' => $row['id_producto'],
      'descripcion' => $row['nombre_producto'],
      'precio' => $row['precio'],
      'cantidad' => $row['cantidad']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
?>