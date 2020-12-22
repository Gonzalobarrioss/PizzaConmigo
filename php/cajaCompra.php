<?php
    include('database.php');
    if(isset($_POST['comprobante'])) {
        $fecha = $_POST['fecha'];
        $fecha = date("Y/m/d", strtotime($fecha));
        $numComprobante = $_POST['comprobante'];
        $totalFactura = $_POST['total'];
    
        $query = "SELECT * from caja";
        $result = mysqli_query($connection, $query);
        if(!$result) {
            die(mysqli_error($result)."no result");
        }
        if($result->num_rows == 0){
            $diferencia = 0 - $totalFactura;
            $query = "INSERT into caja(fecha,num_comprobante,ingreso,egreso,diferencia) 
                VALUES('$fecha','$numComprobante','0','$totalFactura','$diferencia')";
            $result = mysqli_query($connection, $query);
            if (!$result) {
                die(mysqli_error($connection));
            }
            echo "Proceso satisfactorio.";  
            }
        else{
            while($row = mysqli_fetch_array($result)){
                $diferencia = $row['diferencia'];
            }
            $diferencia -= $totalFactura;
            $query = "INSERT into caja(fecha,num_comprobante,ingreso,egreso,diferencia) 
                VALUES ('$fecha', '$numComprobante', '0', '$totalFactura','$diferencia')";
            $result = mysqli_query($connection, $query);
            if (!$result) {
              die('Query Failed.');
            }
            echo "Proceso satisfactorio.";  
        } 
    }
?>