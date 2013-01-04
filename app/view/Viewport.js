/*
 * File: app/view/Viewport.js
 */

//------------------------------------------------------------------------------
Ext.define('MyApp.view.Viewport', {
//------------------------------------------------------------------------------

    extend: 'MyApp.view.MainViewport',
    requires: [
        'MyApp.view.MainViewport'
    ],
    renderTo: Ext.getBody()
    
});