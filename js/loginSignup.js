firebase.auth().onAuthStateChanged((user) => {
  // if (!user) {
  //   window.location = "signup.html";
  // } else 
  if(user)
  {
    window.location = "profile.html";
  }
});

// ********** PROFILE IMAGE************
let uploadFiles = (file) => {
  return new Promise((resolve, reject) => {
    let storageRef = firebase
      .storage()
      .ref(`myfolder/todayImages/${file.name}`);
    // let progress1 = document.getElementById("progress");
    // let bar = document.getElementById("bar");
    // progress1.style.display = "block"
    let uploading = storageRef.put(file);
    uploading.on(
      "state_changed",
      (snapshot) => {
        // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // bar.style.width = Math.round(progress.toFixed()) + "%";
        // bar.innerHTML = Math.round(progress.toFixed()) + "%";
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        reject(error);
      },
      () => {
        uploading.snapshot.ref.getDownloadURL().then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};

// ********************************

let getLoginInfo = () => {
  let email = document.getElementById("loginEmail");
  let pw = document.getElementById("loginPw");
  let loginEmail = email.value;
  let loginPw = pw.value;
  console.log(loginEmail, loginPw);
  firebase
    .auth()
    .signInWithEmailAndPassword(loginEmail, loginPw)
    .then((e) => {
      var r = e.user;
      firebase
        .database()
        .ref(`users/${r.uid}`)
        .once("value", (e) => {
          setTimeout(() => {
            Swal.fire({
              title: "<strong>LOG IN !!!</strong>",
              icon: "success",
              text: "Successfully Sign In!",
              showConfirmButton: !1,
              allowOutsideClick: !1,
              footer:
                '<a class="btn btn-primary" href="profile.html">Goto Dashboard</a>',
            });
          }, 1000);
        });
    })
    .catch((e) => {
      var r = e.message;
      Swal.fire({ icon: "error", title: "Oops...", text: r });
    });
};
