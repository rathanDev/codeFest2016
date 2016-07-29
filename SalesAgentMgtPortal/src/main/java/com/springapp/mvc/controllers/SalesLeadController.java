package com.springapp.mvc.controllers;

import com.springapp.mvc.domains.SalesLead;
import com.springapp.mvc.services.SalesLeadsService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class SalesLeadController {

    @RequestMapping(value = "/view-sales-leads", method = RequestMethod.GET)
    public String viewSalesLeads(ModelMap modelMap) {
        return "sales-lead-distribution-mocked2";
    }

    @RequestMapping(value = "/get-sales-leads", method = RequestMethod.GET)
    public @ResponseBody List<SalesLead> getSalesLeads() {

        List<SalesLead> salesLeads = new SalesLeadsService().getSalesLeads();

        return salesLeads;
    }

}
