<?php
include('database.php');
$search = $_POST['search'];
if(!empty($search)) {
  $query = "SELECT * FROM `producto e insumo` WHERE nombre_producto LIKE '$search%' and status='1' and tipo_producto <> '2'";
  $result = mysqli_query($connection, $query);
  
  if(!$result) {
    die('Query Error' . mysqli_error($connection));
  }
  
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
        'id' => $row['id_producto'],
        'descripcion' => $row['nombre_producto']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
}
?>