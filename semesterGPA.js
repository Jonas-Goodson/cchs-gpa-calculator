// deleteSemesterGrades is called everytime the user clicks the reset button above the Semester GPA.
function deleteSemesterGrades() {
  // Remove all classes
  semesterClasses = [];

  // Update Text
  document.getElementById("semesterClassList").innerText = "";
  document.getElementById("unweightedSemesterGPA").innerText = "Unweighted:";
  document.getElementById("weightedSemesterGPA").innerText = "Weighted:";
}
// The new Semester class is composed of the Quarter 1, Quarter 2, and Final Exam input values. The class also accounts for the Honors/AP boolean.
class Semester {
  constructor(quarter1, quarter2, finalExam, isHonors) {
    this.quarter1 = quarter1;
    this.quarter2 = quarter2;
    this.finalExam = finalExam;
    this.isHonors = isHonors;
  }
}

var semesterClasses = [];

// addSemesterGrades is called every time the user clicks the "Add Grades" (2) button, the value of the input box is added to the semesterClasses array.
function addSemesterGrades(quarter1Grade, quarter2Grade, finalGrade, isHonors) {
  if (quarter1Grade != "" || quarter2Grade != "") {
    var newSemester = new Semester((quarter1Grade == "") ? -1 : Math.abs(Number(quarter1Grade)), (quarter2Grade == "") ? -1 : Math.abs(Number(quarter2Grade)), (finalGrade == "") ? -1 : Math.abs(Number(finalGrade)), isHonors);

    // Insert grade in Grades.
    semesterClasses.push(newSemester);

    // Calculate GPA.
    var unweightedGPA = calculateUnweightedSemesterGPA();
    var weightedGPA = calculateSemesterWeightedGPA(unweightedGPA);

    // Resets inputs.
    document.getElementById("quarter1Input").value = "";
    document.getElementById("quarter2Input").value = "";
    document.getElementById("finalExamInput").value = "";
    document.getElementById("semesterHonors").checked = false;

    // Update Class List Text
    var classesString = "";
    for (var i = 0; i < semesterClasses.length; i++) {
      classesString += ("\n" + (semesterClasses[i].quarter1 == -1 ? "N/A" : semesterClasses[i].quarter1.toString() + "%") + ", " + (semesterClasses[i].quarter2 == -1 ? "N/A" : semesterClasses[i].quarter2.toString() + "%") + ", " + (semesterClasses[i].finalExam == -1 ? "N/A" : semesterClasses[i].finalExam.toString() + "%") + ", " + (semesterClasses[i].isHonors ? "Honors" : "Regular"));
    }
    document.getElementById("yearlyClassList").innerText = classesString;

    // Update GPA Text
    document.getElementById("unweightedSemesterGPA").innerText = "Unweighted: " + unweightedGPA;
    document.getElementById("weightedSemesterGPA").innerText = "Weighted: " + weightedGPA;
    console.log(semesterClasses);
  }
}

// calculatedUnweightedSemesterGPA sets the unweighted GPA value by adding up the values of all of the grade points and dividing them by the amount of classes (semester weights are 40% for quarters and 20% for final exams).
function calculateUnweightedSemesterGPA() {
  let GP = 0;

  for (let i = 0; i < semesterClasses.length; i++) {
    var semesterAvg = ((semesterClasses[i].quarter1 * 0.4) + (semesterClasses[i].quarter2 * 0.4) + (semesterClasses[i].finalExam * 0.2));

    if (semesterAvg >= 90) {
      GP += 4.0;
    }
    else if (semesterAvg >= 80) {
      GP += 3.0;
    }
    else if (semesterAvg >= 70) {
      GP += 2.0;
    }
    else if (semesterAvg >= 60) {
      GP += 1.0;
    }
  }

  // Calculate GPA
  let GPA = Math.round((GP / semesterClasses.length) * 100) / 100;

  return GPA;
}

// This calculates the weighted GPA value by adding 0.04 for every honors class to the given unweighted GPA.
function calculateSemesterWeightedGPA(unweightedGPA) {
  let totalHonors = 0;

  for (let i = 0; i < semesterClasses.length; i++) {
    if (semesterClasses[i].isHonors) {
      totalHonors++;
    }
  }

  // Calculate GPA
  let GPA = unweightedGPA + (0.04 * totalHonors);

  return GPA;
}

