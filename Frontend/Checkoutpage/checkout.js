

let insideProductbox = document.querySelector('#productbox');

async function RenderCheckout(){
  let res = await fetch('http://localhost:9000/user/check',{
    method:"GET",
    headers:{
        "Authorization":localStorage.getItem('token'),
        "Content-Type":"application/json"
    }
  });
  let data = await res.json();
  
  console.log(data.purchase,'iiii')
  let cxpurchase = data.purchase;

  insideProductbox.innerHTML= cxpurchase.map((item)=>{
    return `
    <div id="insideproductbox">
    <div id="one">
      <img
        src="${item.Image}"
        alt=""
      />
    </div>
    <div id="two">
      <h3>${item.Description}</h3>
      <h2 id="price">Price:₹${item.Price}</h2>
      <h3 id="Discount">Discount:${item.Discount}%</h3>
      <button id="delete">Remove</button>
    </div>
  </div>
    `
  }).join(' ')
  var total = cxpurchase.reduce((acc,curr)=>{
       return acc+curr.Price
  },0)

  localStorage.setItem('total',total);

  let discountedAmount = Math.floor(total-(total*.10))
  console.log(discountedAmount,'disamount');
  localStorage.setItem('discountedAmount',discountedAmount);

  let discountgivenin_rupee = total-discountedAmount;
  localStorage.setItem('discountgivenin_rupee',discountgivenin_rupee)
  console.log(discountgivenin_rupee,'rupee')

  console.log(total)
  console.log(total);
}

RenderCheckout();

let ordersummary = document.querySelector('.ordersummary');

function myordersummary(){
  ordersummary.innerHTML = `
  <h2>Order Summary </h2>
        
  <div id="priceflex">
   <table>
    <tr>
      <td><h4>Total MRP</h4></td>
      <td><h4>${localStorage.getItem('total')}</h4></td>
    </tr>
    <tr>
      <td><h4>Total Discount</h4></td>
      <td><h4>${localStorage.getItem('discountgivenin_rupee')}</h4></td>
    </tr>
    <tr>
      <td><h4>Shipping Charges</h4></td>
      <td><h4 id="payable">Free</h4></td>
    </tr>
   </table>
   <table>
     <tr>
      <td><h1 id="payable">Payable Amount</h1></td>
      <td><h2>₹${localStorage.getItem('discountedAmount')}</h2></td>
     </tr>
   </table>
  </div>
  `
}

myordersummary();
