<%@ page session="false" %>
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="jstl" uri="http://java.sun.com/jsp/jstl/core" %>

<fmt:setBundle basename="apptizer-ui" var="urls"/>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>10sldm</title>

    <script src="js/jquery/jquery.min.js"></script>

    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon"/>

    <link href="css/bootstrap/bootstrap.css" rel="stylesheet">

    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet"
          integrity="sha384-T8Gy5hrqNKT+hzMclPo118YTQO6cYprQmhrYwIiQ/3axmI1hQomh7Ud2hPOy8SP1" crossorigin="anonymous">

    <link href='https://fonts.googleapis.com/css?family=Lato:400,100,300,700' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800,300' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Raleway:300,400,600,700' rel='stylesheet' type='text/css'>

    <link href="css/custom/apptizer-0.3.12.css" rel="stylesheet">
    <link href="css/custom/apptizer-app.css" rel="stylesheet">
    <link href="css/custom/apptizer-profile-0.3.10.css" rel="stylesheet">

    <link href="css/animate/animate-v3.css" rel="stylesheet">
    <link href="css/custom/notify-alerts.css" rel="stylesheet">

    <link href="css/custom/gmenu-0.3.0.css" rel="stylesheet">
    <script src="js/tympanus/modernizr.custom-notify.js"></script>

    <script src="js/ie-require/html5shiv.min.js"></script>
    <script src="js/ie-require/respond.min.js"></script>
</head>

<body class="grey-bg">

<div class="gmenu-container">

    <header>
        <jsp:include page="includes/navbar.jsp"/>

        <div class="page-title-area">
            <div class="container">
                <div class="row">
                    <div class="col-sm-5">
                        <h2 class="page-title">Sales Leads Distribution
                        </h2>

                        <p class="page-subtitle">
                            Total Sales Leads
                            <span id="total-purchases-count-span" class="badge">2</span>
                        </p>
                    </div>

                    <div class="col-sm-7 page-actions-section">

                        <div class="page-actions">

                            <div class="page-action">
                                <a href="href" data-tooltip="tooltip" data-placement="bottom"
                                   title="View distribution of agents and sales partners">
                                    <i class="fa fa-binoculars fa-2x"></i>
                                    <h5>Full view</h5>
                                </a>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>

        <div class="page-content-area-with-padding settings-page">
            <div class="container">

                <div class="row">

                    <div class="col-md-6">
                        <div class="section-card">
                            <div id="map_container"></div>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="section-card">
                            <div class="row">
                                <div class="col-md-6">
                                    <h3 class="title">Sales Lead Details</h3>
                                </div>
                            </div>
                            <div class="row">

                                <div class="col-md-12">

                                    <table class="table table-hover">

                                        <tbody>
                                        <tr>
                                            <th class="col-md-4">Shop Name</th>
                                            <td id="name">Terun</td>
                                        </tr>
                                        <tr>
                                            <th class="col-md-4">Shop Address</th>
                                            <td id="address">448, South California Ave, Palo Alto, CA 94301</td>
                                        </tr>
                                        <tr>
                                            <th class="col-md-4">New</th>
                                            <td id="status-div">3</td>
                                        </tr>
                                        <tr>
                                            <th class="col-md-4">Confidence Level</th>
                                            <td id="confidence-level">3</td>
                                        </tr>
                                        <tr>
                                            <th class="col-md-4">Feedback</th>
                                            <td id="feedback-div">Need subcategories.</td>
                                            <td class="col-md-4 text-right">
                                                <a href="#" rel="tooltip"
                                                   class="btn btn-4 btn-filled-md primary narrow" data-toggle="modal"
                                                   data-target="#view-agent-modal">
                                                    <i class="fa fa-play" aria-hidden="true"></i> &nbsp; Play Recording
                                                </a>
                                            </td>
                                            <%--<td class="text-right">&nbsp; &nbsp;<i class="fa fa-play" aria-hidden="true">&nbsp; &nbsp; &nbsp;</i></td>--%>
                                        </tr>
                                        <tr>
                                            <th class="col-md-4">Sales Agent</th>
                                            <td class="col-md-4" id="sales-agent">Peters Smith</td>
                                            <td class="col-md-4 text-right">
                                                <a href="#" rel="tooltip"
                                                   class="btn btn-4 btn-filled-md primary narrow" data-toggle="modal"
                                                   data-target="#view-agent-modal">
                                                    View Agent
                                                </a>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>

                                </div>

                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <h3 class="title">Required Services</h3>
                                </div>
                            </div>
                            <div class="row">

                                <div class="col-md-12">

                                    <table class="table table-hover">

                                        <tbody>
                                        <tr>
                                            <td id="photographer">Photographer</td>
                                            <td class="col-md-4 text-right">
                                                <a href="#" rel="tooltip"
                                                   class="btn btn-4 btn-filled-md primary narrow" data-toggle="modal"
                                                   data-target="#connect-partner-modal">
                                                    Connect Partner
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td id="tag-designer">Tag Designer</td>
                                            <td class="col-md-4 text-right">
                                                <a href="#" rel="tooltip"
                                                   class="btn btn-4 btn-filled-md primary narrow" data-toggle="modal"
                                                   data-target="#connect-partner-modal">
                                                    Connect Partner
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td id="menu-specialist">Menu Specialist</td>
                                            <td class="col-md-4 text-right">
                                                <a href="#" rel="tooltip"
                                                   class="btn btn-4 btn-filled-md primary narrow" data-toggle="modal"
                                                   data-target="#connect-partner-modal">
                                                    Connect Partner
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td id="social-media-specialist">Social Media Specialist</td>
                                            <td class="col-md-4 text-right">
                                                <a href="#" rel="tooltip"
                                                   class="btn btn-4 btn-filled-md primary narrow" data-toggle="modal"
                                                   data-target="#connect-partner-modal">
                                                    Connect Partner
                                                </a>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>

                                </div>

                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    </header>
