package edu.campusconnect.model;

public class CulturalEvent extends Event {
  public CulturalEvent(String id, String title, int capacity) {
    super(id, title, capacity);
  }

  @Override
  public String getEventType() {
    return "Cultural";
  }

  @Override
  public String getDisplayLabel() {
    return "[CULTURAL] " + getTitle();
  }
}
