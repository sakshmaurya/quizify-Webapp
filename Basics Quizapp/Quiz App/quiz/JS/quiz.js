var subject = sessionStorage.getItem("subject");
var userCode = sessionStorage.getItem("userCode");
var studentName = sessionStorage.getItem("name");
var enrollment = sessionStorage.getItem("enrollment");
var address = sessionStorage.getItem("address");
var surname = sessionStorage.getItem("surname");
var imgUrl = sessionStorage.getItem("imgUrl");
// alert(surname);
var allQuestion = [];

//! Start Reading Question From LocalStorages

if (localStorage.getItem(userCode + "_" + subject + "_question") != null) {
  allQuestion = JSON.parse(
    localStorage.getItem(userCode + "_" + subject + "_question")
  );
  console.log(allQuestion);
}

var index = 0;
var total = allQuestion.length;
var right = 0;
var wrong = 0;
var allUserResult = [];
var particularUserResult = [];

let mainBox = document.querySelector(".main");
var allOptionsEl = document.querySelectorAll(".option");
let questionEl = document.querySelector(".question-el");
var nextBtn = document.querySelector(".next-btn");
const getQuestionFunc = () => {
  if (index == total) {
    return endQuiz();
  }
  resetFun();
  let data = allQuestion[index];
  questionEl.innerHTML = `Q-${index + 1}:${data.question}`;
  allOptionsEl[0].nextElementSibling.innerText = data.optionOne;
  allOptionsEl[1].nextElementSibling.innerText = data.optionTwo;
  allOptionsEl[2].nextElementSibling.innerText = data.optionThree;
  allOptionsEl[3].nextElementSibling.innerText = data.optionFour;
};
getQuestionFunc();

nextBtn.onclick = function () {
  let data = allQuestion[index];
  var ans = getAnswer();
  if (ans == data.correctAnswer) {
    right++;
  } else {
    wrong++;
  }
  index++;
  getQuestionFunc();
};

const getAnswer = () => {
  var answer;
  allOptionsEl.forEach(input => {
    if (input.checked) {
      answer = input.value;
    }
  });
  return answer;
};

function resetFun() {
  allOptionsEl.forEach(input => {
    input.checked = false;
  });
}

const endQuiz = () => {
  mainBox.innerHTML = `
   <h2>Click on Submit Button to complete Your Examination.</h2>
    <div align="center">
         <button class="btn next-btn quiz-submit-btn btn-primary">Submit</button>
      </div>
`;
  submitFunc();
};

const submitFunc = () => {
  if (localStorage.getItem(userCode + "_" + subject + "_result") != null) {
    allUserResult = JSON.parse(
      localStorage.getItem(userCode + "_" + subject + "_result")
    );
  }
  if (localStorage.getItem(userCode + "_" + enrollment + "_result") != null) {
    particularUserResult = JSON.parse(
      localStorage.getItem(userCode + "_" + enrollment + "_result")
    );
  }
  var submitBtn = document.querySelector(".quiz-submit-btn");
  console.log(submitBtn);
  submitBtn.onclick = function () {
    allUserResultFunc();
    particularUserResultFunc();
    this.innerHTML = "Please Wait...";
    this.disabled = true;
  };
};
const allUserResultFunc = () => {
  allUserResult.push({
    name: studentName,
    enrollment: enrollment,
    rightAns: right,
    wrongAns: wrong,
    subject: subject,
    maxMark: total,

  });
  localStorage.setItem(
    userCode + "_" + subject + "_result",
    JSON.stringify(allUserResult)
  );
  setTimeout(function () {
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("surname");
    sessionStorage.removeItem("address");
    sessionStorage.removeItem("enrollment");
    sessionStorage.removeItem("userCode");
    sessionStorage.removeItem("subject");
    window.location = "../Home_Page/homePage.html";
  }, 2000)
};


const particularUserResultFunc = () => {
  particularUserResult.push({
    name: studentName,
    surname: surname,
    enrollment: enrollment,
    subject: subject,
    rightAns: right,
    wrongAns: wrong,
    maxMark: total,
    profilePic: imgUrl
  });
  localStorage.setItem(userCode + "_" + enrollment + "_result", JSON.stringify(particularUserResult));
  setTimeout(function () {
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("surname");
    sessionStorage.removeItem("address");
    sessionStorage.removeItem("enrollment");
    sessionStorage.removeItem("userCode");
    sessionStorage.removeItem("subject");
    window.location = "../Home_Page/homePage.html";
  }, 2000)
}