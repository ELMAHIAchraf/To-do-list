<?php
    include('connexion.php');

        if(isset($_POST['name']) and !empty($_POST['name']) &&
           isset($_POST['color']) and !empty($_POST['color'])){

                $name=trim(mysqli_escape_string($conn, htmlspecialchars($_POST['name'])));
                $color=trim(mysqli_escape_string($conn, htmlspecialchars($_POST['color'])));

                $sql="INSERT INTO lists VALUES('', 1, '$name', '$color')";
                if(mysqli_query($conn, $sql)){
                    $tab=array("name"=>$name, "color"=>$color);
                    echo json_encode($tab);
                }else{
                    echo "Error:".mysqli_error($conn);
                }

           }
?>