
const fitnessForm = document.getElementById("fitnessForm");
const activityList = document.getElementById("activityList");

let activities = JSON.parse(localStorage.getItem("fitnessActivities")) || [];

// Update dashboard totals
function updateDashboard() {
    let totalSteps = 0;
    let totalCalories = 0;
    let totalMinutes = 0;

    activities.forEach(function(item) {
        totalSteps += item.steps;
        totalCalories += item.calories;
        totalMinutes += item.minutes;
    });

    document.getElementById("totalSteps").textContent = totalSteps;
    document.getElementById("totalCalories").textContent = totalCalories;
    document.getElementById("totalMinutes").textContent = totalMinutes;
}

// Display activity history
function displayActivities() {
    activityList.innerHTML = "";

    if (activities.length === 0) {
        activityList.textContent = "No activities added yet.";
        updateDashboard();
        return;
    }

    activities.forEach(function(item, index) {
        const activityItem = document.createElement("div");
        activityItem.className = "activity-item";

        const details = document.createElement("div");

        const heading = document.createElement("strong");
        heading.textContent = item.activity;

        const info = document.createElement("p");
        info.textContent =
            "Steps: " + item.steps +
            " | Calories: " + item.calories +
            " | Duration: " + item.minutes + " minutes";

        const date = document.createElement("small");
        date.textContent = item.date;

        details.appendChild(heading);
        details.appendChild(info);
        details.appendChild(date);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            deleteActivity(index);
        });

        activityItem.appendChild(details);
        activityItem.appendChild(deleteButton);

        activityList.appendChild(activityItem);
    });

    updateDashboard();
}

// Add new activity
fitnessForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const activity = document.getElementById("activity").value;
    const steps = Number(document.getElementById("steps").value);
    const calories = Number(document.getElementById("calories").value);
    const minutes = Number(document.getElementById("minutes").value);

    if (!activity || steps < 0 || calories < 0 || minutes <= 0) {
        alert("Please enter valid activity details.");
        return;
    }

    const newActivity = {
        activity: activity,
        steps: steps,
        calories: calories,
        minutes: minutes,
        date: new Date().toLocaleDateString()
    };

    activities.push(newActivity);

    localStorage.setItem(
        "fitnessActivities",
        JSON.stringify(activities)
    );

    fitnessForm.reset();
    displayActivities();

    alert("Activity added successfully!");
});

// Delete activity
function deleteActivity(index) {
    if (confirm("Are you sure you want to delete this activity?")) {
        activities.splice(index, 1);

        localStorage.setItem(
            "fitnessActivities",
            JSON.stringify(activities)
        );

        displayActivities();
    }
}

// Load saved activities when page opens
displayActivities();
