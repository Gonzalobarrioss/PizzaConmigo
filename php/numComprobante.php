<?php
    include('database.php');
    $num_comprobante = 0;
    $query = "SELECT * FROM factura";
    $result = mysqli_query($connection,$query);
    if(!$result){
        die(mysqli_error($connection));
    }
    if($result->num_rows == 0){
        $num_comprobante = 1;

    }
    else{
        while($row = mysqli_fetch_array($result)){
            $num_comprobante = $row['num_comprobante']+1;
        }
        
    }
    echo $num_comprobante;
?>