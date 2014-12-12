var tx = [];
var max_len = 5;
var api_address = "https://chain.so/api/v2/get_tx_received/BTC/";
var curr_transaction = 0.0

function update_transaction_list(response,USD_conv,new_data){
     //get transaction list
      if(tx.length == 0){

      }else if(tx[tx.length-1].txid==response.data.txs[response.data.txs.length-1].txid){
        console.log("nothing new");
         return false
      }
     
      tx = response.data.txs;
      //refresh window elements
      $("#list").empty();
      curr_transaction = USD_conv*tx[tx.length-1].value;
      for (var i = tx.length-1 ; i>tx.length -6 && i >0 ; i--){
          var date = new Date(tx[i].time*1000);
          var month = date.getMonth() +1;
          var confirmed = "unconfimed";
          if(tx[i].confirmations>1) confirmed = "confirmed";
          $("#list").append("<ul id = \"mover\" class=\"container\">" + "<li class=\"price\">" + 
           "USD: " + (USD_conv*tx[i].value).toFixed(4) + " </li><li>" + 
           "BTC: " + (1*tx[i].value).toFixed(4) + "</li><li>"+
            date.getHours() +":" + date.getMinutes() + "  " + month +"/"+ date.getDate() +
            "/" + date.getFullYear() + "</li><li>" +
            confirmed + "</li></ul>");

      }
    
    

      $("#list ul:nth-child(1)").css("width","450px")
      $("#list ul:nth-child(1)").css("font-si   ze","200%")
      $("#list ul:nth-child(1)").css("height","100px")
      $("#list ul:nth-child(5)").fadeOut("slow");
      
      return true


}





