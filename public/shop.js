function fetchProducts(done) {
    $.get('/api/products', function (data) {
        done(data)
    })
}

function addProduct(name, manuf, price, done) {
    $.post('/api/products', {
        name: name,
        manufacturer: manuf,
        price: price
    }, function (data) {
        done(data)
    })
}

function addProductToCart(name, manuf, price, quantity,showSnackBar) {
    $.post('/api/cart', {
        name: name,
        manufacturer: manuf,
        price: price,
        quantity: quantity
    }, function (data) {
        showSnackBar()
        console.log("Added to Cart")
        console.log(data)
    })
}

function fetchFromCart(done) {
    $.get('/api/cart', function (data) {
        done(data)
    })
}

function createProductCard(product) {
    return $(`
    <div class="col-3 card mx-2 p-3" style="background: 0px;margin-bottom: 10px">
        <h4 class="product-name">${product.name}</h4>
        <div class="product-manufacturer">${product.manufacturer}</div>
        <div class="row">
            <div class="col m-3 p-3 product-price">
                <b>Rs. ${product.price}</b>
            </div>
            <button style="background: #F9494B;outline: none" class="col btn btn-primary m-3 buyButton" onclick="updateCart('${product.id}','${product.name}','${product.manufacturer}','${product.price}')"><i class=""></i>Add To Cart</button> 
        </div>
    </div><br>`
    )
}

function createProductCard2(product) {
    return $(`
     
<div class="block col" style="display: inline-block;width: 300px;position: initial;margin: 20px">
    <div class="product" style="margin-top: 10px">
        <img src="https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/1399051/300/200/m1/fpnw/wm0/material-design-smartphone-2-.jpg?1466919099&s=c18ce211781d99e6559839f11a999d80">
        <div class="buttons">
            <a class="buy" href="#" onclick="updateCart('${product.id}','${product.name}','${product.manufacturer}','${product.price}')">Add to cart</a>
        </div>
    </div>
    <div class="info">
        <h4>${product.name}</h4>
        <span class="description">
			By ${product.manufacturer}
		</span>
        <span class="price">Rs. ${product.price}</span>
        <a class="buy_now" href="#" onclick="updateCart('${product.id}','${product.name}','${product.manufacturer}','${product.price}')">Buy Now</a>
    </div>

    <div class="details">
        <span class="time">Available</span>
    </div>
</div>
`)
}

function createCartCard(cart_item) {
    return $(`
    <div class="card bg-light text-dark">
        <div class="card-body">
            <div class="container">
                <div class="row">
                    <div class="col"><b>${cart_item.name}</b></div>
                    <div class="col-2">Rs. ${cart_item.price}</div>
                    <div class="col-1"></div>
                </div>
                <div class="row">
                    <div class="col">${cart_item.manufacturer}</div>
                    <div class="col-2">x ${cart_item.quantity}</div>
                    <div class="col-1 del-button" id="id-${cart_item.id}" onclick="deleteCartItem('${cart_item.id}','${cart_item.name}','${cart_item.manufacturer}','${cart_item.price}')"><i class="fas fa-times-circle fa-lg" style="color: red"></i></div>
                </div>
                <hr>
                <div class="row">
                    <div class="col"></div>
                    <div class="col-2">Rs. ${cart_item.total_price}</div>
                    <div class="col-1"></div>
                </div>
            </div>
        </div>
    </div>
<br>
`)
}

function createTotalCart(total_price) {
    return $(`
    <div class="container">
    <div class="card bg-light text-dark">
        <div class="card-body">
            <div class="container">
                <div class="row">
                    <div class="col"><b>Total Price</b></div>
                    <div class="col-2">Rs. ${total_price}</div>
                    <div class="col-1"></div>
                </div>
            </div>
        </div>
    </div>
</div>
`)
}
