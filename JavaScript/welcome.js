
/**
 * On click open the login div
 */
function loginShow(){
    $("div").hide();

    $("#header").show();
    $("#header-left").show();
    $("#header-center").show();
    $("#header-right").show();
    
    
    
    $("#login_page").show();
    
    $("#sidenav").show();
};

/**
 * On click open the registration div
 */
function registrationShow(){
    $("div").hide();

    $("#header").show();
    $("#header-left").show();
    $("#header-center").show();
    $("#header-right").show();

    $("#sidenav").show();
    
    $("#registration_page").show();
    
    
};

/**
 * On click open the login div
 */
function welcomeShow(){
    $("div").hide();

    $("#header").show();
    $("#header-left").show();
    $("#header-center").show();
    $("#header-right").show();
    
    
    $("#welcome").show();
    
    $("#sidenav").show();
};

/**
 * Model dialog -> About
 */
function showModelDialog(){
    document.getElementById('myModal').style.display='block';
    document.getElementById('myModal02').style.display='block';
    var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
$(document).keydown(function (e) {
    var code = e.keyCode || e.which;
    if (code == 27) modal.style.display = "none";
});
}

