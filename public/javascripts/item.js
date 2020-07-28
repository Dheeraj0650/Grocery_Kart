console.log("hello");
$(document).ready(function(){
        $('.thumb').mouseover(function(e){
            e.preventDefault();
        $('.imgBox img').attr("src", $(this).attr("href"));
        })
    })
