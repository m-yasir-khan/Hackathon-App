let uploadFiles = (file) => {
  return new Promise((resolve, reject) => {
    let storageRef = firebase.storage().ref(`myfolder/itemImages/${file.name}`);
    let uploading = storageRef.put(file);
    uploading.on(
      "state_changed",
      (snapshot) => {
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

let gotoOrder = () => {
 
 window.location="orders.html"
};

let confirmMessage = (item, cat, price, del) => {
  Swal.fire({
    title: "Do you want to confrim this Order?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: `Confirm`,
    denyButtonText: `Try Later`,
  }).then((result) => {
    if (result.isConfirmed) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var uid = user.uid;
          firebase
            .database()
            .ref("orders/" + uid)
            .push({
              order: item,
              price: price,
              category: cat,
              delivery: del,
              state: "pending",
            });
        }
      });
      console.log("HAHAHAHHAH");
      Swal.fire({
        title: "<strong>Congrats !!!</strong>",
        icon: "success",
        text: "Order Confirmed!",
        showConfirmButton: !1,
        allowOutsideClick: 1,
        footer: '<a href="orders.html"> ORDER</a> ',
      });
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    firebase
      .database()
      .ref(`items/${uid}`)
      .once("child_added", (data) => {
        let mainCard = document.getElementById("main-card");
        mainCard.innerHTML += `
        <div class="item-card" display="">
        <div class="card" style="width: 18rem;">
            <img src=${
              data.val().item_image
            } class="card-img-top" width="200px" height="200px" alt="" id="item-img">
            <div class="card-body">
                <h5 class="card-title" id=>${data.val().items}</h5>
               <p class="card-text"><i class="fa fa-cutlery" aria-hidden="true"></i> Food : ${
                 data.val().item_cat
               }</p> 
               <p class="card-text"><i class="fa fa-money" aria-hidden="true"></i> Price : ${
                 data.val().item_price
               }</p> 
               <p class="card-text"><i class="fa fa-shopping-cart" aria-hidden="true"></i> Delivery : ${
                 data.val().item_delivery
               }</p> 
            </div>
        </div>
    </div>
    `;
        console.log(data.val());
      });
  } else {
    window.location = "login.html";
  }
});

let addItems = async () => {
  let itemName = document.getElementById("item-name");
  let itemImg = document.getElementById("item-img");
  let closeBtn = document.getElementById("close");

  let itemCat = document.getElementById("category-select");
  let itemDel = document.getElementById("delivery-select");
  let itemPrice = document.getElementById("item-price");
  let itemNamevalue = itemName.value;
  let image = await uploadFiles(itemImg.files[0]);
  let categoryValue = itemCat.value;
  let deliveryType = itemDel.value;
  let itemsPrice = itemPrice.value;
  console.log(itemNamevalue, image, categoryValue);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      firebase
        .database()
        .ref("items/" + uid)
        .push({
          items: itemNamevalue,
          item_image: image,
          item_cat: categoryValue,
          item_price: itemsPrice,
          item_delivery: deliveryType,
        });

      closeBtn.click();
    }
  });
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    firebase
      .database()
      .ref(`items`)
      .once("child_added", (data) => {
        let mainCard = document.getElementById("main-card-user");
        for (var key in data.val()) {
          mainCard.innerHTML += `
            <div class="item-card" display="">
          <div class="card" style="width: 18rem;">
          <img src=${
            data.val()[key].item_image
          } class="card-img-top" width="00px" height="200px" alt="" id="item-img">
            <div class="card-body">
            <h5 class="card-title" id="item-id">${data.val()[key].items}</h5>
            <p class="card-text"><i class="fa fa-cutlery" aria-hidden="true"></i> Food : ${
              data.val()[key].item_cat
            }</p> 
            <p class="card-text"><i class="fa fa-money" aria-hidden="true"></i> Price : ${
              data.val()[key].item_price
            }</p> 
            <p class="card-text"><i class="fa fa-shopping-cart" aria-hidden="true"></i> Delivery : ${
              data.val()[key].item_delivery
            }</p> 
            <button onclick="confirmMessage('${data.val()[key].items}','${
            data.val()[key].item_cat
          }','${data.val()[key].item_price}','${
            data.val()[key].item_delivery
          }')" class="btn btn-primary">Order</button>
            </div>
            </div>
            </div>
            `;
        }
        console.log(data.val()[key].uid);
      });
  } else {
    window.location = "login.html";
  }
});

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    firebase
      .database()
      .ref(`orders`)
      .once("child_added", (data) => {

        let mainCard = document.getElementById("main-card-order");
        for (var key in data.val()) {
          mainCard.innerHTML += `
            <div class="item-card" display="">
          <div class="card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title" id="item-id">${data.val()[key].order}</h5>
            <p class="card-text"><i class="fa fa-cutlery" aria-hidden="true"></i> Food : ${
              data.val()[key].category
            }</p> 
            <p class="card-text"><i class="fa fa-money" aria-hidden="true"></i> Price : ${
              data.val()[key].price
            }</p> 
            <p class="card-text"><i class="fa fa-shopping-cart" aria-hidden="true"></i> Delivery : ${
              data.val()[key].delivery
            }</p> 
            <p class="card-text"><i class="fa fa-shopping-cart" aria-hidden="true"></i> State : ${
              data.val()[key].state
            }</p> 
            </div>
            </div>
            </div>
            `;
        }
        console.log(data.val().type);
      });
  } else {
    window.location = "login.html";
  }
});
