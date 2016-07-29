<html>
<head>
    <title>33</title>
</head>
</html>

<%--<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>--%>
<%--<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>--%>
<%--<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>--%>
<%--<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>--%>
<%--<%@ taglib prefix="jstl" uri="http://java.sun.com/jsp/jstl/core" %>--%>

<%--&lt;%&ndash;<form:form modelAttribute="paymentSettingsBean" action="payment-settings-configure.htm?bizId=${business.businessId}" method="post">&ndash;%&gt;--%>
<%--<form:form modelAttribute="paymentSettingsBean" method="post">--%>
<%--<div class="row">--%>
    <%--<div class="col-md-12">--%>
        <%--<div class="section-card">--%>
            <%--<div class="row">--%>
                <%--<div class="col-xs-7">--%>
                    <%--<h3 class="title">Payment Methods</h3>--%>
                <%--</div>--%>
                <%--<div class="col-xs-5">--%>
                    <%--<div class="text-right">--%>
                        <%--<div class="processing-button">--%>
                            <%--<button name="submit"--%>
                                    <%--data-process-msg-target="#payment-settings-processing-message"--%>
                                    <%--class="btn btn-4 btn-filled-md narrow primary pull-right">Save--%>
                                <%--Changes</button>--%>
                        <%--</div>--%>
                        <%--<div id="payment-settings-processing-message" class="processing-message hide">--%>
                            <%--<i class="fa fa-spin fa-spinner"></i> Processing...--%>
                        <%--</div>--%>
                    <%--</div>--%>
                <%--</div>--%>
            <%--</div>--%>
            <%--<br/>--%>

            <%--<div class="row">--%>

                <%--<div class="col-xs-9">--%>
                    <%--<h4 class="title">Pay on Collect</h4>--%>
                <%--</div>--%>
                <%----%>
                <%--<div class="col-xs-3">--%>
                    <%--<div class="toggle-with-checkbox">--%>
                        <%--<div class="toggle ${paymentSettingsBean.isCashOnCollectEnabled ? 'on': 'off'} toggle-wrapper pull-right"--%>
                             <%--data-toggle="toggle"--%>
                             <%--data-target="#pay-on-collect-checkbox">--%>
                            <%--<div class="toggle-button">--%>
                                <%--<div class="toggle-button-text">--%>
                                    <%--<span class="on">ON</span>--%>
                                    <%--<span class="off">OFF</span>--%>
                                <%--</div>--%>
                                <%--<i class="fa fa-circle fa-2x"></i>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                        <%--<form:checkbox id="pay-on-collect-checkbox" path="isCashOnCollectEnabled"--%>
                                       <%--cssClass="toggle-checkbox pull-right"/>--%>
                    <%--</div>--%>
                <%--</div>--%>
            <%--</div>--%>
            <%----%>
            <%--<div class="row">--%>
                <%--<div class="col-xs-9">--%>
                    <%--<p class="content grey">Do you want to allow your customers who--%>
                        <%--order ahead via the app, to pay for their order when they--%>
                        <%--pick it up from store?</p>--%>
                <%--</div>--%>
            <%--</div>--%>

            <%--<hr/>--%>

            <%--<div class="row">--%>

                <%--<div class="col-xs-9">--%>
                    <%--<h4 class="title">Pay with--%>
                        <%--<img src="img/app-settings/paypal_logo.png" class="paypal-logo"/>--%>
                    <%--</h4>                    --%>
                <%--</div>--%>

                <%--<jstl:choose>--%>
                    <%--<jstl:when test="${business.businessDomain eq 'neto'}">--%>
                        <%--<jstl:set var="payPalToggleReadOnly" value="toggle"/>--%>
                    <%--</jstl:when>--%>
                    <%--<jstl:otherwise>--%>
                        <%--<jstl:set var="payPalToggleReadOnly" value="toggle-disabled"/>--%>
                    <%--</jstl:otherwise>--%>
                <%--</jstl:choose>--%>

                <%--<div class="col-xs-3">--%>
                    <%--<div class="toggle-with-checkbox">--%>
                        <%--<div class="toggle ${paymentSettingsBean.isPayPalEnabled ? 'on': 'off'} toggle-wrapper pull-right ${payPalToggleReadOnly}"--%>
                             <%--data-toggle="${payPalToggleReadOnly}"--%>
                             <%--data-toggle-collapse="#paypal-settings"--%>
                             <%--data-target="#pay-pal-checkbox">--%>
                            <%--<div class="toggle-button">--%>
                                <%--<div class="toggle-button-text">--%>
                                    <%--<span class="on">ON</span>--%>
                                    <%--<span class="off">OFF</span>--%>
                                <%--</div>--%>
                                <%--<i class="fa fa-circle fa-2x"></i>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                    <%--</div>--%>
                    <%--<form:checkbox id="pay-pal-checkbox" path="isPayPalEnabled"--%>
                                   <%--cssClass="toggle-checkbox pull-right"/>--%>
                <%--</div>--%>

            <%--</div>--%>
            <%----%>
            <%--<div class="row">--%>
                <%--<div class="col-xs-9">--%>
                    <%--<p class="content grey">Do you want to allow your customers who--%>
                        <%--order via the app to pay for it using their PayPal--%>
                        <%--Account?</p>--%>
                <%--</div>--%>
            <%--</div>--%>

            <%--<div id="paypal-settings" class="row ${paymentSettingsBean.isPayPalEnabled ? 'collapse in': 'collapse'}">--%>
                <%--<div class="col-md-6">--%>
                    <%--<div class="form-group">--%>
                        <%--<label class="input-field-caption">PayPal REST API Client ID</label>--%>

                        <%--<div>--%>
                            <%--<form:input path="paypalRestApiClientId" type="text"--%>
                                        <%--cssClass="form-control" ></form:input>--%>
                        <%--</div>--%>
                    <%--</div>--%>
                <%--</div>--%>

                <%--<div class="col-md-6">--%>
                    <%--<div class="form-group">--%>
                        <%--<label class="input-field-caption">PayPal REST API Secret</label>--%>

                        <%--<div>--%>
                            <%--<form:input path="paypalRestApiSecret" type="text"--%>
                                        <%--cssClass="form-control" ></form:input>--%>
                        <%--</div>--%>
                    <%--</div>--%>

                <%--</div>--%>

            <%--</div>--%>

            <%--<div class="row">--%>
                <%--<div class="col-md-12">--%>
                    <%--&lt;%&ndash;<a href="#">Learn More on How to Get PayPal--%>
                        <%--Configurations</a>&ndash;%&gt;--%>
                    <%--<a href="mailto:support@apptizer.io?Subject=Request to Activate PayPal Payments&amp;Body=I would like to activate PayPal Payments in my mobile application.%0A%0ABusiness Name: ${business.name}%0ABusiness ID: ${business.businessId} %0A%0AThank you."--%>
                       <%--target="_blank">--%>
                        <%--Contact <b>support@apptizer.io</b> to Activate PayPal Payments--%>
                    <%--</a>--%>
                <%--</div>--%>
            <%--</div>--%>
        <%--</div>--%>
    <%--</div>--%>
<%--</div>--%>
<%--</form:form>--%>
    