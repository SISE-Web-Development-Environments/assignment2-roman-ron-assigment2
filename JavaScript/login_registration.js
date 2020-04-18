/**
 * only for Registration page
 */
$.validator.setDefaults({
    submitHandler: function() {
        alert("submitted!");
    }
});

$.validator.addMethod("pwcheck", function(value) {
    var reg1 = /[a-zA-Z]/; //check if there is a number
    return reg1.test(value) // consists of only these
        && /\d/.test(value) // has a digit
 });

$.validator.addMethod("ncheck", function(value) {
    var reg2 = /[0-9]/; //check if there is a number
    if(reg2.test(value))
    {
        return false;
    }
    else
    {
        return true;
    }
 });


$("#signupForm").validate({
    errorElement: 'div',
    rules: {
        firstname: {
            required: true,
            ncheck: true
            
        },
        lastname: {
            required: true,
            ncheck: true
            
        },
        username: {
            required: true
        },
        password: {
            required: true,
            minlength: 6,
            pwcheck: true
        },
        confirm_password: {
            required: true,
            minlength: 6,
            equalTo: "#password"
        },
        email: {
            required: true,
            email: true
        },
    },
    messages: {
        firstname: {
            required: "* Please enter a first name",
            ncheck: "* No numbers allowed on name"
        },
        lastname: {
            required: "* Please enter a last name",
            ncheck: "* No numbers allowed on name"
        },
        username: {
            required: "* Please enter a username"
        },
        password: {
            required: "* Please provide a password",
            minlength: "* Your password must be at least 6 characters long",
            pwcheck: "* The password must conatins number and characters"
        },
        confirm_password: {
            required: "* Please provide a password",
            minlength: "* Your password must be at least 6 characters long",
            equalTo: "* Please enter the same password as above"
        },
        email: "* Please enter a valid email address",
    }
});

$("#username").focus(function() {
    var firstname = $("#firstname").val();
    var lastname = $("#lastname").val();
    if (firstname && lastname && !this.value) {
        this.value = firstname + "." + lastname;
    }
});
