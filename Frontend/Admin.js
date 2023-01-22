

async function renderdataAdmin() {
    let res = await fetch('https://wild-lime-bluefish-boot.cyclic.app/admin/all/allproduct');
    let data = await res.json();
    console.log(data);
    let adminrender = document.querySelector('#appendprodcuts');

    adminrender.innerHTML = data.map((item) => {
        return `
    <table>
    <tr>
    <th id="prodcutid1">Product id</th>
    <th id="prodcutdesription1" >Product Description</th>
    <th id="prodcutimage1">Product Image</th>
</tr>
    <tr>
        <td id="prodcutid">${item._id}   Price:${item.Price}</td>
        <td id="prodcutdesription">${item.Description} </td>
        <td id="prodcutimage"><img width="40%" src="${item.Image}" alt=""></td>
        <td id="removebutton">
            <button class="deletebutton" id="${item._id}">Delete</button>
        </td>
    </tr>
    
</table>
    `
    }).join('');

    let deletebutton = document.querySelectorAll('.deletebutton');
    for (btn of deletebutton) {
        btn.addEventListener('click', onClick = async (event) => {
            console.log(event.target.id);
            deleteProduct(event.target.id)
        })
    }

}
renderdataAdmin();

async function deleteProduct(id) {
    try {
        let res = await fetch(`https://wild-lime-bluefish-boot.cyclic.app/admin/delete/${id}`, {
            method: "DELETE",
            "Content-Type": "application/json"
        });
        let data = await res.json();
        if (res.ok) {
            swal({
                title: "product has been deleted!!",
                text: "You clicked the button!",
                icon: "success",
                button: "Aww yiss!",
            });
            window.location.reload();
        }
    } catch (error) {
        console.log(error);
    }
}

let submit = document.querySelector('form')

submit.addEventListener('submit', (e) => {
    e.preventDefault();
    let Image = document.querySelector('.Image').value;
    let Description = document.querySelector('.Description').value;
    let Rating = document.querySelector('.Rating').value;
    let Price = document.querySelector('.Price').value;
    let Discount = document.querySelector('.Discount').value;
    let Category = document.querySelector('.Category').value;

    let obj = {
        Image
        ,
        Description
        ,
        Rating
        ,
        Price
        ,
        Discount
        ,
        Category
    }
    console.log(obj);
    addData(obj)
})


async function addData(obj) {
    try {
        let res = await fetch('https://wild-lime-bluefish-boot.cyclic.app/admin/add', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        let data = await res.json();
        if (res.ok) {
            swal({
                title: "Product Added successful!!",
                text: "You clicked the button!",
                icon: "success",
                button: "Aww yiss!",
            });
        }
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}


let fornmdata2 = document.querySelector('#formdata2');


    fornmdata2.addEventListener('submit', (e) => {
        e.preventDefault();
        let id = document.querySelector('.ID2').value;
        let Image = document.querySelector('.Image2').value;
        let Description = document.querySelector('.Description2').value;
        let Rating = document.querySelector('.Rating2').value;
        let Price = document.querySelector('.Price2').value;
        let Discount = document.querySelector('.Discount2').value;
        let Category = document.querySelector('.Category2').value;
    
        let obj = {
            "Image": Image
            ,
            "Description":Description
            ,
            "Rating":Rating
            ,
            "Price":Price
            ,
            "Discount":Discount
            ,
            "Category":Category
        }
        console.log(obj,id);
        // addData(obj)
        updatePrduct(obj,id)
    })


    // api
    // https://wild-lime-bluefish-boot.cyclic.app/admin//update/:id

    async function updatePrduct(obj,id){
       try {
        let res = await fetch(`https://wild-lime-bluefish-boot.cyclic.app/admin//update/${id}`,{
          method:"PATCH",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(obj)
        })
        let data = await res.json();
        console.log(data);
        if(res.ok){
            window.location.reload();
        }
       } catch (error) {
        console.log(error);
       }
    }