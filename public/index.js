$(function () {

    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();
    });
    fetchProducts(display)
    fetchAndUpdate()
})

// console.log(items)

function fetchAndUpdate() {
    let total_price = 0
    fetchFromCart(function (items) {
        for(item of items) {
            total_price += parseFloat(item.price) * parseInt(item.quantity)
        }
        console.log(total_price)
        $('#cartButton').tooltip('hide')
            .attr('data-original-title', 'Rs. ' + total_price)
            .tooltip();
    })
}

function display(products)
{
    let productList = $('#product-list')
    productList.empty()
    for (product of products) {
        var singleProduct = createProductCard2(product)
        productList.append(singleProduct)
    }
}

function updateCart(id,name,manuf,price) {
    console.log(name,manuf,price)
    addProductToCart(name,manuf,price,1,showSnackBar)
}

function showSnackBar() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    fetchAndUpdate()
}