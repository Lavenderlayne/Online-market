// Оновлення кількості товарів у кошику
let cart = {};

// Оновлення кількості товарів у кошику
function updateCartCount() {
    const cartCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
    saveCart();
}

// Додавання товару до кошика
function addToCart(name, price) {
    if (cart[name]) {
        cart[name].quantity += 1;
        cart[name].totalPrice = cart[name].quantity * price;
    } else {
        cart[name] = { price, quantity: 1, totalPrice: price };
    }
    updateCartCount();
}

// Показ модального вікна кошика
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
            ${name} - ${item.price} UAH x ${item.quantity} = ${item.totalPrice} UAH`;
        cartItems.appendChild(li);
        totalPrice += item.totalPrice;
    });

    totalPriceElement.textContent = `Загальна сума: ${totalPrice} UAH`;
    document.getElementById('cartModal').style.display = 'block';
}

// Видалення товару з кошика
function removeFromCart(name) {
    delete cart[name];
    updateCartCount();
    showCart();
}

// Очищення кошика
function clearCart() {
    cart = {};
    updateCartCount();
    showCart();
}

// Закриття модального вікна
function closeModal() {
    document.getElementById('cartModal').style.display = 'none';
}

// Збереження кошика в localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Завантаження кошика з localStorage
function loadCart() {
    try {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart) {
            cart = storedCart;
            updateCartCount();
        }
    } catch (error) {
        cart = {};
        console.error('Помилка при завантаженні кошика:', error);
    }
}

document.getElementById('clearCart')?.addEventListener('click', clearCart);
document.getElementById('cartButton')?.addEventListener('click', showCart);
document.getElementById('closeModal')?.addEventListener('click', closeModal);

// Завантаження кошика під час завантаження сторінки
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});

