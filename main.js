let shop = document.getElementById('shop');

let shopItemsData = [
    {
        id:'1a',
        name:'Casual Shirt',
        price:45,
        desc:'Lorem1 ipsum dolor sit amet consectetur adipisicing.',
        img: './images/img-1.jpg',
    },
    {
        id:'2b',
        name:'Office Shirt',
        price:100,
        desc:'Lorem2 ipsum dolor sit amet consectetur adipisicing.',
        img: './images/img-2.jpg',
    },
    {
        id:'3c',
        name:'T Shirt',
        price:25,
        desc:'Lorem3 ipsum dolor sit amet consectetur adipisicing.',
        img: './images/img-3.jpg',
    },
    {
        id:'4d',
        name:'Mens Suit',
        price:300,
        desc:'Lorem4 ipsum dolor sit amet consectetur adipisicing.',
        img: './images/img-4.jpg',
    },
];

let basket = JSON.parse(localStorage.getItem('data')) || [];

let generateShop = () => {
    return  (shop.innerHTML = shopItemsData.map((x) => {
        let {id,name,price,desc,img} = x;
        let search = basket.find((x)=>x.id ===id) || []
        return `<div id=product-id-${id} class="item">
        <img width="220" src=${img} alt="">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                    <i onclick="decrement('${id}')" class="bi bi-dash-circle-fill"></i>
                    <div id=${id} class="quantity">${search.item === undefined ? 0:search.item}</div>
                    <i onclick="increment('${id}')" class="bi bi-plus-circle-fill"></i>
                </div>
            </div>
        </div>
    </div>`
    }).join(''))
}
generateShop();


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
    localStorage.setItem('data',JSON.stringify(basket));
    // console.log(basket)
    update(selectedItem); 
}

let decrement = (id) => {   
    let selectedItem = id;
    let search = basket.find((x)=>x.id === selectedItem)

    if(search.item === 0) return;
    else {
        search.item -= 1;
    }
    localStorage.setItem('data',JSON.stringify(basket));
    // console.log(basket)
    update(selectedItem);  
}

let update = (id) => {
    let search = basket.find((x)=>x.id === id)
    // console.log(search.item)
    document.getElementById(id).innerHTML = search.item;
    calculation()
}

let calculation = () => {
    let cartIcon = document.getElementById('cartAmount')
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0)    
}

calculation();