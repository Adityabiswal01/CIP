document.getElementById('sales-form').addEventListener('submit', function(event) {
    event.preventDefault();
    calculateIncentive();
});

document.getElementById('holiday').addEventListener('change', function() {
    toggleHolidayDetails();
});

document.getElementById('message-option').addEventListener('change', function() {
    const messageOption = document.getElementById('message-option').value;
    if (messageOption === 'Yes') {
        displayMessageToAdmin();
    }
});

function calculateIncentive() {
    const sales = parseFloat(document.getElementById('sales').value);
    let incentive = 0;

    if (sales >= 50000) {
        incentive = sales * 0.05;
        showHolidayPackage();
    } else if (sales >= 30000) {
        incentive = sales * 0.035 + 1000;
    } else if (sales >= 20000) {
        incentive = sales * 0.03;
    } else if (sales >= 10000) {
        incentive = sales * 0.015;
    }

    document.getElementById('incentive').value = incentive.toFixed(2);

    // Show the incentive fields
    document.getElementById('incentive-fields').style.display = 'block';
}

function toggleHolidayDetails() {
    var holidaySelect = document.getElementById('holiday');
    var holidayDetailsDiv = document.getElementById('holiday-details');

    if (holidaySelect.value === 'Yes') {
        holidayDetailsDiv.style.display = 'block';
    } else {
        holidayDetailsDiv.style.display = 'none';
    }
}

function showHolidayPackage() {
    // Implement logic to show holiday package option
    document.getElementById('bonus').disabled = false;
    document.getElementById('holiday').disabled = false;
    document.getElementById('bonus-holiday-fields').style.display = 'block';
}

function displayMessageToAdmin() {
    // Implement logic to display a message to the admin
    document.getElementById('message-section').style.display = 'block';
}

document.getElementById('send-message-btn').addEventListener('click', function() {
    // Implement logic to send message to the user
    alert("Message sent to the user!");
});
