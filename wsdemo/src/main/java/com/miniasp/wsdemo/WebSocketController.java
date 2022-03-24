package com.miniasp.wsdemo;

import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @MessageMapping("/talk")
    @SendTo("/topic/lobby")
    public String talk(@Payload String chatMessage) {
        System.out.printf("Received message from client: %s%n", chatMessage);
        return String.format("是誰說 '%s' 的？給我出來", chatMessage);
    }

    @MessageExceptionHandler
    public String handleException(Throwable exception) {
        return exception.getMessage();
    }

}
