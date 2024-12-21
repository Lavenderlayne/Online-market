let products = [];

// Завантаження продуктів з JSON
async function loadProducts() {
    try {
        const response = await fetch('json/machinery.json');
        if (!response.ok) {
            throw new Error('Помилка мережі');
        }
        products = await response.json();
        initializePage();
    } catch (error) {
        console.error('Помилка завантаження продуктів:', error);
    }
}

// Ініціалізація сторінки з категоріями, продуктами та обробниками подій
function initializePage() {
    populateCategories(products);
    displayProducts(products);
    addEventListeners();
}

// Заповнення категорій у фільтрах
function populateCategories(products) {
    const categorySelect = document.getElementById('categorySelect');
    const categories = [...new Set(products.map(product => product.category))];
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// Фільтрація за категорією
function filterByCategory() {
    const selectedCategory = document.getElementById('categorySelect').value;
    const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : products;
    displayProducts(filteredProducts);
}

// Фільтрація за ціною
function filterByPrice() {
    const minPrice = parseInt(document.getElementById('minPrice').value, 10);
    const maxPrice = parseInt(document.getElementById('maxPrice').value, 10);
    const filteredProducts = products.filter(product => product.price >= minPrice && product.price <= maxPrice);
    displayProducts(filteredProducts);
}

// Відображення продуктів на сторінці
function displayProducts(productsToShow) {
    const productsContainer = document.getElementById('productsContainer');
    if (!productsContainer) return;

    productsContainer.innerHTML = ''; // Очищення попереднього вмісту
    if (productsToShow.length === 0) {
        productsContainer.innerHTML = '<p>Товари не знайдено.</p>';
        return;
    }

    productsToShow.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <a href="product.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}" />
                <h2>${product.name}</h2>
                <p>${product.description || 'Опис відсутній'}</p>
                <p>Ціна: ${product.price} грн</p>
            </a>
        `;
        productsContainer.appendChild(productDiv);
    });
}

// Обробники подій для фільтрації та пошуку
function addEventListeners() {
    document.getElementById('searchInput')?.addEventListener('input', handleSearch);
    document.getElementById('sortSelect')?.addEventListener('change', handleSort);
    document.getElementById('categorySelect')?.addEventListener('change', filterByCategory);
    document.getElementById('filterButton')?.addEventListener('click', () => {
        filterByCategory();
        filterByPrice();
    });
    document.getElementById('minPrice')?.addEventListener('input', () => {
        document.getElementById('minPriceValue').value = document.getElementById('minPrice').value;
    });
    document.getElementById('maxPrice')?.addEventListener('input', () => {
        document.getElementById('maxPriceValue').value = document.getElementById('maxPrice').value;
    });
    document.getElementById('toggleFilters')?.addEventListener('click', toggleFilterDisplay);
}

// Обробка пошуку товарів
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
    displayProducts(filteredProducts);
}

// Обробка сортування товарів
function handleSort(event) {
    const sortBy = event.target.value;
    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else {
            return a.price - b.price;
        }
    });
    displayProducts(sortedProducts);
}

// Перемикач відображення фільтрів
function toggleFilterDisplay() {
    const filterOptions = document.getElementById('filterOptions');
    filterOptions.style.display = filterOptions.style.display === 'none' ? 'block' : 'none';
}

// Завантаження продуктів під час завантаження сторінки
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});