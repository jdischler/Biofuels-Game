/*
 * File: app/view/PlantPopup.js
 */

//------------------------------------------------------------------------------
Ext.define('MyApp.view.PlantPopup', {
//------------------------------------------------------------------------------

    createForSurface: function(surface, atX, atY) {

    	// Background
    	var popupBackground = [{        
			type: 'circle',
			x: atX + 25,
			y: atY,
			radius: 80,
			fill: '#000',
			opacity: 0.05,
			zIndex: 2000
		}];

    	// Switchgrass
    	var switchGrass = [{        
			type: 'image',
			src: 'app/assets/grass_icon.png',
			x: atX - 25,
			y: atY - 40,
			width: 50,
			height: 50,
			opacity: 0.5,
			zIndex: 3000
		}];

    	// corn
    	var corn = [{        
			type: 'image',
			src: 'app/assets/corn_icon.png',
			x: atX + 25,
			y: atY - 40,
			width: 50,
			height: 50,
			opacity: 0.5,
			zIndex: 3000
		}];

    	// No Crop
    	var noCrop = [{        
			type: 'image',
			src: 'app/assets/nothing_icon.png',
			x: atX,
			y: atY,
			width: 50,
			height: 50,
			opacity: 0.5,
			zIndex: 3000
		}];
		
  		this.bg = surface.add(popupBackground);
  		this.noCrop = surface.add(noCrop);
  		this.grass = surface.add(switchGrass);
  		this.corn = surface.add(corn);
    },

    //--------------------------------------------------------------------------
    showPopup: function(clickResponder, scope) {
    	
    	this.plantingClickResponder = clickResponder;
    	this.plantingClickResponderScope = scope;
    	
    	var baseInit = function(sprite, functionScope, clickValue) {
			sprite.show(true);
			sprite.cropTypeClickValue = clickValue;
			
			// scope is sprite so that the event will animate that given sprite
			sprite.on({
					mouseover: functionScope.onMouseOver,
					mouseout: functionScope.onMouseOut,
					scope: sprite
			});
			sprite.on({
					click: functionScope.onClick,
					scope: functionScope
			});
			sprite.setAttributes({
					scale: {
						x: 1,
						y: 1
					},
					opacity: 0.5
			}, true);
		}

		// show and set up all the events
    	this.bg[0].show(true);
    	this.bg[0].cropTypeClickValue = "cancel";
		this.bg[0].on({
				mouseout: this.onPopupMouseOut,
				click: this.onClick,
				scope: this});
		
		baseInit(this.noCrop[0], this, "none");
		baseInit(this.grass[0], this, "grass");
		baseInit(this.corn[0], this, "corn");
    },    
    
    //--------------------------------------------------------------------------
    hidePopup: function() {
    	// hide all sprites and clear the listen events
    	this.bg[0].hide(true).clearListeners();
    	this.noCrop[0].hide(true).clearListeners();
    	this.grass[0].hide(true).clearListeners();
    	this.corn[0].hide(true).clearListeners();
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
			duration:60,
			to: {
				scale: {
					x: 1,
					y: 1
				},
				opacity: 0.5
			}
    	});
	},

    //--------------------------------------------------------------------------
	onPopupMouseOut: function(evt, target) {
		this.plantingClickResponder.call(this.plantingClickResponderScope, 'cancel');
		this.hidePopup();
	},
	
    //--------------------------------------------------------------------------
	onClick: function(evt, target) {
		this.plantingClickResponder.call(this.plantingClickResponderScope, evt.cropTypeClickValue);
		this.hidePopup();
	},
	
});

