<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"  %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="jstl" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<div class="row delivery-settings">
  <div class="col-md-12">
    <h4 class="title">Delivery</h4>
  </div>

  <jstl:choose>
    <jstl:when test="${business.appConfig.appFeatures.deliverySupported}">
        <div class="col-sm-4 contained-img">
            <img src="img/app-settings/delivery.png"/>
        </div>

        <div class="col-sm-8">
            <div class="row">
                <div class="col-sm-8">
                    <p class="content grey">Your Business currently <b><i>allows</i></b>
                        delivery of orders to customers</p>
                </div>
                <div class="col-sm-4">
                    <div>
                        <div class="processing-button">
                            <a href="delivery-configure.htm?bizId=${business.businessId}&support=false"
                               class="btn btn-4 btn-filled-md narrow warn btn-without-padding"
                               data-process-msg-target="#delivery-settings-enabling-message">
                                <i class="fa fa-trash"></i> Disable Delivery
                            </a>
                        </div>
                        <div id="delivery-settings-enabling-message" class="processing-message hide">
                            <i class="fa fa-spin fa-spinner"></i> Processing...
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <%--<div class="col-md-12">
            <div class="row">
                <div class="col-sm-8">
                    <p class="content grey">Your Business currently <b><i>allows</i></b>
                        delivery of orders to customers</p>
                </div>

                <div class="col-sm-4">
                    <div>
                        <div class="processing-button">
                            <a href="delivery-configure.htm?bizId=${business.businessId}&support=false"
                               class="btn btn-4 btn-filled-md narrow warn btn-without-padding"
                               data-process-msg-target="#delivery-settings-enabling-message">
                                <i class="fa fa-trash"></i> Disable Delivery
                            </a>
                        </div>
                        <div id="delivery-settings-enabling-message" class="processing-message hide">
                            <i class="fa fa-spin fa-spinner"></i> Processing...
                        </div>
                    </div>
                </div>
            </div>
        </div>--%>
        
        <%--<div class="col-xs-12">
            <hr/>
        </div>
        
        <div class="col-md-12">
            
            <form:form commandName="deliveryAreasBean" action="add-delivery-area.htm?bizId=${business.businessId}" method="post">
            <div class="row">
                <div class="col-md-8">
                    <h4 class="title">Delivery Areas</h4>
                    <p class="content grey">
                        Start Adding Delivery Supported Areas!
                    </p>
                </div>
                <div class="col-md-4">
                    <div class="text-right">
                        <div class="processing-button">
                            <button name="submit"
                                    data-process-msg-target="#delivery-areas-processing-message"
                                    class="btn btn-4 btn-filled-md narrow primary pull-right">
                                Save Changes
                            </button>
                        </div>
                        <div id="delivery-areas-processing-message" class="processing-message hide">
                            <i class="fa fa-spin fa-spinner"></i> Processing...
                        </div>
                    </div>
                </div>
            </div>
                
                
            <div class="row">
                <div class="col-md-3">
                    <div class="form-group less-bottom-padding">
                        <label class="input-field-caption">Area Name</label>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group less-bottom-padding">
                        <label class="input-field-caption">Minimum Order (USD)</label>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group less-bottom-padding">
                        <label class="input-field-caption">Delivery Charge (USD)</label>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group less-bottom-padding">
                        <label class="input-field-caption">Max. Delivery Time (Minutes)</label>
                    </div>
                </div>
                
            </div>    

            <c:forEach items="${deliveryAreasBean.deliveryAreas}" var="deliveryArea" varStatus="areaIdx">
                <div id="delivery-area-row-${areaIdx.index}" class="row">
                <div class="col-md-3">
                    <div class="form-group">
                        <div>
                            <spring:bind path="deliveryAreas[${areaIdx.index}].areaName">
                                <form:input path="${status.expression}"
                                            cssClass="form-control"/>
                            </spring:bind>
                        </div>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="form-group">
                        <div>
                            <spring:bind path="deliveryAreas[${areaIdx.index}].minOrderAmount">
                                <form:input path="${status.expression}"
                                            data-currency="true"
                                            cssClass="form-control"/>
                            </spring:bind>
                        </div>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="form-group">
                        <div>
                            <spring:bind path="deliveryAreas[${areaIdx.index}].deliveryCharge">
                                <form:input path="${status.expression}"
                                            data-currency="true"
                                            cssClass="form-control"/>
                            </spring:bind>
                        </div>
                    </div>
                </div>

                <div class="col-md-3">
                        <div class="row">
                            <div class="col-md-9">
                                <div class="form-group">
                                    <div>
                                        <spring:bind path="deliveryAreas[${areaIdx.index}].maxDeliveryTime">
                                            <form:input path="${status.expression}"
                                                        data-number="true"
                                                        cssClass="form-control"/>
                                        </spring:bind>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-1 delivery-area-remove">
                                <a href="#!" onclick="removeDeliveryArea('${areaIdx.index}')">
                                    <i class="fa fa-times-circle fa-lg"></i>
                                </a>
                            </div>
                        </div>
                </div>
            </div>
            </c:forEach>
            
            <div id="delivery-area-template-row"></div>
            <div class="row">
                <div class="col-md-12">
                    <a id="addDeliveryAreaBtn" href="#!" 
                       data-autopopulate-list-size="${fn:length(deliveryAreasBean.deliveryAreas)}">
                       <i class="fa fa-plus"></i> Add Another Area
                    </a>
                </div>
            </div>
            </form:form>
        </div>--%>

    </jstl:when>
    <jstl:otherwise>
        <div class="col-sm-4 contained-img">
          <img src="img/app-settings/delivery.png"/>
        </div>

        <div class="col-sm-8">
          <div class="row">
            <div class="col-sm-8">
              <p class="content grey">Your Business currently <b><i>does not allow</i></b>
                delivery of orders to customers</p>
            </div>
            <div class="col-sm-4">
                <div>
                    <div class="processing-button">
                        <a href="delivery-configure.htm?bizId=${business.businessId}&support=true"
                           class="btn btn-4 btn-filled-md narrow primary btn-without-padding"
                           data-process-msg-target="#delivery-settings-disabling-message">
                            <i class="fa fa-check"></i> Enable Delivery
                        </a>
                    </div>
                    <div id="delivery-settings-disabling-message" class="processing-message hide">
                        <i class="fa fa-spin fa-spinner"></i> Processing...
                    </div>
                </div>

            </div>
          </div>
        </div>
    </jstl:otherwise>
  </jstl:choose>

</div>
