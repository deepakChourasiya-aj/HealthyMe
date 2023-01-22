
function changepage(){
    window.location.href='./cartdesignprep/index.html'
}

function redirecttohome(){
    setTimeout()
}


function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

  var subheader = document.querySelector('.mainheader');

  function renderdataofnavbar(){

    subheader.innerHTML= ` 
    <div class="header">
      <div class="one">
        <a href="index.html">
          <img src="logo.png" alt="" />
        </a>
      </div>
      <div class="two">
        <input
          type="search myInput"
          oninput="redirecttohome()"
          id="myInput" onkeyup="myFunction()"
          placeholder="Search here anything ,brands "
        />

      </div>
      <div class="three">
        <div>
          <span onclick="gotosighnup()" class="material-symbols-outlined"> account_circle </span>
        </div>
        <div>
          <span onclick="gotoCheckout()" class="material-symbols-outlined"> shopping_cart </span>
        </div>
      </div>
    </div>
`
  }

 renderdataofnavbar();

 function gotosighnup(){
  window.location.href='signup.html'
 }

 function gotosighnup(){
  window.location.href='signup.html'
 }
 function gotoCheckout(){
  window.location.href='./Checkoutpage/checout.html'
 }