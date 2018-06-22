$(function () {
    var adminName = $('#adminName')
    var password = $('#adminPass')

    var submit = $('#submitLogin')
    submit.click(function () {
        console.log(adminName.val())
        if(adminName.val() ==='admin' && password.val() === 'admin') {
            console.log("correct")
            window.location.replace("/add_products.html")
        }else
        {
            console.log(adminName.val(),password.val())
        }x
    })
})