var output = "ran javascript coin";
var trans = {
    max_len: 5,
    list:   ["foo"],
    add_elem: function(new_elem){
       //add type check
        this.list.push(new_elem);
        if(this.list.length > this.max_len){
          this.list.splice(max_len-1,1);
        }
    },
};



$( document ).ready(function() { });
trans.add_elem("bar");
for(var i = 0;i< trans.list.length;i++){
   $("ul").append("<li>" + trans.list[i] + "</li>");
}
$("ul li:nth-child(4)").fadeOut("slow");

console.log(output);
