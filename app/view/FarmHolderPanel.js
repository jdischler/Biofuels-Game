Ext.define('MyApp.view.FarmHolderPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.farmHolderPanel',

//    id: 'farmPanel',
    frame: false,
    height: 700,
    width: 500,
    preserveRatio: true,
    layout: {
        type: 'fit'
    },
    title: 'Your Farm',
    titleAlign: 'center',

    tools:[{
    		type:'help',
    		qtip: 'Add a field!',
    		handler: function(event, target, owner, tool) {
    			
    			// UGH: FIXME: seems like there would be an easier way to do this?
    			// Owner of this tool is the panel header...
    			// So go up from the panel header which gets us to the panel itself...
    			// then go back down to get the Farm component on the panel...
    			owner.up().child('Farm').createFields(2);
    		}
    }],
    
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'Farm'
            	}]
        });

        me.callParent(arguments);
    }

});
