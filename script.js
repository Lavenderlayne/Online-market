const products = [
    { id: 1, name: "Навушники", price: 999, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Чохол для телефону", price: 199, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Зарядний пристрій", price: 499, image: "https://via.placeholder.com/150" },
];

let cartCount = 0;

function loadProducts() {
    const productList = document.getElementById("product-list");
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product";
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>Ціна: ${product.price} грн</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Додати в кошик</button>
        `;
        productList.appendChild(productCard);
    });
}

function addToCart(productId) {
    cartCount++;
    document.getElementById("cart-count").textContent = cartCount;
    alert(`Товар додано до кошика!`);
}

window.onload = loadProducts;
