// deleteGrades2 is called everytime the user clicks the reset button above the Semester GPA.
function deleteGrades2() {
  // Remove all classes
  Classes2 = [];

  // Update Text
  document.getElementById("classList2").innerText = "";
  document.getElementById("unweightedGPA2").innerText = "Unweighted:";
  document.getElementById("weightedGPA2").innerText = "Weighted:";
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

var Classes2 = [];

// addGrades2 is called every time the user clicks the "Add Grades" (2) button, the value of the input box is added to the Classes2 array.
function addGrades2(grade1, grade2, finalGrade, isHonors) {

  var newSemester = new Semester((grade1 == "") ? -1 : Math.abs(Number(grade1)), (grade2 == "") ? -1 : Math.abs(Number(grade2)), (finalGrade == "") ? -1 : Math.abs(Number(finalGrade)), isHonors);

  // Insert grade in Grades.
  Classes2.push(newSemester);

  // Calculate GPA.
  var unweightedGPA = calculateUnweightedGPA2();
  var weightedGPA = calculateWeightedGPA2(unweightedGPA);

  // Resets inputs.
  document.getElementById("quarter1Input").value = "";
  document.getElementById("quarter2Input").value = "";
  document.getElementById("finalExamInput").value = "";
  document.getElementById("honors2").checked = false;

  // Update Class List Text
  var classesString = "";
  for (var i = 0; i < Classes2.length; i++) {
    classesString += ("\n" + (Classes2[i].quarter1 == -1 ? "NA" : Classes2[i].quarter1.toString() + "%") + ", " + (Classes2[i].quarter2 == -1 ? "NA" : Classes2[i].quarter2.toString()  + "%") + ", " + (Classes2[i].finalExam == -1 ? "NA" : Classes2[i].finalExam.toString()  + "%") + ", " + (Classes2[i].isHonors ? "Honors" : "Regular"));
  }
  document.getElementById("classList2").innerText = classesString;
  
  // Update GPA Text
  document.getElementById("unweightedGPA2").innerText = "Unweighted: " + unweightedGPA;
  document.getElementById("weightedGPA2").innerText = "Weighted: " + weightedGPA;
  console.log(Classes2);
}

// calculatedUnweightedGPA2 sets the unweighted GPA value by adding up the values of all of the grade points and dividing them by the amount of classes (semester weights are 40% for quarters and 20% for final exams).
function calculateUnweightedGPA2() {
  let GP = 0;

  for (let i = 0; i < Classes2.length; i++) {
    var semesterAvg = ((Classes2[i].quarter1 * 0.4) + (Classes2[i].quarter2 * 0.4) + (Classes2[i].finalExam * 0.2));

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
  let GPA = Math.round((GP / Classes2.length) * 100) / 100;

  return GPA;
}

// This calculates the weighted GPA value by adding 0.04 for every honors class to the given unweighted GPA.
function calculateWeightedGPA2(unweightedGPA) {
  let totalHonors = 0;

  for (let i = 0; i < Classes2.length; i++) {
    if (Classes2[i].isHonors) {
      totalHonors++;
    }
  }

  // Calculate GPA
  let GPA = unweightedGPA + (0.04 * totalHonors);

  return GPA;
}

