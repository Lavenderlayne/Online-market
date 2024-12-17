// Зчитування параметра id з URL
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

// Завантаження товарів з JSON
async function loadProductDetails() {
    try {
        const response = await fetch('json/machinery.json');
        if (!response.ok) {
            throw new Error('Помилка завантаження даних');
        }
        const products = await response.json();
        const product = products.find(p => p.id == productId);

        if (product) {
            document.getElementById('productName').textContent = product.name;
            document.getElementById('productImage').src = product.image;
            document.getElementById('productImage').alt = product.name;
            document.getElementById('productPrice').textContent = `Ціна: ${product.price} грн`;
            document.getElementById('productCategory').textContent = `Категорія: ${product.category}`;
            document.getElementById('productDescription').textContent = product.description || 'Опис відсутній';
        } else {
            document.body.innerHTML = '<p>Товар не знайдено.</p>';
        }
    } catch (error) {
        console.error('Помилка:', error);
        document.body.innerHTML = '<p>Сталася помилка при завантаженні товару.</p>';
    }

    
}

// Викликаємо функцію для завантаження даних товару
if (productId) {
    loadProductDetails();
} else {
    document.body.innerHTML = '<p>Невірний ідентифікатор товару.</p>';
}

document.getElementById('addToCartButton')?.addEventListener('click', () => {
    const productName = document.getElementById('productName').textContent;
    const productPrice = parseFloat(document.getElementById('productPrice').textContent.replace('Ціна: ', '').replace(' грн', ''));
    addToCart(productName, productPrice)
});