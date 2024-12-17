let products = [];

// Load products from JSON
async function loadProducts() {
    try {
        const response = await fetch('json/machinery.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        products = await response.json();
        initializePage();
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Initialize the page with categories, products, and event listeners
function initializePage() {
    populateCategories(products);
    displayProducts(products);
  
    addEventListeners();
}

// Populate categories in the filter dropdown
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

// Filter by category
function filterByCategory() {
    const selectedCategory = document.getElementById('categorySelect').value;
    const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : products;
    displayProducts(filteredProducts);
}

// Filter by price range
function filterByPrice() {
    const minPrice = parseInt(document.getElementById('minPrice').value, 10);
    const maxPrice = parseInt(document.getElementById('maxPrice').value, 10);
    const filteredProducts = products.filter(product => product.price >= minPrice && product.price <= maxPrice);
    displayProducts(filteredProducts);
}

// Display filtered products
function displayProducts(productsToShow) {
    const productsContainer = document.getElementById('productsContainer');
    if (!productsContainer) return;

    productsContainer.innerHTML = ''; // Clear previous products
    if (productsToShow.length === 0) {
        productsContainer.innerHTML = '<p>No products found.</p>';
        return;
    }

    productsToShow.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <a href="product.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}" />
                <h2>${product.name}</h2>
                <p>${product.description || 'No description'}</p>
                <p>Price: ${product.price} UAH</p>
            </a>
        `;
        productsContainer.appendChild(productDiv);
    });
}


// Event listeners for filters
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

// Handle search input
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
    displayProducts(filteredProducts);
}

// Handle sorting of products
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

// Toggle filters display
function toggleFilterDisplay() {
    const filterOptions = document.getElementById('filterOptions');
    filterOptions.style.display = filterOptions.style.display === 'none' ? 'block' : 'none';
}



// Load products and cart on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});