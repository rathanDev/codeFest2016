<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<div id="delivery-area-row-${deliveryAreaId}" class="row">
  <div class="col-md-3">
    <div class="form-group">
      <div>
        <form:input path="deliveryAreasBean.deliveryAreas[${deliveryAreaId}].areaName"
                    cssClass="form-control" />
      </div>
    </div>
  </div>

  <div class="col-md-3">
    <div class="form-group">
      <div>
        <form:input path="deliveryAreasBean.deliveryAreas[${deliveryAreaId}].minOrderAmount"
                    value="0.00"
                    data-currency="true"
                    cssClass="form-control" />
      </div>
    </div>
  </div>

  <div class="col-md-3">
    <div class="form-group">
      <div>
        <form:input path="deliveryAreasBean.deliveryAreas[${deliveryAreaId}].deliveryCharge"
                    value="0.00"
                    data-currency="true"
                    cssClass="form-control" />
      </div>
    </div>
  </div>
  
  <div class="col-md-3">
    <div class="row">
      <div class="col-md-9">
        <div class="form-group">
          <div>
            <form:input path="deliveryAreasBean.deliveryAreas[${deliveryAreaId}].maxDeliveryTime"
                        value="30"
                        data-number="true"
                        cssClass="form-control" />
          </div>
        </div>
      </div>
      <div class="col-md-1 delivery-area-remove">
        <a href="#!" onclick="removeDeliveryArea('${deliveryAreaId}')">
          <i class="fa fa-times-circle fa-lg"></i>
        </a>
      </div>
      
    </div>
    
  </div>

</div>