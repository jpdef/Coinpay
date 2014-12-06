var output = "ran javascript coin";
var balance = 0;
var tx = [];
var max_len = 5;
var USD_conv = 0;
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

function get_conversion(){
     //This needs to be averaged
    $.get("https://chain.so/api/v2/get_price/BTC/USD",function(response){
        console.log(response.data.prices[1].price);
        USD_conv = response.data.prices[1].price;
    });
}

function get_data(){
    $.get( address, function(response){update_transaction_list(response);});
}


function update_transaction_list(response){
     //get transaction list
	 console.log(response.status);

      if(tx.length == 0){


      }else if(tx[0].time==response.data.txs[0].time){
        console.log("nothing new");
        return;
      }
    
      tx = response.data.txs;
      //refresh window elements
      $("#list").empty();
      for (var i = tx.length-1 ; i>tx.length -6 && i >0 ; i--){
          var date = new Date(tx[i].time*1000);
          $("#list").append("<li id = \"mover\">" + USD_conv*tx[i].value + "  ,  " + 
            date.getHours() +":" + date.getMinutes() + "  " + date +"</li>");

      }
    
    

      $("#list li:nth-child(1)").css("width","600px")
      $("#list li:nth-child(1)").css("font-size","200%")
      $("#list li:nth-child(1)").css("height","100px")
       $("#list li:nth-child(5)").fadeOut("slow");
}



var qrcode = new QRCode("qrcode",   {text: address,
    width: 500,
    height: 500,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H});


get_conversion();
window.setInterval(get_data,5000);
console.log(output);
