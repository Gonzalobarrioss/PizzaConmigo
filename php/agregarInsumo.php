<?php
    include('database.php');
    if(isset($_POST['id_producto_receta'])) {
        $id_producto = $_POST['id_producto_receta'];

        $query = "SELECT num_receta from receta WHERE producto_id = '$id_producto'";
        $result = mysqli_query($connection, $query);
        if(!$result) {
            die(mysqli_error($result)."no result");
        }

        if($result->num_rows == 0){
            echo "no existe esa receta";
            $query = "SELECT * from numero_receta";
            $result = mysqli_query($connection,$query);

            if(!$result){
                die(mysqli_error($connection));
            }
                    while($row = mysqli_fetch_array($result)){
                $num_receta = $row['num_receta'];
                }
                $num_receta +=1;
                echo "nuevo numero de receta: ".$num_receta;
                $query = "UPDATE numero_receta SET num_receta='$num_receta'";
                $result = mysqli_query($connection, $query);
                if(!$result){
                   die(mysqli_error($result)."Die tabla numero de receta");
                }
        }
        else{
        $row = mysqli_fetch_array($result);
        $num_receta = $row[0];
        echo "existe esa receta es la numero: ".$num_receta;
    }


        $id_producto = $_POST['id_producto_receta'];
        $id_insumo = $_POST['id_insumo'];
        $cantidad = $_POST['cantidad'];
        $uni_medida = $_POST['uni_medida'];
        $query = "INSERT into receta(num_receta, producto_id, id_insumo,cantidad,uni_medida) 
            VALUES ('$num_receta','$id_producto', '$id_insumo','$cantidad','$uni_medida')";
        $result = mysqli_query($connection, $query);
        if (!$result) {
          die(mysqli_error($connection));
        }
        echo "Proceso satisfactorio.";  
    }
?>