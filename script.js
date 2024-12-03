document.addEventListener('DOMContentLoaded', () => {

    const mainContainer = document.querySelector('.main-container');
    const formDiv = document.querySelector('.form-div');
    const filtersDiv = document.querySelector('.filters-div');
    const tasksContainer = document.querySelector('.tasks-container');
    const pendingTasks = document.querySelector('.pending-tasks-container');
    const completedTasks = document.querySelector('.completed-tasks-container');

    //adding date 
    mainContainer.querySelector('h4').innerText = `${getToday()}`;

    //new-task-button
    const newTaskBtn = document.getElementById('new-task-btn');
    newTaskBtn.addEventListener('click', () => {
        console.log('clicked new task btn');
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
    });

    //add - task - button
    const addTaskBtn = document.getElementById('add-task');
    addTaskBtn.onclick = () => {
        console.log('clicked add');
        console.log('calling getTaskDiv()');
        getTaskDiv();
    };

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