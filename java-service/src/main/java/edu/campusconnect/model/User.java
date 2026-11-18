package edu.campusconnect.model;

public abstract class User {
  private final String id;
  private String name;
  private String email;

  protected User(String id, String name, String email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  public String getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    if (name == null || name.isBlank()) throw new IllegalArgumentException("Name is required");
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    if (email == null || !email.contains("@"))
      throw new IllegalArgumentException("Valid email required");
    this.email = email;
  }

  public abstract String getRole();
}
