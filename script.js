

// Drink Menu array

const drinkMenu = [
    {
      id: "CLB",
      name:"Long Black",
      kj:"1630",
      item:[
        {size: 'Sml', price: 2.5},
        {size: 'Med', price: 4.5},
        {size: 'Lge', price: 6.5}
      ],
    },
    {
      id: "CSB",
      name:"Short Black",
      kj:"1630",
      item:[{size: 'Sml', price: 2.5},
            {size: 'Med', price: 4.5},
            {size: 'Lge', price: 6.5}],
    },
    {
      id: "CMO",
      name:"Mocha",
      kj:"2630",
      item:[{size: 'Sml', price: 3},
            {size: 'Med', price: 5},
            {size: 'Lge', price: 7}],
    },
    {
      id: "TDB",
      name:"Dilmah Black Tea",
      kj:"630",
      item:[{size: 'Sml', price: 2},
            {size: 'Med', price: 4},
            {size: 'Lge', price: 6}],
    },
    {
      id: "TDW",
      name:"Dilmah White Tea",
      kj:"620",
      item:[{size: 'Sml', price: 2},
            {size: 'Med', price: 4},
            {size: 'Lge', price: 6}],
    }
  ];


const shopProducts = document.querySelector('.products');

const checkoutList = document.querySelector('.checkout-list');

const checkoutTotal = document.querySelector('.checkout-total span');

const checkout = [];






//   loop through the array and output drinks menu to HTML

for (let i = 0; i < drinkMenu.length; i += 1) {

    const template = `
        <div class = "products-item">

            <div class = "products-item-inner">

                <div class = "col info">
                    <div class = "name">${drinkMenu[i].name}</div>
                    <div class = "name">${drinkMenu[i].kj}Kj</div>
                    
                    <button data-id="${drinkMenu[i].id}" data-size="${drinkMenu[i].item[0].size}">
                    ${drinkMenu[i].item[0].size} 
                    ${format(drinkMenu[i].item[0].price)}
                    </button>

                    <button data-id="${drinkMenu[i].id}" data-size="${drinkMenu[i].item[1].size}">
                    ${drinkMenu[i].item[1].size} 
                    ${format(drinkMenu[i].item[1].price)}
                    </button>
                    
                    <button data-id="${drinkMenu[i].id}" data-size="${drinkMenu[i].item[2].size}">
                    ${drinkMenu[i].item[2].size} 
                    ${format(drinkMenu[i].item[2].price)}
                    </button>

                </div>
            </div>
        </div>
        
    `;

    shopProducts.innerHTML += template;

}


// create a function/method to convert numbers to currency - hoist into above template

function format (value) {
    return `$${value.toFixed(2)}`;
}


// store button clicks

const buttons = shopProducts.querySelectorAll('button');
console.log(buttons); 

buttons.forEach((btn) => {

    btn.addEventListener('click', (event) => {
        // console.log(event.target);

        const itemId = event.target.dataset.id;
        const itemSize = event.target.dataset.size;

        // console.log(itemId, itemSize);

        addToCart (itemId, itemSize);

    });
});


// function to add button clicked item to cart - hoist into button click event
 
function addToCart (id, size) {
    
    const selectedItem = drinkMenu.find( (drink) => {
        return drink.id === id;
    });

    console.log(selectedItem);

    const selectedSize = selectedItem.item.find( (drink) => {
        return drink.size === size;
    });

    console.log(selectedSize);

    // check to see if item is already in the cart

    // const cartFound = checkout.find( (x) => {return x.id === id});
    const cartFound = checkout.find( x => x.id === id);

    console.log('Found', cartFound);

    if(!cartFound) { 
        const addItem = {
            id: selectedItem.id,
            name: selectedItem.name,
            [size]: {
                price: selectedSize.price,
                quantity: 1,
                total: selectedSize.price,
            }
        };

        checkout.push(addItem);

        console.log(checkout);
    } else {
        
        // Cart may not have the size clicked
        // Existing cartFound item may have small, but if adding large it will need quantity set to 1
        // We do need to check the quantity with the ternary operator
        // We also need to add in "optional chaining" "?"


        const quantity = cartFound[size]?.quantity ? cartFound[size].quantity += 1 : 1;

        cartFound[size] = {
            price: selectedSize.price,
            // quantity: cartFound[size].quantity ? cartFound[size].quantity +=1 : 1,
            quantity: quantity,
            total: quantity * selectedSize.price,
        };
    };

    console.log(checkout);

    buildCart();

};



// build the cart


function buildCart() {

    checkoutList.innerHTML = '';

    checkout.forEach( (drink) => {

        const template = `
            <div class = "checkout-item">
                <div><strong>${drink.name}</strong></div>
                <div>${drink.Sml ? 'Sml ' + format(drink.Sml.price) + ' x ' + drink.Sml.quantity + '<strong class = "running">' + format(drink.Sml.total) + '</strong>' : ''}</div>
                <div>${drink.Med ? 'Med ' + format(drink.Med.price) + ' x ' + drink.Med.quantity + '<strong class = "running">' + format(drink.Med.total) + '</strong>' : ''}</div>
                <div>${drink.Lge ? 'Lge ' + format(drink.Lge.price) + ' x ' + drink.Lge.quantity + '<strong class = "running">' + format(drink.Lge.total) + '</strong>' : ''}</div>
            </div>
        `;

        checkoutList.innerHTML += template;
    } );

    runTotal();
};




function runTotal () {
     let total = 0;
     checkout.forEach( (product) => {
        if(product.Sml) total += product.Sml.total
        if(product.Med) total += product.Med.total
        if(product.Lge) total += product.Lge.total
     });

     checkoutTotal.innerText = format(total);
};

