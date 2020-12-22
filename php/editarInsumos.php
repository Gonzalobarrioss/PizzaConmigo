<?php
  include('database.php');
  $id = $_POST['id'];
  $query = "SELECT * from receta inner join `producto e insumo` as p on receta.id_insumo = p.id_producto
   WHERE producto_id= '$id'";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'num_receta' => $row['num_receta'],
      'id_producto' => $row['producto_id'],
      'descripcionProducto' => $row['nombre_producto'],
      'id_insumo' => $row['id_insumo'],
      'descripcionInsumo' => $row['nombre_producto'],
      'cantidad' => $row['cantidad'],
      'uni_medida' => $row['uni_medida']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
?>