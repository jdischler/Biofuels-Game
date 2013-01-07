/*
 * File: app/view/FieldOverlay.js
 */

//------------------------------------------------------------------------------
Ext.define('Biofuels.view.FieldOverlay', {
//------------------------------------------------------------------------------

    constructor: function (config) {
    },
    
    //--------------------------------------------------------------------------
    addSurface: function(surface, atX, atY) {
    	
		var paths = [{        
			type: 'rect',
			width: 160,
			height: 120,
			radius: 10,
			x: atX,
			y: atY,
			fill: '#765',
			stroke: '#454',
			'stroke-width': 10,
			zIndex: 5000
		}];
		
    	this.surface = surface;
    	this.atX = atX;
    	this.atY = atY;
    	
  		var result = surface.add(paths);
  		this.sprites = result;
		for (var index = 0; index < result.length; index++) {
			result[index].show(true);
		}
    }
	
});

