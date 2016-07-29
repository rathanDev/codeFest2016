<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<fmt:setBundle basename="apptizer-ui" var="urls"/>
<fmt:setLocale value="en"/>

<div class="footer footer-area hide">
    <div class="container">
        <div class="row">
            <div id="footer_sm_links" class="col-md-6">
                <%--<a href="<fmt:message key="hms.social.facebook" bundle="${urls}"/>" class="ft-social-btn ft-facebook"></a>--%>
                <%--<a href="<fmt:message key="hms.social.twitter" bundle="${urls}"/>" class="ft-social-btn ft-twitter"></a>--%>
                <%--<a href="<fmt:message key="hms.social.google" bundle="${urls}"/>" class="ft-social-btn ft-google"></a>--%>
                <%--<a href="<fmt:message key="hms.social.linkedin" bundle="${urls}"/>" class="ft-social-btn ft-linkedin"></a>--%>

                <div>
                    Copyright &copy;
                    <script type="text/javascript">document.write(new Date().getFullYear())</script>
                    HexaFox. All Rights Reserved. <br/>
                    <a href="#">Privacy Policy</a> | <a href="#">About Us</a> | <a href="#">Contact Us</a>
                </div>
            </div>

            <div class="col-md-6">
                <div class="footer-company-logo">
                    <%--<a href="http://www.hsenidmobile.com"><img src="img/hms_logo.png"/></a>--%>
                </div>
            </div>
        </div>
    </div>
</div>