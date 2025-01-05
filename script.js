document.addEventListener('DOMContentLoaded', () => {

    const mainContainer = document.querySelector('.main-container');
    const formDiv = document.querySelector('.form-div');
    const filtersDiv = document.querySelector('.filters-div');
    const tasksContainer = document.querySelector('.tasks-container');
    const pendingTasks = document.querySelector('.pending-tasks-container');
    const completedTasks = document.querySelector('.completed-tasks-container');

    let tasksList = [] ;
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
        formDiv.style.display = 'none';
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
        filtersDiv.style.display = 'none';
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
        titleHead.setAttribute('id' , `title-${task.id}`);
        titleHead.innerText = task.title ;
        taskDiv.appendChild(titleHead);

        const desc = document.createElement('p');
        desc.setAttribute('id',`desc-${task.id}`)
        if (task.description) {
            desc.innerText = task.description ;
        }
        else{
            desc.innerText = `Edit to Add Description...`;
        }
        taskDiv.appendChild(desc);

        const prty = document.createElement('p');
        prty.setAttribute('id',`priority-${task.id}`)
        prty.innerText = task.priority;
        taskDiv.appendChild(prty);

        const due = document.createElement('p');
        due.setAttribute('id',`due-${task.id}`);
        due.innerText = task.dueDate;
        taskDiv.appendChild(due);

        const utilityDiv = document.createElement('div');
        utilityDiv.classList.add('utility-div');

        const editSpan = document.createElement('span');
        editSpan.setAttribute('id','edit-icon');
        editSpan.innerHTML = `<i class="fa fa-pencil fa-fw" aria-hidden="true"></i>`;
        editSpan.addEventListener('click' , () => {
            editTask(task.id);
        });
        utilityDiv.appendChild(editSpan);

        const deleteSpan = document.createElement('span');
        deleteSpan.setAttribute('id','delete-icon');
        deleteSpan.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;
        deleteSpan.addEventListener('click' , () => {
            deleteTask(task.id);
        });
        utilityDiv.appendChild(deleteSpan);

        taskDiv.appendChild(utilityDiv);

        pendingTasks.appendChild(taskDiv);
    }

    const editTask = (taskId) => {
        console.log('editing task');
        console.log(taskId);
        let taskToEdit = tasksList.find(task => task.id === taskId);
        console.log(taskToEdit); 

        const editFormDiv = document.createElement('div');
        editFormDiv.setAttribute('id','edit-form-div');
        
        const editTaskForm = document.createElement('form');
        editTaskForm.setAttribute('action','');
        editTaskForm.setAttribute('id','edit-task-form');

        const titleLabel = createLabel("Task Title", "task-title");
        const titleInput = createInput("text", "title", "task-title", "Enter Task Title ...", taskToEdit.title, true, "Please Provide a Task Title!");

        const descLabel = createLabel("Description", "task-desc");
        const descInput = createInput("text", "desc", "task-desc", "Enter Task Description ...", taskToEdit.description);

        const priorityLabel = createLabel("Priority Level", "task-priority");
        const prioritySelect = document.createElement("select");
        prioritySelect.setAttribute("name", "priority");
        prioritySelect.setAttribute("id", "task-priority");
        prioritySelect.setAttribute("required", true);
        prioritySelect.setAttribute("oninvalid", "this.setCustomValidity('Please Select Task Priority!')");
        prioritySelect.setAttribute("oninput", "this.setCustomValidity('')");

        const priorities = ["", "Low", "Medium", "High"];
        priorities.forEach(priority => {
            const option = document.createElement("option");
            option.value = priority;
            option.textContent = priority === "" ? "Select Priority" : priority;
            if (priority === taskToEdit.priority) {
                option.selected = true;
            }
            prioritySelect.appendChild(option);
        });

        const dueDateLabel = createLabel("Due Date", "task-due-date");
        const dueDateInput = createInput("date", "due", "task-due-date", "", taskToEdit.dueDate, true, "");

        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.id = "save-task";
        submitButton.textContent = "Save";

        editTaskForm.appendChild(titleLabel);
        editTaskForm.appendChild(titleInput);
        editTaskForm.appendChild(document.createElement("br"));

        editTaskForm.appendChild(descLabel);
        editTaskForm.appendChild(descInput);
        editTaskForm.appendChild(document.createElement("br"));

        editTaskForm.appendChild(priorityLabel);
        editTaskForm.appendChild(prioritySelect);
        editTaskForm.appendChild(document.createElement("br"));

        editTaskForm.appendChild(dueDateLabel);
        editTaskForm.appendChild(dueDateInput);
        editTaskForm.appendChild(document.createElement("br"));

        editTaskForm.appendChild(submitButton);

        editFormDiv.appendChild(editTaskForm);

        pendingTasks.appendChild(editFormDiv);

        editTaskForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(editTaskForm);

            const updatedTask = {
                id: taskId,
                title: formData.get("title"),
                description: formData.get("desc"),
                priority: formData.get("priority"),
                dueDate: formData.get("due"),
            };
            tasksList = tasksList.map(task => (task.id === taskId ? updatedTask : task));
            console.log(tasksList);
            editTaskForm.style.display = 'none';

            //const taskEditDiv = document.getElementById(taskId);
            document.getElementById(`title-${taskId}`).innerText = formData.get("title");
            document.getElementById(`desc-${taskId}`).innerText = formData.get("desc");
            document.getElementById(`priority-${taskId}`).innerText = formData.get("priority");
            document.getElementById(`due-${taskId}`).innerText = formData.get("due");
        });

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

        const okBtn = confirmDelete.querySelector('#ok-btn');
        const cancelBtn = confirmDelete.querySelector('#cancel-btn');

        okBtn.addEventListener('click',() => {
            currTaskDiv.style.display = 'none';
            if (currTaskDiv.classList.contains('pending-task')) {
                pendingTasks.removeChild(currTaskDiv);
            }
            else if (currTaskDiv.classList.contains('completed-task')) {
                completedTasks.removeChild(currTaskDiv);
            }
            //currTaskDiv.remove();
            tasksList = tasksList.filter(task => 
                task.id !== taskId
            );
        });
        cancelBtn.addEventListener('click', () => {
            confirmDelete.style.display = 'none';
        });
    }

    const handleCompletedTask = (taskId) => {
        const currTaskDiv = document.getElementById(`${taskId}`);
        const tickmark = currTaskDiv.querySelector('#tick-mark');
        const editIcon = currTaskDiv.querySelector('#edit-icon');
        const deleteIcon = currTaskDiv.querySelector('#delete-icon');
        const titleHead = currTaskDiv.querySelector('#title-head');

        if (currTaskDiv.classList.contains('pending-task')) {
            currTaskDiv.classList.add('completed-task');
            currTaskDiv.classList.remove('pending-task');
            titleHead.style.textDecoration = 'line-through';
            currTaskDiv.style.color = '#616060' ;
            currTaskDiv.style.backgroundColor = "rgb(215,525,225)";
            tickmark.style.color = "green" ;
            editIcon.disabled = true;
            deleteIcon.disabled = true;
            editIcon.style.pointerEvents = 'none'; 
            deleteIcon.style.pointerEvents = 'none';
            pendingTasks.removeChild(currTaskDiv);
            completedTasks.appendChild(currTaskDiv);            
        }
        else {
            currTaskDiv.classList.remove('completed-task');
            currTaskDiv.classList.add('pending-task');
            titleHead.style.textDecoration = 'none'; 
            currTaskDiv.style.color = 'black';
            currTaskDiv.style.backgroundColor = ""; 
            tickmark.style.color = "" ;
            editIcon.disabled = false;
            deleteIcon.disabled = false;
            editIcon.style.pointerEvents = 'auto';
            deleteIcon.style.pointerEvents = 'auto';
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

//function to create label
function createLabel(labelText, forId) {
    const label = document.createElement("label");
    label.setAttribute("for", forId);
    label.textContent = labelText;
    return label;
}

//function to create input
function createInput(type, name, id, placeholder, value = "", required = false, invalidMsg = "") {
    const input = document.createElement("input");
    input.setAttribute("type", type);
    input.setAttribute("name", name);
    input.setAttribute("id", id);
    if (placeholder) {
        input.setAttribute("placeholder", placeholder);
    }
    if (value) {
        input.setAttribute("value", value);
    }
    if (required && type !== "date") {
        input.setAttribute("required", true);
        input.setAttribute("oninvalid", `this.setCustomValidity('${invalidMsg}')`);
        input.setAttribute("oninput", "this.setCustomValidity('')");
    }
    else if (required && type === "date") {
        input.addEventListener("invalid", () => validateDueDate(input));
        input.addEventListener("input", () => validateDueDate(input));
    }
    return input;
}