// Global Variable
var selectSubjectEl = document.querySelector("#select-subject-el");
var startQuizBtn = document.querySelector(".start-quiz-btn");
var userCode = sessionStorage.getItem("userCode");
var allSubject = [];

//Reading Subject from localstorage

if (localStorage.getItem(userCode + "_allSubject") != null) {
  allSubject = JSON.parse(localStorage.getItem(userCode + "_allSubject"));
  allSubject.forEach((subject, index) => {
    selectSubjectEl.innerHTML += `
      <option>${subject.subjectName}</option>
      `;
  });
}

startQuizBtn.onclick = function () {
  if (selectSubjectEl.value != "choose subject") {
    var subject = selectSubjectEl.value;
    sessionStorage.setItem("subject", subject);
    window.location = "../quiz/quiz.html";
  }else {
    swal("Select Subject !", "Please select subject first !", "warning");
  };
};
