<?php
  include('database.php');
  //suponiendo que viene id
  $id = $_POST['id'];
  $query= "SELECT *
  FROM `producto e insumo`
 WHERE id_producto NOT IN (SELECT id_insumo
                       FROM receta where producto_id = '$id') and tipo_producto = '2'";
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