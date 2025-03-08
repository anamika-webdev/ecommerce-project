let listCart = [];

// Get cart data from localStorage
function checkCart() {
    let cartData = localStorage.getItem("listCart");
    listCart = cartData ? JSON.parse(cartData) : [];
}

checkCart();
addCartToHTML();

// Display cart items in checkout page
function addCartToHTML() {
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';

    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');

    let totalQuantity = 0;
    let totalPrice = 0;

    if (listCart.length > 0) {
        listCart.forEach(product => {
            let newP = document.createElement('div');
            newP.classList.add('item');
            newP.innerHTML = `
                <img src="${product.image}" alt="">
                <div class="info">
                    <div class="name">${product.name}</div>
                    <div class="price">$${product.price} per unit</div>
                </div>
                <div class="quantity">
                    <button onclick="changeQuantity(${product.id}, '-')">-</button>
                    <span class="value">${product.quantity}</span>
                    <button onclick="changeQuantity(${product.id}, '+')">+</button>
                </div>
                <div class="returnPrice">$${product.price * product.quantity}</div>
                <button class="removeItem" onclick="removeItem(${product.id})">❌</button>
            `;
            listCartHTML.appendChild(newP);

            totalQuantity += product.quantity;
            totalPrice += product.price * product.quantity;
        });
    } else {
        listCartHTML.innerHTML = "<p>No items in the cart.</p>";
    }

    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = `$${totalPrice}`;
}

// Change quantity function
function changeQuantity(idProduct, type) {
    let product = listCart.find(p => p.id === idProduct);
    if (!product) return;

    if (type === '+') {
        product.quantity++;
    } else if (type === '-') {
        product.quantity--;
        if (product.quantity <= 0) {
            listCart = listCart.filter(p => p.id !== idProduct);
        }
    }

    saveCart();
    addCartToHTML();
}

// Remove item from cart
function removeItem(idProduct) {
    listCart = listCart.filter(p => p.id !== idProduct);
    saveCart();
    addCartToHTML();
}

// Save cart data to localStorage
function saveCart() {
    localStorage.setItem("listCart", JSON.stringify(listCart));
}

// Handle checkout button click
document.querySelector('.buttonCheckout').addEventListener('click', () => {
    if (listCart.length === 0) {
        alert("⚠️ Your cart is empty!");
        return;
    }

    let fullName = document.querySelector('input[placeholder="Enter your full name"]').value.trim();
    let phone = document.querySelector('input[placeholder="Enter your phone number"]').value.trim();
    let address = document.querySelector('input[placeholder="Enter your address"]').value.trim();
    let country = document.querySelector('select[name="country"]').value.trim();
    let city = document.querySelector('select[name="city"]').value.trim();

    if (!fullName || !phone || !address || country === "" || city === "") {
        alert("⚠️ Please fill in all required details before proceeding!");
        return;
    }

    // Prepare order data
    let orderData = {
        name: fullName,
        phone: phone,
        address: `${address}, ${city}, ${country}`,
        items: listCart,
        total: listCart.reduce((sum, product) => sum + (product.price * product.quantity), 0),
        timestamp: new Date().toLocaleString()
    };

    // Save order in localStorage
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(orderData);
    localStorage.setItem("orders", JSON.stringify(orders));

    alert(`✅ Order placed successfully!\n\nThank you, ${fullName}! Your order will be shipped to ${address}, ${city}, ${country}.`);
    
    // Clear cart after successful order placement
    localStorage.removeItem("listCart");
    listCart = [];
    addCartToHTML();
});