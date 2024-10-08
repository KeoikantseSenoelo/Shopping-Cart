let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to handle adding items to the cart
function addToCart(productId, productName, productPrice, quantity) {
    if (quantity > 0) {
        const existingItem = cart.find(item => item.name === productName);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                name: productName,
                price: parseFloat(productPrice),
                quantity: quantity
            });
        }

        saveCart();
        updateCart();
    } else {
        alert('Please enter a valid quantity.');
    }
}

// Function to update the cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalCostElement = document.getElementById('total-cost');

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';

        let totalCost = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.quantity * item.price;
            totalCost += itemTotal;

            const cartRow = `
                <tr>
                    <td>${item.name}</td>
                    <td>
                        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                    </td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>$${itemTotal.toFixed(2)}</td>
                    <td><button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button></td>
                </tr>
            `;
            cartItemsContainer.innerHTML += cartRow;
        });

        totalCostElement.textContent = totalCost.toFixed(2);
    }

    updateCartCount(); // Update the cart count whenever the cart is updated
}

// Function to update the quantity of an item
function updateQuantity(index, newQuantity) {
    const quantity = parseInt(newQuantity);

    if (quantity > 0) {
        cart[index].quantity = quantity;
        saveCart();
        updateCart();
    } else {
        alert('Please enter a valid quantity.');
    }
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
}

// Function to update the cart count
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

// Event listener for "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-product-id');
        const productName = this.getAttribute('data-product-name');
        const productPrice = this.getAttribute('data-product-price');
        const quantityInput = document.querySelector(`.product-quantity[data-product-id="${productId}"]`);
        const quantity = parseInt(quantityInput.value);
        addToCart(productId, productName, productPrice, quantity);
    });
});

// Update the cart display on page load
updateCart();
