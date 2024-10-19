document.addEventListener('DOMContentLoaded', () => {
    // Load cart from localStorage or initialize an empty array
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const itemElement = event.target.closest('.item');
            const name = itemElement.dataset.name;
            const price = parseFloat(itemElement.dataset.price);

            // Check if the item is already in the cart
            const existingItem = cartItems.find(item => item.name === name);

            if (!existingItem) {
                cartItems.push({ name, price, quantity: 1 });
                alert(`${name} has been added to the cart.`);
                updateCart();
                localStorage.setItem('cart', JSON.stringify(cartItems));  // Save cart to localStorage
            } else {
                alert(`${name} is already in your cart.`);
            }
        });
    });
    document.getElementById('reset-cart').addEventListener('click', function() {
        // Clear the cart stored in localStorage
        localStorage.removeItem('cart');
        
        // Optionally clear any cart display in the DOM
        document.getElementById('cart-items').innerHTML = '';
    
        // Refresh the page to update the UI
        location.reload();
    });
    
    

    // Update cart display
    function updateCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';

        cartItems.forEach(item => {
            const itemElement = document.createElement('p');
            itemElement.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
            cartItemsContainer.appendChild(itemElement);
        });

        if (cartItems.length === 0) {
            cartItemsContainer.textContent = 'Your cart is empty.';
        }
    }



    // Watch Stream button functionality
    document.getElementById('watch-stream').addEventListener('click', () => {
        window.open('https://www.example.com/stream', '_blank');  // Replace with your actual stream URL
    });

    // Initial update for the cart display
    updateCart();
});
