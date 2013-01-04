/*
 * File: app/view/TitlePanel.js
 */
	
//------------------------------------------------------------------------------
Ext.define('Biofuels.view.TitlePanel', {
//------------------------------------------------------------------------------

	extend: 'Ext.panel.Panel',
    alias: 'widget.titlePanel',

	dock: 'top',
	height: 50,
	widthRatio: 0.5,
	viewbox: false,
	layout: 'auto',
	
		// private
    setItemSize : function(item, width, height){
        this.owner.addCls('ux-layout-center');
        item.addCls('ux-layout-center-item');
        if(item && height > 0) {
            if (width) {
                width = item.width;
                if (Ext.isNumber(item.widthRatio)) {
                    width = Math.round(this.owner.el.getWidth() * item.widthRatio);
                }
            }
            item.setSize(width, height);
        }

    },

	//--------------------------------------------------------------------------
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [{
				xtype: 'draw',
				height: 50,
				width: 800,
				items: [{
					type: 'circle',
					radius: 90,
					x: -500,
					y: 25,
					fill: 'blue'
				},{
					type: 'circle',
					radius: 90,
					x: 500,
					y: 25,
					fill: 'blue'
				}]
			}]
		});
		
		me.callParent(arguments);
	}
	
});

