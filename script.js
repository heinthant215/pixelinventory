document.addEventListener('DOMContentLoaded', () => {
    const cartItems = [];

    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const itemElement = event.target.closest('.item');
            const name = itemElement.dataset.name;
            const price = itemElement.dataset.price;

            // Check if the item is already in the cart
            const isAlreadyInCart = cartItems.some(item => item.name === name);

            if (!isAlreadyInCart) {
                cartItems.push({ name, price });
                updateCart();
            } else {
                alert(`${name} is already in your cart.`);
            }
        });
    });

    // Update cart function
    function updateCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';

        cartItems.forEach((item, index) => {
            const itemElement = document.createElement('p');
            itemElement.textContent = `${item.name} - $${item.price}`;
            cartItemsContainer.appendChild(itemElement);
        });

        if (cartItems.length === 0) {
            cartItemsContainer.textContent = 'Your cart is empty.';
        }
    }

    // Checkout functionality (Buy)
    document.getElementById('checkout').addEventListener('click', () => {
        if (cartItems.length > 0) {
            alert('Items purchased successfully!');
            cartItems.length = 0;  // Clear the cart
            updateCart();
        } else {
            alert('Your cart is empty!');
        }
    });

    // Watch Stream button
    document.getElementById('watch-stream').addEventListener('click', () => {
        window.open('https://www.example.com/stream', '_blank'); // Replace with actual stream URL
    });

    // Initial update for an empty cart
    updateCart();
});
