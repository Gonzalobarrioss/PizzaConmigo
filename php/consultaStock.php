<?php
    include('database.php');
    if($_POST['arrayProducto'] != "undefined" && $_POST['arrayProducto'] != null){
        $arrayProducto = array(); 
        $arrayProducto = $_POST['arrayProducto'];
        $arrayCantidad = array();
        $arrayCantidad = $_POST['arrayCantidad'];
        $x = 0;
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
                if(($entrada - $salida) < 0){
                    die("No hay stock de: ".$row['nombre_producto']);
                }
            }
        }
        else{
            $entrada = $row['entrada'];
            $salida= $row['salida'] + $arrayCantidad[$x];
            if(($entrada - $salida) < 0){
                die("No hay stock de: ".$row['nombre_producto']);
            }    
        }
        $x += 1;      
    }           
    }
    
?>