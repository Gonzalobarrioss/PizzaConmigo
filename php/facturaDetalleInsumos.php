<?php
    include('database.php');
    $arrayProducto = array(); 
    $arrayProducto = $_POST['arrayProducto'];
    $arrayCantidad = array();
    $arrayCantidad = $_POST['arrayCantidad'];
    $x = 0;
    if(isset($_POST['numComprobante'])) {
        
        $numComprobante = $_POST['numComprobante'];
        $fecha = $_POST['fecha'];
        $fecha = date("Y/m/d", strtotime($fecha));
        $id_persona = $_POST['id_persona'];
        $tipo = $_POST['tipo'];

        foreach($arrayProducto as $id){
            $cantidadComprada = $arrayCantidad[$x];
            $x += 1;
            $query = "SELECT * from receta where producto_id='$id'";
            $result = mysqli_query($connection,$query);
            if(!$result){
                die(mysqli_error($connection));
            }
            if($result->num_rows > 0){
                while($row = mysqli_fetch_array($result)){
                    $id= $row['id_insumo'];
                    $cantidad = $row['cantidad'] * $cantidadComprada;
                    $queryPrecio = "SELECT precio_producto from `producto e insumo` where id_producto = '$id'";
                    $resultPrecio = mysqli_query($connection,$queryPrecio);
                    if(!$result){
                        die(mysqli_error($connection));
                    }

                    $precioUnitario = mysqli_fetch_array($resultPrecio)['precio_producto'];

                    $queryInsert = "INSERT into detalle(codigo_persona, num_comprobante,fecha,num_detalle,id_producto,cantidad,precio_unit,tipo) 
                    VALUES('$id_persona','$numComprobante','$fecha','$x','$id','$cantidad','$precioUnitario','$tipo')";
                    $resultInsert = mysqli_query($connection,$queryInsert);
                    if(!$resultInsert){
                        die(mysqli_error($connection));
                    }
                    echo "Proceso satisfactorio.";
                }
            }   
        }
    }
?>