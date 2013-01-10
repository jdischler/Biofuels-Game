/*
 * File: app/view/FieldOverlay.js
 */

//------------------------------------------------------------------------------
Ext.define('Biofuels.view.FieldOverlay', {
//------------------------------------------------------------------------------

    //--------------------------------------------------------------------------
    attachTo: function(fieldData, surface, atX, atY) {
    	
    	this.surface = surface;
    	this.fieldData = fieldData;
    	
    	this.atX = atX;
    	this.atY = atY;
    	
    	// Soil 'health' color layer
  		this.underlay = surface.add([{        
			type: 'rect',
			width: 160,
			height: 120,
			radius: 10,
			x: atX,
			y: atY,
			fill: '#ff0',
			opacity: 0.5,
			zIndex: 500
		}]);
		
		this.cropSprites = {
			corn: 'app/assets/corn_icon.png',
			switchgrass: 'app/assets/grass_icon.png',
			fallow: 'app/assets/nothing_icon.png'
		};

		this.cropSprite = surface.add([{        
			type: 'image',
			src: 'app/assets/corn_icon.png',
			x: atX-12,
			y: atY-12,
			width: 35,
			height: 35,
			zIndex: 3000
		}]);
		
		var testPath = "M" + (atX + 20) + " " + (atY + 50) +
				"L";
		
		var seasonStep = 120 / (this.fieldData.seasons.length-1);
		
		for (var index = 0; index < this.fieldData.seasons.length; index++) {
			testPath += (atX + seasonStep * index + 20)  + " " + (atY + this.fieldData.seasons[index].soil * -2 + 50) + " ";
		}
		
		var testGrid1 = "M" + (atX + 20) + " " + (atY + 20) +
						"v75 h120 v-75";
		var testGrid2 = "M" + (atX + 20) + " " + (atY + 50) +
						"h120";
		this.yieldGrid = surface.add([{
			type: 'path',
			path: testGrid1,
			stroke: '#000',
			'stroke-width': 1,
			opacity: 0.6,
			zIndex: 4500
		},{
			type: 'path',
			path: testGrid2,
			stroke: '#000',
			'stroke-width': 1,
			opacity: 0.6,
			zIndex: 4500
		}]);
		
		this.yieldPath = surface.add([{
			type: 'path',
			path: testPath,
			stroke: "#fff",
			'stroke-width': 2,
			zIndex: 5000
		}]);
		
		this.yieldMarker = surface.add([{
			type: 'circle',
			radius: 3,
			stroke: '#ed3',
			'stroke-width': 1,
			fill: '#346',
			x: (atX + 20),
			y: (atY + 50),
			zIndex: 6000
		}]);
    },
    
    //--------------------------------------------------------------------------
    showYields: function() {
    	
    	this.yieldGrid[0].stopAnimation().animate({
			duration: 100,
			to: {
				opacity: 0.6
			}
    	});
    	this.yieldGrid[1].stopAnimation().animate({
			duration: 100,
			to: {
				opacity: 0.2
			}
    	});
    	this.yieldPath[0].stopAnimation().animate({
			duration: 100,
			to: {
				opacity: 1
			}
    	});
    	
    	this.yieldMarker[0].stopAnimation().animate({
    		duration: 100,
    		to: {
    			opacity: 1
    		}
    	});
    },

    //--------------------------------------------------------------------------
    hideYields: function() {
    	
    	this.yieldGrid[0].stopAnimation().animate({
			duration: 100,
			to: {
				opacity: 0
			}
    	});
    	this.yieldGrid[1].stopAnimation().animate({
			duration: 100,
			to: {
				opacity: 0
			}
    	});
    	this.yieldPath[0].stopAnimation().animate({
			duration: 100,
			to: {
				opacity: 0
			}
    	});
    	this.yieldMarker[0].stopAnimation().animate({
    		duration: 100,
    		to: {
    			opacity: 0
    		}
    	});
    },
    
    //--------------------------------------------------------------------------
    showSoilHealth: function() {
    	
    	this.underlay[0].stopAnimation().animate({
			duration: 100,
			to: {
				opacity: 0.5
			}
    	});

    },

    //--------------------------------------------------------------------------
    hideSoilHealth: function() {
    	
    	this.underlay[0].stopAnimation().animate({
			duration: 100,
			to: {
				opacity: 0
			}
    	});

    },

    //--------------------------------------------------------------------------
    showCrop: function() {
    	
    	this.cropSprite[0].stopAnimation().animate({
			duration: 200,
			to: {
				opacity: 1
			}
    	});

    },

    //--------------------------------------------------------------------------
    hideCrop: function() {
    	
    	this.cropSprite[0].stopAnimation().animate({
			duration: 200,
			to: {
				opacity: 0
			}
    	});

    },

    //--------------------------------------------------------------------------
    show: function(year) {
    	
    	this.showSoilHealth();
    	this.showCrop();
    	this.showYields();
    },
    
    //--------------------------------------------------------------------------
    hide: function() {
    	
    	this.hideSoilHealth();
    	this.hideCrop();
    	this.hideYields();
    },    
    
    //--------------------------------------------------------------------------
    animateTo: function(item, opacity, fill, time) {
    	
    	var config;
    	
    	if (time && typeof time != 'undefined') {
    		config.duration = time;
    	}
    	else {
    		config.duration = 100;
    	}
    	
    	if (opacity) {
    		config.to.opacity = opacity;
    	}
    	if (fill) {
    		config.to.fill = fill;
    	}
    	
    	item.stopAnimation().animate(config);
    },
    
    //--------------------------------------------------------------------------
    setCurrentSeason: function(year) {
    	
    	var newYear = (this.fieldData.seasons.length - 1) + year;
    	var season = this.fieldData.seasons[newYear];
    	
    	var fillColor = '#ff0';
    	
    	if (season.soil <= -10) {
    		fillColor = '#f00';
    	}
    	else if (season.soil >= 10) {
    		fillColor = '#0f0';	
    	}
    	else if (season.soil < 0) {
    		fillColor = 'rgb(255,' + (255 + season.soil * 25) + ',0)';
    	}
    	else if (season.soil > 0) {
    		fillColor = 'rgb(' + (255 - season.soil * 25) + ',255,0)';
    	}
    	
    	this.underlay[0].stopAnimation().animate({
			duration: 200,
			to: {
				fill: fillColor
			}
    	});
    	
    	this.cropSprite[0].setAttributes({
    			src: this.cropSprites[season.crop]
    		}, true);
    
		var seasonStep = 120 / (this.fieldData.seasons.length-1);

    	this.yieldMarker[0].stopAnimation().animate({
			duration: 200,
			to: {
				x: (this.atX + seasonStep * newYear + 20),
				y: (this.atY + season.soil * -2 + 50)
    			}
    	});

    }
	
});

