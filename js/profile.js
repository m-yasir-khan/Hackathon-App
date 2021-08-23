firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    firebase
      .database()
      .ref(`users/${uid}`)
      .once("value", (data) => {
        let username = document.getElementById("name");
        let email = document.getElementById("email");
        username.innerHTML = data.val().username;
        email.innerHTML = data.val().email;
        if (data.val().type === "Restuarant") {
          let dashName = document.getElementById("name-panel");
          let createBtn = document.getElementById("create-btn");
          let verifyType = document.getElementById("dashboard-cards");
          dashName.innerHTML = data.val().type + " DashBoard";
          verifyType.style.display = "block";
          console.log("HELLO REST");
        } else if (data.val().type === "User") {
          let dashName = document.getElementById("name-panel");
          let verifyType = document.getElementById("user-cards");
          dashName.innerHTML = data.val().type + " DashBoard";
          verifyType.style.display = "block";

        }
      });
  } else if (!user) {
    window.location = "login.html";
  }
});

let userFromFB = new Promise((resolve, reject) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      resolve(user.uid);
    }
  });
});

let getUserID = async () => {
  let uid = await userFromFB;
};

getUserID();
let logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location = "login.html";
    });
};

let dashboard = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user, "USERR DASH===>");
      var uid = user.uid;
      console.log(uid, "UID");
      firebase
        .database()
        .ref(`users/${uid}`)
        .once("value", (data) => {
          console.log(data.val(), "DASH DATA==>>");
          if (data.val().type === "Restuarant") {
            console.log("HELLO REST");
          } else if (data.val().type === "User") {
          }
        });
    } else {
      window.location = "login.html";
    }
  });
};
