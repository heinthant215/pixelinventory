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

    // Get the shipping address section
    var shippingAddressSection = document.getElementById("shipping-address");

    // Get the payment method dropdown
    var paymentMethodDropdown = document.getElementById("payment-method");

    // When the user clicks "Proceed to Payment", show the credit card section
    document.getElementById("proceed-to-shipping").addEventListener("click", function(event) {
        event.preventDefault();

        // Only show credit card details if the selected method is "Credit Card"
        if (paymentMethodDropdown.value === "credit-card") {
            creditCardDetails.style.display = "block";  // Show credit card section
            shippingAddressSection.style.display = "none"; // Hide shipping address until credit card details are entered
        } else {
            alert("Please select a valid payment method.");
        }
    });

    // When the user submits credit card details, proceed to shipping
    document.getElementById("proceed-to-shipping").addEventListener("click", function(event) {
        event.preventDefault();

        // Retrieve and validate credit card details
        var cardNumber = document.getElementById('card-number').value;
        var expiryDate = document.getElementById('expiry-date').value;
        var cvv = document.getElementById('cvv').value;

        if (!cardNumber || !expiryDate || !cvv) {
            alert("Please fill out all credit card details.");
            return;
        }

        // Hide credit card form and show shipping address form
        creditCardDetails.style.display = "none";
        shippingAddressSection.style.display = "block";  // Show shipping form
    });

    // Handle shipping address submission
    document.getElementById("submit-shipping").addEventListener("click", function(event) {
        event.preventDefault();

        // Get shipping address values
        var addressLine1 = document.getElementById('address-line-1').value;
        var addressLine2 = document.getElementById('address-line-2').value;
        var city = document.getElementById('city').value;
        var state = document.getElementById('state').value;
        var zipCode = document.getElementById('zip-code').value;
        var country = document.getElementById('country').value;

        if (!addressLine1 || !city || !state || !zipCode || !country) {
            alert("Please fill out all required shipping address fields.");
            return;
        }

        // Process shipping details (You can replace the alert with actual logic)
        alert("Shipping Address: " + addressLine1 + ", " + city + ", " + state + ", " + zipCode + ", " + country);

        // Close modal after processing shipping
        modal.style.display = "none";
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
});
