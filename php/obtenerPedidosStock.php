<?php
  include('database.php');
  $query = "SELECT * from `producto e insumo` as p inner join stock_minimo ON p.tipo_producto <> '3' and p.status = '1'";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    if(($row['entrada'] - $row['salida']) < $row['stock_min']){
      $json[] = array(
        'id' => $row['id_producto'],
        'descripcion' => $row['nombre_producto'],
        'entrada' => $row['entrada'],
        'salida' => $row['salida'],
        'stock' => $row['entrada'] - $row['salida'],
        'tipo' => $row['tipo_producto']
      );
    }
    
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
?>