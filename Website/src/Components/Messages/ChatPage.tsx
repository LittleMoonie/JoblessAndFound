// ChatPage.tsx
import React, { useState } from 'react';
import { Box } from '@mui/material';
import ChatArea from './ChatArea';
import ConversationsSidebar from './ConversationSidebar';

const mockConversations = [
  { id: 1, name: 'Alice', avatarUrl: 'https://i.pravatar.cc/300?img=1', lastMessage: 'Hello!', lastMessageTime: '2h ago' },
  { id: 2, name: 'Bob', avatarUrl: 'https://i.pravatar.cc/300?img=2', lastMessage: 'Hi there!', lastMessageTime: '3h ago' },
  { id: 3, name: 'Charlie', avatarUrl: 'https://i.pravatar.cc/300?img=3', lastMessage: 'How are you?', lastMessageTime: '1 day ago' },
];

type Messages = {
  [key: number]: { id: number; text: string; timestamp: string; isReceived: boolean }[];
};

const mockMessages: Messages = {
  1: [
    { id: 1, text: 'Hey, how are you?', timestamp: '10:00 AM', isReceived: true },
    { id: 2, text: 'I am good, thanks! How about you?', timestamp: '10:01 AM', isReceived: false },
  ],
  2: [
    { id: 1, text: 'Are you free for a meeting?', timestamp: '9:00 AM', isReceived: true },
  ],
  3: [
    { id: 1, text: 'Let\'s catch up later!', timestamp: 'Yesterday', isReceived: true },
  ],
};

const ChatPage: React.FC = () => {
  const [selectedConversationId, setSelectedConversationId] = useState(1);

  const handleSelectConversation = (id: number) => {
    setSelectedConversationId(id);
  };

  const handleSendMessage = (message: string) => {
    console.log('Send message:', message);
    // Here, you could add the new message to the conversation's message list (e.g., use a state update or API call)
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Conversations Sidebar */}
      <Box sx={{ width: '25%', borderRight: '1px solid lightgray' }}>
        <ConversationsSidebar
          conversations={mockConversations}
          selectedConversationId={selectedConversationId}
          onSelectConversation={handleSelectConversation}
        />
      </Box>

      {/* Main Chat Area */}
      <Box sx={{ flexGrow: 1 }}>
        <ChatArea messages={mockMessages[selectedConversationId]} onSendMessage={handleSendMessage} />
      </Box>
    </Box>
  );
};

export default ChatPage;
