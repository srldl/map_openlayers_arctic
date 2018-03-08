'use strict';

var angular = require('angular');

var map_openlayers = angular.module('map_openlayers',[]);


map_openlayers.controller('MapCtrl', function($scope) {
  var EPSG = 'EPSG:32661'; // EPSG:3031 - WGS 84 / Antarctic Polar Stereographic

  proj4.defs(EPSG,"+proj=stere +lat_0=90 +lat_ts=90 +lon_0=0 +k=0.994 +x_0=2000000 +y_0=2000000 +ellps=WGS84 +datum=WGS84 +units=m +no_defs");
  var projection = ol.proj.get(EPSG);
  var origin = [-28567900,32567900];
  var resolutions = [21674.7100160867,10837.35500804335,5418.677504021675,2709.3387520108377,1354.6693760054188,677.3346880027094,338.6673440013547,169.33367200067735,84.66683600033868,42.33341800016934];
  var matrixIds = [0,1,2,3,4,5,6,7,8,9]

  var url = "http://vilhelm.npolar.no/arcgis/rest/services/Basisdata_Intern/NP_Arktis_WMTS_32661/MapServer/WMTS";

  var layer = new ol.layer.Tile({
    source: new ol.source.WMTS({
      attributions: '© Norwegian Polar Institute',
      url: url,
      layer: 'Basisdata_Intern_NP_Arktis_WMTS_32661',
      matrixSet: 'default028mm',
      format: 'image/jpgpng',
      projection: projection,
      tileGrid: new ol.tilegrid.WMTS({
        origin: origin,
        resolutions: resolutions,
        matrixIds: matrixIds
      }),
      style: 'default'
    })
  });

  var map = new ol.Map({
  layers:[layer],
  target: 'map',
  controls: ol.control.defaults({
    attributionOptions: {
      collapsible: false
    }
  }),
        view: new ol.View({
          projection: projection,
          center: ol.proj.transform([0, 90], 'EPSG:4326', EPSG),
          zoom: 4
        })
      });

});
