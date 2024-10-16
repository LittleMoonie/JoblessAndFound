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

const FlaggedOffers = () => {
  const navigate = useNavigate();

  // Hardcoded flagged offers data
  const flaggedOffers = [
    { id: 1, title: 'Software Engineer', company: 'Company A', reason: 'Spam' },
    { id: 2, title: 'Data Analyst', company: 'Company B', reason: 'Inappropriate Content' },
    { id: 3, title: 'Marketing Specialist', company: 'Company C', reason: 'Misleading Information' },
  ];

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Pagination logic
  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  // Get paginated flagged offers
  const paginatedFlaggedOffers = flaggedOffers.slice((page - 1) * rowsPerPage, page * rowsPerPage);

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
        Flagged Job Offers
      </Typography>

      {/* Flagged Offers Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Reason for Flagging</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedFlaggedOffers.length > 0 ? (
              paginatedFlaggedOffers.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell>{offer.id}</TableCell>
                  <TableCell>{offer.title}</TableCell>
                  <TableCell>{offer.company}</TableCell>
                  <TableCell>{offer.reason}</TableCell>
                  <TableCell align="center">
                    {/* Resolve or Ignore Offer */}
                    <IconButton color="success" aria-label="resolve offer">
                      <CheckIcon />
                    </IconButton>
                    <IconButton color="error" aria-label="ignore offer">
                      <CancelIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No flagged offers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
        <Pagination
          count={Math.ceil(flaggedOffers.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Stack>
    </Box>
  );
};

export default FlaggedOffers;
