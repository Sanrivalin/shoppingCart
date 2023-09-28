let ShoppingCart = document.getElementById("shopping-cart");
let label = document.getElementById("label");
let basket = JSON.parse(localStorage.getItem("data")) || [];

console.log(basket);

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        // console.log('La x lleva: ',x)
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        let {img,name,price} = search;
        return `
            <div class='cart-item'>
              <img width='100' src=${img} alt='' />
                <div class='details'>
                    <div class='title-price-x'>
                    <h4 class='title-price'>
                    <p class='cart-name'>${name}</p>
                    <p class='cart-item-price'>$ ${price}</p>                 
                    </h4>
                    <i onclick="removeItem('${id}')" class="bi bi-x-lg"></i>
                    
                </div>
                <div class="buttons">
                    <i onclick="decrement('${id}')" class="bi bi-dash-circle-fill"></i>
                    <div id=${id} class="quantity">${item}</div>
                    <i onclick="increment('${id}')" class="bi bi-plus-circle-fill"></i>
                </div>
                <h3 class='cart-item-price-total'>$ ${item * search.price}</h3>
              </div>
            
            </div>
            
            
            `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
        <h2 class='cart-title'>Cart is empty</h2>
        <a href='index.html'>
        <button class='HomeBtn'>Back To Home</button>
        </a>
        
        `;
  }
};
generateCartItems();

let increment = (id) => { 
    let selectedItem = id;
    let search = basket.find((x)=>x.id === selectedItem)
    if(search === undefined){
        basket.push({
            id: selectedItem,
            item:1,
        });
    } else {
        search.item += 1;
    }
    generateCartItems();
    localStorage.setItem('data',JSON.stringify(basket));
    update(selectedItem); 
}

let decrement = (id) => {   
    let selectedItem = id;
    let search = basket.find((x)=>x.id === selectedItem)

    if(search === undefined) return;
    else if(search.item === 0) return;
    else {
        search.item -= 1;
    }  
    update(selectedItem);  
    basket = basket.filter((x)=>x.item !==0)
    generateCartItems();      
    localStorage.setItem('data',JSON.stringify(basket));
}

let update = (id) => {
    let search = basket.find((x)=>x.id === id)
    // console.log(search.item)
    document.getElementById(id).innerHTML = search.item;
    calculation()
    TotalAmount()
}

let removeItem = (id) => {
    let selectedItem = id;
    // console.log(selectedItem)
    basket = basket.filter((x)=> x.id !== selectedItem)
    calculation()
    localStorage.setItem('data',JSON.stringify(basket));
    generateCartItems();
    TotalAmount()
    

}

let clearCart = () => {
    basket = []
    generateCartItems()
    calculation()
    localStorage.setItem('data',JSON.stringify(basket));
}

let TotalAmount = () => {
    if(basket.length !== 0){
        let amount = basket.map((x)=>{
            let {item,id} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x,y)=>x+y,0);
        label.innerHTML= `
        <h2 class='total-bill-title'>Total Bill : $ ${amount}</h2>
        <button class='checkout'>Checkout</button>
        <button onclick='clearCart()' class='removeAll'>Remove All</button>
        `

    }else return;
}
TotalAmount()