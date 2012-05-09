// An example of search using Nominatim via Mapquest Open

var map;

window.onload = function() {
    // Set up map
    var template = 'http://{S}.mqcdn.com/tiles/1.0.0/osm/{Z}/{X}/{Y}.png';
    var subdomains = [ 'otile1', 'otile2', 'otile3', 'otile4'];
    var provider = new MM.TemplatedLayer(template, subdomains);
    map = new MM.Map('map', provider);
    map.setCenterZoom(new MM.Location(37.811530, -122.2666097), 14);

    // Set up search
    var search = document.getElementById('search');
    search.onsubmit = function() {
        doSearch();
        return false;
    };
};

// Nominatim at MapQuest Open - http://open.mapquestapi.com/nominatim/
var base = 'http://open.mapquestapi.com/nominatim/v1/';
var template = base + 'search?format=json&json_callback=searchCallback&limit=1&q=%s';

// Execute search
function doSearch() {
    if (!search.q.value) return;
    var url = template.replace('%s', encodeURIComponent(search.q.value));
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", url);
    document.body.appendChild(script);

}

// Process search response
function searchCallback(resp) {
    // Check response empty
    if (resp.length === 0) {
        alert("No location found");
        return;
    }
    
    // Zoom to bounding box
    var b = resp[0].boundingbox;
    map.setExtent(new MM.Extent(
        b[1],
        b[2],
        b[0],
        b[3]
    ));
}
