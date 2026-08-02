/* Form control Coding is Start */
var signupBtn = document.querySelector(".signup-btn");
var loginBtn = document.querySelector(".login-btn");
var loginBox = document.querySelector(".login-box");
var signupBox = document.querySelector(".signup-box");
var nav_signup = document.querySelector(".nav-signup");
console.log(signupBtn);

nav_signup.onclick = function () {
  signupBox.style.zIndex = "100";
  signupBox.classList.add("active");
  loginBox.classList.remove("active");
  loginBtn.classList.remove("d-none");
  nav_signup.classList.add("d-none");
};

loginBtn.onclick = function () {
  signupBox.classList.remove("active");
  loginBox.classList.add("active");
  loginBtn.classList.add("d-none");
  nav_signup.classList.remove("d-none");
};

/*Registration form Coding is Start*/

var registrationForm = document.querySelector(".signup-form");
var allInput = registrationForm.querySelectorAll("INPUT");
var textArea = registrationForm.querySelector("textarea");

registrationForm.onsubmit = function (e) {
  e.preventDefault();
  registrationData();
};

const registrationData = () => {
  if (localStorage.getItem(allInput[0].value + "_user_ID") == null) {
    const userData = {
      userCode: allInput[0].value,
      userName: allInput[1].value,
      website: allInput[2].value,
      contact: allInput[3].value,
      address: textArea.value,
      userId: allInput[4].value,
      password: allInput[5].value,
    };
    let userString = JSON.stringify(userData);
    localStorage.setItem(allInput[0].value + "_user_ID", userString);
    registrationForm.reset("");
    swal("Registration Done!", "Your Data Submit Successful ", "success");
  } else {
    swal("Change userCode!", "  This User Code is Already Taken!", "warning");
  }
};

// Start Singin Coding
var signinBtn = document.querySelector(".signin-btn");
var signupBtn = document.querySelector(".signup-btn");
var userCode = document.querySelector("#user-code");
var userId = document.querySelector("#s-user-id");
var password = document.querySelector("#user-password");

signinBtn.onclick = function (e) {
  e.preventDefault();
  if (userCode.value && userId.value && password.value != "") {
    if (localStorage.getItem(userCode.value + "_user_ID") != null) {
      var allData = JSON.parse(
        localStorage.getItem(userCode.value + "_user_ID")
      );

      console.log(allData);
      if (allData.userId == userId.value) {
        if (allData.password == password.value) {
          signinBtn.innerHTML = "Please Wait ...";
          signupBox.disabled = true;
          setTimeout(function () {
            window.location = "../dashboard/dashboard.html";
            sessionStorage.setItem("userCode", userCode.value);
          }, 3000);
        } else {
          swal("Wrong Password !", " Please enter Right Password!", "warning");
        }
      } else {
        swal("Wrong UserId !", " Please enter Right UserId!", "warning");
      }
    } else {
      swal("Wrong Usercode !", " Please enter Right UserCode !", "warning");
    }
  } else {
    swal("Fill Full Form !", " Your Data is not filed!", "warning");
  }
};
