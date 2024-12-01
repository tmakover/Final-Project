"use strict";

// Event listeners for buttons
document.getElementById("createMealPlan").addEventListener("click", createMealPlan);
document.getElementById("eraseForm").addEventListener("click", eraseForm);
document.getElementById("printMealPlan").addEventListener("click", printMealPlan);
document.getElementById("downloadMealPlan").addEventListener("click", downloadMealPlan);

// Function to create meal plan. Opens in a new window.
function createMealPlan() {
    let email = document.getElementById("email").value;

    // Check to make sure email is valid. If it's not, alert the user.
    if (!email.includes("@") || !email.includes(".")) {
        alert("Email address not valid. Please enter a valid email address.");
        return;
    }

    // Create HTML content when new window is opened.
    let contentOfMealPlan = `
    <html>
      <head>
        <title>Weekly Meal Plan</title>
        <link rel="stylesheet" href="styles.css">
      </head>
      <body>
        <div class="meal-plan-container">
          <h1>Your Weekly Meal Plan</h1>
          <p><strong>Name:</strong> ${document.getElementById("name").value}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Goal:</strong> ${document.getElementById("goal").value}</p>
          <h2>Meal Plan</h2>`;

    // Days and meals
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let meals = [
        { label: "Breakfast", idSuffix: "breakfast" },
        { label: "Snack #1", idSuffix: "first", extraSuffix: "Snack" },
        { label: "Lunch", idSuffix: "lunch" },
        { label: "Snack #2", idSuffix: "second", extraSuffix: "Snack" },
        { label: "Dinner", idSuffix: "dinner" }
    ];

    days.forEach(day => {
        contentOfMealPlan += `<div class="day-section"><h3>${day} Meal Plan</h3>`;
        meals.forEach(meal => {
            let mealId = meal.extraSuffix 
                ? `${meal.idSuffix}${day}${meal.extraSuffix}` 
                : `${meal.idSuffix}${day}`;
            let mealElement = document.getElementById(mealId);
            let mealValue = mealElement ? mealElement.value : "Nothing entered";
            contentOfMealPlan += `<p><strong>${meal.label}:</strong> ${mealValue}</p>`;
        });
        contentOfMealPlan += `</div>`;
    });

    contentOfMealPlan += `
        </div>
      </body>
    </html>`;

    // Save meal plan so it can be printed or downloaded
    window.generatedMealPlan = contentOfMealPlan;

    // Opens a new window and writes the newly created HTML
    let newWindow = window.open();
    newWindow.document.write(contentOfMealPlan);
}

// Function to clear the form
function eraseForm() {
    document.getElementById("mealForm").reset();
}

// Function to print the meal plan
function printMealPlan() {
    if (window.generatedMealPlan) {
        let printWindow = window.open();
        printWindow.document.write(window.generatedMealPlan);
        printWindow.print();
    } else {
        alert("Please create the meal plan first.");
    }
}

// Function to download the meal plan
function downloadMealPlan() {
    if (window.generatedMealPlan) {
        let blob = new Blob([window.generatedMealPlan], { type: "text/html" });
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "MealPlan.html";
        link.click();
    } else {
        alert("Please create the meal plan first.");
    }
}