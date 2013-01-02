Ext.define('MyApp.view.FieldHealthPopup', {
    extend: 'Ext.window.Window',
    alias: 'widget.fieldHealthPopup',

    floating: true,
    height: 130,
    width: 400,
    resizable: false,
    title: 'Field Changes Over Time',
    titleAlign: 'center',
    titleCollapse: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    padding: 5,
                    layout: {
                        columns: 3,
                        type: 'table'
                    },
                    bodyPadding: '5 5 8 5',
                    items: [
                        {
                            xtype: 'checkboxfield',
							padding: '0 0 0 20',
                            colspan: 1,
                            rowspan: 1,
                            width: 125,
                            hideLabel: true,
                            boxLabel: 'Soil health',
                            checked: true
                        },
                        {
                            xtype: 'checkboxfield',
							padding: '0 0 0 20',
                            colspan: 1,
                            rowspan: 1,
                            width: 125,
                            hideLabel: true,
                            boxLabel: 'Yields',
                            checked: true
                        },
                        {
                            xtype: 'checkboxfield',
                            colspan: 1,
                            rowspan: 1,
                            width: 125,
                            hideLabel: true,
                            boxLabel: 'Other'
                        },
                        {
							xtype: 'slider',
							padding: '5 15 0 15',
							colspan: 3,
							rowspan: 1,
							width: 320,
							value: 0,
							maxValue: 0,
							minValue: -10
						},
						{
							xtype: 'label',
							padding: '0 0 0 20',
							text: '< Previous years',
							colspan: 2,
							rowspan: 1
						},
						{
							xtype: 'label',
							padding: '0 0 0 25',
							text: 'Now',
							colspan: 1,
							rowspan: 1
						}
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});
