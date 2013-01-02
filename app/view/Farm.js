/*
 * File: app/view/Farm.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.view.Farm', {
    extend: 'Ext.draw.Component',
    alias: 'widget.Farm',
    
    renderTo: Ext.getBody(),
    
	//--------------------------------------------------------------------------
	items: [{
		type: 'rect',
		width: 445,
		height: 600,
		fill: '#385',
	}],

	//--------------------------------------------------------------------------
    initComponent: function() {
        var me = this;

        this.MAX_FIELDS = 6;
        this.MAX_FIELDS_PER_ROW = 2;
        
        this.FIELD_START_X = 40;
        this.FIELD_START_Y = 30;
        
        this.FIELD_SPACE_X = 200;
        this.FIELD_SPACE_Y = 190;
        
        this.fields = new Array();
        
        me.callParent(arguments);
    },
    
	//--------------------------------------------------------------------------
	createFields: function(num) {
		
		var count = num;
		
		if (this.fields.length <= 0) {
			this.addFieldHealthIcon(196, 560);
		}
		
		if (this.fields.length < this.MAX_FIELDS) {
			if (this.fields.length + count > this.MAX_FIELDS) {
				count = this.MAX_FIELDS - this.fields.length;
			}
			
			var atX = 0;
			var atY = 0;
			// bah, space out
			for (var index = 0; index < this.fields.length; index++ ) {
				atX++;
				if (atX >= this.MAX_FIELDS_PER_ROW) {
					atX = 0;
					atY++;
				}
			}
			
			for (var index = 0; index < count; index++ )
			{
				var field = this.addField(atX * this.FIELD_SPACE_X + this.FIELD_START_X, 
										atY * this.FIELD_SPACE_Y + this.FIELD_START_Y);
				atX++;
				if (atX >= this.MAX_FIELDS_PER_ROW) {
					atX = 0;
					atY++;
				}
			}
		}		
    },        

	//--------------------------------------------------------------------------
	addField: function(atX, atY) {
		
		var aField = Ext.create('MyApp.view.Field');
		aField.addSurface(this.surface, atX, atY);
		
		aField.atX = atX;
		aField.atY = atY;
		
		this.fields.push(aField);
		
		return aField;
	},
   
	//-----------------------------------------------------------------------
    addFieldHealthIcon: function(atX, atY) {
    	
    	var path = [{
    			type: 'image',
    			src: 'app/assets/field_health_icon.png',
    			x: atX,
    			y: atY,
    			opacity: 0.5,
    			width: 50,
    			height: 50,
    			zIndex: 1000
    	}];
    	
  		var result = this.surface.add(path);
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
		
		this.healthIcon = result[0];
    },
    
    //-----------------------------------------------------------------------
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

    //-----------------------------------------------------------------------
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
	
    //-----------------------------------------------------------------------
    onClick: function(evt, target) {
    	if (!this.popupWindow) {
    		this.popupWindow = Ext.create('MyApp.view.FieldHealthPopup');
    		this.popupWindow.on(
    			{
    				close: function(window, eOpts) {
    					this.popupWindow = null;
    					this.healthIcon.show(true);
    				},
    				scope: this 
    			}
    		);
    		
    		this.healthIcon.hide();
    		this.popupWindow.show();
    		
    		var x = target.getX();
    		var y = target.getY();
    		
    		x -= (this.popupWindow.getWidth() * 0.5);
    		y -= (this.popupWindow.getHeight() * 0.5);
    		this.popupWindow.setPosition(x, y);
    	}
	}

});