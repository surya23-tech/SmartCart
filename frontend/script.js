// Profile page logic
if (window.location.pathname.endsWith('profile.html')) {
    document.addEventListener('DOMContentLoaded', async () => {
        const email = localStorage.getItem('userEmail');
        if (!email) {
            alert('Please login to view your profile.');
            window.location.href = 'login.html';
            return;
        }
        const profileForm = document.getElementById('profileForm');
        const savedProfile = JSON.parse(localStorage.getItem('userProfile_' + email)) || {};
        // Load profile
        try {
            const res = await fetch(`http://localhost:5000/api/users/profile/${email}`);
            const data = await res.json();
            if (data && data.name) {
                Object.assign(savedProfile, data);
            }
        } catch (err) {
            console.log('Failed to load profile from server, using local data.');
        }

        if (savedProfile) {
            document.getElementById('profileName').value = savedProfile.name || '';
            document.getElementById('profileEmail').value = email || '';
            document.getElementById('profileMobile').value = savedProfile.mobile || '';
            document.getElementById('profileAddress').value = savedProfile.address || '';
            document.getElementById('profileCity').value = savedProfile.city || '';
            document.getElementById('profileState').value = savedProfile.state || '';
            document.getElementById('profilePincode').value = savedProfile.pincode || '';
        }

        // Save profile
        profileForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const payload = {
                name: document.getElementById('profileName').value,
                email: document.getElementById('profileEmail').value,
                mobile: document.getElementById('profileMobile').value,
                address: document.getElementById('profileAddress').value,
                city: document.getElementById('profileCity').value,
                state: document.getElementById('profileState').value,
                pincode: document.getElementById('profilePincode').value
            };
            
            // Save permanently in localStorage
            localStorage.setItem('userProfile_' + email, JSON.stringify(payload));
            
            try {
                const res = await fetch(`http://localhost:5000/api/users/profile/${email}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const data = await res.json();
                if (data && data.message === 'Profile updated') {
                    alert('Profile updated successfully!');
                } else {
                    alert('Profile saved locally! (Backend update failed)');
                }
            } catch (err) {
                alert('Profile saved locally! (Server offline)');
            }
        });
    });
}

// Autofill address for checkout (example usage)
async function autofillAddressFields() {
    const email = localStorage.getItem('userEmail');
    if (!email) return;
    try {
        const res = await fetch(`http://localhost:5000/api/users/profile/${email}`);
        const data = await res.json();
        if (data) {
            // Example: document.getElementById('checkoutAddress').value = data.address;
            // Fill other fields as needed
        }
    } catch (err) {}
}
const productsContainer = document.getElementById("products");
let allProducts = [];
let filteredProducts = [];

const isLoggedIn = localStorage.getItem("isLoggedIn");
if (isLoggedIn) {
    const loginLink = document.getElementById("loginLink");
    const signupLink = document.getElementById("signupLink");
    const logoutLink = document.getElementById("logoutLink");
    if (loginLink) loginLink.style.display = "none";
    if (signupLink) signupLink.style.display = "none";
    if (logoutLink) logoutLink.style.display = "inline-block";
} else {
    const logoutLink = document.getElementById("logoutLink");
    if (logoutLink) logoutLink.style.display = "none";
}

// Fetch all products once
async function fetchProducts() {
    try {
        const response = await fetch("http://localhost:5000/api/products");
        allProducts = await response.json();
        displayProducts(allProducts.slice(0, 4));
        displayTrendingProducts(allProducts);
        setupSearchAndFilter();
    } catch (error) {
        console.log(error);
    }
}

// Ratings and reviews are now fetched from the database

function generateStars(rating) {
    return rating + ' ★';
}

function highlightMatch(text, query) {
    if (!query) return text;
    // Escape special characters in query
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, "gi");
    return text.replace(regex, `<mark class="highlight">$1</mark>`);
}

function displayProducts(products, searchQuery = "") {
    productsContainer.innerHTML = "";
    if (products.length === 0) {
        productsContainer.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px;"><p style="font-size:1.2rem;color:#999;">No products found. Try adjusting your filters!</p></div>';
        return;
    }
    products.forEach(product => {
        const currentPrice = product.originalPrice - (product.discount || 0);
        const discountPercent = product.discount ? Math.round((product.discount / product.originalPrice) * 100) : 0;
        const rating = product.rating || 4.5;
        const reviews = product.reviews || 100;
        productsContainer.innerHTML += `
        <div class="product-card">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/280x280?text=Product'">
                ${discountPercent > 0 ? `<span class="discount-badge">${discountPercent}% off</span>` : ''}
            </div>
            <div class="product-info">
                <h3>${highlightMatch(product.name, searchQuery)}</h3>
                <span class="product-category">${highlightMatch(product.category || 'General', searchQuery)}</span>
                ${product.description ? `<p class="product-description">${highlightMatch(product.description, searchQuery)}</p>` : ''}
                <div class="product-rating">
                    <span class="stars">${generateStars(rating)}</span>
                    <span class="rating-count">(${reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">₹${currentPrice.toLocaleString('en-IN')}</span>
                    ${product.originalPrice > currentPrice ? `<span class="original-price">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="add-to-cart-btn" onclick="addToCart('${product.name.replace(/'/g, "\\'")}', ${currentPrice}, '${product.image}')">Add to Cart</button>
                    <button class="buy-now-btn" onclick="buyNow('${product.name.replace(/'/g, "\\'")}', ${currentPrice}, '${product.image}')">Buy Now</button>
                </div>
            </div>
        </div>
        `;
    });
}

async function showProducts() {
    try {
        document.getElementById("productsSection").style.display = "block";
        if (allProducts.length === 0) {
            const response = await fetch("http://localhost:5000/api/products");
            allProducts = await response.json();
        }
        displayProducts(allProducts);
        document.getElementById("productsSection")
            .scrollIntoView({ behavior: "smooth" });
    } catch (error) {
        console.log(error);
    }
}

function setupSearchAndFilter() {
    const searchBar = document.getElementById("searchBar");
    const categoryFilter = document.getElementById("categoryFilter");
    const searchBarMobile = document.getElementById("searchBarMobile");
    const categoryFilterMobile = document.getElementById("categoryFilterMobile");
    const priceSlider = document.getElementById("priceSlider");
    const minPriceLabel = document.getElementById("minPriceLabel");
    const maxPriceLabel = document.getElementById("maxPriceLabel");
    const sortDropdown = document.getElementById("sortDropdown");

    function applyAllFilters() {
        let searchValue = "";
        let categoryValue = "All";
        let maxPrice = parseInt(priceSlider?.value) || 500000;
        let sortValue = sortDropdown?.value || "default";

        if (window.innerWidth > 900) {
            if (searchBar) searchValue = searchBar.value.trim().toLowerCase();
            if (categoryFilter) categoryValue = categoryFilter.value;
        } else {
            if (searchBarMobile) searchValue = searchBarMobile.value.trim().toLowerCase();
            if (categoryFilterMobile) categoryValue = categoryFilterMobile.value;
        }

        let filtered = allProducts.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchValue) 
                || (product.category && product.category.toLowerCase().includes(searchValue))
                || (product.description && product.description.toLowerCase().includes(searchValue));
            const matchesCategory = categoryValue === "All" || (product.category && product.category === categoryValue);
            const currentPrice = product.originalPrice - (product.discount || 0);
            const matchesPrice = currentPrice <= maxPrice;
            return matchesSearch && matchesCategory && matchesPrice;
        });

        // Apply sorting
        if (sortValue === "low-to-high") {
            filtered.sort((a, b) => (a.originalPrice - (a.discount || 0)) - (b.originalPrice - (b.discount || 0)));
        } else if (sortValue === "high-to-low") {
            filtered.sort((a, b) => (b.originalPrice - (b.discount || 0)) - (a.originalPrice - (a.discount || 0)));
        }

        filteredProducts = filtered;
        displayProducts(filtered, searchValue);
    }

    if (searchBar) searchBar.addEventListener("input", applyAllFilters);
    if (categoryFilter) categoryFilter.addEventListener("change", applyAllFilters);
    if (searchBarMobile) searchBarMobile.addEventListener("input", applyAllFilters);
    if (categoryFilterMobile) categoryFilterMobile.addEventListener("change", applyAllFilters);
    
    if (priceSlider) {
        priceSlider.addEventListener("input", () => {
            if (maxPriceLabel) maxPriceLabel.textContent = parseInt(priceSlider.value).toLocaleString('en-IN');
            applyAllFilters();
        });
    }
    
    if (sortDropdown) {
        sortDropdown.addEventListener("change", applyAllFilters);
    }
}

function addToCart(productName, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(i => i.name === productName);
    if(item) {
        item.quantity += 1;
    } else {
        cart.push({ name: productName, price: price || 0, image: image || '', quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("✅ " + productName + " added to cart!");
    syncCartToMongo(cart);
}

async function syncCartToMongo(cart) {
    const email = localStorage.getItem("userEmail");
    if (!email) return;
    try {
        await fetch(`http://localhost:5000/api/users/cart/${email}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cart })
        });
    } catch (err) {
        console.error("Cart sync failed:", err.message);
    }
}

