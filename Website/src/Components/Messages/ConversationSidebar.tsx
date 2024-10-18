import React from 'react';
import {
	List,
	ListItemText,
	Avatar,
	Box,
	Typography,
	ButtonBase,
    ListItemButton,
} from '@mui/material';

interface Conversation {
	id: number;
	name: string;
	avatarUrl: string;
	lastMessage: string;
	lastMessageTime: string;
}

interface ConversationsSidebarProps {
	conversations: Conversation[];
	selectedConversationId: number;
	onSelectConversation: (id: number) => void;
}

const ConversationsSidebar: React.FC<ConversationsSidebarProps> = ({
	conversations,
	selectedConversationId,
	onSelectConversation,
}) => {
	return (
		<Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
			<Typography variant='h6' sx={{ p: 2 }}>
				Conversations
			</Typography>
			<List>
				{conversations.map((conversation) => (
					<ButtonBase // This makes the entire list item clickable
						key={conversation.id}
						onClick={() => onSelectConversation(conversation.id)}
						sx={{ width: '100%', display: 'block', textAlign: 'left' }}
					>
						<ListItemButton selected={conversation.id === selectedConversationId}>
							<Avatar src={conversation.avatarUrl} sx={{ mr: 2 }} />
							<ListItemText
								primary={conversation.name}
								secondary={`${conversation.lastMessage} • ${conversation.lastMessageTime}`}
							/>
						</ListItemButton>
					</ButtonBase>
				))}
			</List>
		</Box>
	);
};

export default ConversationsSidebar;
