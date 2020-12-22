<?php
    include('database.php');
    $arrayProducto = array(); 
    $arrayProducto = $_POST['arrayProducto'];
    $arrayCantidad = array();
    $x = 0;
    $arrayCantidad = $_POST['arrayCantidad'];
    foreach($arrayProducto as $id){
        $query = "SELECT * from `producto e insumo` where id_producto='$id'";
        $result = mysqli_query($connection,$query);
        if(!$result){
            die(mysqli_error($connection));
        }
        //INSPECCIONO LA FILA
        $row = mysqli_fetch_array($result);
        //SI ES UNA RECETA
        if($row['tipo_producto']==3){
            $query = "SELECT * from receta inner join `producto e insumo` as prod on receta.producto_id = '$id' and receta.id_insumo = prod.id_producto";
            $result = mysqli_query($connection,$query);
            while($row=mysqli_fetch_array($result)){
                $idInsumo = $row['id_insumo'];
                $entrada = $row['entrada'];
                $salida = $row['salida'] + ($arrayCantidad[$x] * $row['cantidad']);
                if($entrada - $salida < 0){
                    die("No hay insumo suficiente de ese producto");
                }

                $queryUpdate = "UPDATE `producto e insumo` SET salida = '$salida' WHERE id_producto = '$idInsumo' ";
                $resultUpdate = mysqli_query($connection,$queryUpdate);
                if(!$resultUpdate){
                    die(mysqli_error($connection));
                }

            }
            $queryUpdate = "UPDATE `producto e insumo` SET salida = '$arrayCantidad[$x]' WHERE id_producto = '$id' ";
            $resultUpdate = mysqli_query($connection,$queryUpdate);
        }
        else{
            $entrada = $row['entrada'];
            $salida= $row['salida'] + $arrayCantidad[$x];
            if(($entrada - $salida) < 0){
                echo "no hay stock: ".$row['entrada']." - (".$row['salida']."+".$arrayCantidad[$x].") < 0. ";
                die("No hay stock suficiente de ese producto");
        }    
        else{
            echo "hay stock: ".$row['entrada']." - ".$row['salida']."+".$arrayCantidad[$x]." >= 0";
            $stockCargado = $arrayCantidad[$x] + $row['salida'];
            echo "SALIO: ". $arrayCantidad[$x];
            $x += 1;
        
            $query = "UPDATE `producto e insumo` SET salida = '$stockCargado' WHERE id_producto = '$id'";
            $result = mysqli_query($connection,$query);
            if(!$result){
                die(mysqli_error($connection));
            }

        }
        }  
    }
?>