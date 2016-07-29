<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="jstl" uri="http://java.sun.com/jsp/jstl/core" %>

<jstl:choose>
  <jstl:when test="${settingsView eq 'delivery'}">
    <jstl:set var="activeOrderSetting" value="delivery"/>
  </jstl:when>
  <jstl:otherwise>
    <jstl:set var="activeOrderSetting" value="pickup"/>
  </jstl:otherwise>
</jstl:choose>

<div class="row">
  <div class="col-md-12">
    <div class="section-card">
      <div class="row">
        <div class="col-xs-12 col-sm-6">
          <h3 class="title">Online Ordering Methods</h3>
        </div>
        <div class="col-xs-12 col-sm-6 square-tabs">
          <ul class="nav nav-tabs" role="tablist">
            <li class="${activeOrderSetting eq 'pickup' ? 'active': ''}"><a href="#pickup" data-toggle="tab">PICK UP</a></li>
            <li class="${activeOrderSetting eq 'delivery' ? 'active': ''}"><a href="#delivery" data-toggle="tab">DELIVERY</a></li>
          </ul>
        </div>
      </div>
      
      <br/>

      <div class="tab-content">
        <div role="tabpanel" class="tab-pane ${activeOrderSetting eq 'pickup' ? 'active': ''}" id="pickup">
          <jsp:include page="ordering-pickup.jsp"/>
        </div>
        <div role="tabpanel" class="tab-pane  ${activeOrderSetting eq 'delivery' ? 'active': ''}" id="delivery">
          <jsp:include page="ordering-delivery.jsp"/>
        </div>
      </div>

      
    </div>
  </div>
</div>