document.addEventListener('DOMContentLoaded', () => {

    const mainContainer = document.querySelector('.main-container');
    const formDiv = document.querySelector('.form-div');
    const filtersDiv = document.querySelector('.filters-div');
    const tasksContainer = document.querySelector('.tasks-container');
    const pendingTasks = document.querySelector('.pending-tasks-container');
    const completedTasks = document.querySelector('.completed-tasks-container');

    const tasksList = [] ;
    let counter = -1 ;

    //adding date 
    mainContainer.querySelector('h4').innerText = `${getToday()}`;

    //new-task-button
    const newTaskBtn = document.getElementById('new-task-btn');
    newTaskBtn.addEventListener('click', () => {
        if (formDiv.style.display === 'none') {
            formDiv.style.display = 'block';
        }
    });

    //close - form - button
    const closeFormtBtn = document.getElementById('close-form');
    closeFormtBtn.addEventListener('click' , () => {
        if (formDiv.style.display === 'block') {
            formDiv.style.display = 'none';
        }
    });

    //to validate due date
    const validateDueDate = (input) => {
        let today = getTodaysDate() ;

        //empty value
        if (!input.value) {
            input.setCustomValidity("Please Select a Due Date!");
        }
        //date less than today
        else if (input.value && input.value < today) {
            input.setCustomValidity("Due Date Already Over, Please Select Valid Date !");
        }
        //incase of valid due date
        else {
            input.setCustomValidity("");
        }
    }

    //add the validation function to handle invalid and input events
    const dueDateInput = document.getElementById('task-due-date');
    if (dueDateInput) {
        dueDateInput.addEventListener("invalid", () => validateDueDate(dueDateInput));
        dueDateInput.addEventListener("input", () => validateDueDate(dueDateInput));
    }

    //handling submission of input form
    const addTaskForm = document.getElementById('add-task-form');
    addTaskForm.addEventListener('submit', (event) => {
        event.preventDefault();

        dueDateInput && validateDueDate(dueDateInput);  //validating the due date

        if (! addTaskForm.checkValidity()) {
            return;                         //if validation failed , return !
        }

        const titleInput = document.getElementById('task-title');
        const descriptionInput = document.getElementById('task-desc');
        const priorityInput = document.getElementById('task-priority');

        //getting a unique id for each div
        const uniqueId = Date.now() + Math.random().toString(36).substring(2, 9);

        //creating an object for each task
        let task = {
            id : uniqueId,
            title : titleInput.value.trim(),
            description : descriptionInput.value.trim(),
            priority : priorityInput.value,
            dueDate : dueDateInput.value,
        };

        //adding new task to the tasksList array
        tasksList.push(task);
        counter += 1 ;
        console.log(tasksList);

        //create a tas-div for each newly added task
        getTaskDiv(tasksList[counter]);

        //restting the input values
        addTaskForm.reset();  

    });

    //search - by - filters - button - handler
    const searchByFiltersBtn = document.getElementById('search-by-filters');
    searchByFiltersBtn.addEventListener('click', () => {
        if (filtersDiv.style.display === 'none') {
            filtersDiv.style.display = 'block';
        }    
    });

    //close - filters - form - button
    const closeFiltersFormBtn = document.getElementById('close-filters-form');
    closeFiltersFormBtn.addEventListener('click', ()=> {
        if (filtersDiv.style.display === 'block') {
            filtersDiv.style.display = 'none';
        } 
    });

    //handling submission of filters form
    const filtersFrom = document.getElementById('filters-form');
    filtersFrom.addEventListener('submit', (event) => {
        event.preventDefault();
    });

    //function to create the task div
    const getTaskDiv = (task) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task-div');
        taskDiv.classList.add('pending-task');
        taskDiv.setAttribute('id',`${task.id}`);
        console.log(taskDiv.id);

        const markAsCompleted = document.createElement('button');
        markAsCompleted.setAttribute('id','tick-mark');
        markAsCompleted.innerHTML = '<span><i class="fa fa-check-circle" <i class="fa fa-check-circle"></i></span>'
        markAsCompleted.addEventListener('click', () => {
            handleCompletedTask(task.id);
        });
        taskDiv.appendChild(markAsCompleted);

        const titleHead = document.createElement('h3');
        titleHead.setAttribute('id' , 'title-head');
        titleHead.innerText = task.title ;
        taskDiv.appendChild(titleHead);

        const desc = document.createElement('p');
        if (task.description) {
            desc.innerText = task.description ;
        }
        else{
            desc.innerText = `Edit to Add Description...`;
        }
        taskDiv.appendChild(desc);

        const prty = document.createElement('p');
        prty.innerText = task.priority;
        taskDiv.appendChild(prty);

        const due = document.createElement('p');
        due.innerText = task.dueDate;
        taskDiv.appendChild(due);

        const utilityDiv = document.createElement('div');
        utilityDiv.classList.add('utility-div');

        const editSpan = document.createElement('span');
        editSpan.setAttribute('id','edit-icon');
        editSpan.innerHTML = `<i class="fa fa-pencil fa-fw" aria-hidden="true"></i>`;
        editSpan.addEventListener('click' , () => {
            editTask(task);
        });
        utilityDiv.appendChild(editSpan);

        const deleteSpan = document.createElement('span');
        deleteSpan.setAttribute('id','delete-icon');
        deleteSpan.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;
        deleteSpan.addEventListener('click' , () => {
            deleteTask(task.taskId);
        });
        utilityDiv.appendChild(deleteSpan);

        taskDiv.appendChild(utilityDiv);

        pendingTasks.appendChild(taskDiv);
    }

    const editTask = (task) => {
        console.log('editing task');

    }

    const deleteTask = (taskId) => {
        const currTaskDiv = document.getElementById(`${taskId}`);

        const confirmDelete = document.createElement('div');
        confirmDelete.classList.add('confirm-delete');
        confirmDelete.innerHTML = `
            <p>This task will be permanently deleted. Do you want to proceed?</p>
            <div>
                <button id='ok-btn'>Ok</button>
                <button id='cancel-btn'>Cancel</button>
            </div>
        `;
        currTaskDiv.appendChild(confirmDelete);
        currTaskDiv.getElementById('ok-btn').addEventListener('click',() => {
            currTaskDiv.style.display = 'none';
            if (currTaskDiv.classList.contains('pending-tasks-container')) {
                pendingTasks.removeChild(currTaskDiv);
            }
            else if (currTaskDiv.classList.contains('completed-tasks-container')) {
                completedTasks.removeChild(currTaskDiv);
            }
            //currTaskDiv.remove();
            tasksList = tasksList.filter(task => 
                task.id !== taskId
            );
        });
        currTaskDiv.getElementById('cancel-btn').addEventListener('click', () => {
            confirmDelete.style.display = 'none';
        });
        
    }

    const handleCompletedTask = (taskId) => {
        const currTaskDiv = document.getElementById(`${taskId}`);
        const tickmark = document.getElementById('tick-mark');


        if (currTaskDiv.classList.contains('pending-task')) {
            currTaskDiv.classList.add('completed-task');
            currTaskDiv.classList.remove('pending-task');
            document.getElementById('title-head').style.textDecoration = 'line-through';
            currTaskDiv.style.color = '#616060' ;
            currTaskDiv.style.backgroundColor = "rgb(215,525,225)";
            tickmark.style.color = "green" ;
            document.getElementById('edit-icon').disabled = true ;
            document.getElementById('delete-icon').disabled = true ;
            pendingTasks.removeChild(currTaskDiv);
            completedTasks.appendChild(currTaskDiv);            
        }
        else {
            currTaskDiv.classList.remove('completed-task');
            currTaskDiv.classList.add('pending-task');
            document.getElementById('title-head').style.textDecoration = 'none'; 
            currTaskDiv.style.color = 'black';
            currTaskDiv.style.backgroundColor = ""; 
            tickmark.style.color = "" ;
            document.getElementById('edit-icon').disabled = false; 
            document.getElementById('delete-icon').disabled = false;
            completedTasks.removeChild(currTaskDiv);
            pendingTasks.appendChild(currTaskDiv);
        }
    }
});

//utility functions
//todays - date
const getTodaysDate = () => {
    const today = new Date();
    const date = String(today.getDate()).padStart(2 , '0');
    const mon = String(today.getMonth() + 1 ).padStart(2 , '0');
    const year = today.getFullYear() ;
    return `${year}-${mon}-${date}` ;
}
//todays date -> day date month year
const getToday = () => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const today = new Date();
    const date = today.getDate();
    const day = dayNames[today.getDay()];
    const mon = monthNames[today.getMonth()];
    const year = today.getFullYear();
    return `${day}, ${date} ${mon} ${year}`;
}