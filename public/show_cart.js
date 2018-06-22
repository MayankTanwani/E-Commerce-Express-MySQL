$(function () {

    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();
    });
    let cardList = $('#cartList')
    let cartCardList = $('#cartCardList')
    var total_price = 0
    fetchFromCart(function (cart_items) {
        cardList.empty()
        for (item of cart_items) {
            item.total_price = item.price*item.quantity
            var singleItemCard = createCartCard(item)
            cartCardList.append(singleItemCard)
            total_price += parseFloat(item.price) * parseInt(item.quantity)
        }
        cartCardList.append(createTotalCart(total_price))
    })


})

function deleteCartItem(id,name,manu,price){
    console.log(id)
    addProductToCart(name,manu,price,0,function () {
        alert("deleted")
    })
    window.location.replace("/show_cart.html")
}