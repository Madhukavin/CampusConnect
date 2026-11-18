package edu.campusconnect.service;

import jakarta.annotation.PreDestroy;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
  private final ExecutorService executor = Executors.newFixedThreadPool(2);

  public void sendAsync(String message) {
    executor.submit(
        () ->
            System.out.println(
                "[ASYNC NOTIFICATION] "
                    + message
                    + " | Thread: "
                    + Thread.currentThread().getName()));
  }

  @PreDestroy
  public void stopExecutor() {
    executor.shutdown();
  }
}
