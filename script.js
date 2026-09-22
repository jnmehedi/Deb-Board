const body = document.getElementById("body");

const completedCount = document.getElementById("completedCount");

const assignedCount = document.getElementById("assignedCount");

const historyContainer = document.getElementById("historyContainer");

const clearHistory = document.getElementById("clearHistory");

const colorButton = document.getElementById("colorButton");

const discoverButton = document.getElementById("discoverButton");

const completeButtons = document.querySelectorAll(".complete-btn");


let completedTasks = Number(localStorage.getItem("completedTasks")) || 23;

let assignedTasks = Number(localStorage.getItem("assignedTasks")) || 6;

let history = JSON.parse(localStorage.getItem("history")) || [];

let currentColorIndex =
    Number(localStorage.getItem("colorIndex")) || 0;


const colors = [
    "#f1f5ff",
    "#dff5ec",
    "#fff1df",
    "#fce4ec",
    "#eee7ff",
    "#e1f1ff"
];


function updateCounters() {

    completedCount.textContent = completedTasks;

    assignedCount.textContent =
        String(assignedTasks).padStart(2, "0");

}


function saveCounters() {

    localStorage.setItem(
        "completedTasks",
        completedTasks
    );

    localStorage.setItem(
        "assignedTasks",
        assignedTasks
    );

}


function saveHistory() {

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

}


function getCurrentTime() {

    const now = new Date();

    return now.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit"
    });

}


function addHistory(taskName) {

    const time = getCurrentTime();

    const message =
        `You have completed the task ${taskName} at ${time}.`;

    history.unshift(message);

    saveHistory();

    renderHistory();

}


function renderHistory() {

    historyContainer.innerHTML = "";

    if (history.length === 0) {

        historyContainer.innerHTML = `
            <div class="bg-[#f3f5ff] rounded-lg p-4 text-gray-500">
                No activity yet.
            </div>
        `;

        return;
    }


    history.forEach(function (item) {

        const historyItem =
            document.createElement("div");

        historyItem.className =
            "bg-[#f3f5ff] rounded-lg p-4 text-gray-700 leading-6";

        historyItem.textContent = item;

        historyContainer.appendChild(historyItem);

    });

}


function applyBackgroundColor() {

    body.style.backgroundColor =
        colors[currentColorIndex];

    localStorage.setItem(
        "colorIndex",
        currentColorIndex
    );

}


function changeBackgroundColor() {

    currentColorIndex++;

    if (currentColorIndex >= colors.length) {

        currentColorIndex = 0;

    }

    applyBackgroundColor();

}


function completeTask(button) {

    const taskCard =
        button.closest(".task-card");

    const taskName =
        taskCard.dataset.task;


    if (button.disabled) {

        return;

    }


    button.disabled = true;

    button.textContent = "Completed";


    button.classList.remove(
        "bg-blue-600",
        "hover:bg-blue-700"
    );


    button.classList.add(
        "bg-gray-500",
        "cursor-not-allowed"
    );


    completedTasks++;

    assignedTasks--;


    if (assignedTasks < 0) {

        assignedTasks = 0;

    }


    updateCounters();

    saveCounters();

    addHistory(taskName);

}


completeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        completeTask(button);

    });

});


clearHistory.addEventListener("click", function () {

    history = [];

    saveHistory();

    renderHistory();

});


colorButton.addEventListener("click", function () {

    changeBackgroundColor();

});


discoverButton.addEventListener("click", function () {

    window.location.href = "blog.html";

});


function showCurrentDate() {

    const today = new Date();


    const dayName =
        today.toLocaleDateString("en-US", {
            weekday: "short"
        });


    const month =
        today.toLocaleDateString("en-US", {
            month: "short"
        });


    const day =
        today.getDate();


    const year =
        today.getFullYear();


    document.getElementById("dayName").textContent =
        dayName;


    document.getElementById("dateText").innerHTML =
        `${month}<br>${day},<br>${year}`;

}


updateCounters();

renderHistory();

applyBackgroundColor();

showCurrentDate();