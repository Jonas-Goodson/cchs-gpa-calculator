
// deleteGrades is called everytime the user clicks the reset button above the Yearly GPA. 
function deleteGrades() {
  // Remove all classes
  Classes = [];

  // Update GPA Text
  document.getElementById("unweightedGPA").innerText = "Unweighted:";
  document.getElementById("weightedGPA").innerText = "Weighted:";
}


class YearlyClass {
  constructor(semester1, semester2, isHonors) {
    this.semester1 = semester1;
    this.semester2 = semester2;
    this.isHonors = isHonors;
  }
}

var Classes = [];

// addGrades is called every time the user clicks the "Add Grades" button, the value of the input box is added to the Classes array.
function addGrades(grade1, grade2, isHonors) {

  var newYearlyClass = new YearlyClass((grade1 == "") ? -1 : Math.abs(Number(grade1)), (grade2 == "") ? -1 : Math.abs(Number(grade2)), isHonors);

  // Insert grade in Grades.
  Classes.push(newYearlyClass);

  // Calculate GPA.
  var unweightedGPA = calculateUnweightedGPA();
  var weightedGPA = calculateWeightedGPA(unweightedGPA);
  // Resets inputs.
  document.getElementById("semester1Input").value = "";
  document.getElementById("semester2Input").value = "";
  document.getElementById("honors").checked = false;
  // Update GPA Text
  document.getElementById("unweightedGPA").innerText = "Unweighted: " + unweightedGPA;
  document.getElementById("weightedGPA").innerText = "Weighted: " + weightedGPA;
  console.log(Classes);
}

// calculatedUnweightedGPA sets the unweighted GPA value by adding up the values of all of the grade points and dividing them by the amount of classes.
function calculateUnweightedGPA() {
  let GP = 0;
  let totalSemesters = 0;

  for (let i = 0; i < Classes.length; i++) {
    if (Classes[i].semester1 != -1) {
      totalSemesters++;

      if (Classes[i].semester1 >= 90) {
        GP += 4.0;
      }
      else if (Classes[i].semester1 >= 80) {
        GP += 3.0;
      }
      else if (Classes[i].semester1 >= 70) {
        GP += 2.0;
      }
      else if (Classes[i].semester1 >= 60) {
        GP += 1.0;
      }
    }

    if (Classes[i].semester2 != -1) {
      totalSemesters++;

      if (Classes[i].semester2 >= 90) {
        GP += 4.0;
      }
      else if (Classes[i].semester2 >= 80) {
        GP += 3.0;
      }
      else if (Classes[i].semester2 >= 70) {
        GP += 2.0;
      }
      else if (Classes[i].semester2 >= 60) {
        GP += 1.0;
      }
    }
  }

  // Calculate GPA
  let GPA = Math.round((GP / totalSemesters) * 100) / 100;

  return GPA;
}

// This calculates the weighted GPA value by adding 0.04 for every honors class to the given unweighted GPA.
function calculateWeightedGPA(unweightedGPA) {
  let totalHonors = 0;

  for (let i = 0; i < Classes.length; i++) {
    if (Classes[i].isHonors && (Classes[i].semester1 != -1 || Classes[i].semester2 != -1)) {
      totalHonors++;
    }
  }

  // Calculate GPA
  let GPA = unweightedGPA + (0.04 * totalHonors);

  return GPA;
}