/*
 * File: app/view/Field.js
 *
 * Visual representation of a field
 */

//------------------------------------------------------------------------------
Ext.define('Biofuels.view.Field', {
//------------------------------------------------------------------------------

    constructor: function (config) {
        this.crop = new Array();
        this.cropType = "none";
    },
    
    //--------------------------------------------------------------------------
    attachTo: function(toSurface, atX, atY) {
    	
		var paths = [{        
			type: 'rect',
			width: 160,
			height: 120,
			radius: 10,
			x: atX,
			y: atY,
			fill: '#864',
			stroke: '#364',
			'stroke-width': 10
		},
		{
			type: 'image',
			src: 'app/assets/field_overlay.png',
			x: atX,
			y: atY,
			width: 160,
			height: 120,
		}];
		
    	this.surface = toSurface;
    	this.atX = atX;
    	this.atY = atY;
    	
  		var result = toSurface.add(paths);
  		this.sprites = result;
		for (var index = 0; index < result.length; index++) {
			result[index].show(true);
		}
		
		this.addPlantingIcons(toSurface, atX, atY + 95);
    },
    
    //--------------------------------------------------------------------------
    addPlantingIcons: function(surface, atX, atY) {
    	
    	var path = [{
			type: 'image',
			src: 'app/assets/planting_icon.png',
			x: atX,
			y: atY,
			opacity: 0.5,
			width: 40,
			height: 40,
			zIndex: 1000
    	}];
    	
  		var result = surface.add(path);
		for (var index = 0; index < result.length; index++) {
			result[index].show(true);
		}
		
		// Hrm, I guess must add the event on the topmost sprite element?
		result[0].on({
				mouseover: this.onMouseOver,
				mouseout: this.onMouseOut,
				scope: result[0]
		});
		result[0].on({
				click: this.onClick,
				scope: this
		});
		
		this.popup = Ext.create('Biofuels.view.PlantPopup');
        this.popup.createForSurface(this.surface, atX, atY);
    },
    
    //--------------------------------------------------------------------------
    onMouseOver: function(evt, target) {
    	this.stopAnimation().animate({
			duration:100,
			to: {
				scale: {
					x: 1.1,
					y: 1.1
				},
				opacity: 1
			}
    	});
	},

    //--------------------------------------------------------------------------
    onMouseOut: function(evt, target) {
    	this.stopAnimation().animate({
			duration:100,
			to: {
				scale: {
					x: 1,
					y: 1
				},
				opacity: 0.5
			}
    	});
	},
	
	// cropType: grass, corn, none, cancel
    //--------------------------------------------------------------------------
	onPlantingClickHandler: function(cropType) {
		if (!cropType.localeCompare("cancel")) {
			return;
		}
		
		if (this.cropType != cropType) {
			this.removeOldCrop();
			if (!cropType.localeCompare("corn")) {
				this.plantCorn(this.surface);
			}
			else if (!cropType.localeCompare("grass")) {
				this.plantGrass(this.surface);
			}
			this.cropType = cropType;
		}
	},
	
    //--------------------------------------------------------------------------
    onClick: function(evt, target) {
        this.popup.showPopup(this.onPlantingClickHandler, this);
	},
    
    //--------------------------------------------------------------------------
	removeOldCrop: function() {
		for (var index = 0; index < this.crop.length; index++) {
			this.crop[index].removeFromSurface();
		}
	},
	
    //--------------------------------------------------------------------------
    plantCorn: function(surface) {
    	var cx = 0;
    	var cy = 0;
    	
		for (var corns = 0; corns < 16; corns++ ) {
			var rAtX = cx + this.atX + 12; 
			var rAtY = cy + this.atY - 22;
			
			var aCorn = Ext.create('Biofuels.view.CornPlantSprite');
			aCorn.addToSurface(surface, rAtX, rAtY, 1000 + Math.random() * 500);

			cx += 35;
			if (cx >= 120) {
				cx = 0;
				cy += 30;
			}
			this.crop.push(aCorn);
		}
	},
	
    //--------------------------------------------------------------------------
    plantGrass: function(surface) {
    	var cx = 0;
    	var cy = 0;
    	
		for (var grass = 0; grass < 14; grass++ ) {
			var rAtX = cx + this.atX + 12; 
			var rAtY = cy + this.atY - 22;
			
			var aGrass = Ext.create('Biofuels.view.GrassPlantSprite');
			aGrass.addToSurface(surface, rAtX, rAtY, 1200 + Math.random() * 800);

			cx += 35;
			if (cx > 105) {
				cx -= 140;
				cx += (35 / 2);
				cy += 30;
			}
			this.crop.push(aGrass);
		}
	}       

});

