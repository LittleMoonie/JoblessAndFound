// ChatArea.tsx
import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

interface Message {
  id: number;
  text: string;
  timestamp: string;
  isReceived: boolean;
}

interface ChatAreaProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = React.useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage(''); // Clear the input field after sending
    }
  };

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Chat Messages */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              justifyContent: message.isReceived ? 'flex-start' : 'flex-end',
              mb: 1,
            }}
          >
            <Box
              sx={{
                backgroundColor: message.isReceived ? 'lightgray' : 'primary.main',
                color: message.isReceived ? 'black' : 'white',
                borderRadius: 2,
                p: 1,
                maxWidth: '60%',
              }}
            >
              <Typography variant="body1">{message.text}</Typography>
              <Typography variant="caption">{message.timestamp}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* New Message Input */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <TextField
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <Button variant="contained" onClick={handleSendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatArea;
