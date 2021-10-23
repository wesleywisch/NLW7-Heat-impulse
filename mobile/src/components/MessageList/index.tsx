import React, { useState, useEffect } from "react";
import { ScrollView } from 'react-native';
import { Message, MessageProps } from '../Message';
import { io } from 'socket.io-client';
import { api } from "../../services/api";

import { styles } from "./styles";

let messagesQueue: MessageProps[] = [];

const socket = io(String(api.defaults.baseURL));
socket.on('new_message', newMessage => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    async function getLast3Messages() {
      const messagesResponse = await api.get<MessageProps[]>('/messages/last3');
      setCurrentMessages(messagesResponse.data);
    }

    getLast3Messages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setCurrentMessages(prevState => [ messagesQueue[0], prevState[0], prevState[1] ]);
        messagesQueue.shift();
      }
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {currentMessages.map((item, key) => (
        <Message data={item} key={key} />
      ))}
    </ScrollView>
  );
}