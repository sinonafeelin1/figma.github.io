let workLog = [];

document.getElementById('start-work').addEventListener('click', function() {
    workLog.push({ startTime: new Date() });
    document.getElementById('start-time').textContent = workLog[workLog.length - 1].startTime.toLocaleTimeString();
});

document.getElementById('end-work').addEventListener('click', function() {
    workLog[workLog.length - 1].endTime = new Date();
    document.getElementById('end-time').textContent = workLog[workLog.length - 1].endTime.toLocaleTimeString();
});

document.getElementById('generate-report-day').addEventListener('click', function() {
    if (workLog.length === 0) {
        return;
    }

    const lastDayLogs = workLog.filter(log => isSameDay(log.startTime, new Date())).pop();
    
    if (lastDayLogs) {
        displayReport([lastDayLogs]);
    } else {
        document.getElementById('report').textContent = "Нет данных за последний отмеченный день";
    }
});

document.getElementById('generate-report-week').addEventListener('click', function() {
    const weekLogs = workLog.filter(log => isSameWeek(log.startTime, new Date()));
    displayReport(weekLogs);
});

function isSameDay(date1, date2) {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
}

function isSameWeek(date1, date2) {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
}

function displayReport(logs) {

    const reportElement = document.getElementById('report');

    reportElement.innerHTML = "<h2>Отчет</h2>";


    logs = logs.filter(log => {

        const timeDiff = new Date() - log.endTime; // Считаем разницу времени с текущим временем

        const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000; // Количество миллисекунд в 7 днях


        return timeDiff <= millisecondsInWeek; // Возвращаем true, если лог в пределах последних 7 дней

    });


    logs.forEach(log => {

        const workDuration = ((log.endTime - log.startTime) / (1000 * 60)).toFixed(2);


        const logItem = document.createElement('div');


        const startTimeSpan = document.createElement('span');

        startTimeSpan.textContent = `Начало: ${log.startTime.toLocaleTimeString()} `;


        const endTimeSpan = document.createElement('span');

        endTimeSpan.textContent = `Конец: ${log.endTime.toLocaleTimeString()} `;


        const durationSpan = document.createElement('span');

        durationSpan.textContent = `Длительность: ${workDuration} минут`;


        startTimeSpan.style.color = 'rgb(250, 234, 216)';

        endTimeSpan.style.color = 'rgb(250, 234, 216)';

        durationSpan.style.color = 'rgb(250, 234, 216)';

        reportElement.style.color = 'rgb(250, 234, 216)';




        logItem.appendChild(startTimeSpan);

        logItem.appendChild(endTimeSpan);

        logItem.appendChild(durationSpan);


        reportElement.appendChild(logItem);

    });

}



    // Отсортировать логи по дате в обратном порядке

    logs.sort((a, b) => b.startTime - a.startTime);


    // Получить текущую дату

    const currentDate = new Date();


    // Отобразить только логи за последние 7 дней

    const weekAgoDate = new Date(currentDate);

    weekAgoDate.setDate(currentDate.getDate() - 7);


    const logsToShow = logs.filter(log => log.startTime >= weekAgoDate);


    logsToShow.forEach(log => {

        const workDuration = ((log.endTime - log.startTime) / (1000 * 60)).toFixed(2);


        const logItem = document.createElement('div');

        const startTimePara = document.createElement('p');

        startTimePara.textContent = `Начало: ${log.startTime.toLocaleTimeString()}`;

        logItem.appendChild(startTimePara);


        const endTimePara = document.createElement('p');

        endTimePara.textContent = `Конец: ${log.endTime.toLocaleTimeString()}`;

        logItem.appendChild(endTimePara);


        const durationPara = document.createElement('p');

        durationPara.textContent = `Длительность: ${workDuration} минут`;

        logItem.appendChild(durationPara);


        reportElement.appendChild(logItem);

    });

    
    logs.forEach(log => {
        const workDuration = (log.endTime - log.startTime) / (1000 * 60); // в минутах

        const logItem = document.createElement('div');
        logItem.textContent = `Начало: ${log.startTime.toLocaleTimeString()} - Конец: ${log.endTime.toLocaleTimeString()} - Длительность: ${workDuration} минут`;
        reportElement.appendChild(logItem);
    });

    function openFrame() {
        // Здесь код для открытия нового фрейма
        // Например, можно изменить 'src' атрибут существующего iframe или создать новый iframe элемент
        var frame = document.getElementById('myFrame');
        frame.src = 'figma/LoginText/index.html'; // Укажите здесь путь к новому контенту для фрейма
      }


      document.addEventListener("wheel", function(e) {

if (e.ctrlKey) { // Проверяем, нажата ли клавиша Ctrl

e.preventDefault(); // Отменяем изменение масштаба страницы при зажатой клавише Ctrl
}
});

window.addEventListener('wheel', { passive: false });

window.addEventListener('wheel', function(e) {

    if (e.ctrlKey) { // Проверяем, была ли нажата клавиша Ctrl

        e.preventDefault(); // Отменяем действие прокрутки при удержании клавиши Ctrl

    }

});