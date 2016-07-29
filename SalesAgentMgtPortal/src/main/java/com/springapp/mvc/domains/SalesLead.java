package com.springapp.mvc.domains;

public class SalesLead {

    private String name;
    private String address;
    private String confidenceLevel;
    private String recordings;
    private String feedback;
    private SalesAgent visitingAgent;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getConfidenceLevel() {
        return confidenceLevel;
    }

    public void setConfidenceLevel(String confidenceLevel) {
        this.confidenceLevel = confidenceLevel;
    }

    public String getRecordings() {
        return recordings;
    }

    public void setRecordings(String recordings) {
        this.recordings = recordings;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public SalesAgent getVisitingAgent() {
        return visitingAgent;
    }

    public void setVisitingAgent(SalesAgent visitingAgent) {
        this.visitingAgent = visitingAgent;
    }
}
