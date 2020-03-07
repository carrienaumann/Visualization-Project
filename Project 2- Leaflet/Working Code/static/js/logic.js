var mapLayer = MQ.mapLayer(),
  map;

  // initialize the map
map = L.map('map', {
    center: [ 37.541290, -77.434769 ],
    zoom: 14
  
});

var layers = {
    Bike: new L.LayerGroup(),
    Heatmap: new L.LayerGroup(),
    MQ1: MQ.trafficLayer({layers: ['flow']}),
    MQ2: MQ.trafficLayer({layers: ['incidents']})
  };

  var overlays = {
    "Bike Accidents (Historic)": layers.Bike,
    "RVA Car Crashes 2018-2019": layers.Heatmap,
    "Traffic Flow (Mapquest)": layers.MQ1,
    "Construction & Incidents (Mapquest)": layers.MQ2
  };

L.control.layers({
  'Map': mapLayer,
  'Satellite': MQ.satelliteLayer(),
  'Dark': MQ.darkLayer(),
  'Light': MQ.lightLayer()
}, overlays).addTo(map);

// {
//     'Traffic Flow': MQ.trafficLayer({layers: ['flow']}),
//     'Traffic Incidents': MQ.trafficLayer({layers: ['incidents']}),
//     'Bike': new L.LayerGroup({layers: []})
//     'Crash': new L.LayerGroup(layers: [] })
//   }

  // load GeoJson crash data from VDOT
    $.getJSON("data/rvabikeaccidents2.geojson",function(data) {
    console.log(data);
    var siteicon = L.icon({
        iconUrl: 'bike.png',
        iconSize: [20,20]
      }); 
      L.geoJson(data,{
        pointToLayer: function(features,latlng){
          var marker = L.marker(latlng,{icon: siteicon});
          // Landmarks marker
        // marker.bindPopup(feature.properties.Name + '<br/>' + feature.properties.Structure);
        // marker.bindPopup(features.properties.Crash_Severity + '<br/>' + "Driver Age:" + features.properties.Driverage);
        marker.bindPopup("Time:" + features.properties.Time + '<br/>' + "Street:" + features.properties.Street1);
        return marker;
        }
      }  ).addTo(layers.Bike);
});
// $.getJSON("data/rvabikeaccidents2.geojson",function(data2) {
$.getJSON("data/rvacrash20182019.geojson",function(data2){
  console.log(data2);
  addressPoints=[];
  for (i = 0; i <data2.features.length; i++)
  // { addressPoints.push([data2.features[i].geometry.coordinates[1],data2.features[i].geometry.coordinates[0],Math.random()])
  { addressPoints.push([data2.features[i].geometry.coordinates[1],data2.features[i].geometry.coordinates[0],Math.random()])
  }
  
  L.heatLayer(addressPoints, {radius: 25}).addTo(layers.Heatmap);
  
//   var legend = L.control({position: 'bottomleft'});

//   legend.onAdd = function (map) {
  
//       var div = L.DomUtil.create('div', 'info legend'),
//           label1 = ["RVA Bike Accidents", "2018-2019 RVA VDOT Car Crash Data Heatmap"],
//           label2 = ['bike.png',"https://cdn3.iconfinder.com/data/icons/ui-icons-5/16/cross-small-01-512.png"];
  
//       // loop through our density intervals and generate a label with a colored square for each interval
//       for (var i = 0; i < label1.length; i++) {
//           div.innerHTML +=
//               label1[i] + (" <img src="+ label2[i] +" height='20' width='20'>") +'<br>';
//       }
  
//       return div;
//   };
  
//   legend.addTo(map);
  });