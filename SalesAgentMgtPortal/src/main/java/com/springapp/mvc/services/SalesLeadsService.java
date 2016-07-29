package com.springapp.mvc.services;

import com.springapp.mvc.domains.SalesAgent;
import com.springapp.mvc.domains.SalesLead;
import java.util.ArrayList;
import java.util.List;

public class SalesLeadsService {

    public List<SalesLead> getSalesLeads() {

        SalesLead salesLead1 = new SalesLead();
        salesLead1.setName("salesLead1Name");
        salesLead1.setAddress("maradana");
        salesLead1.setConfidenceLevel("confidenceLevel1");
        salesLead1.setFeedback("feedback1");
        salesLead1.setRecordings("rec1");
        SalesAgent salesAgent1 = new SalesAgent();
        salesAgent1.setName("salesAgent1");
        salesAgent1.setArea("salesAgent1Area");
        salesLead1.setVisitingAgent(salesAgent1);

        SalesLead salesLead2 = new SalesLead();
        salesLead2.setName("salesLead2Name");
        salesLead2.setAddress("Nuwara Eliya");
        salesLead2.setConfidenceLevel("confidenceLevel2");
        salesLead2.setFeedback("feedback2");
        salesLead2.setRecordings("rec2");
        SalesAgent salesAgent2 = new SalesAgent();
        salesAgent2.setName("salesAgent2");
        salesAgent2.setArea("salesAgent2Area");
        salesLead2.setVisitingAgent(salesAgent2);

        List<SalesLead> salesLeads = new ArrayList<SalesLead>();
        salesLeads.add(salesLead1);
        salesLeads.add(salesLead2);

        return salesLeads;
    }
}
