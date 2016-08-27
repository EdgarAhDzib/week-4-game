$( document ).ready(function() {
//NOTE: creating variables within functions WITHOUT "var" makes them global, this will apply to the Jedi characters
var bonus = {
	key: "vader",
	name: "Bonus round!<br>Darth Vader",
	hitpoints: 10,
	attack: 2,
	image: "vader_pez.jpg",
	quote: "Impressive! Most impressive."
}

var audio = new Audio('../week-4-game/assets/sounds/saberclash.mp3');
var soundtrack = new Audio('../week-4-game/assets/sounds/dueloffates.mp3');

$(".playMusic").on("click", function(){
soundtrack.play();
});

$(".pauseMusic").on("click", function(){
soundtrack.pause();
});

function resetGame() {
stats = "";
allJedi = true;
characterSelected = false;
jediId = "";
yourJedi = "";
yourPic = "";
currOpp = "";
dontClick = true;
options = ["obiwan","luke","darthmaul","sidious"];
hitPoints = 0;
var attackPower = 0;
bonusHP = 10;
$("#attack").hide();
$("#reset").hide();
$("#chooseEnemyText").hide();
$("#playerPic").empty();
$("#yourChar").empty();
$("#hitPoints").empty();
$("#attackPower").empty();
$("#enemyRow").empty();
$("#currEnemy").empty();
$("#win-quote").html("<h3>Your Hit Points: <span id=\"hitPoints\"></span></h3><h3>Attack Power: <span id=\"attackPower\"></span></h3>");
$("#win-loss").text("Choose wisely, and may the Force be with you.");

if (allJedi === true && characterSelected === false) {

for (i=0; i<4; i++) {
	var jediBox = $('<div>');
	jediBox.attr("class", "jediWindow col-xs-6 col-md-3");
	jediBox.attr("id", jedi[i].key);
stats = "<img src=\"assets/images/" + jedi[i].image + "\" class=\"jediPic\" /><h4>" + jedi[i].name + "</h4><h4>Hit Points: " + jedi[i].hitpoints + "</h4><h4>Attack Points: " + jedi[i].attack + "</h4><button id=\"button" + [i] + "\" style=\"color:black\">" + jedi[i].name + "</button><br>&nbsp;<br>";
$("#firstRow").append(jediBox);
$("#"+jedi[i].key).html(stats);
}
}

}
resetGame();

function theGame() {

if (characterSelected === false) {
$('.jediWindow').on('click', function() {
var yourJedi = this.id;
var characterSelected = true;
var allJedi = false;
var jediIndex = options.indexOf(yourJedi);
options.splice(jediIndex,1);
$("#firstRow").empty();
dontClick = false;

var yourIndex = jedi.findIndex(x=>x.key==yourJedi);
yourPic = "<img src=\"assets/images/" + jedi[yourIndex].image + "\" class=\"jediPic\" />";
yourName = jedi[yourIndex].name;
hitPoints = jedi[yourIndex].hitpoints;
var attackPower = parseInt(jedi[yourIndex].attack);
$("#playerPic").html(yourPic);
$("#yourChar").html(yourName);
$("#hitPoints").html(hitPoints);
$("#attackPower").html(attackPower);

function populateEnemies() {
	for (i=0;i<4;i++) {
	jediId = jedi[i].key;
	if (options.indexOf(jediId) >= 0) {
	var jediBox = $('<div>');
	jediBox.attr("class", "enemyWindow col-xs-6");
	jediBox.attr("id", jedi[i].key);
	stats = "<img src=\"assets/images/" + jedi[i].image + "\" class=\"jediPic\" /><h4>" + jedi[i].name + "</h4><h4>Hit Points: " + jedi[i].hitpoints + "</h4><h4>Attack Points: " + jedi[i].attack + "</h4><button id=\"button" + [i] + "\" style=\"color:black\">Fight " + jedi[i].name + "!</button><br>&nbsp;<br>";
	$("#enemyRow").append(jediBox);
	$("#"+jedi[i].key).html(stats);
	$("#chooseEnemyText").show();

	if (options.length === 3) {
		$(".enemyWindow").addClass("col-md-4");
	} else if (options.length === 2) {
		$(".enemyWindow").removeClass("col-md-4");
		$(".enemyWindow").addClass("col-md-6");
	} else if (options.length === 1) {
		$(".enemyWindow").removeClass("col-md-6");
		$(".enemyWindow").addClass("col-md-12");
	}

}
}
}
populateEnemies();

//migrated from outside attack onClick event
function yourAttack(){
hitPoints = hitPoints - enemyAttack;
enemyHP = enemyHP - attackPower;
bonusHP = bonusHP - attackPower;
attackPower = attackPower + 8;
audio.play();
}

if (dontClick === false) {
$('.enemyWindow').on('click', function() {
	currOpp = this.id;
	jediIndex = options.indexOf(currOpp);
	options.splice(jediIndex,1);

function theEnemy() {
	$("#enemyRow").empty();
	populateEnemies();
	enemyBox = $('<div>');
	enemyBox.attr("class",currOpp);
	currIndex = jedi.findIndex(x=>x.key==currOpp);
	enemyHP = jedi[currIndex].hitpoints;
	enemyAttack = jedi[currIndex].attack;
	stats = "<img src=\"assets/images/" + jedi[currIndex].image + "\" class=\"jediPic\" /><h4>" + jedi[currIndex].name + "</h4><h4>Hit Points: " + enemyHP + "</h4>";
	$("#currEnemy").append(enemyBox);
	$("."+currOpp).html(stats);
	dontClick = true;
	$("#attack").show();
}
theEnemy();

		$("#attack").on("click", function(){

			currIndex = jedi.findIndex(x=>x.key==currOpp);
			yourAttack();
			stats = "<img src=\"assets/images/" + jedi[currIndex].image + "\" class=\"jediPic\" /><h4>" + jedi[currIndex].name + "</h4><h4>Hit Points: " + enemyHP + "</h4>";
			$("#currEnemy").html(stats);
			$("#hitPoints").html(hitPoints);
			$("#attackPower").html(attackPower);
			if (hitPoints <= 0) {
			dontClick = true;
			$("#win-loss").html("You have been defeated!");
			$("#attack").hide();
			$("#reset").show();
			}

			if (enemyHP <= 0) {
				$("#currEnemy").html("<h4>" + jedi[currIndex].name + " has been defeated!<br>Please choose your next opponent!</h4>");
				dontClick = false;
				$("#attack").hide();
				$('.enemyWindow').on('click', function() {
					currOpp = this.id;
					jediIndex = options.indexOf(currOpp);
					options.splice(jediIndex,1);
					theEnemy();
				});
			if (options.length == 0 && hitPoints > 0) {
				$("#chooseEnemyText").hide();
				enemyBox.empty();
				enemyBox = $('<div>');
				enemyBox.attr("class","bonus");
				bonusHP = bonus.hitpoints;
				enemyAttack = bonus.attack;
				$("#currEnemy").append(enemyBox);
				dontClick = true;
				$("#attack").show();
				stats = "<img src=\"assets/images/" + bonus.image + "\" class=\"jediPic\" /><h4>" + bonus.name + "</h4><h4>Hit Points: " + bonusHP + "</h4>";
				$(".bonus").html(stats);
				$("#hitPoints").html(hitPoints);
				$("#attackPower").html(attackPower);
					$("#attack").on("click", function(){
						yourAttack();
							if (hitPoints <= 0) {
							$("#win-loss").html("You have been defeated!");
							$("#attack").hide();
							}
							if (bonusHP <= 0 && options.length == 0) {
							stats = "<img src=\"assets/images/" + bonus.image + "\" class=\"jediPic\" /><h4>'" + bonus.quote + "'</h4>";
							$("#currEnemy").html(stats + "<h4>" + bonus.name + " has been defeated!");
							$("#win-loss").html("You win!");
							$("#win-quote").html("<h4>'" + jedi[yourIndex].quote + "'</h4>");
							$("#attack").hide();
							$("#reset").show();
							$("#chooseEnemyText").hide();
							}
					});
			}

			};
		});

	}); //closes the enemyWindow onClick function

	}; //closes the dontClick condition

}); //closes the jediWindow onClick function

} //closes the characterSelected condition

} //closes theGame()
theGame();

$("#reset").on("click", function(){
//resetGame();
//theGame();
window.location.reload();
});

});