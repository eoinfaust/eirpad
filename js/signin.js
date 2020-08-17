$("#error1").hide();$("#error2").hide();$("#error3").hide();
$(document).ready(function(){
  $('#signinform').submit(function(e){
    $("#username, #password").removeClass("inputerror");
    $("#error1").hide();$("#error2").hide();$("#error3").hide();
    e.preventDefault();
    var data = $('#signinform').serializeArray();
    data.push({name: 'signin_user', value: '1'});
    var promise = $.ajax({
      type: "POST",
      url: 'server.php',
      data: data,
      cache: false
    });
    $("#username, #password").val("");
    promise.then(function(data){
      if(data === 'success'){
        window.location.href = 'index.php';
      }else{
        var arr = JSON.parse(data);
        if(arr[2]){
          $("#username, #password").addClass("inputerror");
          $("#error1").show();
        }else if(arr[0]){
          $("#username").addClass("inputerror");
          $("#error2").show();
        }else if(arr[1]){
          $("#password").addClass("inputerror");
          $("#error3").show();
        }
      }
    });
  });
});