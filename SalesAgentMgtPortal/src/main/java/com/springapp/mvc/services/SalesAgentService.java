package com.springapp.mvc.services;

import com.springapp.mvc.domains.SalesAgent;

import java.util.ArrayList;
import java.util.Map;
import java.util.List;
import java.util.HashMap;

public class SalesAgentService {

    public List<SalesAgent> getSalesAgents() {

        SalesAgent salesAgent1 = new SalesAgent();
        salesAgent1.setName("agent1");
        salesAgent1.setArea("maradana");

        SalesAgent salesAgent2 = new SalesAgent();
        salesAgent2.setName("agent2");
        salesAgent2.setArea("nugegoda");

        List<SalesAgent> salesAgents = new ArrayList<SalesAgent>();
        salesAgents.add(salesAgent1);
        salesAgents.add(salesAgent2);

        return salesAgents;
    }

}
