<?php
include('database.php');
$search = $_POST['search'];
if(!empty($search)) {
  $query = "SELECT * FROM `producto e insumo` WHERE nombre_producto LIKE '$search%' and status='1'";
  $result = mysqli_query($connection, $query);
  
  if(!$result) {
    die('Query Error' . mysqli_error($connection));
  }
  
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
        'id' => $row['id_producto'],
        'descripcion' => $row['nombre_producto'],
        'entrada' => $row['entrada'],
        'salida' => $row['salida'],
        'stock' => $row['entrada'] - $row['salida']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
}
?>