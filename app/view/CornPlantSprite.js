/*
 * File: app/view/CornPlantSprite.js
 */

//------------------------------------------------------------------------------
Ext.define('Biofuels.view.CornPlantSprite', {
//------------------------------------------------------------------------------

    constructor: function (config) {
    	
    	this.randomSpriteConfigList = Array([{        
			type: 'image',
			src: 'resources/corn_plant.png',
			width: 30,
			height: 50,
			zIndex: 750
		}],
		[{
			type: 'image',
			src: 'resources/corn_plant_2.png',
			width: 30,
			height: 50,
			zIndex: 750
		}]);
    },
    
    //--------------------------------------------------------------------------
    addToSurface: function(surface, atX, atY, duration) {

		var randomSpriteConfig = this.randomSpriteConfigList[
				Math.floor(Math.random() * this.randomSpriteConfigList.length)];
		
    	// TODO: if this.sprites already exists, clear?
//    	if (this.sprites
  		var result = surface.add(randomSpriteConfig);
  		this.sprites = result;
		for (var index = 0; index < result.length; index++) {
			result[index].group = "aCorns";
			result[index].setAttributes({
				translate: {
					x: atX, 
					y: atY
				}}, false);
		}
    	for (var index = 0; index < result.length; index++) {
			result[index].animate({
				duration: duration,
				from: {
					scale: {
						x: 0.2,
						y: 0.2
					},
					translate: {
						x: atX,
						y: atY + 20 * 0.8 
					}
				},
				to: {
					scale: {
						x: 1,
						y: 1
					},
					translate: {
						x: atX,
						y: atY
					}
				}
			});
    	}    	
    },

    //--------------------------------------------------------------------------
    removeFromSurface: function() {
    	if (!this.sprites) return;
    	
    	var result = this.sprites;
    	for (var index = 0; index < result.length; index++) {
    		// FIXME: Destroy?
    		result[index].remove();
    	}
    	this.sprites = null;
    }

});
