package com.springapp.mvc.services;

import com.springapp.mvc.domains.SalesAgent;
import com.springapp.mvc.domains.SalesLead;
import java.util.ArrayList;
import java.util.List;

public class SalesLeadsService {

    public List<SalesLead> getSalesLeads() {

        SalesLead salesLead1 = new SalesLead();
        salesLead1.setName("Pop Tea Bar");
        salesLead1.setAddress("456 Cambridge Ave, Palo Alto, CA 94306");
        salesLead1.setStatus("Menu Ready");
        salesLead1.setConfidenceLevel("5");
        salesLead1.setFeedback("Need subcategories.");
        salesLead1.setRecordings("rec1");
        SalesAgent salesAgent1 = new SalesAgent();
        salesAgent1.setName("Peters Smith");
        salesAgent1.setArea("Palo Alto");
        salesLead1.setVisitingAgent(salesAgent1);

        SalesLead salesLead2 = new SalesLead();
        salesLead2.setName("Terun");
        salesLead2.setAddress("448, South California Ave, Palo Alto, CA 94301");
        salesLead2.setStatus("New");
        salesLead2.setConfidenceLevel("3");
        salesLead2.setFeedback("Better to have reservation functionality.");
        salesLead2.setRecordings("rec2");
        SalesAgent salesAgent2 = new SalesAgent();
        salesAgent2.setName("Peters Smith");
        salesAgent2.setArea("Palo Alto");
        salesLead2.setVisitingAgent(salesAgent2);

        List<SalesLead> salesLeads = new ArrayList<SalesLead>();
        salesLeads.add(salesLead1);
        salesLeads.add(salesLead2);

        return salesLeads;
    }
}
