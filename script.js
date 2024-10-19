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

    // Reset cart functionality
    document.getElementById('reset-cart').addEventListener('click', function() {
        localStorage.removeItem('cart');
        document.getElementById('cart-items').innerHTML = '';
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

    // Modal functionality

    // Get modal element
    var modal = document.getElementById("payment-modal");

    // Get the button that opens the modal
    var buyBtn = document.getElementById("buy-btn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // Get the credit card details section
    var creditCardDetails = document.getElementById("credit-card-details");

    // Get the payment method dropdown
    var paymentMethodDropdown = document.getElementById("payment-method");

    // Show/Hide credit card details based on selected payment method
    paymentMethodDropdown.addEventListener('change', function() {
        if (this.value === "credit-card") {
            creditCardDetails.style.display = "block";  // Show credit card section
        } else {
            creditCardDetails.style.display = "none";  // Hide credit card section
        }
    });

    // When the user clicks the button, open the modal
    buyBtn.onclick = function () {
        modal.style.display = "block";
    };

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    // Handle form submission (with credit card processing or other logic)
    document.getElementById("payment-form").addEventListener("submit", function (event) {
        event.preventDefault();

        var paymentMethod = document.getElementById("payment-method").value;

        if (paymentMethod === 'credit-card') {
            // Retrieve and process credit card details
            var cardNumber = document.getElementById('card-number').value;
            var expiryDate = document.getElementById('expiry-date').value;
            var cvv = document.getElementById('cvv').value;

            alert("Credit Card Info: " + cardNumber + " Expiry: " + expiryDate + " CVV: " + cvv);

            // Additional logic for processing credit card details
        } else {
            alert("You selected: " + paymentMethod);
        }

        modal.style.display = "none";  // Close the modal after selection
    });
});
