



// settings variables

// controls array
var controls = [];

function generateRandomStart() {
    return {
        up_key : 'ArrowUp',
        down_key : 'ArrowDown',
        left_key : 'ArrowLeft',
        right_key : 'ArrowRight',

        pill_5Points:  '#00cc00', // green
        pill_15Points: '#ff3300', // red
        pill_25Points: '#0000ff', // blue
       // pill_5Points=  "#"+((1<<24)*Math.random()|0).toString(16),
        //pill_15Points: "#"+((1<<24)*Math.random()|0).toString(16),
       // pill_25Points: "#"+((1<<24)*Math.random()|0).toString(16),

        pill_number : 50 + Math.floor(Math.random() * 41), // return a number between 50-90
        time_seconds : 60 + Math.floor(Math.random() * 120),
        monster_number : 1 + Math.floor(Math.random() * 3), // return a number between 1-3
        tick : 0,
        lives : 3,
    }
}



function settings_randomValues() {

    var rand = generateRandomStart();

    

    // up_key = rand["up_key"];
    $("#settings_upKey").html(rand["up_key"]);
    $("#settings_leftKey").html(rand["left_key"]);
    $("#settings_downKey").html(rand["down_key"]);
    $("#settings_rightKey").html(rand["right_key"]);


    $("#settings_numOfBalls").val(rand["pill_number"]);
    $("#settings_timeToPlay").val(rand["time_seconds"]);
    $("#settings_numOfMonsters").val(rand["monster_number"]);


    $("#settings_5Points").val(rand["pill_5Points"]);
    $("#settings_15Points").val(rand["pill_15Points"]);
    $("#settings_25Points").val(rand["pill_25Points"]);



}







var currentDirection = null;

document.addEventListener('keydown', function(event){


    if ( currentDirection != null){
        var keyValue = event.key;
        if(keyValue !== 'p' && keyValue !== ' ' && keyValue !== 'Enter'){

            document.getElementById("settings_" + currentDirection + "Key").innerHTML = keyValue;
            document.getElementById("settings_" + currentDirection + "Key").style.background='#ffff00';
        }


    }

    currentDirection = null;
} );






function setCurDirection( direction){
    document.getElementById("settings_rightKey").style.background='yellow';
    document.getElementById("settings_leftKey").style.background='yellow';
    document.getElementById("settings_upKey").style.background='yellow';
    document.getElementById("settings_downKey").style.background='yellow';
    document.getElementById("settings_" + direction + "Key").style.background='blue';
    currentDirection = direction;
}






function saveSettings() {


    if ($("#settings_upKey").html() === '-1' || $("#settings_leftKey").html() === '-1' ||
        $("#settings_downKey").html() === '-1' || $("#settings_rightKey").html() === '-1'){
        alert("Minus 1 is not a valid key");
        return;
    }

    up_key = $("#settings_upKey").html();
    down_key = $("#settings_downKey").html();
    left_key = $("#settings_leftKey").html();
    right_key = $("#settings_rightKey").html();


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












