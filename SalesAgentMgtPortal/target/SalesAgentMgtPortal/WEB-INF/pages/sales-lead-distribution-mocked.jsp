<%@ page session="false" %>
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="jstl" uri="http://java.sun.com/jsp/jstl/core" %>
<%--<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>--%>

<fmt:setBundle basename="apptizer-ui" var="urls"/>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="">
  <meta name="author" content="">

  <title>1Apptizer</title>

  <script src="js/jquery/jquery.min.js"></script>

  <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon"/>

  <!-- Bootstrap core CSS -->
  <link href="css/bootstrap/bootstrap.css" rel="stylesheet">
  <!--Used Fonts-->
  <link href="fonts/font-awesome-4.2.0/css/font-awesome.min.css" rel="stylesheet">
  <%--<link href="fonts/lato/lato.css" rel="stylesheet">
  <link href='fonts/opensans/opensans.css' rel='stylesheet' type='text/css'>
  <link href='fonts/raleway/raleway.css' rel='stylesheet' type='text/css'>--%>
  <link href='https://fonts.googleapis.com/css?family=Lato:400,100,300,700' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800,300' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Raleway:300,400,600,700' rel='stylesheet' type='text/css'>

  <!--Custom Styles-->
  <link href="css/custom/apptizer-0.3.12.css" rel="stylesheet">
  <link href="css/custom/apptizer-app.css" rel="stylesheet">
  <link href="css/custom/apptizer-profile-0.3.10.css" rel="stylesheet">

  <!--Other Styles-->
  <link href="css/animate/animate-v3.css" rel="stylesheet">
  <link href="css/custom/notify-alerts.css" rel="stylesheet">

  <%--Resources for GMenu--%>
  <link href="css/custom/gmenu-0.3.0.css" rel="stylesheet">
  <script src="js/tympanus/modernizr.custom-notify.js"></script>

  <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!--[if lt IE 9]>
  <script src="js/ie-require/html5shiv.min.js"></script>
  <script src="js/ie-require/respond.min.js"></script>
  <![endif]-->
</head>

<body class="grey-bg">

