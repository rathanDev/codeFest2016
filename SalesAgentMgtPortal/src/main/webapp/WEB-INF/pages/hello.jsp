<html>

<head>

    <title>1</title>

    <script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.2.min.js"></script>

</head>

<body>

<div id="map_container"></div>

<input type="text" id="address-text-box"/>
<button id="mark-button">code address</button>

<script async
        defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDbwFmt7GdOHVJi-IRdmA5llx9rQiBXn7A&callback=initMap"
        type="text/javascript">
</script>


<script type="text/javascript">

    var geocoder;
    var map;

    $("#mark-button").click(function(){

        var address = $("#address-text-box").val()

        console.log("clicked " + address);

        codeAddress(address);
    })

    function initMap() {
        var x = 10;
        loadMap(x);
    }

    function loadMap(x) {

        geocoder = new google.maps.Geocoder();

        var latlng = new google.maps.LatLng(4.3695030, 101.1224120);
        var chicagoLattitudeNLongitude = {lat: 41.85, lng: -87.65};

        var myOptions = {
            zoom: 4,
            center: chicagoLattitudeNLongitude,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("map_container"), myOptions);

    }

    function codeAddress(address) {
        geocoder.geocode(
                {'address': address},
                function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        map.setCenter(results[0].geometry.location);
                        var marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location
                        });
                    } else {
                        alert("Geocode was not successful for the following reason: " + status);
                    }
                });
    }

</script>

<style type="text/css">
    div#map_container {
        width: 100%;
        height: 350px;
    }
</style>

</body>

</html>