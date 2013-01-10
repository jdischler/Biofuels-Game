/*
 * File: app/view/ContractPanel.js
 */
	
//------------------------------------------------------------------------------
Ext.define('Biofuels.view.ContractPanel', {
//------------------------------------------------------------------------------

	extend: 'Ext.panel.Panel',
    alias: 'widget.contractPanel',

    //--------------------------------------------------------------------------
    height: 255,
    minimumHeight: 255,
    titleAlign: 'center',
    title: 'Contracts',
    bodyStyle: 'background-color: #89a;',
    autoscroll: true,
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    collapsed: false,
    manageHeight: false,

    tools:[{
		type:'help',
		qtip: 'Contract Help',
		handler: function(event, target, owner, tool) {
			
			var help = Ext.create('Biofuels.view.ContractHelpWindow').show();
		}
    }],
    
    //--------------------------------------------------------------------------
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [{
				xtype: 'contractoffering',
				padding: 5,
				bodyPadding: '5 0 5 10',
				title: 'Corn Contract',
				imageSource: 'resources/simple_corn_icon.png',
				contractText: 'Must provide <b>200</b> metric tons of corn at <b>$300</b> a metric ton.'
			},
			{
				xtype: 'contractoffering',
				padding: 5,
				bodyPadding: '5 0 5 10',
				title: 'Switchgrass Contract',
				imageSource: 'resources/simple_grass_icon.png',
				contractText: 'Must provide <b>200</b> metric tons of switchgrass at <b>$200</b> a metric ton.'
			},
			{
				xtype: 'button',
				margins: '5 5 5 5',
				padding: '',
				scale: 'large',
				text: 'Finish Contract Acceptance Phase'
			}]
        });

        me.callParent(arguments);
    }

});
