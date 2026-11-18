package edu.campusconnect.model;

public class TechnicalEvent extends Event {
  public TechnicalEvent(String id, String title, int capacity) {
    super(id, title, capacity);
  }

  @Override
  public String getEventType() {
    return "Technical";
  }

  @Override
  public String getDisplayLabel() {
    return "[TECH] " + getTitle();
  }
}
