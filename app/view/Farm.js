/*
 * File: app/view/Farm.js
 */
	
//------------------------------------------------------------------------------
Ext.define('Biofuels.view.Farm', {
//------------------------------------------------------------------------------

    extend: 'Ext.draw.Component',
    alias: 'widget.Farm',
    renderTo: Ext.getBody(),
    
    // Some basic constants
	//--------------------------------------------------------------------------
    FARM_WIDTH: 445,
	FARM_HEIGHT: 600,

	MAX_FIELDS: 6,
	MAX_FIELDS_PER_ROW: 2,
	
	FIELD_START_X: 40,
	FIELD_START_Y: 30,
	
	FIELD_SPACE_X: 200,
	FIELD_SPACE_Y: 160,
	
	HEALTH_ICON_SIZE: 50,

	//--------------------------------------------------------------------------
    initComponent: function() {
        var me = this;

        // specifies the location as the center of the icon
        // NOTE: here because relies on this.vars being fully init'd?
        this.HEALTH_ICON_X = this.FARM_WIDTH / 2;
        this.HEALTH_ICON_Y = this.FARM_HEIGHT - 105;
        
        Ext.applyIf(me, {
            items: [{
				type: 'rect',
				width: this.FARM_WIDTH,
				height: this.FARM_HEIGHT,
				fill: '#385'
			}]
		});

        me.callParent(arguments);
        
        this.fields = new Array();
    },
    
	//--------------------------------------------------------------------------
	createFields: function(num) {
		
		var count = num;
		
		if (this.fields.length <= 0) {
			this.addFarmHealthIcon(this.HEALTH_ICON_X, this.HEALTH_ICON_Y, 
									this.HEALTH_ICON_SIZE);
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
		
		var aField = Ext.create('Biofuels.view.Field');
		aField.addSurface(this.surface, atX, atY);
		
		aField.atX = atX;
		aField.atY = atY;
		
		this.fields.push(aField);
		
		return aField;
	},
   
	// place centered at atX, atY
	//-----------------------------------------------------------------------
    addFarmHealthIcon: function(atX, atY, radius) {
    	
    	var path = [{
			type: 'image',
			src: 'app/assets/field_health_icon.png',
			x: atX - radius / 2,
			y: atY - radius / 2,
			opacity: 0.5,
			width: radius,
			height: radius,
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
			duration: 100,
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
			duration: 100,
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

    	var maxNumYears = 0;
		for (var index = 0; index < this.fields.length; index++ ) {
			var result = this.fields[index].getNumYears();
			if (result > maxNumYears) {
				maxNumYears = result;
			}
		}
    	
    	if (!this.popupWindow) {
    		this.showFieldHealth();
    		this.popupWindow = Ext.create('Biofuels.view.FieldHealthPopup');
    		this.popupWindow.setSliderNumYears(maxNumYears);
    		this.popupWindow.setSliderCallback(this.onDrag, this.onChange, this);
    		
    		this.popupWindow.on({
				close: function(window, eOpts) {
					this.popupWindow = null;
					this.healthIcon.show(true);
					this.hideFieldHealth();
				},
				scope: this 
    		});
    		
    		this.healthIcon.hide();
    		this.popupWindow.show();
    		
    		var x = target.getX();
    		var y = target.getY();
    		
    		x -= (this.popupWindow.getWidth() * 0.5);
    		y -= (this.popupWindow.getHeight() * 0.5);
    		this.popupWindow.setPosition(x, y);
    	}
	},
	
    //-----------------------------------------------------------------------
	showFieldHealth: function() {
		
		for (var index = 0; index < this.fields.length; index++ ) {
			this.fields[index].showUnderlay();
		}
	},		

	//-----------------------------------------------------------------------
	hideFieldHealth: function() {
		
		for (var index = 0; index < this.fields.length; index++ ) {
			this.fields[index].hideUnderlay();
		}
	},
	
	onDrag: function(slider) {
		this.setFieldYear(slider.getValue());
	},
	onChange: function(slider) {
		this.setFieldYear(slider.getValue());
	},
	
	//-----------------------------------------------------------------------
	setFieldYear: function(newYear) {
		
		for (var index = 0; index < this.fields.length; index++ ) {
			this.fields[index].setYear(newYear);
		}
	}

});
