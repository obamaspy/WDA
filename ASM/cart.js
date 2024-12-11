document.addEventListener("DOMContentLoaded", () => {
    const cartItems = [];
    const cartItemsElement = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");

    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", (event) => {
            const product = event.target.closest(".product");
            const id = product.dataset.id;
            const name = product.dataset.name;
            const price = parseFloat(product.dataset.price);

            const existingItem = cartItems.find((item) => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cartItems.push({ id, name, price, quantity: 1 });
            }
            updateCart();
        });
    });

    function updateCart() {
        cartItemsElement.innerHTML = "";
        let total = 0;

        cartItems.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <button class="decrease-qty">-</button>
                    ${item.quantity}
                    <button class="increase-qty">+</button>
                </td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td><button class="remove-item" data-index="${index}">Remove</button></td>
            `;
            cartItemsElement.appendChild(row);

            row.querySelector(".decrease-qty").addEventListener("click", () => {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    cartItems.splice(index, 1);
                }
                updateCart();
            });

            row.querySelector(".increase-qty").addEventListener("click", () => {
                item.quantity += 1;
                updateCart();
            });

            row.querySelector(".remove-item").addEventListener("click", () => {
                cartItems.splice(index, 1);
                updateCart();
            });
        });

        cartTotalElement.textContent = total.toFixed(2);
    }
    checkoutButton.addEventListener("click", () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty. Add items to proceed.");
            return;
        }

        const totalPrice = parseFloat(cartTotalElement.textContent);
        const confirmation = confirm(`Your total is $${totalPrice.toFixed(2)}. Do you want to proceed to checkout?`);
        if (confirmation) {
            alert("Thank you for your purchase!");
            cartItems.length = 0; // Clear the cart
            updateCart();
        }
    });
});
