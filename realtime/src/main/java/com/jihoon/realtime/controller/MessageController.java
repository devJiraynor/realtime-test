package com.jihoon.realtime.controller;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MessageController {

  private final SimpMessagingTemplate messagingTemplate;

  @PostMapping("/send")
  public void send(@RequestBody String message) {
    String detination = "/topic";
    messagingTemplate.convertAndSend(detination, "message!!!");
  }
  
}
