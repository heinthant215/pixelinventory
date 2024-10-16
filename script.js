document.addEventListener('DOMContentLoaded', () => {
    const cartItems = [];

    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const itemElement = event.target.closest('.item');
            const name = itemElement.dataset.name;
            const price = itemElement.dataset.price;
            cartItems.push({ name, price });
            updateCart();
        });
    });

    // Update cart
    function updateCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';
        cartItems.forEach((item, index) => {
            const itemElement = document.createElement('p');
            itemElement.textContent = `${item.name} - $${item.price}`;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    // Checkout functionality (Buy)
    document.getElementById('checkout').addEventListener('click', () => {
        if (cartItems.length > 0) {
            alert('Items purchased successfully!');
            cartItems.length = 0;
            updateCart();
        } else {
            alert('Your cart is empty!');
        }
    });

    // Watch Stream button
    document.getElementById('watch-stream').addEventListener('click', () => {
        window.open('https://www.example.com/stream', '_blank'); // Replace with actual stream URL
    });
});
