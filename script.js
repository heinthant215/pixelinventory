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

// Get modal element
var modal = document.getElementById("payment-modal");

// Get the button that opens the modal
var buyBtn = document.getElementById("buy-btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

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

// Handle payment method submission
document.getElementById("payment-form").addEventListener("submit", function (event) {
  event.preventDefault();
  var paymentMethod = document.getElementById("payment-method").value;
  
  alert("You selected: " + paymentMethod); // Show selected payment method
  
  // You can add payment processing logic here
  
  modal.style.display = "none"; // Close the modal after selection
});

