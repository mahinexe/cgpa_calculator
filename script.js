document.getElementById("nextBtn").addEventListener("click", function (event) {
  event.preventDefault();
  var numCourses = parseInt(document.getElementById("numCourses").value);
  if (isNaN(numCourses) || numCourses <= 0) {
    alert("Please enter a valid number of courses.");
    return;
  }
  createCGPAInputs(numCourses);
  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "block";
});

document
  .getElementById("step2Form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var cgpaInputs = document.querySelectorAll(".cgpaInput");
    var totalCGPA = 0;
    var numPassedCourses = 0;
    var failedCourses = [];

    for (var i = 0; i < cgpaInputs.length; i++) {
      var cgpa = parseFloat(cgpaInputs[i].value);
      if (isNaN(cgpa) || cgpa < 1.0 || cgpa > 4.0) {
        alert(
          "Please enter a valid CGPA between 1.00 and 4.00 for all courses."
        );
        return;
      }
      totalCGPA += cgpa;
      if (cgpa < 2.0) {
        failedCourses.push(i + 1);
        cgpaInputs[i].classList.add("failed");
      }
    }

    var averageCGPA = totalCGPA / cgpaInputs.length;
    var grade = failedCourses.length > 0 ? "F (Fail)" : getGrade(averageCGPA);
    var resultMessage = "Average CGPA: " + averageCGPA.toFixed(2) + "<br>";
    if (failedCourses.length > 0) {
      resultMessage +=
        "You have been failed in course " + failedCourses.join(" & ") + "<br>";
    }
    resultMessage += "Grade: " + grade;
    document.getElementById("result").innerHTML = resultMessage;
    document.getElementById("step2").style.display = "none";
    document.getElementById("result").style.display = "block";
  });

function createCGPAInputs(numCourses) {
  var cgpaInputsDiv = document.getElementById("cgpaInputs");
  cgpaInputsDiv.innerHTML = "";
  for (var i = 1; i <= numCourses; i++) {
    var input = document.createElement("input");
    input.type = "number";
    input.step = "any"; // Allow decimal numbers
    input.className = "cgpaInput";
    input.placeholder = "CGPA for course " + i;
    cgpaInputsDiv.appendChild(input);
  }
}

function getGrade(cgpa) {
  if (cgpa > 3.75 && cgpa <= 4.0) return "A+ (Outstanding)";
  else if (cgpa > 3.5 && cgpa <= 3.75) return "A (Excellent)";
  else if (cgpa > 3.25 && cgpa <= 3.5) return "A- (Quite Excellent)";
  else if (cgpa > 3.0 && cgpa <= 3.25) return "B+ (Very Good)";
  else if (cgpa > 2.75 && cgpa <= 3.0) return "B (Good)";
  else if (cgpa > 2.5 && cgpa <= 2.75) return "B- (Quite Good)";
  else if (cgpa > 2.25 && cgpa <= 2.5) return "C+ (Above Average)";
  else if (cgpa > 2.00 && cgpa <= 2.25) return "C (Average)";
  else if (cgpa >= 2.0 && cgpa < 2.25) return "D (Poor)";
  else return "F (Fail)";
}
