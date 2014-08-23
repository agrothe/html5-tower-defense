var Settings = {
    Toolbox: {startX:215, startY:5, addValue:30, nextId: 0, maxDefense: 10},
    Score: 0,
    NewDefenseCounter:0,
    Enemy: {maxEnemyX: 175, createInterval: 1000, newWaveInterval: 7000, scale: 0.95, minInterval: 1000}
}
var $stage = $("#stage"), $body = $("body"), enemyX = 0, enemyY = -25;

window.setInterval(fireBullet, 1000);
initToolBox(1);
updateScore(0);
newEnemyWave();

function newEnemyWave(){
    for(var i = 0; i < 5; i++){
     window.setTimeout(createEnemy, Settings.Enemy.createInterval *i);
    }
    window.setTimeout(newEnemyWave, Settings.Enemy.newWaveInterval);

    if(Settings.Enemy.newWaveInterval > Settings.Enemy.minInterval)
    	Settings.Enemy.newWaveInterval *= Settings.Enemy.scale;
}


function updateScore(value){
    Settings.Score += value;
    Settings.NewDefenseCounter += value;
    if(Settings.NewDefenseCounter > 100)
    {
		Settings.NewDefenseCounter = 0;
        addNewDefense();
    }
    $("#scorebox").html(Settings.Score);
}

function initToolBox(level){
    for(var i = 0; i < level; i++){
    	addNewDefense();
    }
}


function addNewDefense(){
    var x = Settings.Toolbox.startX;
    var currentDefenseObjects = $(".inactive-defense").length;
    if(currentDefenseObjects >= Settings.Toolbox.maxDefense) return;
    // this next line ensures our next defense is always in proper position
    var y = Settings.Toolbox.startY + (currentDefenseObjects * Settings.Toolbox.addValue);

    var $defense = $("<div />")
    .addClass("defense")
    .addClass("inactive-defense")
    .attr('id', 'tool-' + Settings.Toolbox.nextId)
    .css({
        'top': y + 'px',
        'left': x + 'px',
    }).appendTo($body);
    Draggable.create('#tool-' + Settings.Toolbox.nextId, {
        type:"x,y",
        bounds: 'body',
        force3D: true,
        edgeResistance:0,
        dragResistance:0,
        onDragEnd: toolDragEnd,
        onDragEndParams: [$defense]
    });	
	// ensure the next object has a unique id
    Settings.Toolbox.nextId++;

}

function toolDragEnd($defense){
    var drag = Draggable.get($defense);
    var pos = $("#" + drag.target.id).position();
    createDefense(pos.left, pos.top);
    drag.disable();
    $defense.detach();
}

function fireBullet(){
    if($(".enemy:visible").length > 0){
        $(".active-defense").each(function(index){
          	var $d = $(this);
          	var $bullet = $('<div class=bullet />')  
                .appendTo($stage);
            TweenMax.to($bullet, 0, {x: parseFloat($d.attr('x')) +(25/2) , y: parseFloat($d.attr('y'))+5 });
          	var $e = $d.nearest('.enemy');
          	animateBullet($bullet,$e.position().left + 12,$e.position().top+70);
        });
	}
}

function animateBullet($b,x,y){
	TweenMax.to($b, 0.5, {
    	y:getRandom(y-20, y+20),
    	x:getRandom(x-20, x+20),
        onUpdate: detectBulletCollision,
        onUpdateParams: [$b],
        onComplete: bulletComplete,
        onCompleteParams: [$b]
	});
}

function bulletComplete($bullet){
    $bullet.remove();
}

function detectBulletCollision($bullet){
    $(".enemy:visible").each(function(index){
        var $e = $(this);
        if(!(
            $e.position().left > ($bullet.position().left + $bullet.width())
        	|| ($e.position().left + $e.width()) < $bullet.position().left
        	|| $e.position().top > ($bullet.position().top + $bullet.height())
        	|| ($e.position().top + $e.height()) < $bullet.position().top)
        ){
            $e.addClass("hit");
            $e.remove();
            $bullet.remove();
            updateScore(10);
        }
    });
}



function createEnemy(){
  var $enemy = $("<div />")
    .addClass("enemy")
    .css({
      'top': enemyY + 'px',
      'left': getRandom(0, Settings.Enemy.maxEnemyX) + 'px',
    }).appendTo($stage);
  enemyX += 30;
  if(enemyX > 170) enemyX = 0;
  animateEnemy($enemy);
}

function animateEnemy($enemy){ 
    TweenMax.to($enemy, 4, {y:325, onComplete: enemyComplete, onCompleteParams: [$enemy]});
}

function enemyComplete($enemy){
    if(!$enemy.hasClass("hit"))
    	updateScore(-10);
    $enemy.remove();
}

function createDefense(x,y){
  var $defense = $("<div />")
  	.addClass("defense")
    .removeClass("inactive-defense")
    .addClass("active-defense")
    .css({
      'top': y + 'px',
      'left': x + 'px',
    })
  	.attr('x', x)
  	.attr('y', y)
    .appendTo($body);
}


function getRandom(min, max) {
    var d = new Date();
    var x = Math.sin(d.valueOf()) * 10000;
    var num = (x - Math.floor(x)) * (max - min) + min;
    return Math.round(num * 100) / 100;
}
