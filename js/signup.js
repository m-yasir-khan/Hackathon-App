// firebase.auth().onAuthStateChanged((user) => {
//   if (!user) {
//     window.location = "index.html";
//   } else if (user) {
//     window.location = "login.html";
//   }
// });

// *******   RESTUARANT *****

let getSignUpInfoRestuarant = () => {
  let emailSignup = document.getElementById("signupEmail");
  let pwSignup = document.getElementById("signupPw");
  let restnameSignup = document.getElementById("signupRestuarantName");
  let countrySignup = document.getElementById("signupCountry");
  let citySignup = document.getElementById("signupCity");
  let signUpResname = restnameSignup.value;
  let signUpEmail = emailSignup.value;
  let signUpPw = pwSignup.value;
  let signUpCountry = countrySignup.value;
  let signUpCity = citySignup.value;
  console.log(signUpResname, signUpEmail, signUpPw, signUpCountry, signUpCity);

  userObj = {
    username: signUpResname,
    email: signUpEmail,
    password: signUpPw,
    country: signUpCountry,
    city: signUpCity,
    type: "Restuarant",
  };
  restuarantNames = {
    username: signUpResname,
  };
  firebase
    .auth()
    .createUserWithEmailAndPassword(signUpEmail, signUpPw)
    .then((e) => {
      e.user;
      firebase.database().ref("users").child(e.user.uid).set(userObj) &&
        Swal.fire({
          title: "<strong>Congrats !!!</strong>",
          icon: "success",
          text: "Successfully Sign Up!",
          showConfirmButton: !1,
          allowOutsideClick: !1,
          footer: '<a class="btn btn-primary" href="login.html">Goto</a>',
        });
    })
    .catch((e) => {
      var r = e.message;
      Swal.fire({ icon: "error", title: "Oops...", text: r });
    });
};

// *******   USERS *****

let getSignUpInfoUser = () => {
  let emailSignup = document.getElementById("signupEmail");
  let pwSignup = document.getElementById("signupPw");
  let usernameSignup = document.getElementById("signupUserName");
  let countrySignup = document.getElementById("signupCountry");
  let citySignup = document.getElementById("signupCity");
  let signUpUserName = usernameSignup.value;
  let signUpEmail = emailSignup.value;
  let signUpPw = pwSignup.value;
  let signUpCountry = countrySignup.value;
  let signUpCity = citySignup.value;
  console.log(usernameSignup, signUpEmail, signUpPw, signUpCountry, signUpCity);

  userObj = {
    username: signUpUserName,
    email: signUpEmail,
    password: signUpPw,
    country: signUpCountry,
    city: signUpCity,
    type: "User",
  };
  firebase
    .auth()
    .createUserWithEmailAndPassword(signUpEmail, signUpPw)
    .then((e) => {
      e.user;
      firebase.database().ref("users").child(e.user.uid).set(userObj);
      Swal.fire({
        title: "<strong>Congrats !!!</strong>",
        icon: "success",
        text: "Successfully Sign Up!",
        showConfirmButton: !1,
        allowOutsideClick: !1,
        footer: '<a class="btn btn-primary" href="login.html">Goto</a>',
      });
    })
    .catch((e) => {
      var r = e.message;
      Swal.fire({ icon: "error", title: "Oops...", text: r });
    });
};
