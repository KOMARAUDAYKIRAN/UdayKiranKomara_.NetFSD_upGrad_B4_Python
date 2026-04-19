// cart.js

export const getCartTotal = (items) =>
  items.reduce((sum, product) =>
    sum + product.price * product.quantity, 0);