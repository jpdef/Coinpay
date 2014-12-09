var tx = [];
var max_len = 5;
var address = "https://chain.so/api/v2/get_tx_received/BTC/14L55Bu9f4LsCS7ddK8FfftACYvGjyWWcC";
var curr_transaction = 0.0

function update_transaction_list(response,USD_conv){
     //get transaction list
	 console.log(response.status);

      if(tx.length == 0){


      }else if(tx[0].value==response.data.txs[0].value){
        console.log("nothing new");
        return;
      }
    
      tx = response.data.txs;
      //refresh window elements
      $("#list").empty();
      curr_transaction = USD_conv*tx[tx.length-1].value;
      for (var i = tx.length-1 ; i>tx.length -6 && i >0 ; i--){
          var date = new Date(tx[i].time*1000);
          $("#list").append("<ul id = \"mover\">" + "<li class=\"price\">" + USD_conv*tx[i].value + " </li><li>" + 
            date.getHours() +":" + date.getMinutes() + "  " + date +"</li></ul>");

      }
    
    

      $("#list ul:nth-child(1)").css("width","450px")
      $("#list ul:nth-child(1)").css("font-size","200%")
      $("#list ul:nth-child(1)").css("height","100px")
      $("#list ul:nth-child(5)").fadeOut("slow");
      



}





