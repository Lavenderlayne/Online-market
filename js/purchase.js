document.addEventListener('DOMContentLoaded', () => {
    // Оновлення кошика на сторінці покупки
    updateCartOnPurchasePage();

    // Обробка підтвердження покупки
    document.getElementById('confirmPurchaseButton')?.addEventListener('click', confirmPurchase);
});

// Оновлення кошика на сторінці покупки
function updateCartOnPurchasePage() {
    const cartItems = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    const cart = loadCartFromStorage();

    cartItems.innerHTML = '';
    let totalPrice = 0;

    Object.keys(cart).forEach(name => {
        const item = cart[name];
        const li = document.createElement('li');
        li.innerHTML = `${name} - ${item.price} UAH x ${item.quantity} = ${item.totalPrice} UAH`;
        cartItems.appendChild(li);
        totalPrice += item.totalPrice;
    });

    totalPriceElement.textContent = ` ${totalPrice} UAH`;
}

// Функція для підтвердження покупки
function confirmPurchase() {
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('paymentMethod').value;

    if (!address || !paymentMethod) {
        alert('Будь ласка, заповніть всі поля.');
        return;
    }

    const cart = loadCartFromStorage();
    if (Object.keys(cart).length === 0) {
        alert('Ваш кошик порожній!');
        return;
    }

    // Очищення кошика після покупки
    localStorage.removeItem('cart');
    
    window.location.href = '/'; // Переадресація на головну сторінку
}

// Завантаження кошика з localStorage
function loadCartFromStorage() {
    try {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        return storedCart || {};
    } catch (error) {
        console.error('Помилка при завантаженні кошика:', error);
        return {};
    }
}