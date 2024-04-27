// ITERATION 1

function updateSubtotal(product) {
  console.log('Calculating subtotal, yey!');

  const priceElement = product.querySelector('.price span');
  const quantityElement = product.querySelector('.quantity input');

  const price = parseFloat(priceElement.textContent);

  const quantity = parseInt(quantityElement.value);

  const subtotal = price * quantity;

  const subtotalElement = product.querySelector('.subtotal span');

  subtotalElement.textContent = subtotal.toFixed(2);

  return subtotal;
}

function calculateAll() {
  const products = document.querySelectorAll('.product');

  let total = 0;

  products.forEach((product) => {
    const subtotal = updateSubtotal(product);
    total += subtotal;
  });

  const totalElement = document.querySelector('#total-value span');
  totalElement.textContent = total.toFixed(2);

  const subtotalElement = document.querySelector('#subtotal-value span');
  subtotalElement.textContent = total.toFixed(2);
}

// ITERATION 3

function calculateAll() {
  const products = document.querySelectorAll('.product');

  let total = 0;
  products.forEach((product) => {
    const subtotal = updateSubtotal(product);
    total += subtotal;
  });

  const totalElement = document.querySelector('#total-value span');
  totalElement.textContent = total.toFixed(2);

  const subtotalElement = document.querySelector('#subtotal-value span');
  subtotalElement.textContent = total.toFixed(2);
}

// ITERATION 4

function removeProduct(event) {
  const buttonClicked = event.currentTarget;
  const productRow = buttonClicked.parentNode.parentNode;
  const productSubtotal = parseFloat(
    productRow.querySelector('.subtotal span').textContent
  );

  productRow.parentNode.removeChild(productRow);

  let total = parseFloat(
    document.querySelector('#total-value span').textContent
  );
  total -= productSubtotal;

  const totalElement = document.querySelector('#total-value span');
  totalElement.textContent = total.toFixed(2);
}

const removeButtons = document.querySelectorAll('.btn-remove');

removeButtons.forEach((button) => {
  button.addEventListener('click', removeProduct);
});

// ITERATION 5

function createProduct() {
  const productName = document.querySelector(
    '.create-product input[type="text"]'
  ).value;
  const productPrice = parseFloat(
    document.querySelector('.create-product input[type="number"]').value
  );

  if (productName && !isNaN(productPrice) && productPrice >= 0) {
    const newProductRow = document.createElement('tr');
    newProductRow.classList.add('product');
    newProductRow.innerHTML = `
      <td class="name">
        <span>${productName}</span>
      </td>
      <td class="price">$${productPrice.toFixed(2)}</td>
      <td class="quantity">
        <input type="number" value="0" min="0" placeholder="Quantity" />
      </td>
      <td class="subtotal">
        <span>0.00</span>
      </td>
      <td class="action">
        <button class="btn btn-remove">Remove</button>
      </td>
    `;

    const tbody = document.querySelector('tbody');
    tbody.appendChild(newProductRow);

    document.querySelector('.create-product input[type="text"]').value = '';
    document.querySelector('.create-product input[type="number"]').value = 0;

    const removeButton = newProductRow.querySelector('.btn-remove');
    removeButton.addEventListener('click', removeProduct);

    const quantityInput = newProductRow.querySelector('.quantity input');
    const quantity = parseInt(quantityInput.value);
    const subtotal = productPrice * quantity;
    const subtotalElement = newProductRow.querySelector('.subtotal span');
    subtotalElement.textContent = subtotal.toFixed(2);

    updateTotals();
  }
}

function updateTotals() {
  let total = 0;

  const products = document.querySelectorAll('.product');

  products.forEach((product) => {
    const subtotal = parseFloat(
      product.querySelector('.subtotal span').textContent
    );
    total += subtotal;
  });

  const totalElement = document.querySelector('#total-value span');
  totalElement.textContent = total.toFixed(2);

  const subtotalElement = document.querySelector('#subtotal-value span');
  subtotalElement.textContent = total.toFixed(2);
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  const createButton = document.querySelector('#create');
  createButton.addEventListener('click', createProduct);
});
