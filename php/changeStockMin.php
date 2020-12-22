<?php
  include('database.php');
  $stockmin = $_POST['stockmin'];
  $query = "UPDATE stock_minimo SET stock_min = '$stockmin'";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }
?>