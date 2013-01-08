/*
 * File: app/view/FieldData.js
 */
 
//------------------------------------------------------------------------------
Ext.define('Biofuels.view.SeasonData', {
//------------------------------------------------------------------------------

    //--------------------------------------------------------------------------
	constructor: function (config) {
	}
	
});

 
//------------------------------------------------------------------------------
Ext.define('Biofuels.view.FieldData', {
//------------------------------------------------------------------------------

    //--------------------------------------------------------------------------
	constructor: function (config) {
		this.seasons = new Array();
		
		var soilHealth = 0;
		for (var index = 0; index < 3; index++) {
			
			var rand = Math.floor(Math.random() * 3);

			if (rand == 0) {
				this.seasons.push({
					crop: 'corn',
					soil: soilHealth
				});
				soilHealth -= 2;

				this.seasons.push({
					crop: 'corn',
					soil: soilHealth
				});
				soilHealth -= 2;
				
				this.seasons.push({
					crop: 'corn',
					soil: soilHealth
				});
				soilHealth -= 2;
				
				this.seasons.push({
					crop: 'corn',
					soil: soilHealth
				});
				soilHealth -= 2;
			}
			else if (rand == 1) {
				this.seasons.push({
					crop: 'switchgrass',
					soil: soilHealth
				});
				soilHealth += 1;

				this.seasons.push({
					crop: 'switchgrass',
					soil: soilHealth
				});
				soilHealth += 2;
				
				this.seasons.push({
					crop: 'switchgrass',
					soil: soilHealth
				});
				soilHealth += 2;
				
				this.seasons.push({
					crop: 'switchgrass',
					soil: soilHealth
				});
				soilHealth += 1;
			}
			else {
				this.seasons.push({
					crop: 'fallow',
					soil: soilHealth
				});
				soilHealth += 1;
				
				this.seasons.push({
					crop: 'fallow',
					soil: soilHealth
				});
				soilHealth += 1;
				
				this.seasons.push({
					crop: 'corn',
					soil: soilHealth
				});
				soilHealth -= 2;
				
				this.seasons.push({
					crop: 'corn',
					soil: soilHealth
				});
				soilHealth -= 2;
			}
		}
	},
	
    //--------------------------------------------------------------------------
	getNumSeasons: function() {
		return this.seasons.length;
	}
	
});

