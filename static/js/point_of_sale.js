$(document).ready(function() {
   var ordertotal=0.0;

  //Add lineitem actions  
   $("#additem").click(function() {
  	var newitem = $("#newitem").val();
    var numitem = $("#numitem").val();
    var totalprice = $("#totalprice").val();

    $("#items").append( "<ul>"+
                        "<li class=\"lineitemfront\">" + newitem +"</li>"+
                        "<li class=\"lineitemquantity\">" + numitem +"</li>"+
                        "<li class=\"lineitemtotal\">"  + totalprice +"</li></ul>");
    ordertotal = parseFloat(totalprice) + ordertotal;
    $("#price_input").val(ordertotal);

  	$("#newitem").val("");
    $("#numitem").val("");
    $("#itemprice").val(0.0);
    $("#totalprice").val(0.0);
  });

    //Display Pricing   
    $( "#numitem" ).keyup(function() {
      var itemprice = $("#itemprice").val();
      var numitem =  $(this).val() ;
      var total = itemprice*numitem;
      $("#totalprice").val(total);
    });

    //Drop Down
     $( "#newitem" ).mouseenter(function(){
         $("#productlist").show();
     });
    
     $( "#productlist" ).mouseleave(function(){
        $("#productlist").hide();
     });

     $("#productlist li").hover(function() {
       $(this).css('background-color','#E0FFFF');
     });
    
     $("#productlist li").mouseout(function() {
       $(this).css('background-color','#7f8c8d');
     });
    
    $("#productlist li").click(function() {
       var choosen = $(this).text();
       $("#newitem").val(choosen);
        get_price(choosen);
     });

    
    
    
    
    
});
