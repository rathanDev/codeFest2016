<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>

<head>

    <title>2</title>
    <script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.2.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>


</head>

<body>

<div class="container">
    <div class="row">

        <div class="col-md-6" id="map_container">asdf</div>
        <div class="col-md-6" id="agent_datails">aghjh</div>

    </div>
</div>

<table id="sales-agent-details-table">
    <thead>
    <tr>
        <th>Sales Agent</th>
        <th>Name</th>
    </tr>
    </thead>
    <tbody>
    <c:forEach items="${salesAgents}" var="salesAgent">
        <tr>
            <td>${salesAgent.name}</td>
            <td>${salesAgent.area}</td>
        </tr>
    </c:forEach>

    </tr>
    </tbody>
</table>

<div ></div>
<div ></div>

<input type="text" id="address-text-box"/>
<button id="mark-button">code address</button>

<script async
        defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDbwFmt7GdOHVJi-IRdmA5llx9rQiBXn7A&callback=initMap"
        type="text/javascript">
</script>


<script type="text/javascript">

    $(document).ready(function () {

    });

    var geocoder;
    var map;
//    var marker;

    $("#mark-button").click(function () {
        var address = $("#address-text-box").val()
        console.log("clicked " + address);
        codeAddress(address);
    });

    function initMap() {
        loadMap();
    }

    function loadMap() {
        console.log("inside loadMap")

        geocoder = new google.maps.Geocoder();

        var latlng = new google.maps.LatLng(4.3695030, 101.1224120);
        var chicagoLattitudeNLongitude = {lat: 41.85, lng: -87.65};

        var myOptions = {
            zoom: 8,
            center: chicagoLattitudeNLongitude,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("map_container"), myOptions);

        getSalesAgentDetailsAndCreateMarks();
    }

    function getSalesAgentDetailsAndCreateMarks() {
        console.log("inside getSalesAgentDetailsAndCreateMarks")

        $('#sales-agent-details-table tbody tr').each(function () {
            var thisRow = $(this);
            var agentName = thisRow.find('td:first').text().trim()
            var agentArea = thisRow.find('td:nth-child(2)').text().trim()

            codeAddress(agentArea, agentName)
        });
    }

    function codeAddress(address, agentName) {
        console.log("inside codeAddress " + agentName + " " + address)

        geocoder.geocode(
                {'address': address},
                function (results, status) {
                    console.log("inside codeAddres ", agentName, " ", address)

                    if (status == google.maps.GeocoderStatus.OK) {

                        map.setCenter(results[0].geometry.location);

                        var marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location,
                            title: agentName
                        });

                        (function(marker) {
                            google.maps.event.addListener(marker, 'click', function() {

//                                var infowindow = new google.maps.InfoWindow({
//                                    content: marker.getTitle(),
//                                });
//                                infowindow.open(map, marker);

                                $('#agent_datails').text(marker.getTitle());

                            });
                        })(marker);

                    } else {
                        alert("Geocode was not successful for the following reason: " + status);
                    }
                });
    }


</script>

<style type="text/css">
    div#map_container {
        width: 40%;
        height: 350px;
    }
    div#agent_datails {
        width: 40%;
        height: 350px;
    }
</style>

</body>

</html>