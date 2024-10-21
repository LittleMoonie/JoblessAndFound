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

const ReportedPosts = () => {
  const navigate = useNavigate();

  // Hardcoded reported posts data
  const reportedPosts = [
    { id: 1, title: 'The Future of AI', author: 'Michael Johnson', reason: 'Spam' },
    { id: 2, title: 'Best Web Development Practices', author: 'Emily Davis', reason: 'Misleading information' },
  ];

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Pagination logic
  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  // Get paginated reported posts
  const paginatedReportedPosts = reportedPosts.slice((page - 1) * rowsPerPage, page * rowsPerPage);

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
        Reported Posts
      </Typography>

      {/* Reported Posts Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Reason for Reporting</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedReportedPosts.length > 0 ? (
              paginatedReportedPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{post.reason}</TableCell>
                  <TableCell align="center">
                    {/* Resolve or Ignore Report */}
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
                  No reported posts found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
        <Pagination
          count={Math.ceil(reportedPosts.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Stack>
    </Box>
  );
};

export default ReportedPosts;
