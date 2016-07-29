<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="jstl" uri="http://java.sun.com/jsp/jstl/core" %>

  <div class="row">

    <div class="col-md-12">

      <div class="section-card">

        <div class="row">

          <div class="col-xs-8">
            <h3 class="title">
              <fmt:message key="app.settings.apppublishing.title"/>
            </h3>
          </div>

          <div class="col-xs-4">
            <div>
              <a href="mailto:support@apptizer.io?Subject=Request to Publish App &amp;Body=I would like to publish my app on App Store and Play Store.%0A%0ABusiness Name: ${business.name}%0ABusiness ID: ${business.businessId} %0A%0AThank you."
                 target="_blank" 
                 class="btn btn-4 btn-filled-md narrow primary pull-right">
                <fmt:message key="app.settings.apppublishing.requestbutton.text"/>
              </a>
            </div>
          </div>

        </div>

        <br/>

        <div class="row">
          <div class="col-xs-12">
            <p class="content grey">
              <span class="label label-default">
                <fmt:message key="app.settings.apppublishing.note.text"/>
              </span>
              &nbsp;<fmt:message key="app.settings.apppublishing.note.content"/>
            </p>
          </div>
        </div>

        <br/>

        <div class="row">
          <div class="col-xs-6">
            <h4 class="title">
              <fmt:message key="app.settings.apppublishing.publish.status"/>
            </h4>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <h5 class="title">
              <img src="img/app-publishing/apple-logo.png" class="os-logo"/>    <%--todo - class--%>
              <fmt:message key="app.settings.apppublishing.appstore"/>
            </h5>
          </div>
          <div class="col-md-6">
            <br/>
            <p class="content grey">
              <fmt:message key="app.settings.apppublishing.appstore.status"/>
            </p>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <h5 class="title">
              <img src="img/app-publishing/android-logo.png" class="os-logo"/>
              <fmt:message key="app.settings.apppublishing.googleplay"/>
            </h5>
          </div>
            <div class="col-md-6">
              <br/>
              <p class="content grey">
                <fmt:message key="app.settings.apppublishing.googleplay.status"/>
              </p>
            </div>
        </div>

      </div>
    </div>
  </div>