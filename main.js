// Track current step
let currentStep = 1;
let formData = {};

// Initialize form with first step
window.onload = function() {
    showStep(currentStep);
    window.history.replaceState({step: currentStep}, "");
};

// Show specific step
function showStep(step) {
    document.querySelectorAll(".form-step").forEach(function(stepDiv) {
        stepDiv.style.display = "none";
    });
    document.getElementById(`step${step}`).style.display = "block";
}

// Move to the next step
function nextStep(step) {
    saveCurrentStepData();
    currentStep = step;
    window.history.pushState({step: currentStep}, "");
    showStep(currentStep);
}

// Move to the previous step
function prevStep(step) {
    saveCurrentStepData();
    currentStep = step;
    window.history.pushState({step: currentStep}, "");
    showStep(currentStep);
}

// Save data from the current step before moving to the next/previous one
function saveCurrentStepData() {
    const inputs = document.querySelectorAll(`#step${currentStep} input`);
    inputs.forEach(input => {
        formData[input.name] = input.value;
    });
}

// Repopulate the form fields with saved data
function populateFormData(step) {
    const inputs = document.querySelectorAll(`#step${step} input`);
    inputs.forEach(input => {
        input.value = formData[input.name] || "";
    });
}

// Handle back/forward navigation
window.onpopstate = function(event) {
    if (event.state && event.state.step) {
        currentStep = event.state.step;
        showStep(currentStep);
        populateFormData(currentStep);
    }
};

// Handle form submission
document.getElementById('multiStepForm').onsubmit = function(event) {
    event.preventDefault();
    saveCurrentStepData();
    console.log('Form submitted with data:', formData);
    alert('Form submitted successfully!');
};