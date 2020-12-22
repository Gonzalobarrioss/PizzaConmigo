<?php
  include('database.php');
  $query = "SELECT * from stock_minimo";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }
  while($row = mysqli_fetch_array($result)) {
    echo $row['stock_min'];
  }
?>