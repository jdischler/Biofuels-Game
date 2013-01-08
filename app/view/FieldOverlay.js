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
			x: atX,
			y: atY,
			width: 50,
			height: 50,
			zIndex: 3000
		}]);
    },
    
    //--------------------------------------------------------------------------
    showSoilHealth: function() {
    	
    	this.underlay[0].stopAnimation().animate({
			duration: 100,
			to: {
				opacity: 0.75
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
    },
    
    //--------------------------------------------------------------------------
    hide: function() {
    	
    	this.hideSoilHealth();
    	this.hideCrop();
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
    }
	
});

