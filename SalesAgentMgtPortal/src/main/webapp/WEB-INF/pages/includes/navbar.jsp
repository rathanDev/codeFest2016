<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="tags" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="jstl" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%--<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>--%>
<fmt:setBundle basename="apptizer-ui" var="urls"/>
<fmt:setLocale value="en"/>

<ul id="gn-menu" class="gn-menu-main">
    <%--<sec:authorize access="hasRole('ROLE_APT_MULTI_APPS_ALLOWED')">--%>
        <%--<li id="gmenu-trigger" class="gn-trigger">--%>
            <%--<a class="gn-icon gn-icon-menu"><span><fmt:message key="hms.tap.apptizer.product.navbar.menu.text"/></span></a>--%>
            <%--<nav class="gn-menu-wrapper">--%>
                <%--<div class="gn-scroller">--%>
                    <%--<ul class="gn-menu">--%>
                            <%--&lt;%&ndash;<li class="gn-search-item">--%>
                                <%--<input placeholder="Search" type="search" class="gn-search">--%>
                                <%--<a class="gn-icon gn-icon-search"><span>Search</span></a>--%>
                            <%--</li>&ndash;%&gt;--%>
                        <%--<li>--%>
                            <%--<a href="home.htm" class="gn-icon gn-icon-fire"><fmt:message--%>
                                    <%--key="hms.tap.apptizer.product.navbar.createapp.text"/></a>--%>
                        <%--</li>--%>
                        <%--<li>--%>
                            <%--<a href="my-apps.htm" class="gn-icon gn-icon-tags"><fmt:message--%>
                                    <%--key="hms.tap.apptizer.product.navbar.myapps.text"/></a>--%>
                        <%--</li>--%>

                        <%--<li>--%>
                            <%--<a href="my-report.htm" class="gn-icon gn-icon-chart">--%>
                                <%--<fmt:message key="hms.tap.apptizer.product.navbar.myreport.text"/>--%>
                            <%--</a>--%>
                        <%--</li>--%>

                        <%--<li>--%>
                            <%--<span class="copyright">Copyright &copy; Apptizer.<br/> All Rights Reserved. </span>--%>
                        <%--</li>--%>
                    <%--</ul>--%>
                <%--</div>--%>
                <%--<!-- /gn-scroller -->--%>
            <%--</nav>--%>
        <%--</li>--%>
    <%--</sec:authorize>--%>
    <li id="nav-brand-logo"><a href="home.htm">APPTIZER</a></li>

    <jstl:choose>
        <jstl:when test="${userId ne null}">
            <li id="nav-user-profile" class="gn-menu-right dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <img src="img/common/default-profile-icon.png" class="user-profile-pic"/>
                    <span class="user-profile-name">${userId}<span class="caret"></span></span>

                </a>
                <ul class="dropdown-menu" role="menu">
                    <li>
                        <%--<a href="<fmt:message key="hms.tap.base.url" bundle="${urls}"/><fmt:message key="cas.logout.url" bundle="${urls}"/>"><fmt:message--%>
                                <%--key="hms.tap.apptizer.product.navbar.logout.text"/></a></li>--%>
                </ul>
            </li>
            <li id="nav-notification-dropdown" class="dropdown gn-menu-right">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" onclick="markNotificationsAsSeen()">
                        <span id="nav-notifications-empty">
                            <i class="fa fa-bell fa-notification-bell"></i>
                        </span>
                        <span id="nav-notifications-full" class="hidden">
                            <span id="nav-notifications-value" class="badge badge-notification"></span>
                        </span>
                </a>
                <ul id="nav-notifications" class="dropdown-menu notifications" role="menu">
                </ul>
                <ul id="nav-notifications-list-empty" class="dropdown-menu notifications hidden" role="menu">
                    <li class="notify-msg empty">
                        <a href="#">
                            <%--<fmt:message key="hms.tap.apptizer.product.navbar.nonotifications.text"/>--%>
                        </a>
                    </li>
                </ul>
            </li>
            <sec:authorize access="hasRole('ROLE_APT_MULTI_APPS_ALLOWED')">
                <li id="nav-app-create-dropdown" class="dropdown gn-menu-right" data-toggle="tooltip"
                    data-placement="bottom" title="Create Application">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <span><i class="fa fa-plus fa-lg"></i> </span>
                    </a>
                    <ul class="dropdown-menu app-create" role="menu">
                        <li><a href="app-create.htm?industry=restaurant">Create Restaurant App</a></li>
                        <li><a href="app-create.htm?industry=shopping">Create Shopping App</a></li>
                    </ul>
                </li>
            </sec:authorize>
        </jstl:when>
    </jstl:choose>


</ul>
