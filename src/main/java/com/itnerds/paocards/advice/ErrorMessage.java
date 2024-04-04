package com.itnerds.paocards.advice;

import java.util.Date;

/**
 * Data bucket for error messages returned by the controllers.
 */
public class ErrorMessage {
  private int statusCode;
  private Date timestamp;
  private String message;
  private String description;

  /**
   * Constructor.
   * @param statusCode
   * @param timestamp
   * @param message
   * @param description
   */
  public ErrorMessage(int statusCode, Date timestamp, String message, String description) {
    this.statusCode = statusCode;
    this.timestamp = timestamp;
    this.message = message;
    this.description = description;
  }

  /**
   * Returns error status code.
   * @return status code.
   */
  public int getStatusCode() {
    return statusCode;
  }

  /**
   * Returns error timestamp.
   * @return timestamp.
   */
  public Date getTimestamp() {
    return timestamp;
  }

  /**
   * Returns error message.
   * @return message
   */
  public String getMessage() {
    return message;
  }

  /**
   * Returns error description.
   * @return description.
   */
  public String getDescription() {
    return description;
  }
}