// Get data From Session storage
var userCode;
userCode = sessionStorage.getItem("userCode");
if (userCode == null) {
  document.body.innerHTML = "";
  document.body.style.background = "black";
  swal("UnAuthrised User !", " Don't Waste Your Time !", "warning");
}

var allData = JSON.parse(localStorage.getItem(userCode + "_user_ID"));
var barndNameEl = document.getElementById("user-name-side");
barndNameEl.innerHTML = "Welcome  " + allData.userId;

// Start Logout Coding
var logoutBtn = document.querySelector("#logout-btn");
logoutBtn.onclick = function () {
  this.innerHTML = " Plaese Wait... ";
  logoutBtn.disabled = true;
  this.style.background = "#ccc";
  setTimeout(function () {
    window.location = "../company/company.html";
    sessionStorage.removeItem("userCode");
  }, 3000);
};

// start Subject Storing Coding //
var visibleSubject = document.querySelector(".visible-subject");
var subjectBtn = document.querySelector(".subject-btn");
var subjectEl = document.querySelector(".subject");

var allSubject = [];
subjectBtn.onclick = function (e) {
  e.preventDefault();
  if (subjectEl.value != "") {
    newSubject();
    subjectEl.value = "";
  } else {
    swal("Subject is Empty !", "Please Enter Subject !", "warning");
  }
  updateSubject();
};

