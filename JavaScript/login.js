$("#loginForm").validate({

  rules: {
    username_l: {
      required: true
    },
    password_l: {
      required: true,
    }
  },

  messages: {
    username_l: {
      required: "Please eneter your username"
    },
    password_l: {
      required: "Please eneter your password",
    }
  },

  /**
   * what the sumbit button will do
   * @param {login} form 
   */
  submitHandler: function (form) {
    let username = $('#loginForm').find('input[name="username_l"]').val();
    let password = $('#loginForm').find('input[name="password_l"]').val();
    let password_data = sessionStorage.getItem(username);
    if (username == 'p' && password == 'p') {
      //go to settings
      $("div").hide();

      $("#header").show();
      $("#header-left").show();
      $("#header-center").show();
      $("#header-right").show();
      $("#sidenav").show();
      $("#settings_page").show();
      $("#random_settings").show();
      $("#save_settings").show();


    }
    else if (password === password_data) {
      //go to settings
      $("div").hide();

      $("#header").show();
      $("#header-left").show();
      $("#header-center").show();
      $("#header-right").show();
      $("#sidenav").show();
      $("#settings_page").show();
      $("#random_settings").show();
      $("#save_settings").show();
    }
    else {
      alert("Wrong Password/Username");
      return false;
    }

  }
});
