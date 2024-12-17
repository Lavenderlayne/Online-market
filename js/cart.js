// Update cart count
let cart = {};


function updateCartCount() {
    const cartCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
    saveCart();
}

// Add product to cart
function addToCart(name, price) {
    if (cart[name]) {
        cart[name].quantity += 1;
        cart[name].totalPrice = cart[name].quantity * price;
    } else {
        cart[name] = { price, quantity: 1, totalPrice: price };
    }
    updateCartCount();
}

// Show cart modal
function showCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    if (!cartItems || !totalPriceElement) return;

    cartItems.innerHTML = '';
    let totalPrice = 0;

    Object.keys(cart).forEach(name => {
        const item = cart[name];
        const li = document.createElement('li');
        li.innerHTML = `
            ${name} - ${item.price} UAH x ${item.quantity} = ${item.totalPrice} UAH
            <button onclick="removeFromCart('${name}')">Remove</button>
        `;
        cartItems.appendChild(li);
        totalPrice += item.totalPrice;
    });

    totalPriceElement.textContent = `Total: ${totalPrice} UAH`;
    document.getElementById('cartModal').style.display = 'block';
}

// Remove product from cart
function removeFromCart(name) {
    delete cart[name];
    updateCartCount();
    showCart();
}

// Clear cart
function clearCart() {
    cart = {};
    updateCartCount();
    showCart();
}

// Close modal
function closeModal() {
    document.getElementById('cartModal').style.display = 'none';
}



// Save cart to local storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from local storage
function loadCart() {
    try {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart) {
            cart = storedCart;
            
            updateCartCount();
        }
    } catch (error) {
        cart = {};
        console.error('Error loading cart:', error);
    }
}



document.getElementById('clearCart')?.addEventListener('click', clearCart);
document.getElementById('cartButton')?.addEventListener('click', showCart);
document.getElementById('closeModal')?.addEventListener('click', closeModal);


// Load cart on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});