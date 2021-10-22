import React from "react";
import { ScrollView } from 'react-native';

import { styles } from "./styles";

import { Message } from '../Message';

export function MessageList() {
  const message = {
    id: '1',
    text: 'Texto',
    user: {
      name: 'Wesley',
      avatar_url: '',
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      <Message data={message} />
    </ScrollView>
  );
}