var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productcategoryInput = document.getElementById("productcategory");
var productDescriptionInput = document.getElementById("productDescription");
// var productImageInput = document.getElementById("productImage");
var searchInput = document.getElementById("searchInput");
var btnAdd = document.getElementById("addProduct");
var btnUpdate = document.getElementById("updateProduct");
var currentIndex = 0;
productList = [];
if (localStorage.getItem("container") !== null) {
  productList = JSON.parse(localStorage.getItem("container"));
  displayData();
}

function addProduct() {
  if (
    validationName() &&
    validationPrice() &&
    validationCategory() &&
    validationDescription()
  ) {
    var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productcategoryInput.value,
      description: productDescriptionInput.value,
      // image: "images/p-1.jpg",
    };
    productList.push(product);
    localStorage.setItem("container", JSON.stringify(productList));

    displayData();

    clearForm();
  }
}

function clearForm() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productcategoryInput.value = null;
  productDescriptionInput.value = null;
  productImageInput.value = null;

  productNameInput.classList.remove("is-valid");
  productPriceInput.classList.remove("is-valid");
  productcategoryInput.classList.remove("is-valid");
  productDescriptionInput.classList.remove("is-valid");
}

function displayData() {
  var cartona = "";

  for (var i = 0; i < productList.length; i++) {
    cartona += `
  
   <div class="col-md-3">
             <div class="card">
          
               <div class="card-body text-center bg-dark text-light">
                 <span class="index bg-info p-1 rounded-3 text-light"
               >Index ${i}</span
                 >
                 <h3 class="card-title">${productList[i].name}</h3>
                 <p class="card-text">${productList[i].price}</p>
                 <p class="card-text">${productList[i].category}</p>
                 <p class="card-text">${productList[i].description}</p>
               </div>
               <div class="card-footer text-center">
                 <button onclick="deleteItem(${i})" class="btn btn-outline-danger btn-sm me-3"> <i class="fa-solid fa-trash"></i></button>

                 </button>
                 <button onclick="setUbdateInfo(${i})" class="btn btn-outline-success btn-sm ms-3" >  <i class="fa-solid fa-pen-to-square"></i>

                 </button>
               </div>
             </div>
           </div>
  
  `;
    //   <div class="card">..  <img class="card-img-top" src="${productList[i].image}" ${productList[i].name}" />
  }

  document.getElementById("rowData").innerHTML = cartona;
}
function deleteItem(index) {
  productList.splice(index, 1);
  localStorage.setItem("container", JSON.stringify(productList));
  displayData();
}

function searchData() {
  var regex = new RegExp(searchInput.value, `gi`);
  var term = searchInput.value.toLowerCase();
  var cartona = "";

  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term)) {
      cartona += `
  
   <div class="col-md-3">
             <div class="card">
               <img class="card-img-top" src="${productList[i].image}" ${
        productList[i].name
      }" />
               <div class="card-body text-center bg-dark text-light">
                 <span class="index bg-info p-1 rounded-3 text-light"
               >Index ${i}</span
                 >
                 <h3 class="card-title">${productList[i].name.replace(
                   regex,
                   (match) => `<span class="bg-info">${match}</span>`
                 )}</h3>
                 <p class="card-text">${productList[i].price}</p>
                 <p class="card-text">${productList[i].category}</p>
                 <p class="card-text">${productList[i].description}</p>
               </div>
               <div class="card-footer text-center">
                 <button onclick="deleteItem(${i})" class="btn btn-outline-danger btn-sm me-3"> <i class="fa-solid fa-trash"></i></button>

                 </button>
                 <button onclick="setUbdateInfo(${i})" class="btn btn-outline-success btn-sm ms-3" >  <i class="fa-solid fa-pen-to-square"></i>

                 </button>
               </div>
             </div>
           </div>
  
  `;
    }
  }
  document.getElementById("rowData").innerHTML = cartona;
}

function setUbdateInfo(index) {
  currentIndex = index;
  productNameInput.value = productList[index].name;
  productPriceInput.value = productList[index].price;
  productcategoryInput.value = productList[index].category;
  productDescriptionInput.value = productList[index].description;

  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
}

// 1-update-1 :  onclick on displayData function in JS
// 1- set parameter index , global variable currentIndex =0 , local variable here currentIndex = index
// 2-productList[index] object set to the values of the inputs
//3- productNameInput= productList[index].name or price , etc ...
//4- make id to add and update and make global variables
//5- Add classes >> add to add and remove d-none to update.
function updateProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productcategoryInput.value,
    description: productDescriptionInput.value,
    image: "images/p-1.jpg",
  };
  productList.splice(currentIndex, 1, product);
  displayData();
  localStorage.setItem("container", JSON.stringify(productList));
  btnAdd.classList.remove("d-none");
  btnUpdate.classList.add("d-none");
  clearForm();
}

// Update 2 : make function onclick in HTML to btn update
//1- make function updateProduct , take object in add product copy and paste here
//2- make productList.splice(currentIndex, 1, product) to update the object
//3- call displayData() to show the updated data
//4- call localStorage.setItem("container", JSON.stringify(productList)) to save the updated data
//5- call clearForm() to clear the inputs
//6- remove d-none class from btnAdd
//7- add d-none class to btnUpdate

//validation :
function validationName() {
  var regex = /^[A-Za-z][A-za-z0-9 ]{2,19}$/;
  var text = productNameInput.value;
  var msgName = document.getElementById("msgName");
  if (regex.test(text)) {
    productNameInput.classList.add("is-valid");
    productNameInput.classList.remove("is-invalid");
    msgName.classList.add("d-none");
    return true;
  } else {
    productNameInput.classList.add("is-invalid");
    productNameInput.classList.remove("is-valid");
    msgName.classList.remove("d-none");
    return false;
  }
}

function validationPrice() {
  var regex = /^\d{1,10}(\.\d{1,3})?$/;
  var text = productPriceInput.value;
  var msgPrice = document.getElementById("msgPrice");
  if (regex.test(text)) {
    productPriceInput.classList.add("is-valid");
    productPriceInput.classList.remove("is-invalid");
    msgPrice.classList.add("d-none");
    return true;
  } else {
    productPriceInput.classList.add("is-invalid");
    productPriceInput.classList.remove("is-valid");
    msgPrice.classList.remove("d-none");
    return false;
  }
}

function validationCategory() {
  var regex = /^(أدوات رياضيه|أدوات كهربائيه|لوازم شغل|أدوات منزلية)$/;
  var text = productcategoryInput.value;
  var msgCategory = document.getElementById("msgCategory");
  if (regex.test(text)) {
    productcategoryInput.classList.add("is-valid");
    productcategoryInput.classList.remove("is-invalid");
    msgCategory.classList.add("d-none");
    return true;
  } else {
    productcategoryInput.classList.add("is-invalid");
    productcategoryInput.classList.remove("is-valid");
    msgCategory.classList.remove("d-none");
    return false;
  }
}

function validationDescription() {
  var regex = /^.{3,}$/m;
  var text = productDescriptionInput.value;
  var msgDescription = document.getElementById("msgDescription");
  if (regex.test(text)) {
    productDescriptionInput.classList.add("is-valid");
    productDescriptionInput.classList.remove("is-invalid");
    msgDescription.classList.add("d-none");
    return true;
  } else {
    productDescriptionInput.classList.add("is-invalid");
    productDescriptionInput.classList.remove("is-valid");
    msgDescription.classList.remove("d-none");
    return false;
  }
}
