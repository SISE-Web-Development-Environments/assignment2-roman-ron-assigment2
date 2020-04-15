
/**
 * On click open the login div
 */
$(function(){
    $('#login_btn').on('click', function (e) {
        document.getElementById('welcome').style.display = "none";
        document.getElementById('login_page').style.display = "block";
    });
});

/**
 * On click open the registration div
 */
$(function(){
    $('#registration_btn').on('click', function (e) {
        document.getElementById('welcome').style.display = "none";
        document.getElementById('registration_page').style.display = "block";
        
    });
});

