
$(function(){

  var getData = function(keywords, callback) {
    var params = {
      api_key: "niqoyrl7dver15xzb6mp2c7e",
      includes: "Images,Shop"
    };

    if (!callback && typeof keywords === "function") {
      callback = keywords;
      keywords = null;
    }

    if (keywords && keywords.length) {
      params.keywords = keywords;
    }

    $.ajax("https://openapi.etsy.com/v2/listings/active.js", {
      data: params,
      dataType: "jsonp",
      success: callback
    });
  };


  getData(function(data){
   var items = data.results;
   items.forEach(function(item){
     $(".product-area").append(myTemplate(item));
   });
 });


// EVENT LISTENER HERE
$(".search-form").on("submit", function(event) {
   event.preventDefault();
   
   var keywords = $(".search-field").val();  

   getData(keywords, function(data){
     var items = data.results;
     console.log(items);
       $(".product-area").empty();
     items.forEach(function(item){
       $(".product-area").append(myTemplate(item));  
     });
   });
 });


// TEMPLATE
  var myTemplate = _.template(
        "<div class='product'>" +
      "<a href='<%= url %>'>" +
          "<img src='<%= Images[0].url_570xN %>' alt='<%= title %>'>" +
      "</a>" +
      "<div class='bottom-block'>" +
        "<div class ='title-wrapper'>" +
          // "<a href='<%= url %>'><%= title %></a>" +
        "</div>" +
        "<div class='store'><%= Shop.shop_name %></div>" +
        "<div class='price'>$<%= price %></div>" +
      "</div>" +
    "</div>"
  );

});