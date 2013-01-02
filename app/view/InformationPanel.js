Ext.define('MyApp.view.InformationPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.informationPanel',

	height: 700,
	minWidth: 500,
	width: 500,
    
	layout: {
		type: 'accordion',
		multi: true
	},
	title: 'Information About Your Farm',
	titleAlign: 'center',
    
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [{
            		xtype: 'contractPanel'
            	},
            	{
					xtype: 'panel',
					title: 'Other',
					titleAlign: 'center',
					layout: {
						type: 'vbox',
						padding: 8,
					},
					items: [{
						xtype: 'label',
						text: 'Some Label Text'
					},{
						xtype: 'label',
						text: 'Some Label Text'
					}]
				}
				, {
					xtype: 'panel',
					title: 'Profit and Loss',
					titleAlign: 'center'
				}
				, {
					xtype: 'panel',
					title: 'Sustainability',
					titleAlign: 'center'
				}
			]
		});
		
        me.callParent(arguments);
    }

});
