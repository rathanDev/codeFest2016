<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<fmt:setBundle basename="apptizer-ui" var="apptizerui"/>
<fmt:setLocale value="en"/>

<div class="modal fade" id="connect-partner-modal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">

            <div id="import-csv-modal-header" class="modal-header success">
                <button type="button" class="close close-button-edge" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true"><i class="fa fa-times-circle-o"></i> </span>
                </button>
                <h4 class="modal-title"><i class="fa fa-connectdevelop fa-lg"></i>
                        <span>
                            Connect with the partner
                        </span>
                </h4>
            </div>

                <div id="connect-partner-modal-body" class="modal-body">

                    <div class="row">
                        <div class="col-md-4 text-center">
                            <img src="img/common/default-profile-icon.png" class="user-profile-pic">
                        </div>
                        <div class="col-md-8 text-center">
                            <br/>
                            Tom Parker
                        </div>
                    </div>

                    <br/>

                    <div class="row">
                        <div class="col-md-4 text-center">
                            <img src="img/common/default-profile-icon.png" class="user-profile-pic">
                        </div>
                        <div class="col-md-8 text-center">
                            <br/>
                            Ngai Man Yan
                        </div>
                    </div>

                    <br/>

                    <div class="row">
                        <div class="col-md-4 text-center">
                            <img src="img/common/default-profile-icon.png" class="user-profile-pic">
                        </div>
                        <div class="col-md-8 text-center">
                            <br/>
                            Jannah Ruthven
                        </div>
                    </div>

                </div>

                <div id="connect-partner-modal-footer" class="modal-footer">

                    <span id="upload-csv-footer-buttons">
                       <a href="#!" id="csv-preview-button" class="btn btn-4 btn-filled-md primary pull-right"
                          disabled="true">
                           Connect
                       </a>
                        <a href="#!" id="upload-csv-cancel-button"
                           class="btn btn-4 btn-filled-md secondary pull-right" data-dismiss="modal">
                            Cancel
                        </a>
                    </span>

                </div>

        </div>
    </div>
</div>

<style>
    .user-profile-pic {
        width: 80px;
        height: 80px;
    }
</style>