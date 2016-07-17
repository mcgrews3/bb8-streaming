var chalk = require("chalk");
var sphero = require("sphero");

// Doing this because I dont want to upload my bb8's uuid
var fs = require('fs');
var id = JSON.parse(fs.readFileSync('./data.json', 'utf-8')).id;
var bb8 = sphero(id);

//var bb8 = sphero("some long uuid, copy and paste as you please");

bb8.connect(function() {
	
	bb8.color("green");
	bb8.detectCollisions();
	bb8.on('collision', function(data) {
		console.log(chalk.red("collision detected: "), data);
		bb8.color("red");
		setTimeout(function() {
			bb8.color("green");
		});
	});
	
	
	var streamOpts = {
    	n: 200,
    	m: 1,
    	mask1: 0x00000000,
    	pcnt: 0,
    	mask2: 0x0D800000
  	};
  	bb8.setDataStreaming(streamOpts);
  	bb8.on('dataStreaming', function(data) {
  		console.log(chalk.green("streaming data: "), data);
  	});

	setInterval(function() {
		var direction = Math.floor(Math.random() * 360);
		bb8.roll(150, direction);
	}, 1000);
});