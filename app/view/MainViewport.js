/*
 * File: app/view/MainViewport.js
 */

//------------------------------------------------------------------------------
Ext.define('MyApp.view.MainViewport', {
//------------------------------------------------------------------------------

	extend: 'Ext.container.Viewport',
    requires: [
        'MyApp.view.CornPlantSprite',
        'MyApp.view.GrassPlantSprite',
        'MyApp.view.FarmHolderPanel',
        'MyApp.view.FieldHealthPopup',
        'MyApp.view.InformationPanel',
        'MyApp.view.ContractPanel',
        'MyApp.view.SustainabilityPanel',
        'MyApp.view.Field',
        'MyApp.view.Farm',
        'MyApp.view.ContractHelpWindow'
    ],

    title: 'My Window',
    autoScroll: true,
    layout: {
        type: 'fit'
    },

	//--------------------------------------------------------------------------
    initComponent: function() {
        var me = this;        
        
        Ext.applyIf(me, {
            items: [{
				xtype: 'panel',
				layout: {
					type: 'fit'
				},
				dockedItems: [{
						xtype: 'panel',
						dock: 'top',
						height: 50,
						width: 200
				}],
				items: [{
					xtype: 'panel',
					layout: {
						type: 'column'
					},
					bodyStyle: 'background-image: url(app/assets/site_bg.jpg); background-size: cover; background-repeat: no-repeat; background-attachment: fixed; background-position: center top;',
					items: [{
							xtype: 'panel',
							columnWidth: 0.5
						},
						{
							xtype: 'farmHolderPanel'
						},
						{
							xtype: 'informationPanel'

					}]
				}]
			}]
        });

        me.callParent(arguments);
    }
    
});
