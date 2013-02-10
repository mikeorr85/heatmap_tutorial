var map;
var heatmap;
var mapData;

window.onload = function(){

  var myLatlng = new google.maps.LatLng(48.3333, 16.35);

  var myOptions = {
    zoom: 2,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: false,
    scrollwheel: true,
    draggable: true,
    navigationControl: true,
    mapTypeControl: false,
    scaleControl: true,
    disableDoubleClickZoom: false
  };

  map = new google.maps.Map(document.getElementById("heatmapArea"), myOptions);

  heatmap = new HeatmapOverlay(map, {"radius":10, "visible":true, "opacity":60});

  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/home/geocoded_clicks",
    success: function(data){ 
      mapData={
        max: 46,
        data: data
      };
    }
  });

  google.maps.event.addListenerOnce(map, "idle", function(){
    heatmap.setDataSet(mapData);
  });
};