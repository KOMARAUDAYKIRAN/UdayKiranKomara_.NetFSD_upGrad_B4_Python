// main.js

import { getCartTotal } from './cart.js';

const cart = [
    { name: "Bag", price: 1500, quantity: 1 },
    { name: "Book", price: 60, quantity: 2 },
    { name: "Pen", price: 10, quantity: 1 }
];

// create bill lines
const bill = cart.map(item => {
    const itemTotal = item.price * item.quantity;

    return `
Item      : ${item.name}
Price     : ₹${item.price}
Quantity  : ${item.quantity}
Subtotal  : ₹${itemTotal}
_______________________________`;
}).join("");

// get final total from module
const finalAmount = getCartTotal(cart);

// full invoice
const output = `
SHOPPING CART SUMMARY
______________________________
${bill}
Total Amount : ₹${finalAmount}
______________________________
`;

console.log(output);