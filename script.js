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