</div>

<jsp:include page="modals/connect-partner-modal.jsp"/>

<script src="js/bootstrap/bootstrap.min.js"></script>
<script src="js/tympanus/classie.js"></script>
<script src="js/tympanus/gnmenu.js"></script>
<script src="js/tympanus/notificationFx.js"></script>
<script src="js/custom/apptizer-common-0.3.11.js"></script>
<script src="js/custom/apptizer-0.3.10.js"></script>
<script src="js/custom/apptizer-app-view-0.3.8.js"></script>

<script async
        defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDbwFmt7GdOHVJi-IRdmA5llx9rQiBXn7A&callback=initMap"
        type="text/javascript">
</script>


<script type="text/javascript">

    var geocoder;
    var map;
    var salesLeads = {};

    function initMap() {
        console.log("inside initMap")
        loadMap();
    }

    function loadMap() {
        console.log("inside loadMap")

        geocoder = new google.maps.Geocoder();

        var latlng = new google.maps.LatLng(4.3695030, 101.1224120);
        var chicagoLattitudeNLongitude = {lat: 41.85, lng: -87.65};

        var myOptions = {
            zoom: 17,
            center: chicagoLattitudeNLongitude,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("map_container"), myOptions);

        getSalesLeadsAndCreateMarks();
    }

    function getSalesLeadsAndCreateMarks() {
        console.log("inside getSalesLeadsAndCreateMarks")

        doAjax();
    }

    function doAjax() {
        $.getJSON('/SalesAgentMgtPortal/get-sales-leads', function(_salesLeads) {
            console.log("inside doAjax")
            console.log(_salesLeads)

            _salesLeads.forEach(forEachFunction)
        })
    }

    function forEachFunction(salesLead, index) {
        console.log(index)
        console.log(salesLead)


        salesLeads[ salesLead['name'] ] = salesLead;

        codeAddress(salesLead['address'], salesLead['name'])
    }

    function codeAddress(address, salesLeadName) {
        console.log("inside success function - codeAddress -")

        geocoder.geocode(
                {'address': address},
                function (results, status) {
                    console.log("inside codeAddress ", salesLeadName, " ", address)

                    if (status == google.maps.GeocoderStatus.OK) {

                        map.setCenter(results[0].geometry.location);

                        var marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location,
                            title: salesLeadName
                        });

                        (function (marker) {
                            google.maps.event.addListener(marker, 'click', function () {

                                $('#agent_datails').text(marker.getTitle());
                                console.log(marker.getTitle())
                                console.log(marker.getPosition())

                                var salesLeadName = marker.getTitle()
                                var salesLead = salesLeads[salesLeadName];
                                $('#name').text(salesLeadName)
                                $('#address').text(salesLead['address'])
                                $('#status-div').text(salesLead['status'])
                                $('#confidence-level').text(salesLead['confidenceLevel'])
                                $('#feedback-div').text(salesLead['feedback'])
                                $('#sales-agent').text( salesLead['visitingAgent']['name'] )

                                console.log(salesLead)
                                console.log(salesLead['visitingAgent'])
                                console.log(salesLead['visitingAgent']['name'])
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
        width: 100%;
        height: 350px;
    }

    .btn-filled-md.narrow {
        padding: 0px 4px;
        font-size: 10px;
    }
</style>

</body>
</html>