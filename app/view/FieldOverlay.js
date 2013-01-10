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
    	
    	this.yieldPos = {
    		x: atX + 20,
    		y: atY + 55
    	};
    	
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
			corn: 'resources/corn_icon.png',
			switchgrass: 'resources/grass_icon.png',
			fallow: 'resources/nothing_icon.png'
		};

		this.cropSprite = surface.add([{        
			type: 'image',
			src: 'resources/corn_icon.png',
			x: atX-12,
			y: atY-12,
			width: 35,
			height: 35,
			zIndex: 3000
		}]);
		
		var testPath = "M" + (atX + 20) + " " + (this.yieldPos.y) +
				"L";
		
		var seasonStep = 120 / (this.fieldData.seasons.length-1);
		
		for (var index = 0; index < this.fieldData.seasons.length; index++) {
			testPath += (this.yieldPos.x + seasonStep * index)  + " " +
				(this.yieldPos.y + this.fieldData.seasons[index].soil * -2) + " ";
		}
		
		var testGrid1 = "M" + (this.yieldPos.x) + " " + (atY + 15) +
						"v85 h120 v-85";
		var testGrid2 = "M" + (this.yieldPos.x) + " " + (this.yieldPos.y) +
						"h120";
		var testGridBg = "M" + (this.yieldPos.x) + " " + (atY + 15) +
						"v85 h120 v-85z";
		this.yieldGridBG = surface.add([{
			type: 'path',
			path: testGridBg,
			'stroke-width': 0,
			fill: '#ffa',
			opacity: 0.5,
			zIndex: 4000
		}]);
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
			x: (this.yieldPos.x),
			y: (this.yieldPos.y),
			zIndex: 6000
		}]);
    },
    
    //--------------------------------------------------------------------------
    showYields: function() {
    	
    	this.yieldGrid[0].stopAnimation().show(true).animate({
			duration: 100,
			to: {
				opacity: 0.6
			}
    	});
    	this.yieldGrid[1].stopAnimation().show(true).animate({
			duration: 100,
			to: {
				opacity: 0.3
			}
    	});
    	this.yieldGridBG[0].stopAnimation().show(true).animate({
			duration: 100,
			to: {
				opacity: 0.5
			}
    	});
    	this.yieldPath[0].stopAnimation().show(true).animate({
			duration: 100,
			to: {
				opacity: 1
			}
    	});
    	
    	this.yieldMarker[0].stopAnimation().show(true).animate({
    		duration: 100,
    		to: {
    			opacity: 1
    		}
    	});
    },

    //--------------------------------------------------------------------------
    doHide: function() {
    	this.hide();
    },
    
    //--------------------------------------------------------------------------
    hideYields: function() {
    	
    	this.yieldGrid[0].stopAnimation().animate({
			duration: 100,
			to: {
				opacity: 0
			},
			callback: this.doHide,
			scope: this.yieldGrid[0]
    	});
    	this.yieldGrid[1].stopAnimation().animate({
			duration: 100,
			to: {
				opacity: 0
			},
			callback: this.doHide,
			scope: this.yieldGrid[1]
    	});
    	this.yieldGridBG[0].stopAnimation().animate({
			duration: 100,
			to: {
				opacity: 0
			},
			callback: this.doHide,
			scope: this.yieldGridBG
    	});
    	this.yieldPath[0].stopAnimation().animate({
			duration: 100,
			to: {
				opacity: 0
			},
			callback: this.doHide,
			scope: this.yieldPath[0]
    	});
    	this.yieldMarker[0].stopAnimation().animate({
    		duration: 100,
    		to: {
    			opacity: 0
			},
			callback: this.doHide,
			scope: this.yieldMarker[0]
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
				x: (this.yieldPos.x + seasonStep * newYear),
				y: (this.yieldPos.y + season.soil * -2)
    			}
    	});

    }
	
});