const newSubject = (subject, index) => {
  var subjectName = subjectEl.value;
  if (subject) {
    subjectName = subject.subjectName;
  }
  visibleSubject.innerHTML += `
       <div class="d-flex subject-box justify-content-between align-items-center">
         <h3 index='${index}'>${subjectName}</h3>
         <div>
            <i class="fa fa-edit mx-2 edit-btn"  style="font-size: 22px;"></i>
            <i class="fa fa-save mx-2 save-btn d-none" style="font-size: 22px;"></i>
            <i class="fa fa-trash del-btn mx-2" style="font-size: 22px;"></i>
         </div>
      </div>
   `;

  // Start Delete Coding
  var i;
  var delAllBtn = visibleSubject.querySelectorAll(".del-btn");
  for (i = 0; i < delAllBtn.length; i++) {
    delAllBtn[i].onclick = function () {
      var parent = this.parentElement.parentElement;
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(willDelete => {
        if (willDelete) {
          parent.remove();
          updateSubject();
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    };
  }

  // Start update Coding
  var allEditBtn = visibleSubject.querySelectorAll(".edit-btn");
  for (i = 0; i < allEditBtn.length; i++) {
    allEditBtn[i].onclick = function () {
      var parent = this.parentElement.parentElement;
      var h3 = parent.getElementsByTagName("H3");
      var saveBtn = parent.querySelector(".save-btn");
      h3[0].contentEditable = true;
      h3[0].focus();
      this.classList.add("d-none");
      saveBtn.classList.remove("d-none");
      saveBtn.onclick = function () {
        var editedSub = h3[0].innerHTML;
        var id = h3[0].getAttribute("index");
        updateSubject(editedSub, id);
        this.classList.add("d-none");
        allEditBtn[id].classList.remove("d-none");
        h3[0].contentEdittable = false;
      };
    };
  }
};

if (localStorage.getItem(userCode + "_allSubject") != null) {
  allSubject = JSON.parse(localStorage.getItem(userCode + "_allSubject"));
  allSubject.forEach((subject, index) => {
    newSubject(subject, index);
  });
}

function updateSubject(subject, id) {
  if (subject != undefined && id != undefined) {
    allSubject[id] = {
      subjectName: subject,
    };
  } else {
    var i;
    allSubject = [];
    var subjectBox = visibleSubject.querySelectorAll(".subject-box");
    for (i = 0; i < subjectBox.length; i++) {
      var h3 = subjectBox[i].getElementsByTagName("H3");
      allSubject.push({
        subjectName: h3[0].innerHTML,
      });
    }
  }
  localStorage.setItem(userCode + "_allSubject", JSON.stringify(allSubject));
}

// start Retuen Subject in Question form

var chooseSubject = document.querySelector("#choose-subject");
var questionForm = document.querySelector(".question-form");
var allQuestionInput = questionForm.querySelectorAll("INPUT");
var selectSubject = document.querySelector("#select-subject");
var subjectResultEl = document.querySelector("#subject-result-el");
var allQuestion = [];
var subject;
questionForm.onsubmit = e => {
  e.preventDefault();
  insertQuesrtionFunc();
};

const chooseSubjectFunc = () => {
  allSubject.forEach((subject, index) => {
    chooseSubject.innerHTML += `
      <option value='${subject.subjectName}'>${subject.subjectName}</option>
      `;
    selectSubject.innerHTML += `
      <option value='${subject.subjectName}'>${subject.subjectName}</option>
      `;
    subjectResultEl.innerHTML += `
      <option value='${subject.subjectName}'>${subject.subjectName}</option>
      `;
  });
};
chooseSubjectFunc();

chooseSubject.addEventListener("change", () => {
  checkSubject();
  checkSubjectKey();
});

function checkSubject() {
    subject = chooseSubject.value;
}
checkSubject();

function checkSubjectKey() {
  if (localStorage.getItem(userCode + "_" + subject + "_question") != null) {
    allQuestion = JSON.parse(
      localStorage.getItem(userCode + "_" + subject + "_question")
    );
  } else {
    allQuestion = [];
  }
}

function insertQuesrtionFunc(
  sub,
  id,
  question,
  opOne,
  opTwo,
  opThree,
  opFour,
  corAns
) {
  alert(id);
  if (sub != undefined && id != undefined) {
    allQuestion[id] = {
      question: question,
      optionOne: opOne,
      optionTwo: opTwo,
      optionThree: opThree,
      optionFour: opFour,
      correctAnswer: corAns,
    };

    localStorage.setItem(
      userCode + "_" + sub + "_question",
      JSON.stringify(allQuestion)
    );
    swal("Success !", "Data updated successfully !", "success");
  } else {
    if (chooseSubject.value != "choose-subject") {
      allQuestion.push({
        question: allQuestionInput[0].value,
        optionOne: allQuestionInput[1].value,
        optionTwo: allQuestionInput[2].value,
        optionThree: allQuestionInput[3].value,
        optionFour: allQuestionInput[4].value,
        correctAnswer: allQuestionInput[5].value,
      });
      localStorage.setItem(
        userCode + "_" + chooseSubject.value + "_question",
        JSON.stringify(allQuestion)
      );
      swal("Success !", "Data Inserted successfully !", "success");
      questionForm.reset("");
    } else {
      swal("Choose Subject !", "Please Enter Subject !", "warning");
    }
  }
}

// start returning questions from localstorage
var newQuestions = [];
var visibleQuestion = document.querySelector(".visible-question");
selectSubject.onchange = () => {
  if (
    localStorage.getItem(userCode + "_" + selectSubject.value + "_question") !=
    null
  ) {
    newQuestions = JSON.parse(
      localStorage.getItem(userCode + "_" + selectSubject.value + "_question")
    );
    visibleQuestion.innerHTML = "";
    newQuestionFunc();
  } else {
    visibleQuestion.innerHTML = "<b style='color:red'>No Data Available !</b>";
  }
};

const newQuestionFunc = () => {
  newQuestions.forEach((question, index) => {
    visibleQuestion.innerHTML += `
       <div class="mb-5">
             <br>
             <div class="d-flex flex-column " index="${index}">
             <div class="d-flex justify-content-between">
             <h3>${index + 1}) ${question.question}</h3>
             <div>
             <i class="fa fa-edit edit-btn mx-3"></i>
             <i class="fa fa-save save-btn d-none mx-3"></i>
             <i class="fa fa-trash del-btn mx-3"></i>
             </div>
             </div>
             <br>
             <div>
             <span>1) ${question.optionOne}</span>
             <br><br>
             <span>2) ${question.optionTwo}</span>
             <br><br>
             <span>3) ${question.optionThree}</span>
             <br><br>
             <span>4) ${question.optionFour}</span>
             <br><br>
             <span class="text-white corAns px-3 py-1">${question.correctAnswer
      }</span>
             <br><br>
          </div>
          </div>
       </div>
      `;
  });

  // Start Delete Coding
  var allDelBtn = document.querySelectorAll(".del-btn");
  var i, j;
  for (i = 0; i < allDelBtn.length; i++) {
    allDelBtn[i].onclick = e => {
      var parent = e.target.parentElement.parentElement.parentElement;
      var index = parent.getAttribute("index");
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(willDelete => {
        if (willDelete) {
          newQuestions.splice(index, 1);
          localStorage.setItem(
            userCode + "_" + selectSubject.value + "_question",
            JSON.stringify(newQuestions)
          );
          parent.remove();
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    };
  }

  // Start  Edit Coding
  var allEditBtn = visibleQuestion.querySelectorAll(".edit-btn");
  for (i = 0; i < allEditBtn.length; i++) {
    allEditBtn[i].onclick = function () {
      var parent = this.parentElement.parentElement.parentElement;
      // console.log(parent);
      var index = +parent.getAttribute("index");
      var saveBtn = parent.querySelector(".save-btn");
      this.classList.add("d-none");
      saveBtn.classList.remove("d-none");
      var h3 = parent.querySelector("h3");
      var span = parent.querySelectorAll("span");
      h3.contentEditable = true;
      h3.focus();
      for (j = 0; j < span.length; j++) {
        span[j].contentEditable = true;
        span[j].style.border = "2px solid black";
      }
      saveBtn.onclick = function () {
        var subject = selectSubject.value;
        var question = h3.innerHTML.replace(`${index + 1})`, "");
        var opOne = span[0].innerHTML.replace("1) ", "");
        var opTwo = span[1].innerHTML.replace("2) ", "");
        var opThree = span[2].innerHTML.replace("3) ", "");
        var opFour = span[3].innerHTML.replace("4) ", "");
        var corAns = span[4].innerHTML;
        swal({
          title: "Are you sure?",
          text: "Once Updated, you will not be able to recover this imaginary file!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then(willUpdated => {
          if (willUpdated) {
            insertQuesrtionFunc(
              subject,
              index,
              question,
              opOne,
              opTwo,
              opThree,
              opFour,
              corAns
            );
            allEditBtn[index].classList.remove("d-none");
            saveBtn.classList.add("d-none");
            h3.contentEditable = false;
            for (j = 0; j < span.length; j++) {
              span[j].contentEditable = false;
              span[j].style.border = "none";
            }
          } else {
            swal("Your imaginary file is safe!");
          }
        });
      };
    };
  }
};

// Start Registration Coing
var registrationForm = document.querySelector(".registration-form");
var allRegInput = registrationForm.querySelectorAll("INPUT");
var userType = registrationForm.querySelector("select");
var address = registrationForm.querySelector("textarea");
var registrationDataEl = document.querySelector(".registration-data");
var profileBox = document.querySelector(".upload-box");
var uploadInput = document.querySelector(".upload-input");
var modalImgUrl;
var registrationData = [];

registrationForm.onsubmit = function (e) {
  e.preventDefault();
  registrationFunc();
  getRegisrationDataFun();
};

//get data
if (localStorage.getItem(userCode + "_registrationData") != null) {
  registrationData = JSON.parse(
    localStorage.getItem(userCode + "_registrationData")
  );
}

const registrationFunc = () => {
  if (userType.value != "choose type") {
    registrationData.push({
      name: allRegInput[0].value,
      surname: allRegInput[1].value,
      dob: allRegInput[2].value,
      userType: userType.value,
      mobile: allRegInput[3].value,
      enrollment: allRegInput[4].value,
      password: allRegInput[5].value,
      address: address.value,
      profilePic: "img/1.jpg",
    });
    localStorage.setItem(
      userCode + "_registrationData",
      JSON.stringify(registrationData)
    );
    swal("Data Inserted !", "Registration is Done Successfully!", "success");
    registrationForm.reset("");
  } else {
    swal("Choose Type !", "Please Select a user !", "warning");
  }
};

const getRegisrationDataFun = () => {
  registrationDataEl.innerHTML = "";
  registrationData.forEach((allData, index) => {
    registrationDataEl.innerHTML += `
      <tr index="${index}">
         <th scope="row">${index + 1}</th>
             <td>
                <div class="profile">
                   <img src="${allData.profilePic
      }" width="40" height="40" alt="" srcset="">
                </div>
             </td>
             <td class="text-nowrap" style="width: 8rem;">${allData.name}</td>
             <td class="text-nowrap" style="width: 8rem;">${allData.surname
      }</td>
             <td class="text-nowrap" style="width: 8rem;">${allData.dob}</td>
             <td class="text-nowrap" style="width: 8rem;">${allData.userType
      }</td>
             <td class="text-nowrap" style="width: 8rem;">${allData.mobile}</td>
             <td class="text-nowrap" style="width: 8rem;">${allData.enrollment
      }</td>
             <td class="text-nowrap" style="width: 8rem;">${allData.password
      }</td>
             <td style="width: 8rem;">${allData.address}</td>
             <td class="text-nowrap" style="width: 8rem;">
                <i class='fa fa-trash del-btn mx-3'></i>
                <i class='fa fa-eye edit-btn' data-bs-toggle="modal" data-bs-target="#myModal"></i>
             </td>
   </tr>
      `;
  });

  // Start delete coding
  var i, j;
  var allDelBtn = registrationDataEl.querySelectorAll(".del-btn");
  for (i = 0; i < allDelBtn.length; i++) {
    allDelBtn[i].onclick = function () {
      var parent = this.parentElement.parentElement;
      var index = parent.getAttribute("index");
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(willDelete => {
        if (willDelete) {
          registrationData.splice(index, 1);
          localStorage.setItem(
            userCode + "_registrationData",
            JSON.stringify(registrationData)
          );
          parent.remove();
          getRegisrationDataFun();
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    };
  }

  // Start Update coding
  var allEditBtn = registrationDataEl.querySelectorAll(".edit-btn");
  var modalEditBtn = document.querySelector(".modal-edit");
  var modalUpdateBtn = document.querySelector(".modal-update-btn");
  var modalForm = document.querySelector(".modal-form");
  var allModalInput = modalForm.querySelectorAll("input");
  var modalTextArea = modalForm.querySelector("textarea");
  var closeBtn = document.querySelector(".btn-close");
  for (i = 0; i < allEditBtn.length; i++) {
    allEditBtn[i].onclick = function () {
      var parent = this.parentElement.parentElement;
      var index = parent.getAttribute("index");
      var td = parent.querySelectorAll("td");
      var imgUrl = td[0].querySelector("img").src;
      var name = td[1].innerHTML;
      var surname = td[2].innerHTML;
      var dob = td[3].innerHTML;
      var userType = td[4].innerHTML;
      var mobile = td[5].innerHTML;
      var enrollment = td[6].innerHTML;
      var password = td[7].innerHTML;
      var address = td[8].innerHTML;

      profileBox.style.backgroundImage = `url(${imgUrl})`;
      allModalInput[0].value = name;
      allModalInput[1].value = surname;
      allModalInput[2].value = dob;
      allModalInput[3].value = userType;
      allModalInput[4].value = mobile;
      allModalInput[5].value = enrollment;
      allModalInput[6].value = password;
      modalTextArea.value = address;
      for (j = 0; j < allModalInput.length; j++) {
        allModalInput[j].disabled = true;
      }
      modalTextArea.disabled = true;
      uploadInput.disabled = true;
      modalEditBtn.onclick = function () {
        for (j = 0; j < allModalInput.length; j++) {
          allModalInput[j].disabled = false;
        }
        modalTextArea.disabled = false;
        uploadInput.disabled = false;
        this.classList.add("d-none");
        modalUpdateBtn.classList.remove("d-none");

        modalUpdateBtn.onclick = function () {
          var name = allModalInput[0].value;
          var surname = allModalInput[1].value;
          var dob = allModalInput[2].value;
          var userType = allModalInput[3].value;
          var mobile = allModalInput[4].value;
          var enrollment = allModalInput[5].value;
          var password = allModalInput[6].value;
          var address = modalTextArea.value;
          swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then(willUpdated => {
            if (willUpdated) {
              registrationData[index] = {
                name: name,
                surname: surname,
                dob: dob,
                userType: userType,
                mobile: mobile,
                enrollment: enrollment,
                password: password,
                address: address,
                profilePic: modalImgUrl == undefined ? imgUrl : modalImgUrl,
              };
              localStorage.setItem(
                userCode + "_registrationData",
                JSON.stringify(registrationData)
              );
              getRegisrationDataFun();
              this.classList.add("d-none");
              modalEditBtn.classList.remove("d-none");
              closeBtn.click();
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your imaginary file is safe!");
            }
          });
        };
      };
    };
  }
};

getRegisrationDataFun();

//Read Photo Coding
uploadInput.onchange = function () {
  var fReader = new FileReader();
  fReader.onload = function (e) {
    modalImgUrl = e.target.result;
    profileBox.style.backgroundImage = `url(${modalImgUrl})`;
  };
  fReader.readAsDataURL(uploadInput.files[0]);
};

// Start toggler Coding
var togglersBtn = document.querySelectorAll(".toggler-icon");
var sideNav = document.querySelector(".side-nav");
togglersBtn[0].onclick = function () {
  sideNav.classList.add("active");
  this.classList.add("d-none");
  togglersBtn[1].classList.remove("d-none");
};
togglersBtn[1].onclick = function () {
  sideNav.classList.remove("active");
  this.classList.add("d-none");
  togglersBtn[0].classList.remove("d-none");
};

// Start get result Coding From Database
let allResult = [];
var allUserResultBox = document.querySelector(".subject-result-data");
subjectResultEl.addEventListener('change', () => {
  allUserResultBox.innerHTML = "";
  if (subjectResultEl.value != "choose subject") {
    if (localStorage.getItem(userCode + "_" + subjectResultEl.value + "_result") != null) {
      allResult = JSON.parse(localStorage.getItem(userCode + "_" + subjectResultEl.value + "_result"));
      allResult.forEach((data, index) => {
        allUserResultBox.innerHTML += `
        <tr>
          <td class="ten" style="width: 8re">${index + 1}</td>
          <td class="ten" style="width: 8re">${data.name}</td>
          <td class="ten" style="width: 8re">${data.enrollment}</td>
          <td class="ten" style="width: 8re">${data.subject}</td>
          <td class="ten" style="width: 8re">${data.rightAns}</td>
          <td class="ten" style="width: 8re">${data.wrongAns}</td>
          <td class="ten" style="width: 8re">${data.maxMark}</td>
        </tr>
        `;
      })
    }

  } else {
    swal({
      title: "Select Subject",
      text: "Please select subject First",
      icon: "warning",
    })
  }
});

// Start Get Certificate Coding
let closeBtn = document.querySelector(".certificate-close-btn");
let certificateMainBox = document.querySelector(".certificate-main");
let certificateForm = document.querySelector(".certificate-form");
var cirInput = certificateForm.querySelector("input");
let cirUserName = certificateMainBox.querySelector(".user-name");
let cirAddress = certificateMainBox.querySelector(".user-address");
let cirName = certificateMainBox.querySelector(".cir-name");
let cirEnrollment = certificateMainBox.querySelector(".cir-enrollmrnt");
let cirSurname = certificateMainBox.querySelector(".cir-surname");
let cirData = certificateMainBox.querySelector(".cir-data");
let cirTotal = certificateMainBox.querySelectorAll(".cir-total");
let cirProfile = certificateMainBox.querySelector(".cir-profile");
let finalResultBox = certificateMainBox.querySelector(".final-result-box");

console.log(cirProfile);


//Getting Result From DB
certificateForm.onsubmit = function (e) {
  e.preventDefault();
  getUserResult();
}

const getUserResult = () => {
  if (cirInput.value != "") {
    if (localStorage.getItem(userCode + "_" + cirInput.value + "_result") != null) {
      var resultData = JSON.parse(localStorage.getItem(userCode + "_" + cirInput.value + "_result"
      ));
      certificateMainBox.classList.add("active");
      cirUserName.innerHTML = allData.userId;
      cirAddress.innerHTML = allData.address;
      cirName.innerHTML = resultData[0].name;
      cirEnrollment.innerHTML = resultData[0].enrollment;
      cirSurname.innerHTML = resultData[0].surname;
      cirProfile.src = resultData[0].profilePic
      let maxMark = 0;
      let mark = 0;
      let total = 0;
      resultData.forEach((data, index) => {
        cirData.innerHTML += `
         <tr>
          <td>${index + 1}</td>
          <td>${data.subject}</td>
          <td>${data.maxMark}</td>
          <td>${data.rightAns}</td>
          <td>${data.rightAns}</td>
        </tr>
        `;
        maxMark += data.maxMark;
        mark += data.rightAns;
        total += data.rightAns;
      });

      cirTotal[0].innerHTML = maxMark;
      cirTotal[1].innerHTML = mark;
      cirTotal[2].innerHTML = total;

      let finalResult = (total / maxMark * 100).toFixed(2);
      // alert(finalResultBox);
      if (finalResult<= 32.99){
        finalResultBox.innerHTML = "Fail";
      }else {
        finalResultBox.innerHTML = "Pass";
       }
    } else {
      swal({
        title: "No Result Found !",
        text: "There is no result related Enrollment",
        icon: "warning",
      });
    }
  } else {
    swal({
      title: "Input Field is Empty !",
      text: "Please enter enrollment First",
      icon: "warning",
    });
  }
}

// Closing Modal Coding
closeBtn.onclick = function () {
  certificateMainBox.classList.remove("active");
}

//! Time update coding

// setInterval(showTime, 1000);
// function showTime() {
//   let time = new Date();
//   let hour = time.getHours();
//   let min = time.getMinutes();
//   let sec = time.getSeconds();
//   am_pm = "AM";

//   if (hour > 12) {
//     hour -= 12;
//     am_pm = "PM";
//   }
//   if (hour == 0) {
//     hr = 12;
//     am_pm = "AM";
//   }

//   hour = hour < 10 ? "0" + hour : hour;
//   min = min < 10 ? "0" + min : min;
//   sec = sec < 10 ? "0" + sec : sec;

//   let currentTime = hour + ":" + min + ":" + sec + am_pm;

//   document.getElementById("clock").innerHTML = currentTime;
// }
// showTime();

// var monthOfYears = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
// var d = new Date();
// var name = monthOfYears[d.getMonth()];
// document.getElementById("month").innerHTML = name;

// var dateEl = document.getElementById("date");
// var newDate = new Date();
// var month = newDate.getMonth() + 1;
// var year = newDate.getFullYear();

// var todayDate = newDate.getDate();
// dateEl.innerHTML = "date" + todayDate + '-' + month + '-' + year;
