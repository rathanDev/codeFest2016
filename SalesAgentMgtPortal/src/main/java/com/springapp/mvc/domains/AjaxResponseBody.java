package com.springapp.mvc.domains;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonView;

public class AjaxResponseBody {

    @JsonView(Views.Public.class)
    String msg;

    @JsonView(Views.Public.class)
    String code;

    @JsonView(Views.Public.class)
    List<SalesLead> salesLeads;

    //getters and setters

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public List<SalesLead> getSalesLeads() {
        return salesLeads;
    }

    public void setSalesLeads(List<SalesLead> salesLeads) {
        this.salesLeads = salesLeads;
    }
}