function buyNow(productName, price, image) {
    addToCart(productName, price, image);
    window.location.href = "cart.html";
}

// showProfile removed as it links directly to profile.html

function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("cart");
    alert("👋 Logged out successfully!");
    window.location.href = "login.html";
}

function filterByCategory(cat) {
    const catFilter = document.getElementById("categoryFilter");
    if(catFilter) {
        catFilter.value = cat;
        // Trigger a change to apply filter
        const event = new Event('change');
        catFilter.dispatchEvent(event);
    }
    showProducts();
}

function displayTrendingProducts(products) {
    const carousel = document.getElementById("trendingCarousel");
    if(!carousel) return;
    carousel.innerHTML = "";
    const trending = products.slice(0, 6); // Get top 6 products
    
    trending.forEach(product => {
        const currentPrice = product.originalPrice - (product.discount || 0);
        const discountPercent = product.discount ? Math.round((product.discount / product.originalPrice) * 100) : 0;
        const rating = product.rating || 4.5;
        const reviews = product.reviews || 100;
        
        carousel.innerHTML += `
        <div class="product-card carousel-card">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/280x280?text=Product'">
                ${discountPercent > 0 ? `<span class="discount-badge">${discountPercent}% off</span>` : ''}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-rating">
                    <span class="stars">${generateStars(rating)}</span>
                    <span class="rating-count">(${reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">₹${currentPrice.toLocaleString('en-IN')}</span>
                    ${product.originalPrice > currentPrice ? `<span class="original-price">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="add-to-cart-btn" onclick="addToCart('${product.name.replace(/'/g, "\\'")}', ${currentPrice}, '${product.image}')">Add to Cart</button>
                    <button class="buy-now-btn" onclick="buyNow('${product.name.replace(/'/g, "\\'")}', ${currentPrice}, '${product.image}')">Buy Now</button>
                </div>
            </div>
        </div>
        `;
    });
}

fetchProducts();