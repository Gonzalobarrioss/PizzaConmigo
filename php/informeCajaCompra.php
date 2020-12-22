<?php
  include('database.php');
  $query = "SELECT * from caja inner join factura ON caja.num_comprobante = factura.num_comprobante and tipo_factura = '1'";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'fecha' => $row['fecha'],
      'numComprobante' => $row['num_comprobante'],
      'ingreso' => $row['ingreso'],
      'egreso' => $row['egreso'],
      'diferencia' => $row['diferencia']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
?>