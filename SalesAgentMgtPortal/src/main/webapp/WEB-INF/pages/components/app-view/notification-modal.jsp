<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<fmt:setBundle basename="feature" var="feature"/>
<fmt:setLocale value="en"/>

<c:set var="localeSupport"><fmt:message key="enable.locale.support" bundle="${feature}"/></c:set>

<c:if test="${localeSupport == true}">
    <c:if test="${param.language != null}">
        <fmt:setBundle basename="/messages/messages_${param.language}" var="messages"/>
        <fmt:setLocale value="${param.language}"/>
    </c:if>

    <c:if test="${param.language == null}">
        <fmt:setBundle basename="/messages/messages_en" var="messages"/>
        <fmt:setLocale value="en"/>
    </c:if>
</c:if>

<c:if test="${localeSupport == false}">
    <fmt:setBundle basename="/messages/messages_en" var="messages"/>
    <fmt:setLocale value="en"/>
</c:if>

<div class="modal fade" id="notification-modal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form:form class="form-horizontal" role="form" method="post" id="pushNotificationForm"
                       commandName="pushNotificationForm"
                       action="pushNotification.json">
                <div class="modal-header success">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"><i class="fa fa-times-circle"></i> </span>
                    </button>
                    <h4 class="modal-title"><i class="fa fa-envelope-o fa-lg"></i> <span><fmt:message key="hms.tap.apptizer.product.notification.modal.title.text" bundle="${messages}"/></span></h4>
                </div>
                <div class="modal-body">

                    <div class="row">
                        <div class="col-md-12">


                            <div class="form-group">
                                <div>
                                    <label class="input-field-caption"><fmt:message key="hms.tap.apptizer.product.notification.modal.message.label.text" bundle="${messages}"/></label>
                                    <textarea id="notification-message" name="message" rows="4"
                                              class="form-control" type="text" value=""></textarea>
                                </div>
                            </div>

                            <input id="notification-app-id" name="appId" type="hidden"
                                   value="${pushNotificationForm.appId}">
                            </input>

                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-12 paddingless-col">
                            <span class="apt-hint">
                                <label class="label label-success"><fmt:message key="hms.tap.apptizer.product.notification.modal.note.label.text" bundle="${messages}"/></label>
                                <span class="apt-hint-text"> &nbsp; <fmt:message key="hms.tap.apptizer.product.notification.modal.note.hint.text" bundle="${messages}"/></span>
                            </span>
                        </div>
                    </div>

                </div>

                <div class="modal-footer">
        <span id="notification-loader-message" class="message hide">
            <fmt:message key="hms.tap.apptizer.product.notification.modal.message.sending.text" bundle="${messages}"/> &nbsp;<i class="fa fa-spinner fa-spin fa-lg"></i>
        </span>
        <span id="notification-footer-buttons">
            <form:button value="Submit" name="submit"
                         class="btn btn-4 btn-filled-md primary pull-right"><fmt:message key="hms.tap.apptizer.product.notification.modal.button.send.text" bundle="${messages}"/></form:button>

            <button type="button" class="btn btn-4 btn-filled-md secondary pull-right" data-dismiss="modal"><fmt:message key="hms.tap.apptizer.product.notification.modal.button.cancel.text" bundle="${messages}"/>
            </button>
        </span>
                </div>
            </form:form>
        </div>
    </div>
</div>