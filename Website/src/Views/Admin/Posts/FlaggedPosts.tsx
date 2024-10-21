import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Pagination,
  Stack,
  Button,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const FlaggedPosts = () => {
  const navigate = useNavigate();

  // Hardcoded flagged posts data
  const flaggedPosts = [
    { id: 1, title: 'How to Improve SEO', author: 'John Doe', reason: 'Inappropriate content' },
    { id: 2, title: 'React vs Angular', author: 'Jane Smith', reason: 'Offensive language' },
  ];

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Pagination logic
  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  // Get paginated flagged posts
  const paginatedFlaggedPosts = flaggedPosts.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box sx={{ p: 4 }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        variant="contained"
        onClick={() => navigate('/admin')}
        sx={{ mb: 2 }}
      >
        Back to Admin Dashboard
      </Button>

      {/* Page Header */}
      <Typography variant="h4" gutterBottom>
        Flagged Posts
      </Typography>

      {/* Flagged Posts Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Reason for Flagging</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedFlaggedPosts.length > 0 ? (
              paginatedFlaggedPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{post.reason}</TableCell>
                  <TableCell align="center">
                    {/* Resolve or Ignore Flag */}
                    <IconButton color="success" aria-label="resolve post">
                      <CheckIcon />
                    </IconButton>
                    <IconButton color="error" aria-label="ignore post">
                      <CancelIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No flagged posts found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
        <Pagination
          count={Math.ceil(flaggedPosts.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Stack>
    </Box>
  );
};

export default FlaggedPosts;
