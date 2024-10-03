function validateForm() {
    let isValid = true;

    // Clear previous validation messages
    document.querySelectorAll("span").forEach(span => span.innerHTML = "");

    // Employee ID validation
    const empid = document.getElementById("empid").value;
    if (empid === "") {
        document.getElementById("spanEmpid").innerHTML = "Employee ID is required.";
        isValid = false;
    } else if (empid.length < 5) {
        document.getElementById("spanEmpid").innerHTML = "Employee ID should be at least 5 characters long.";
        isValid = false;
    }

    // Employee Name validation
    const empname = document.getElementById("empname").value;
    if (empname === "") {
        document.getElementById("spanEmpname").innerHTML = "Employee Name is required.";
        isValid = false;
    }

    // Age validation
    const age = document.getElementById("age").value;
    if (age === "") {
        document.getElementById("spanAge").innerHTML = "Age is required.";
        isValid = false;
    } else if (isNaN(age) || age <= 0) {
        document.getElementById("spanAge").innerHTML = "Age should be a number greater than zero.";
        isValid = false;
    }

    // Gender validation
    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
        document.getElementById("spanGender").innerHTML = "Gender is required.";
        isValid = false;
    }

    // Designation validation
    const designation = document.getElementById("designation").value;
    if (designation === "") {
        document.getElementById("spanDesignation").innerHTML = "Designation is required.";
        isValid = false;
    }

    // Salary validation
    const salary = document.getElementById("salary").value;
    if (salary === "") {
        document.getElementById("spanSalary").innerHTML = "Salary is required.";
        isValid = false;
    }

    // Location validation
    const location = document.getElementById("location").value;
    if (location === "") {
        document.getElementById("spanLocation").innerHTML = "Location is required.";
        isValid = false;
    }

    // Email validation
    const email = document.getElementById("email").value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        document.getElementById("spanEmail").innerHTML = "Email ID is required.";
        isValid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById("spanEmail").innerHTML = "Email ID should be in the proper format.";
        isValid = false;
    }

    // Date of Joining validation
    const doj = document.getElementById("doj").value;
    const dojPattern = /^\d{2}-\d{2}-\d{4}$/;
    if (doj === "") {
        document.getElementById("spanDoj").innerHTML = "Date of joining is required.";
        isValid = false;
    } else if (!dojPattern.test(doj)) {
        document.getElementById("spanDoj").innerHTML = "Date of joining should be in dd-mm-yyyy format.";
        isValid = false;
    }

    // Contact validation
    const contact = document.getElementById("contact").value;
    if (contact === "") {
        document.getElementById("spanContact").innerHTML = "Contact number is required.";
        isValid = false;
    }

    if (isValid) {
        alert("Form submitted successfully!");
    }
}