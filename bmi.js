
// BMI CALCULATION FUNCTION

// This function converts height from cm to meters then applies the standard BMI formula: BMI = weightKg / (heightMeters^2)

function calculateBMI(weightKg, heightCm) {
    var heightMeters = heightCm / 100;
    return weightKg / (heightMeters * heightMeters);
}

document.addEventListener("DOMContentLoaded", function () {

    
    // Select all necessary elements

    var form = document.getElementById("bmiForm");

    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var genderSelect = document.getElementById("gender");
    var weightInput = document.getElementById("weight");
    var heightInput = document.getElementById("height");

    var resetBtn = document.getElementById("resetBtn");

    var resultSection = document.getElementById("resultSection");
    var resultName = document.getElementById("resultName");
    var resultEmail = document.getElementById("resultEmail");
    var resultGender = document.getElementById("resultGender");
    var resultBMI = document.getElementById("resultBMI");
    var resultCategory = document.getElementById("resultCategory");

    var healthNotesContainer = document.getElementById("healthNotesContainer");
    var healthNotes = document.getElementById("healthNotes");

    var fields = [nameInput, emailInput, genderSelect, weightInput, heightInput];

    
    // Highlight active fields
   
    fields.forEach(function (field) {
        field.addEventListener("focus", function () {
            field.classList.add("active-field");
        });

        field.addEventListener("blur", function () {
            field.classList.remove("active-field");
        });

        // Live validation for each field
        field.addEventListener("input", function () {
            validateField(field);
        });
    });

   
    // Update health notes on gender change
    
    genderSelect.addEventListener("change", function () {
        updateHealthNotes();
        validateGender();
    });

   
    // Handle Calculate button

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        handleCalculate();
    });

    // Handle Reset button

    resetBtn.addEventListener("click", function () {
        handleReset();
    });

   
    // MAIN CALCULATE FUNCTION
    
    function handleCalculate() {
        if (!validateForm()) {
            resultSection.style.display = "none";
            return;
        }

        var name = nameInput.value.trim();
        var email = emailInput.value.trim();
        var gender = genderSelect.value;
        var weight = parseFloat(weightInput.value);
        var height = parseFloat(heightInput.value);

        // Use the required calculateBMI function
        var bmi = calculateBMI(weight, height).toFixed(1);
        var categoryInfo = getBMICategory(bmi);

        // Fill results
        resultName.textContent = name;
        resultEmail.textContent = email;
        resultGender.textContent = gender === "male" ? "Male" : "Female";
        resultBMI.textContent = bmi;
        resultCategory.textContent = categoryInfo.label;

        // Apply color class to the whole result box
        resultSection.classList.remove("bmi-normal", "bmi-warning");
        resultSection.classList.add(categoryInfo.className);

        resultSection.style.display = "block";

        updateHealthNotes();
    }

    
    // RESET FUNCTION
  
    function handleReset() {
        // Clear all input values
        form.reset();

        // Remove error messages and styles
        clearAllErrors();
        fields.forEach(function (f) {
            f.classList.remove("active-field");
        });

        // Hide result box and remove color classes
        resultSection.style.display = "none";
        resultSection.classList.remove("bmi-normal", "bmi-warning");

        // Hide health notes section
        healthNotesContainer.style.display = "none";
        healthNotes.textContent = "";
    }

 
    // VALIDATION FUNCTIONS

    function validateForm() {
        return (
            validateName() &
            validateEmail() &
            validateGender() &
            validateWeight() &
            validateHeight()
        );
    }

    function validateField(field) {
        switch (field.id) {
            case "name": return validateName();
            case "email": return validateEmail();
            case "gender": return validateGender();
            case "weight": return validateWeight();
            case "height": return validateHeight();
        }
    }

    function validateName() {
        var value = nameInput.value.trim();
        if (value === "") return setError(nameInput, "nameError", "Name is required."), false;
        if (!/^[A-Za-z\s]+$/.test(value))
            return setError(nameInput, "nameError", "Letters only."), false;
        return clearError(nameInput, "nameError"), true;
    }

    function validateEmail() {
        var value = emailInput.value.trim();
        if (value === "") return setError(emailInput, "emailError", "Email is required."), false;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            return setError(emailInput, "emailError", "Invalid email."), false;
        return clearError(emailInput, "emailError"), true;
    }

    function validateGender() {
        if (genderSelect.value === "")
            return setError(genderSelect, "genderError", "Select gender."), false;
        return clearError(genderSelect, "genderError"), true;
    }

    function validateWeight() {
        var val = parseFloat(weightInput.value);
        if (isNaN(val) || val <= 0)
            return setError(weightInput, "weightError", "Enter valid weight."), false;
        return clearError(weightInput, "weightError"), true;
    }

    function validateHeight() {
        var val = parseFloat(heightInput.value);
        if (isNaN(val) || val <= 0)
            return setError(heightInput, "heightError", "Enter valid height."), false;
        return clearError(heightInput, "heightError"), true;
    }

    
    // ERROR HANDLING HELPERS
   
    function setError(field, id, msg) {
        document.getElementById(id).textContent = msg;
        field.classList.add("input-error");
    }

    function clearError(field, id) {
        document.getElementById(id).textContent = "";
        field.classList.remove("input-error");
    }

    function clearAllErrors() {
        document.querySelectorAll(".error").forEach(function (e) {
            e.textContent = "";
        });
        fields.forEach(function (f) {
            f.classList.remove("input-error");
        });
    }

 
    // BMI CATEGORY (COLOR + TEXT)

    function getBMICategory(bmi) {
        if (bmi < 18.5)
            return { label: "Underweight", className: "bmi-warning" };
        if (bmi <= 24.9)
            return { label: "Normal weight", className: "bmi-normal" };
        if (bmi <= 29.9)
            return { label: "Overweight", className: "bmi-warning" };
        return { label: "Obese", className: "bmi-warning" };
    }

   
    // HEALTH NOTES 
   
    function updateHealthNotes() {
        if (genderSelect.value === "") {
            healthNotesContainer.style.display = "none";
            healthNotes.textContent = "";
            return;
        }

        healthNotesContainer.style.display = "block";

        if (genderSelect.value === "male") {
            healthNotes.textContent =
                "Note for males: BMI is a general indicator and may not distinguish between muscle and fat mass. Athletic males may have a higher BMI but still have low body fat. Always combine BMI with other indicators such as body fat percentage, waist circumference, and regular medical evaluations.";
        } else {
            healthNotes.textContent =
                "Note for females: Hormonal changes across different life stages can influence BMI and weight distribution. BMI does not show how fat is distributed (hips vs abdomen). Always compare BMI with other measurements such as waist-to-hip ratio, metabolic health, and professional medical checkups.";
        }
    }
});
