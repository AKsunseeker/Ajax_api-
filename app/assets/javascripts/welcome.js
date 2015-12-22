$(document).ready(function(){
  var baseUrl = "http://devpoint-ajax-example-server.herokuapp.com/api/v1/products";
  function addToList(product) {
    var productCardHTML = "";
    $.ajax('/product_card', {
      type: 'GET',
      async: false,
      data: {'product': product},
      success: function(data){
        productCardHTML = data;
      },
      error: function(data){
        console.log(data);
      }
    });
    console.log(productCardHTML);
    return(productCardHTML);
  }

  $.ajax(baseUrl, {
    type: 'GET',
    success: function(data){
      if(data.products.length){
        for(var i = 0; i < data.products.length; i++){
          var product = data.products[i];
          console.log(addToList(product));
          $('#products').append(addToList(product));
        }
      } else {
        $('#message_div').text("No products available, go ahead and add one").slideToggle();
      }
    },
    error: function(data){
      debugger
    }
  });
  $(document).on('click', '#create', function(){
    $('#create_product_form').removeClass('hide');
  });
  $(document).on('submit',"#create_product_form", function(e){
    e.preventDefault();
    $.ajax(baseUrl,{
      type: 'POST',
      data: $(this).serializeArray(),
      success: function(data) {
        $('#products').append(addToList(data.product));
        $('#create_product_form')[0].reset();
      },
      error: function(data) {
        console.log(data);
      }
    });
  });
  
  $(document).on('click', '#destroy', function(){
    var button = $(this);
    $.ajax(baseUrl + '/' + $(this).data('product-id'),{
      type: 'DELETE',
      success: function(data){
       button.parents()[3].remove();

      },
      error: function(data){
        console.log(data)
      }
    });
  });

  $(document).on('click', '#edit', function(){
    var button = $(this).parents()[1];
    var purchased_quantity = $(button).data('quantity') -1;
    $.ajax(baseUrl + '/' + $(this).data('product-id'), {
      type: 'PUT',
      data: {product:{quanity_on_hand: purchased_quantity}},
      success: function(data){
        $('#' + data.product.id).find('p')[0].innerHTML = '<a href="#">Quantity: ' + data.product.quanity_on_hand + '</a>';
      },
      error: function(data){
        console.log(data)
      }

    });
  });
























});