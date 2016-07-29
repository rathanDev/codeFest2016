package com.springapp.mvc.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class SalesAgentController {

    @RequestMapping(value = "/view-sales-agents", method = RequestMethod.GET)
    public String viewSalesAgents() {
        return "sales-agent-distribution";
    }
}
