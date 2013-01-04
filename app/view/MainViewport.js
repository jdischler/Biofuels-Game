/*
 * File: app/view/MainViewport.js
 */

//------------------------------------------------------------------------------
Ext.define('Biofuels.view.MainViewport', {
//------------------------------------------------------------------------------

	extend: 'Ext.container.Viewport',
    requires: [
        'Biofuels.view.CornPlantSprite',
        'Biofuels.view.GrassPlantSprite',
        'Biofuels.view.FarmHolderPanel',
        'Biofuels.view.FieldHealthPopup',
        'Biofuels.view.InformationPanel',
        'Biofuels.view.ContractPanel',
        'Biofuels.view.SustainabilityPanel',
        'Biofuels.view.Field',
        'Biofuels.view.Farm',
        'Biofuels.view.ContractHelpWindow',
        'Biofuels.view.TitlePanel'
    ],

    title: 'My Window',
    autoScroll: true,
    layout: 'fit',

	//--------------------------------------------------------------------------
    initComponent: function() {
        var me = this;        
        
        Ext.applyIf(me, {
            items: [{
				xtype: 'panel',
				layout: 'fit',
				dockedItems: [{
					xtype: 'titlePanel',
				}],
				items: [{
					xtype: 'panel',
					layout: 'column',
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
