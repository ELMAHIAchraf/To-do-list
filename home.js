function menuControl(action){
    if(action=='open'){
        document.getElementById('menu').style.display='inline-block';
        document.getElementById('openMenu').style.display='none';

    }else{
        document.getElementById('openMenu').style.display='block';
        document.getElementById('menu').style.display='none';


    }
}
function controlTasksMenu(action, id_task){
    if(action=='open'){
        document.getElementById('Task').style.display='inline-block';

            let xhr = new XMLHttpRequest();
            xhr.onload=function(){
                if(xhr.status==200){
                    if(xhr.responseText){
                        let task=JSON.parse(xhr.responseText);
                        document.getElementById('idInput').value=task.id_task;
                        document.getElementById('nameInput').value=task.name_task;
                        document.getElementById('descriptionInput').value=task.description_task;
                        document.getElementById(task.name_list).setAttribute('selected', 'selected');
                        document.getElementById('dateInput').value=task.due_date;

                        if(task.subtasks){
                            let subtasks='';
                            for(let i=0; i < task.subtasks.length; i++){
                                subtasks+=`
                                    <div class='Subtask' id='${task.subtasks[i].id_subtask}' onmouseover="showTrash(${i})" onmouseleave="hideTrash(${i})">
                                        <i class='fa-duotone fa-list-tree icones'></i>
                                        <span class='text noMtext'>${task.subtasks[i].subtask}</span>
                                        <i class="fa-solid fa-trash-can subtaskTrash"  onclick="deleteSubtask(this.parentNode.id)" onmouseover="shakeTrash(${i})" onmouseleave="stopShaking(${i})"></i>
                                    </div>
                                `;
                            }
                            document.getElementById('subtasks').innerHTML=subtasks;
                        }else{
                            document.getElementById('subtasks').innerHTML="";
                        }

                    }
                }
            }
            xhr.open('POST', 'get_task_data.php', true)
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send('id_task='+id_task);

    }else{
        document.getElementById('Task').style.display='none';
    }   
}
function deleteSubtask(id_subtask){
    let subtask=document.getElementById(id_subtask).id;

    let xhr = new XMLHttpRequest();
            xhr.onload=function(){
                if(xhr.status==200){
                    if(xhr.responseText){
                        document.getElementById(id_subtask).style.display="none";
                        let count=document.getElementById(`subCount${xhr.responseText}`).innerHTML;
                        count--;
                        document.getElementById(`subCount${xhr.responseText}`).innerHTML=count;
                    }
                }
            }
            xhr.open('POST', 'remove_subtask.php', true)
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send('id_subtask='+subtask);
}
function shakeTrash(index){
    document.getElementsByClassName('subtaskTrash')[index].className="fa-solid fa-trash-can fa-shake subtaskTrash";
}
function stopShaking(index){
    document.getElementsByClassName('subtaskTrash')[index].className="fa-solid fa-trash-can subtaskTrash";
}

function showTrash(index){
    document.getElementsByClassName('subtaskTrash')[index].style.display='block';
    setTimeout(function(){
    document.getElementsByClassName('subtaskTrash')[index].style.opacity='1';
    document.getElementsByClassName('subtaskTrash')[index].style.transition='1s';
    });
}
function hideTrash(index){
    document.getElementsByClassName('subtaskTrash')[index].style.display='none';
    document.getElementsByClassName('subtaskTrash')[index].style.opacity='0';
}

let oldclicked='today';
function showMain(div){
    document.getElementById(div+"Opt").style.backgroundColor='#e4e4e4';
    document.getElementById(oldclicked+"Opt").style.backgroundColor='transparent';

    document.getElementById(div).style.display='inline-block';
    document.getElementById(oldclicked).style.display='none';
    oldclicked=div;
}

function displayStickyForm(){
    document.getElementById('name').value='';
    document.getElementById('description').value='';
    document.getElementById('transparent-bg').style.display='flex';
    document.getElementById('name').focus();
}

function displayListForm(){
    document.getElementById('nameList').value='';
    document.getElementById('transparent-bgL').style.display='flex';
    document.getElementById('nameList').focus();
}
function saveTaskChanges(){
    let name=document.getElementById('nameInput').value;
    let description=document.getElementById('descriptionInput').value;
    let list=document.getElementById('listInput').value;
    let date=document.getElementById('dateInput').value;
    let task=document.getElementById('idInput').value;

    let xhr = new XMLHttpRequest();
            xhr.onload=function(){
                if(xhr.status==200){
                    if(xhr.responseText){
                        let task=JSON.parse(xhr.responseText);
                        document.getElementById('nameInput').value=task.name_task;
                        document.getElementById('descriptionInput').value=task.description_task;
                        document.getElementById(task.name_list).setAttribute('selected', 'selected');
                        document.getElementById('dateInput').value=task.due_date;
                        document.getElementById('idInput').value=task.id_task;

                        document.getElementById('taskName'+task.id_task).innerHTML=task.name_task;
                        document.getElementById('taskDate'+task.id_task).innerHTML=task.due_dateS;
                        document.getElementById('taskListColor'+task.id_task).style.backgroundColor=task.color_list;
                        document.getElementById('taskListName'+task.id_task).innerHTML=task.name_list;

                        let oldList=document.getElementById('listCount'+task.oldId_list).innerHTML;
                        oldList--;
                        document.getElementById('listCount'+task.oldId_list).innerHTML=oldList;
                        let newList=document.getElementById('listCount'+task.id_list).innerHTML;
                        newList++;
                        document.getElementById('listCount'+task.id_list).innerHTML=newList;
                    }
                }
            }
            xhr.open('POST', 'modify_task_data.php', true)
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send('id_task='+task+'&name='+name+'&description='+description+'&list='+list+'&date='+date);
}

function deleteTask(){
    let task=document.getElementById('idInput').value;

    let xhr = new XMLHttpRequest();
            xhr.onload=function(){
                if(xhr.status==200){
                    if(xhr.responseText){
                        document.getElementById(task).remove();
                        let count=document.getElementById('todayCount').innerHTML;
                        count--;
                        document.getElementById('todayCount').innerHTML=count;

                        let countTask=document.getElementById('countTask').innerHTML;
                        countTask--;
                        document.getElementById('countTask').innerHTML=countTask;
                        let countList=document.getElementById('listCount'+xhr.responseText).innerHTML;
                        countList--;
                        document.getElementById('listCount'+xhr.responseText).innerHTML=countList;
                    }
                }
            }
            xhr.open('POST', 'remove_task.php', true)
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send('id_task='+task);
            document.getElementById('Task').style.display='none';
}
function displaySubtaskForm(){
    document.getElementById('nameS').value='';
    document.getElementById('transparent-bgS').style.display='flex';
    document.getElementById('nameS').focus();
}

function displayTaskForm(){
    document.getElementById('nameInputT').value='';
    document.getElementById('descriptionInputT').value='';
    document.getElementById('transparent-bgT').style.display='flex';
    document.getElementById('nameInputT').focus();
}