<div class="gmenu-container">

  <header>
    <%--<jsp:include page="includes/navbar.jsp"/>--%>

    <div class="page-title-area">
      <div class="container">
        <div class="row">
          <div class="col-sm-5">
            <h2 class="page-title">${business.name}
              <%--<span class="app-status ${business.appStatus}"><c:choose>--%>
              <%--<c:when test="${business.appStatus eq 'pending-approve'}">--%>
              <%--<fmt:message key="hms.tap.apptizer.product.viewapp.app.pending.approve.text"/>--%>
              <%--</c:when>--%>
              <%--<c:when test="${business.appStatus eq 'active-production'}">--%>
              <%--<fmt:message key="hms.tap.apptizer.product.viewapp.app.active.production.text"/>--%>
              <%--</c:when>--%>
              <%--</c:choose></span>--%>
            </h2>
            <p class="page-subtitle">
              <%--${fn:toLowerCase(business.type)} <fmt:message key="hms.tap.apptizer.product.viewapp.app.text"/> &nbsp; <i class="fa fa-caret-right"></i> &nbsp;--%>
              <%--<fmt:message key="hms.tap.apptizer.product.viewapp.createdon.text"/> &nbsp;${business.createdDateTime}--%>
            </p>
          </div>

          <div class="col-sm-7 page-actions-section">
            <div class="page-actions">
              <c:if test="${business.status eq 'ACTIVE'}">
                <%--Action Link for Publish App--%>
                <%--<div class="page-action">
                    <a href="<fmt:message key="hms.tap.app.publish.url" bundle="${urls}"/>${business.businessId}" data-tooltip="tooltip" data-placement="bottom" title="<fmt:message key="hms.tap.apptizer.product.viewapp.publish.tooltip.text"/>">
                        <i class="fa fa-globe fa-2x"></i>
                        <h5><fmt:message key="hms.tap.apptizer.product.viewapp.publish.text"/></h5>
                    </a>
                </div>--%>

                <%--Action Link for Download App--%>
                <div class="page-action">
                  <c:url var="androidAPKUrl" value="/download-app.htm?aid=${business.businessId}">
                  </c:url>
                  <a href="${androidAPKUrl}" data-tooltip="tooltip" data-placement="bottom" title="<fmt:message key="hms.tap.apptizer.product.viewapp.download.tooltip.text"/>">
                    <i class="fa fa-download fa-2x"></i>
                    <%--<h5><fmt:message key="hms.tap.apptizer.product.viewapp.download.text"/></h5>--%>
                  </a>
                </div>
              </c:if>

              <%--Action Link for Pricing Plan--%>
              <sec:authorize access="hasRole('ROLE_APT_PRICING_MGMT_ALLOWED')">
                <div class="page-action">
                  <c:url var="pricingPlanUrl" value="/pricing.htm">
                    <c:param name="bizId" value="${business.businessId}"/>
                  </c:url>
                  <a href="${pricingPlanUrl}" data-tooltip="tooltip"
                     data-placement="bottom"
                     <%--title="<fmt:message key="hms.tap.apptizer.product.viewapp.pricing.tooltip.text"/>">--%>
                    <i class="fa fa-credit-card fa-2x"></i>
                    <%--<h5><fmt:message key="hms.tap.apptizer.product.viewapp.pricing.text"/></h5>--%>
                  </a>
                </div>
              </sec:authorize>

              <%--Action Link for Sales Orders--%>
              <%--<sec:authorize access="hasRole('ROLE_APT_ORDER_MGMT_ALLOWED')">--%>
                <%--<div class="page-action">--%>
                  <%--&lt;%&ndash;<c:url var="purchaseItemsUrl" value="/purchase-orders.htm">&ndash;%&gt;--%>
                    <%--&lt;%&ndash;<c:param name="bizId" value="${business.businessId}"/>&ndash;%&gt;--%>
                    <%--&lt;%&ndash;<c:param name="purchaseStatus" value="pending"/>&ndash;%&gt;--%>
                  <%--&lt;%&ndash;</c:url>&ndash;%&gt;--%>
                  <%--<a href="${purchaseItemsUrl}" data-tooltip="tooltip" data-placement="bottom"--%>
                     <%--title="<fmt:message key='hms.tap.apptizer.product.viewapp.purchases.tooltip.text'/>"--%>
                     <%--data-dynamic-url="true">--%>
                    <%--<i class="fa fa-ticket fa-2x"></i>--%>
                    <%--<h5><fmt:message key="hms.tap.apptizer.product.viewapp.purchases.text"/></h5>--%>
                  <%--</a>--%>
                <%--</div>--%>
              <%--</sec:authorize>--%>

              <%--Action Link for Product Management--%>
              <%--<sec:authorize access="hasRole('ROLE_APT_PRODUCT_MGMT_ALLOWED')">--%>
                <%--<div class="page-action">--%>
                  <%--<c:url var="manageProductsUrl" value="/manage-products.htm">--%>
                    <%--<c:param name="bizId" value="${business.businessId}"/>--%>
                  <%--</c:url>--%>
                  <%--<a href="${manageProductsUrl}" data-tooltip="tooltip"--%>
                     <%--data-placement="bottom"--%>
                     <%--title="<fmt:message key="hms.tap.apptizer.product.viewapp.products.tooltip.text"/>">--%>
                    <%--<i class="fa fa-cubes fa-2x"></i>--%>
                    <%--<h5><fmt:message key="hms.tap.apptizer.product.viewapp.products.text"/></h5>--%>
                  <%--</a>--%>
                <%--</div>--%>
              <%--</sec:authorize>--%>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-content-area-with-padding settings-page">
      <div class="container">

        <div class="row">

          <jstl:choose>
            <jstl:when test="${settingsView eq 'pickup'}">
              <jstl:set var="activeSetting" value="pickup"/>
            </jstl:when>
            <jstl:when test="${settingsView eq 'delivery'}">
              <jstl:set var="activeSetting" value="delivery"/>
            </jstl:when>
            <jstl:when test="${settingsView eq 'store'}">
              <jstl:set var="activeSetting" value="store"/>
            </jstl:when>
            <jstl:when test="${settingsView eq 'theme'}">
              <jstl:set var="activeSetting" value="app"/>
            </jstl:when>
            <jstl:when test="${settingsView eq 'policies'}">
              <jstl:set var="activeSetting" value="policies"/>
            </jstl:when>
            <jstl:when test="${settingsView eq 'publishing'}">
              <jstl:set var="activeSetting" value="publishing"/>
            </jstl:when>
            <jstl:otherwise>
              <jstl:set var="activeSetting" value="payments"/>
            </jstl:otherwise>
          </jstl:choose>

          <div class="col-md-3">
            <div class="row">
              <div class="col-md-12">
                <div class="section-card left-side-nav">
                  <ul class="nav nav-tabs" role="tablist">
                    <li class="${activeSetting eq 'payments' ? 'active': ''}">
                      <a href="#payment-settings" aria-controls="profile" role="tab" data-toggle="tab"><i
                              class="fa fa-money fa-lg"></i> Payments</a>
                    </li>
                    <li class="${(activeSetting eq 'pickup') || (activeSetting eq 'delivery') ? 'active': ''}">
                      <a href="#online-ordering-settings" aria-controls="home" role="tab" data-toggle="tab">
                        <i class="fa fa-shopping-cart fa-lg"></i> Online Ordering
                      </a>
                    </li>
                    <li class="${activeSetting eq 'publishing' ? 'active': ''}">   <%--todo- activeSetting aria-controls --%>
                      <a href="#app-publishing" aria-controls="home" role="tab" data-toggle="tab">
                        <i class="fa fa-globe fa-lg"></i> App Publishing
                      </a>
                    </li>
                    <%--<li class="${activeSetting eq 'store' ? 'active': ''}">
                        <a href="#store-settings" aria-controls="profile" role="tab"
                           data-toggle="tab"><i class="fa fa-location-arrow fa-lg"></i> Store
                            Settings</a>
                    </li>
                    <li class="${activeSetting eq 'theme' ? 'active': ''}">
                        <a href="#app-settings" aria-controls="profile" role="tab"
                           data-toggle="tab"><i class="fa fa-magic fa-lg"></i> App Theme</a>
                    </li>
                    <li class="${activeSetting eq 'policies' ? 'active': ''}">
                        <a href="#policy-settings" aria-controls="profile" role="tab"
                           data-toggle="tab"><i class="fa fa-file-text-o fa-lg"></i>
                            Policies</a>
                    </li>--%>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-9">
            <div class="tab-content">
              <div  id="payment-settings" class="tab-pane payments-tab">
                <jsp:include page="components/app-view/payment-settings.jsp"/>
              </div>
              <%--<div id="online-ordering-settings" class="tab-pane ${(activeSetting eq 'pickup') || (activeSetting eq 'delivery') ? 'active': ''}">--%>
              <div id="online-ordering-settings" class="tab-pane}">
                <jsp:include page="components/app-view/online-ordering.jsp"/>
              </div>
              <%--<div id="app-publishing" class="tab-pane ${activeSetting eq 'publishing' ? 'active': ''}"> &lt;%&ndash;todo- class  &ndash;%&gt;--%>
              <div id="app-publishing" class="tab-pane"> <%--todo- class  --%>
                <jsp:include page="components/app-view/app-publishing.jsp"/>
              </div>
              <%--<div id="store-settings" class="tab-pane ${activeSetting eq 'store' ? 'active': ''}">--%>
              <div id="store-settings" class="tab-pane}">
                <jsp:include page="components/app-view/store-settings.jsp"/>
              </div>
              <%--<div id="app-settings" class="tab-pane ${activeSetting eq 'theme' ? 'active': ''}">--%>
              <div id="app-settings" class="tab-pane">
                <jsp:include page="components/app-view/app-settings.jsp"/>
              </div>
              <%--<div id="policy-settings" class="tab-pane ${activeSetting eq 'policies' ? 'active': ''}">--%>
              <div id="policy-settings" class="tab-pane">
                <jsp:include page="components/app-view/policy-settings.jsp"/>
              </div>
            </div>
          </div>


        </div>
      </div>

    </div>
  </header>
</div>


<script src="js/bootstrap/bootstrap.min.js"></script>
<script src="js/tympanus/classie.js"></script>
<%--<sec:authorize access="hasRole('ROLE_APT_MULTI_APPS_ALLOWED')">--%>
  <script src="js/tympanus/gnmenu.js"></script>
<%--</sec:authorize>--%>
<script src="js/tympanus/notificationFx.js"></script>
<script src="js/custom/apptizer-common-0.3.11.js"></script>
<script src="js/custom/apptizer-0.3.10.js"></script>
<script src="js/custom/apptizer-app-view-0.3.8.js"></script>

<script>
  $("#addDeliveryAreaBtn").click(function() {
    var deliveryAreaId = Number($(this).attr("data-autopopulate-list-size"));
    if(deliveryAreaId == 0) {
      deliveryAreaId++;
    }

    $(this).attr("data-autopopulate-list-size", (deliveryAreaId+1));
    $.get("<%=request.getContextPath()%>/add-delivery-area-row.htm", { fieldId: deliveryAreaId},
            function(data){
              $("#delivery-area-template-row").before(data);
            });
  });
</script>

</body>
</html>