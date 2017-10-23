
document.addEventListener("DOMContentLoaded",function(){


var chirpstring;
var existingchirps;



$('#chirpbutton').click(function(){
        postChirp();
        
})


function postChirp(){

    var message = $('#chirpinput').val();
    var user = 'Brandon';
    var d = new Date();
    var t = (d.getHours().toLocaleString('en-US')+" :"+d.getMinutes()+" :"+d.getSeconds())

    
   
    
 //PUSH CHIRPS TO JSON   

    var chirp = {
        message: message,
        user: user,
        time: t
    }

    console.log(chirp);
    
     $.ajax({
        method: "POST",
        url: "/api/chirps",
        contentType: "application/json",
        data: JSON.stringify(chirp),
        success:    function(data){
        alert("Chirp succesful");
    },
    })
    getChirps();
}


//GET CHIRPS FROM JSON
function getChirps(){
    
        $.ajax({
            method: "GET",
            url: "/api/chirps"
        }).then(function(chirps){
            for(i = 0; i < chirps.length; i++){
                var chirpDiv = $('<div></div>')
                var chirpmessage = $('<li></li>');
                var chirpuser = $('<li></li>');
                var chirptime = $('<li></li>');            
            
                $(chirpmessage).text(chirps[i].message).appendTo(chirpDiv);
                $(chirpuser).text(chirps[i].user).appendTo(chirpDiv);
                $(chirptime).text(chirps[i].time).appendTo(chirpDiv);
                
                
                $(chirpDiv).appendTo('#chirpbox');
            }
        })
    }

    getChirps();
    
})


       



error: (function(xhr, ajaxOptions, thrownError){
    //On Error do this
    if (xhr.status == 200){
        alert(ajaxOptions);
    }
    else{
        alert(xhr.status);
        alert(thrownError);
    }    
});





