//! Start Read User Code from Local Storage //

var i;
var allUserCodeKey = [];
for (i = 0; i < localStorage.length; i++) {
  var allKeys = localStorage.key(i);
  if (allKeys.match("_user_ID")) {
    allUserCodeKey.push(allKeys.replace("_user_ID", ""));
  }
}

//! create option coding

var userCodeEl = document.querySelector("#user-code-el");
allUserCodeKey.forEach((code, index) => {
  userCodeEl.innerHTML += `
    <option value="${code}">${code}</option>
   `;
});

//! All Global Variable

var loginForm = document.querySelector(".login-form");
var allLoginInput = loginForm.querySelectorAll("input");
var LoginBtn = loginForm.querySelector("button");
var userCode;
var allUserData = [];

//! Start Login Coding

userCodeEl.addEventListener("change", () => {
  if (userCodeEl.value != "choose space code") {
    sessionStorage.setItem("userCode", userCodeEl.value);
    allLoginInput[0].disabled = false;
    allLoginInput[1].disabled = false;
    LoginBtn.disabled = false;
    userCode = sessionStorage.getItem("userCode");
    loginUserFun();
  } else {
    allLoginInput[0].disabled = true;
    allLoginInput[1].disabled = true;
    LoginBtn.disabled = true;
    swal("Please select User !", "Please select user code first!", "warning");
  }
});

const loginUserFun = () => {
  if (localStorage.getItem(userCode + "_registrationData") != null) {
    allUserData = JSON.parse(
      localStorage.getItem(userCode + "_registrationData")
    );
  }
  loginForm.onsubmit = function (e) {
    e.preventDefault();
    for (i = 0; i < localStorage.length; i++) {
      if (allUserData[i].enrollment == allLoginInput[0].value) {
        if (allUserData[i].password == allLoginInput[1].value) {
          if (allUserData[i].userType == "teacher") {
            sessionStorage.setItem("userCode", userCode);
            window.location = "../dashboard/dashboard.html";
          } else {
            sessionStorage.setItem("enrollment", allUserData[i].enrollment);
            sessionStorage.setItem("name", allUserData[i].name);
            sessionStorage.setItem("address", allUserData[i].address);
            sessionStorage.setItem("surname", allUserData[i].surname);
            sessionStorage.setItem("userCode", userCode);
            sessionStorage.setItem("imgUrl", allUserData[i].profilePic);
            window.location = "../welcome/welcome.html";
            return;
          }
          return;
        } else {
          swal("Wrong password !", "Please contact your branch!", "warning");
          return;
        }
      } else {
        swal("Wrong Enrollment !", "Please contact your branch!", "warning");
      }
    }
  };
};
