<?php
    include('connexion.php');

        if(isset($_POST['id_task']) and !empty($_POST['id_task'])){

                $id_task=trim(mysqli_escape_string($conn, htmlspecialchars($_POST['id_task'])));

                $sql="SELECT * FROM subtasks WHERE id_task=$id_task";
                $query=mysqli_query($conn, $sql);

                if(mysqli_num_rows($query)>0){
                    $sql="SELECT * FROM tasks NATURAL JOIN subtasks NATURAL JOIN lists WHERE id_task=$id_task AND id_user=1";
                }else{
                    $sql="SELECT * FROM tasks NATURAL JOIN lists WHERE id_task=$id_task AND id_user=1";
                }
                $wihichSql=$sql;
                $query1=mysqli_query($conn, $sql);
                $query2=mysqli_query($conn, $sql);
                $data=array();
                $tab1=mysqli_fetch_assoc($query1);
                $date=date_create("{$tab1['due_date']}");
                        $date=date_format($date,"Y-m-d");
                        
                        $data=array(
                                    'id_task'=>$tab1['id_task'],
                                    'name_task'=>$tab1['name_task'], 
                                    'description_task'=>$tab1['description_task'], 
                                    'name_list'=>$tab1['name_list'],
                                    'due_date'=>$date,
                                    );

                if($wihichSql=="SELECT * FROM tasks NATURAL JOIN subtasks NATURAL JOIN lists WHERE id_task=$id_task AND id_user=1"){
                    $subtasks=array();
                    while($tab2=mysqli_fetch_assoc($query2)){
                        $subtasks[]=array("subtask"=>$tab2['name_subtask'], "id_subtask"=>$tab2['id_subtask']);
                    }
                    $data['subtasks']=$subtasks;
                }
            echo json_encode($data);
        }
?>