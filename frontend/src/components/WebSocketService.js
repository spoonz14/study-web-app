import SockJS from "sockjs-client";
import Stomp from "stompjs";

const WebSocketService = () => {
  const socket = new SockJS("http://localhost:8090/websocket-chat");
  const stompClient = Stomp.over(socket);

  stompClient.connect({}, () => {
    console.log("Connected to WebSocket");
  });

  return stompClient;
};

export default WebSocketService;
