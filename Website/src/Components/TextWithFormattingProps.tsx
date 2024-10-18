import { Box } from '@mui/material';
import React from 'react';

interface TextWithFormattingProps {
  text: string;
}

const TextWithFormatting: React.FC<TextWithFormattingProps> = ({ text }) => {
  return (
    <Box sx={{ whiteSpace: 'pre-line' }}>
      {text || 'Texte non disponible'}
    </Box>
  );
};

export default TextWithFormatting;