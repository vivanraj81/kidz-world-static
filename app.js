

const addCartItems = document.querySelectorAll(".button");
const cartValue = document.getElementById("cart-value");
let totalPrice = 0;
const CartItems = new Map(); // Use a Map to store cart items

// Adding event to button
addCartItems.forEach((button) => {
  button.addEventListener("click", (event) => {
    let currentValue = parseInt(cartValue.textContent);
    cartValue.textContent = currentValue + 1;
    const h3tag = event.currentTarget.parentNode.previousElementSibling.querySelector("h3");
    const ptag = event.currentTarget.parentNode.querySelector("p");
    const productName = h3tag.textContent;
    const price = parseFloat(ptag.textContent.slice(1));

    totalPrice += price;
    
    // Update cart items using a Map
    if (CartItems.has(productName)) {
      CartItems.set(productName, CartItems.get(productName) + 1);
    } else {
      CartItems.set(productName, 1);
    }
  });
});

document.getElementById("cart").addEventListener("click", () => {
  // Log the cart items
  CartItems.forEach((quantity, productName) => {
    console.log(`${productName} - Quantity: ${quantity}`);
  });
  console.log("The total payable amount is $" + totalPrice);

  // Update the WhatsApp link
  const whatsappLink = generateWhatsappLink(CartItems, totalPrice);
  // Open the WhatsApp link in a new tab
  window.open(whatsappLink, "_blank");
});

function generateWhatsappLink(cartItems, total) {
  const itemsText = Array.from(cartItems)
    .map(([productName, quantity]) => `${productName}%20${quantity}`)
    .join("%0A");

  const finalDollars = Math.floor(total);
  const finalCents = Math.round((total - finalDollars) * 100);

  const whatsappLink =
    `https://api.whatsapp.com/send?phone=8792065166&text=Order%20details%0A${itemsText}%0A` +
    `Total%20Price:%20$${finalDollars}%20${finalCents}c`;

  return whatsappLink;
}
