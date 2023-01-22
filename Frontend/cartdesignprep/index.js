// for the derop down menu ----
function myFunction() {
  document.getElementById("myDropdown").classList.toggle('show');
}
function myFunction1() {
  document.getElementById("myDropdown1").classList.toggle('show');
}


// sorting according to price selection -------
function one_to_two() {
  var url = "https://wild-lime-bluefish-boot.cyclic.app/admin/all/one_to_two"
  data(url)
}
function two_to_three() {
  var url = "https://wild-lime-bluefish-boot.cyclic.app/admin/all/two_to_three"
  data(url)
}
function three_to_four() {
  var url = "https://wild-lime-bluefish-boot.cyclic.app/admin/all/three_to_four"
  data(url)
}
function four_to_five() {
  var url = "https://wild-lime-bluefish-boot.cyclic.app/admin/all/four_to_five"
  data(url)
}
function five_to_until_above() {
  var url = "https://wild-lime-bluefish-boot.cyclic.app/admin/all/five_to_until_above"
  data(url)
}

function one_star() {
  var url = "https://wild-lime-bluefish-boot.cyclic.app/admin/all/one_star"
  data(url);
}
function two_star() {
  var url = "https://wild-lime-bluefish-boot.cyclic.app/admin/all/two_star"
  data(url);
}
function three_star() {
  var url = "https://wild-lime-bluefish-boot.cyclic.app/all/three_star"
  data(url);
}
function four_star() {
  var url = "https://wild-lime-bluefish-boot.cyclic.app/admin/all/four_star"
  data(url);
}
function five_star() {
  var url = "https://wild-lime-bluefish-boot.cyclic.app/admin/all/five_star"
  data(url);
}

function one(){
  var url = "https://wild-lime-bluefish-boot.cyclic.app/admin/pagination/?page=1"
  data(url);
}
function two(){
  var url = "https://wild-lime-bluefish-boot.cyclic.app/admin/pagination/?page=2"
  data(url);
}
function three(){
  var url = "https://wild-lime-bluefish-boot.cyclic.app/admin/pagination/?page=3"
  data(url);
}
function four(){
  var url = "https://wild-lime-bluefish-boot.cyclic.app/admin/pagination/?page=4"
  data(url);
}
function five(){
  var url = "https://wild-lime-bluefish-boot.cyclic.app/admin/pagination/?page=5"
  data(url);
}


// for the sorting of low to high --------------------------------
let Low_to_high = document.querySelector('#Productsort');
var url = "https://wild-lime-bluefish-boot.cyclic.app/admin/all/allproduct"
data(url)
function handlesort() {
  let selected = document.querySelector('#Productsort').value;
  console.log(selected);

  if (selected == 'Price_Low_High') {
    var url = "https://wild-lime-bluefish-boot.cyclic.app/admin/all/Low_to_high";
  } else if (selected == 'Price_High_Low') {
    var url = "https://wild-lime-bluefish-boot.cyclic.app/admin/all/High_to_low";
  }
  else if (selected == 'All_items') {
    var url = "https://wild-lime-bluefish-boot.cyclic.app/admin/all/allproduct"
  }
  else if (selected == 'Discount__50%') {
    var url = "https://wild-lime-bluefish-boot.cyclic.app/admin/all/discount50"
  }
  else {
    var url = "https://wild-lime-bluefish-boot.cyclic.app/admin/all/allproduct"
    console.log('iam else from product admin')
  }
  data(url)
}

async function data(url) {
  let data = await fetch(url);
  let res = await data.json();
  render(res);
  console.log(res)
}

async function render(res) {

  let datarender = document.querySelector("#firstdiv");
  datarender.innerHTML = res.map((item) => {

    return `
      <div class="cartmain">
          <img id="proimage" width="100%" src="${item.Image}" alt="onediv">
      <div class="divtwo">
          <div id="rating greenicon">
              <h6>Rating⭐${item.Rating}</h6>          
          </div>
          <h6>${item.Description}</h6>
          <span> <b>₹${item.Price}     <s id="str">${item.Price * 2}</s></b> </span>
          <button  class="addtocart" id="${item._id}"} >Add to cart          
          </button>
      </div>
      </div>
      `
  }).join(' ');


  // -------------------------btn handles--------->
  let buttons = document.querySelectorAll('.addtocard');
  for (btn of buttons) {
    btn.addEventListener('click', onClick = async (event) => {
      console.log(event.target.id);
      add_to_cart(event.target.id)
    })
  }
};
// id="addtocart"
async function add_to_cart(id) {
  // console.log(id);
  let res = await fetch(`https://wild-lime-bluefish-boot.cyclic.app/user/add/${id}`, {
    method: "POST",
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Content-Type": "application/json"
    }
  })
  let data = await res.json();
  console.log(data)
}

