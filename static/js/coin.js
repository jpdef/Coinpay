var output = "ran javascript coin";
var balance = 0;
var tx = [];
var max_len = 5;
var USD_conv;
var address = "https://chain.so/api/v2/get_tx_received/BTC/14L55Bu9f4LsCS7ddK8FfftACYvGjyWWcC";

var trans = {
    list:   [],
    add_elem: function(new_elem){
       //add type check
        this.list.push(new_elem);
    },
    pop_elem: function(){
        if(this.list.length > max_len){
          this.list.splice(0,1);
        }
    },
};




$( document ).ready(function() { });

function update_transaction_list(){
     //get transaction list

     $.get( address,
          function( response ) {
	       console.log(response.status);
               tx = response.data.txs;
      });
    
    $.get("https://chain.so/api/v2/get_price/BTC/USD",function(response){
          console.log(response.data.prices[1].price);
        USD_conv = response.data.prices[1].price;
});
     //push new transaction on list
     trans.add_elem(balance);

      //refresh window elements
      $("#list").empty();
      console.log(tx.length)
      for (var i = 0 ; i < 5 ; i++){
          var date = new Date(tx[i].time*1000);
          $("#list").append("<li id = \"mover\">" + USD_conv*tx[i].value + "  ,  " + 
            date.getHours() +":" + date.getMinutes() + "  " + date +"</li>");
      }
$("#list li:nth-child(1)").css("width","600px")
$("#list li:nth-child(1)").css("font-size","200%")
$("#list li:nth-child(1)").css("height","100px")
$("#list li:nth-child(5)").fadeOut("slow");
}

window.setInterval(update_transaction_list,5000);







var qrcode = new QRCode("qrcode",   {text: address,
    width: 500,
    height: 500,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H});



console.log(output);