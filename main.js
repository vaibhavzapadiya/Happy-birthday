<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shopping Cart</title>
  <style>
    .product, .cart-item {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ddd;
    }

    .product-list, .cart-list {
      width: 45%;
      float: left;
      margin-right: 5%;
    }

    .cart-list {
      float: right;
    }

    .product img, .cart-item img {
      width: 100px;
    }

    .controls {
      display: flex;
      align-items: center;
    }

    button {
      margin: 0 5px;
    }
  </style>
</head>
<body>

  <!-- Products List -->
  <div class="product-list" id="productList"></div>

  <!-- Cart List -->
  <div class="cart-list" id="cartList">
    <h3>Your Cart</h3>
    <div id="cartItems"></div>
    <h4>Total: $<span id="TotalPrice">0.00</span></h4>
  </div>

  <script src="cart.js"></script>
</body>
</html>