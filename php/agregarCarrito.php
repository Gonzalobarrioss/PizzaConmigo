<?php
    include('database.php');
    if(isset($_POST['id_persona'])) {
        $persona = $_POST['id_persona'];
        $producto = $_POST['id_producto'];
        $tipoPago = $_POST['tipo_pago'];
        $cantidad = $_POST['cantidad'];
        $precio = $_POST['precio'];

        $query = "SELECT * FROM carrito where id_producto = '$producto'";
        $result = mysqli_query($connection,$query);
        if($result->num_rows == 0){
          $query = "INSERT into carrito(id_persona, id_producto,tipo_pago,cantidad,precio) 
            VALUES ('$persona', '$producto', '$tipoPago', '$cantidad', '$precio')";
          $result = mysqli_query($connection, $query);
          if (!$result) {
            die('Query Failed.');
          }
          echo "Proceso satisfactorio.";
        }
        else{
          while($row = mysqli_fetch_array($result)){
            $cantidadTotal = $row['cantidad'];
          }
          $cantidadTotal += $cantidad;
          $query = "UPDATE carrito SET cantidad = '$cantidadTotal' WHERE id_producto = '$producto'";
          $result = mysqli_query($connection,$query);
          if(!$result){
            die(mysqli_error($connection));
          }
        }
          
      }
?>