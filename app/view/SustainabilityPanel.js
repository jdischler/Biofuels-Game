Ext.define('MyApp.view.SustainabilityPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sustainabilityPanel',

    layout: {
        align: 'stretch',
        padding: '0 0 0 -20',
        type: 'hbox'
    },
	title: 'Sustainability',
	titleAlign: 'center',
	bodyStyle: 'background-color: #89a;',
	collapsed: true,

    initComponent: function() {
        var me = this;

		var dataStore = Ext.create('Ext.data.Store', {
			fields: ['name', 'data1', 'data2', 'data3'],
			data: [
				{ 'name': 'Biodiversity',	'data1': 9, 'data2': 12, 'data3': 13},
				{ 'name': 'Emissions',		'data1': 3, 'data2': 8,  'data3': 3 },
				{ 'name': 'Sustainability',	'data1': 18,'data2': 2,  'data3': 7 },
				{ 'name': 'More',			'data1': 7, 'data2': 2,  'data3': 7 },
				{ 'name': 'Other',			'data1': 1, 'data2': 2,  'data3': 7 }
			]
		});

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'chart',
                    height: 250,
                    width: 300,
                    animate: false,
                    insetPadding: 30,
                    store: dataStore,
                    axes: [
                        {
                            type: 'Category',
                            fields: [
                                'name'
                            ],
                            position: 'bottom',
                            title: 'Metrics'
                        },
                        {
                            type: 'Numeric',
                            fields: [
                                'data1'
                            ],
                            position: 'left',
                            title: 'Score'
                        }
                    ],
                    series: [
                        {
                            type: 'line',
                            xField: 'name',
                            yField: [
                                'data1'
                            ],
                            fill: true,
                            smooth: 3
                        }
                    ]
                },
                {
                    xtype: 'chart',
                    maxHeight: 220,
                    maxWidth: 220,
                    width: 220,
                    animate: false,
                    insetPadding: 50,
                    store: dataStore,
                    axes: [
                        {
                            position: 'radial',
                            type: 'Radial',
                            steps: 5
                        }
                    ],
                    series: [
                        {
                            type: 'radar',
                            title: 'title: "Radar"',
                            style: {
                                opacity: 0.4
                            },
                            xField: 'name',
                            yField: 'data1'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});
