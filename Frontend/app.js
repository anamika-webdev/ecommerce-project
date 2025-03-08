console.log("✅ app.js is running...");

let products = JSON.parse(localStorage.getItem("products")) || [];

if (products.length === 0) {
    fetch('product.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            localStorage.setItem("products", JSON.stringify(products));
            addDataToHTML();
        })
        .catch(error => console.error("❌ Error loading products:", error));
} else {
    addDataToHTML();
}

// Show products in HTML
function addDataToHTML() {
    let listProductHTML = document.querySelector('.listProduct');
    listProductHTML.innerHTML = '';

    products.forEach(product => {
        let newProduct = document.createElement('div');
        newProduct.classList.add('item');
        newProduct.innerHTML = `
            <img src="${product.image}">
            <h2>${product.name}</h2>
            <div class="price">$${product.price}</div>
            <button class="addToCart" data-id="${product.id}">Add To Cart</button>`;
        listProductHTML.appendChild(newProduct);
    });

    attachCartEvents();
}

// Attach event listeners for Add to Cart buttons
function attachCartEvents() {
    document.querySelectorAll('.addToCart').forEach(button => {
        button.addEventListener('click', function () {
            let productId = parseInt(this.getAttribute('data-id'));
            addCart(productId);
        });
    });
}

// Load cart from localStorage
let listCart = [];
function loadCart() {
    let cartData = localStorage.getItem("listCart");
    listCart = cartData ? JSON.parse(cartData) : [];
    updateCartUI();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem("listCart", JSON.stringify(listCart));
    updateCartQuantity();
    updateCartUI();
}

// Add item to cart
function addCart(productId) {
    let product = products.find(p => p.id === productId);
    if (!product) return;
    
    let existingProduct = listCart.find(p => p.id === productId);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        listCart.push({ ...product, quantity: 1 });
    }

    saveCart();
}

// Remove item from cart
function removeFromCart(productId) {
    listCart = listCart.filter(item => item.id !== productId);
    saveCart();
}

// Update cart quantity display
function updateCartQuantity() {
    let totalQuantity = listCart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.totalQuantity').innerText = totalQuantity;
}

// Update cart UI
function updateCartUI() {
    let cartListHTML = document.querySelector('.listCart');
    cartListHTML.innerHTML = '';

    if (listCart.length === 0) {
        cartListHTML.innerHTML = '<p>No items in cart.</p>';
        return;
    }

    listCart.forEach(product => {
        let cartItem = document.createElement('div');
        cartItem.classList.add('item');
        cartItem.innerHTML = `
            <img src="${product.image}" alt="">
            <div class="content">
                <div class="name">${product.name}</div>
                <div class="price">$${product.price} x ${product.quantity}</div>
            </div>
            <div class="quantity">
                <button onclick="changeQuantity(${product.id}, '-')">-</button>
                <span class="value">${product.quantity}</span>
                <button onclick="changeQuantity(${product.id}, '+')">+</button>
            </div>
            <button class="removeItem" onclick="removeFromCart(${product.id})">❌</button>
        `;
        cartListHTML.appendChild(cartItem);
    });
}

// Change quantity in cart
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
}

// Handle cart icon click to toggle sidebar
function toggleCart() {
    let cart = document.querySelector('.cart');
    cart.style.right = cart.style.right === "0px" ? "-100%" : "0px";
}

document.querySelector('.iconCart').addEventListener('click', toggleCart);

document.querySelector('.close').addEventListener('click', function () {
    document.querySelector('.cart').style.right = "-100%";
});

// Pass cart data to checkout page
function goToCheckout() {
    localStorage.setItem("listCart", JSON.stringify(listCart));
    window.location.href = "checkout.html";
}

document.querySelector('.checkout a').addEventListener('click', goToCheckout);

// Initialize cart
loadCart();
updateCartQuantity();