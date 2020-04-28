



// settings variables

// controls array
var controls = [];
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }



function settings_randomValues() {


    var randomValues = {
        up_key : 'ArrowUp',
        down_key : 'ArrowDown',
        left_key : 'ArrowLeft',
        right_key : 'ArrowRight',

       pill_5Points:  getRandomColor(),
        pill_15Points: getRandomColor(),
       pill_25Points: getRandomColor(),
    
        pill_number : 50 + Math.floor(Math.random() * 41), // return a number between 50-90
        time_seconds : 60 + Math.floor(Math.random() * 120),
        monster_number : 1 + Math.floor(Math.random() * 3), // return a number between 1-3
        tick : 0,
        lives : 3,
    }

    

    // up_key = rand["up_key"];
    $("#up_value").html(randomValues["up_key"]);
    $("#left_value").html(randomValues["left_key"]);
    $("#down_value").html(randomValues["down_key"]);
    $("#right_value").html(randomValues["right_key"]);


    $("#settings_numOfBalls").val(randomValues["pill_number"]);
    $("#settings_timeToPlay").val(randomValues["time_seconds"]);
    $("#settings_numOfMonsters").val(randomValues["monster_number"]);


    $("#settings_5Points").val(randomValues["pill_5Points"]);
    $("#settings_15Points").val(randomValues["pill_15Points"]);
    $("#settings_25Points").val(randomValues["pill_25Points"]);



}







var currentDirection = null;

document.addEventListener('keydown', function(event){


    if ( currentDirection != null){
        let keyValue = event.key;
        if(keyValue !== 'p' && keyValue !== ' ' && keyValue !== 'Enter'){

            //document.getElementById("settings_" + currentDirection + "Key").innerHTML = keyValue;
            document.getElementById("settings_" + currentDirection + "Key").style.background='#ffff00';
        }


    }

    currentDirection = null;
} );


function getGameControl(event, id) {
    if (id === "up") {
        document.getElementById("up_value").innerHTML = event.key;
        
    }
    else if (id === "down") {
        document.getElementById("down_value").innerHTML = event.key;
       
    }
    else if (id === "right") {
        document.getElementById("right_value").innerHTML = event.key;
        
    }
    else if (id === "left") {
        document.getElementById("left_value").innerHTML = event.key;
        
    }
  }





function setCurDirection( direction){
    document.getElementById("settings_rightKey").style.background='yellow';
    document.getElementById("settings_leftKey").style.background='yellow';
    document.getElementById("settings_upKey").style.background='yellow';
    document.getElementById("settings_downKey").style.background='yellow';
    document.getElementById("settings_" + direction + "Key").style.background='#33ccff';
    //currentDirection = direction;
}






function saveSettings() {

    if ($("#up_value").html() === '-1' || $("#down_value").html() === '-1' ||
        $("#right_value").html() === '-1' || $("#left_value").html() === '-1'){
        alert("Minus 1 is not a valid key");
        return;
    }

    up_key = $("#up_value").html();
    down_key = $("#down_value").html();
    left_key = $("#left_value").html();
    right_key = $("#right_value").html();


    if ($("#settings_numOfBalls").val() === '' || $("#settings_timeToPlay").val() === '' || $("#settings_numOfMonsters").val() === ''){
        showPopup("Please fill all the fields");
        return;
    }


    pill_number = $("#settings_numOfBalls").val();
    time_seconds = $("#settings_timeToPlay").val();
    monster_number = $("#settings_numOfMonsters").val();

    pill_5Color = $("#settings_5Points").val();
    pill_15Color = $("#settings_15Points").val();
    pill_25Color = $("#settings_25Points").val();


}












