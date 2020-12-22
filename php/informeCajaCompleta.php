<?php
  include('database.php');
  $query = "SELECT * from caja inner join factura on caja.num_comprobante = factura.num_comprobante";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    if($row['tipo_factura']==1){
      $tipoFactura = "F. COMPRA";
    }
    elseif($row['tipo_factura']==2){
      $tipoFactura = "F. VENTA";
    }
    elseif($row['tipo_factura']==3){
      $tipoFactura = "R. DINERO";
    }
    else{
      $tipoFactura = "D. DINERO";
    }
    $json[] = array(
      'fecha' => $row['fecha'],
      'numComprobante' => $row['num_comprobante'],
      'ingreso' => $row['ingreso'],
      'egreso' => $row['egreso'],
      'diferencia' => $row['diferencia'],
      'tipo' => $tipoFactura,
      'descripcion' => $row['descripcion']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
?>