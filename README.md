# BMI Calculator – JavaScript Assignment

This project is a simple **BMI (Body Mass Index) Calculator** implemented using **HTML, CSS, and JavaScript** as part of the CSC 457 – Internet Technology course 

The application allows the user to enter basic personal information and calculates their BMI with a dynamic, user-friendly interface.

---

##  Features

- Collects the following inputs:
  - Name  
  - Email  
  - Gender (Male / Female)  
  - Weight (kg)  
  - Height (cm)

- Validates all fields:
  - Name: required, letters and spaces only  
  - Email: required, valid email format  
  - Gender: must be selected (no default)  
  - Weight & Height: required, numeric, greater than 0  

- Displays clear error messages next to invalid fields.
- Automatically removes error messages once the user corrects the input.
- Calculates BMI using a separate JavaScript function:
  ```js
  function calculateBMI(weightKg, heightCm) {
      var heightMeters = heightCm / 100;
      return weightKg / (heightMeters * heightMeters);
  }
---

##  Screenshots

Below are screenshots of the BMI Calculator interface and results.  
You can add your own images inside a `screenshots/` folder in the repository and update the paths.

### Main Form Page
![65B79F88-6044-4FA0-83A8-FCD48EDAC3E2_1_201_a](https://github.com/user-attachments/assets/cc634d2b-f694-44a1-9d96-89421af1fd99)


###  BMI Result Display
![3B88E847-DCA7-4F84-B6C5-881DCF18F051_1_201_a](https://github.com/user-attachments/assets/d7c8cdd0-bf59-4597-9201-c55c1a72bdf3)


###  Health Notes Section
![9DF0BC89-EB44-48B9-A4DD-4CD217464F5D_1_201_a](https://github.com/user-attachments/assets/f47cc314-6b30-4820-98e6-ce9e6cfcf699)

