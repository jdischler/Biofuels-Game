/*
 * File: app/view/ProgressPanel.js
 */
	
//------------------------------------------------------------------------------
Ext.define('Biofuels.view.ProgressPanel', {
//------------------------------------------------------------------------------

	extend: 'Ext.panel.Panel',
    alias: 'widget.progressPanel',

	title: 'Round Stage',
	titleAlign: 'center',
	height: 100,
	viewbox: true,
	tools:[{
		type:'help',
		qtip: 'Add stage graphics',
		handler: function(event, target, owner, tool) {
			
			// Call on the owner of the tool, which is the panel?...pass the draw component
			owner.up().advanceStage(owner.up().child('draw'));
		}
    }],

	//--------------------------------------------------------------------------
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [{
				xtype: 'draw',
				height: 80,
				width: 500,
				layout: 'absolute',
				items: [{
					type: 'rect',
					width: 500,
					height: 80,
					fill: '#082014'
				}]
			}]
		});
	
		me.callParent(arguments);
	},
	
	//--------------------------------------------------------------------------
	createStageMarker: function(drawComp) {
		
		this.stageMarker = drawComp.surface.add([{
			type: 'circle',
			radius: 12,
			fill: '#fa2',
			x: 80,
			y: 27
		}]);
		
		this.stageMarker[0].show(true);
	},
	
	//--------------------------------------------------------------------------
	advanceStage: function(drawComp) {
		
		if (!this.stageBar) {
			this.stageBar = Ext.create('Biofuels.view.RoundStageBar');
			this.stageBar.addToSurface(drawComp.surface, 0, 0);
			
			this.createStageMarker(drawComp);
			this.stageMarkerPos = 0;
		}
		else {
			this.stageMarkerPos++;
			
			if (this.stageMarkerPos > 2) {
				this.stageMarkerPos = 0;
				this.stageMarker[0].setAttributes({
					translate: {
						x: this.stageMarkerPos * 170,
						y: 0
					}
				}, true);
			}
			else {
				this.stageMarker[0].animate({
					duration: 500,
					to: {
						translate: {
							x: this.stageMarkerPos * 170,
							y: 0
						}
					}
				});
			}

		}
	}
	
});

