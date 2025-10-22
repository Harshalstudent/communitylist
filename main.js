
document.addEventListener('DOMContentLoaded', () => {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }
    loadReminders(); // ← This ensures reminders reappear after refresh
});



function loadReminders() {
    const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    reminders.forEach(reminder => {
        displayReminder(reminder);
        scheduleAlarm(reminder.date, reminder.time, reminder.event);
    });
}




let menu_toggle = document.getElementById('menu-toggle');
console.log(menu_toggle);

let link_menu = document.querySelector('nav ul');
console.log(link_menu);

let links = document.querySelectorAll('nav ul li a');
console.log(links);


menu_toggle.addEventListener('click', function () {
    link_menu.classList.toggle('open');
});

links.forEach(link => {
    link.addEventListener('click', function () {
        link_menu.classList.remove('open');
    });
});



links[0].addEventListener('click', function () {
    link_menu.classList.remove('open');
});


links[1].addEventListener('click', function () {
    link_menu.classList.remove('open');
});


links[2].addEventListener('click', function () {
    link_menu.classList.remove('open');
});
links[3].addEventListener('click', function () {
    link_menu.classList.remove('open');
});




document.addEventListener('DOMContentLoaded', () => {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }
    loadReminders();
});

function addReminder() {
    const date = document.getElementById('datePicker').value;
    const time = document.getElementById('timePicker').value;
    const event = document.getElementById('eventInput').value;

    if (!date || !time || !event) {
        alert('Please fill out all fields.');
        return;
    }

    const reminder = {
        id: Date.now(),
        date,
        time,
        event
    };

    saveReminder(reminder);
    displayReminder(reminder);
    scheduleAlarm(date, time, event);
    document.getElementById('eventInput').value = '';
}

function saveReminder(reminder) {
    const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    reminders.push(reminder);
    localStorage.setItem('reminders', JSON.stringify(reminders));
}

function loadReminders() {
    const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    reminders.forEach(reminder => {
        displayReminder(reminder);
        scheduleAlarm(reminder.date, reminder.time, reminder.event);
    });
}

function displayReminder(reminder) {
    const reminderList = document.getElementById('reminderList');
    const li = document.createElement('li');
    li.setAttribute('data-id', reminder.id);
    li.innerHTML = `
    <strong>${reminder.date} ${reminder.time}</strong> - ${reminder.event}
    <button onclick="editReminder(${reminder.id})">Edit</button>
    <button onclick="deleteReminder(${reminder.id})">Delete</button>
  `;
    reminderList.appendChild(li);
}

function deleteReminder(id) {
    let reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    reminders = reminders.filter(r => r.id !== id);
    localStorage.setItem('reminders', JSON.stringify(reminders));
    document.querySelector(`[data-id="${id}"]`).remove();
}

function editReminder(id) {
    const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    const reminder = reminders.find(r => r.id === id);
    if (reminder) {
        document.getElementById('datePicker').value = reminder.date;
        document.getElementById('timePicker').value = reminder.time;
        document.getElementById('eventInput').value = reminder.event;
        deleteReminder(id);
    }
}

function scheduleAlarm(date, time, event) {
    const alarmTime = new Date(`${date}T${time}`);
    const now = new Date();
    const delay = alarmTime - now;

    if (delay > 0) {
        setTimeout(() => {
            if (Notification.permission === 'granted') {
                new Notification('Reminder', { body: event });
            } else {
                alert(`Reminder: ${event}`);
            }
        }, delay);
    }
}