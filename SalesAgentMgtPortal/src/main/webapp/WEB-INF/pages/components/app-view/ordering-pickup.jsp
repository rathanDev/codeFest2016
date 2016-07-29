<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="jstl" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="row pickup-settings">
  <div class="col-md-12">
    <h4 class="title">Pick Up</h4>
  </div>
  <div class="col-sm-4 contained-img">
    <img src="img/app-settings/pickup.png"/>
  </div>
  <div class="col-sm-8">
    <div class="row">
      <div class="col-sm-8">
        <p class="content grey">Your Business currently
          <jstl:choose>
            <jstl:when test="${business.appConfig.appFeatures.pickUpSupported}">
              <b><i>allows</i></b>
            </jstl:when>
            <jstl:otherwise>
              <b><i>does not allow</i></b>
            </jstl:otherwise>
          </jstl:choose>
          customers to come to your store and pick up their order</p>
      </div>
      <div class="col-sm-4">
        <div>
          <div class="processing-button">
            <jstl:choose>
              <jstl:when test="${business.appConfig.appFeatures.pickUpSupported}">
                <a href="pickup-configure.htm?bizId=${business.businessId}&support=false"
                   class="btn btn-4 btn-filled-md narrow warn btn-without-padding"
                   data-process-msg-target="#pickup-settings-processing-message">
                  <i class="fa fa-trash"></i> Disable Pick-Up
                </a>
              </jstl:when>
              <jstl:otherwise>
                <a href="pickup-configure.htm?bizId=${business.businessId}&support=true" 
                   class="btn btn-4 btn-filled-md narrow primary btn-without-padding"
                   data-process-msg-target="#pickup-settings-processing-message">
                  <i class="fa fa-check"></i> Enable Pick-Up
                </a>
              </jstl:otherwise>
            </jstl:choose>
          </div>
          <div id="pickup-settings-processing-message" class="processing-message hide">
            <i class="fa fa-spin fa-spinner"></i> Processing...
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
