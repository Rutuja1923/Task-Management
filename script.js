document.addEventListener('DOMContentLoaded', () => {

    const mainContainer = document.querySelector('.main-container');
    const formDiv = document.querySelector('.form-div');
    const filtersDiv = document.querySelector('.filters-div');
    const tasksContainer = document.querySelector('.tasks-container');
    const pendingTasks = document.querySelector('.pending-tasks-container');
    const completedTasks = document.querySelector('.completed-tasks-container');

    //adding date 
    mainContainer.querySelector('h4').innerText = `${getToday()}`;

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