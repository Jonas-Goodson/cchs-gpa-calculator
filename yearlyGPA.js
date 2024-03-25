
// deleteYearlyGrades is called everytime the user clicks the reset button above the Yearly GPA. 
function deleteYearlyGrades() {
  // Remove all classes
  yearlyClasses = [];

  // Update Text
  document.getElementById("yearlyClassList").innerText = "";
  document.getElementById("unweightedYearlyGPA").innerText = "Unweighted:";
  document.getElementById("weightedYearlyGPA").innerText = "Weighted:";
}

// The new Yealy class is composed of the Semester 1, and Semester 2 input values. The class also accounts for the Honors/AP boolean.
class YearlyClass {
  constructor(semester1, semester2, isHonors) {
    this.semester1 = semester1;
    this.semester2 = semester2;
    this.isHonors = isHonors;
  }
}

var yearlyClasses = [];

// addYearlyGrades is called every time the user clicks the "Add Grades" button, the value of the input box is added to the yearlyClasses array.
function addYearlyGrades(semester1Grade, semester2Grade, isHonors) {

  if (semester1Grade != "" || semester2Grade != "") {
    var newYearlyClass = new YearlyClass((semester1Grade == "") ? -1 : Math.abs(Number(semester1Grade)), (semester2Grade == "") ? -1 : Math.abs(Number(semester2Grade)), isHonors);

    // Insert grade in yearlyClasses.
    yearlyClasses.push(newYearlyClass);

    // Calculate GPA.
    var unweightedGPA = calculateUnweightedYearlyGPA();
    var weightedGPA = calculateYearlyWeightedGPA(unweightedGPA);

    // Resets inputs.
    document.getElementById("semester1Input").value = "";
    document.getElementById("semester2Input").value = "";
    document.getElementById("yearlyHonors").checked = false;

    // Update Class List Text
    var classesString = "";
    for (var i = 0; i < yearlyClasses.length; i++) {
      classesString += ("\n" + (yearlyClasses[i].semester1 == -1 ? "N/A" : yearlyClasses[i].semester1.toString() + "%") + ", " + (yearlyClasses[i].semester2 == -1 ? "N/A" : yearlyClasses[i].semester2.toString() + "%") + ", " + (yearlyClasses[i].isHonors ? "Honors" : "Regular"));
    }
    document.getElementById("yearlyClassList").innerText = classesString;

    // Update GPA Text
    document.getElementById("unweightedYearlyGPA").innerText = "Unweighted: " + unweightedGPA;
    document.getElementById("weightedYearlyGPA").innerText = "Weighted: " + weightedGPA;
    console.log(yearlyClasses);
  }
}

// calculatedUnweightedYearlyGPA sets the unweighted GPA value by adding up the values of all of the grade points and dividing them by the amount of classes.
function calculateUnweightedYearlyGPA() {
  let GP = 0;
  let totalSemesters = 0;

  for (let i = 0; i < yearlyClasses.length; i++) {
    if (yearlyClasses[i].semester1 != -1) {
      totalSemesters++;

      if (yearlyClasses[i].semester1 >= 90) {
        GP += 4.0;
      }
      else if (yearlyClasses[i].semester1 >= 80) {
        GP += 3.0;
      }
      else if (yearlyClasses[i].semester1 >= 70) {
        GP += 2.0;
      }
      else if (yearlyClasses[i].semester1 >= 60) {
        GP += 1.0;
      }
    }

    if (yearlyClasses[i].semester2 != -1) {
      totalSemesters++;

      if (yearlyClasses[i].semester2 >= 90) {
        GP += 4.0;
      }
      else if (yearlyClasses[i].semester2 >= 80) {
        GP += 3.0;
      }
      else if (yearlyClasses[i].semester2 >= 70) {
        GP += 2.0;
      }
      else if (yearlyClasses[i].semester2 >= 60) {
        GP += 1.0;
      }
    }
  }

  // Calculate GPA
  let GPA = Math.round((GP / totalSemesters) * 100) / 100;

  return GPA;
}

// This calculates the weighted GPA value by adding 0.04 for every honors class to the given unweighted GPA.
function calculateYearlyWeightedGPA(unweightedGPA) {
  let totalHonors = 0;

  for (let i = 0; i < yearlyClasses.length; i++) {
    if (yearlyClasses[i].isHonors && (yearlyClasses[i].semester1 != -1 || yearlyClasses[i].semester2 != -1)) {
      totalHonors++;
    }
  }

  // Calculate GPA
  let GPA = unweightedGPA + (0.04 * totalHonors);

  return GPA;
}