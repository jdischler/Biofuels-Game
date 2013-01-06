/*
 * File: app/view/TitlePanel.js
 */
	
//------------------------------------------------------------------------------
Ext.define('Biofuels.view.TitlePanel', {
//------------------------------------------------------------------------------

	extend: 'Ext.panel.Panel',
    alias: 'widget.titlePanel',

//	dock: 'top',
//height: 50,
//	widthRatio: 0.5,
	viewbox: true,
//	layout: 'fit',
	
	//--------------------------------------------------------------------------
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [{
				xtype: 'draw',
				height: 60,
				width: 1000,
				layout: 'absolute',
				gradients: [{
					id: 'grad1',
					angle: 90,
					stops: {
						0: {
							color: '#000'
						},
						100: {
							color: '#243322'
						}
					}
				},{
					id: 'grad2',
					angle: 90,
					stops: {
						0: {
							color: '#ab2'
						},
						100: {
							color: '#231'
						}
					}
				}],
				items: [{
					type: 'rect',
					width: 1000,
					height: 60,
					fill: 'url(#grad1)'
				},{
					type: "text",
					text: "Biofuels",
					fill: "#000",
					font: "40px monospace",
					x:35,
					y:38
				},{
					type: "text",
					text: "Biofuels",
					fill: "url(#grad2)",
					font: "40px monospace",
					x:35,
					y:32
				}]
			}]
		});
	
		me.callParent(arguments);
	}
	
	
});

