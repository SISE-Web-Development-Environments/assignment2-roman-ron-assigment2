$("#loginForm").validate({
    
    rules: {
        username_l: {
        required: true
      },
      password_l: {
        required: true,
        minlength: 6
      }
    },

    messages: {
        username_l: {
        required: "Please eneter your username"
      },
      password_l: {
        required: "Please eneter your password",
        minlength: "* Your password must be at least 5 characters long"
      }
    },

    submitHandler: function (form) { // for demo
        var text = $('#loginForm').find('input[name="username_l"]').val();
      alert(text);
      return false;
    }
  });