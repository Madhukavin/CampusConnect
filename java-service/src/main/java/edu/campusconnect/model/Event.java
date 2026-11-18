package edu.campusconnect.model;

public abstract class Event {
  private final String id;
  private final String title;
  private final int capacity;

  protected Event(String id, String title, int capacity) {
    this.id = id;
    this.title = title;
    this.capacity = capacity;
  }

  public String getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }

  public int getCapacity() {
    return capacity;
  }

  public abstract String getEventType();

  public abstract String getDisplayLabel();
}
