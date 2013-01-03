Ext.define('MyApp.view.ContractPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.contractPanel',
    requires: [
    	'Ext.window.MessageBox'
    ],


    height: 255,
    minimumHeight: 255,
    autoscroll: true,
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    collapsed: false,
    manageHeight: false,
    titleAlign: 'center',
    title: 'Contracts',
    bodyStyle: 'background-color: #89a;',

    tools:[{
    		type:'help',
    		qtip: 'Contract Help',
    		handler: function(event, target, owner, tool) {
    			
    			var help = Ext.create('MyApp.view.ContractHelpWindow').show();
    		}
    }],
    
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    padding: 5,
                    layout: {
                        type: 'column'
                    },
                    bodyPadding: '5 0 5 10',
                    title: 'Corn Contract',
                    items: [
                        {
                            xtype: 'label',
                            columnWidth: 0.6,
                            padding: 5,
                            html: 'Must provide <b>500</b> bushels of corn at <b>$100</b> a bushel'
                        },
                        {
                            xtype: 'button',
                            padding: '10 0 10 0',
                            columnWidth: 0.35,
                            enableToggle: true,
                            scale: 'medium',
                            text: 'Accept Contract?',
                            handler: function(button, evt) {
                            	if (button.pressed) {
                            		button.setText('Contract Accepted!');
                            	}
                            	else {
                            		button.setText('Accept Contract?');
                            	}
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    padding: 5,
                    layout: {
                        type: 'column'
                    },
                    bodyPadding: '5 0 5 10',
                    title: 'Switchgrass Contract',
                    items: [
                        {
                            xtype: 'label',
                            columnWidth: 0.6,
                            padding: 5,
                            html: 'Must provide <b>500</b> bushels of switchgrass at <b>$100</b> a bushel'
                        },
                        {
                            xtype: 'button',
                            padding: '10 0 10 0',
                            columnWidth: 0.35,
                            enableToggle: true,
                            scale: 'medium',
                            text: 'Accept Contract?',
                            handler: function(button, evt) {
                            	if (button.pressed) {
                            		button.setText('Contract Accepted!');
                            	}
                            	else {
                            		button.setText('Accept Contract?');
                            	}
                            }
                        }
                    ]
                },
                {
                    xtype: 'button',
                    margins: '5 5 5 5',
                    padding: '',
                    scale: 'large',
                    text: 'Finish Contract Acceptance Phase'
                }
            ]
        });

        me.callParent(arguments);
    }

});
