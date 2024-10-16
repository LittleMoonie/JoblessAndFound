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
  TextField,
  Button,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ManageOffers = () => {
  const navigate = useNavigate();

  // Hardcoded offers data
  const offers = [
    { id: 1, title: 'Software Engineer', company: 'Company A', location: 'New York' },
    { id: 2, title: 'Data Analyst', company: 'Company B', location: 'San Francisco' },
    { id: 3, title: 'Marketing Specialist', company: 'Company C', location: 'Los Angeles' },
    { id: 4, title: 'Project Manager', company: 'Company D', location: 'Chicago' },
    { id: 5, title: 'Graphic Designer', company: 'Company E', location: 'Miami' },
  ];

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState('');

  // Search filter
  const filteredOffers = offers.filter(
    (offer) =>
      offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  // Get paginated offers based on search results
  const paginatedOffers = filteredOffers.slice((page - 1) * rowsPerPage, page * rowsPerPage);

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
        Manage Job Offers
      </Typography>

      {/* Search Input */}
      <TextField
        label="Search Job Offers"
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by Title, Company, or Location"
      />

      {/* Offers Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Location</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOffers.length > 0 ? (
              paginatedOffers.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell>{offer.id}</TableCell>
                  <TableCell>{offer.title}</TableCell>
                  <TableCell>{offer.company}</TableCell>
                  <TableCell>{offer.location}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" aria-label="add offer">
                      <AddIcon />
                    </IconButton>
                    <IconButton color="secondary" aria-label="edit offer">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" aria-label="delete offer">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No offers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
        <Pagination
          count={Math.ceil(filteredOffers.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Stack>
    </Box>
  );
};

export default ManageOffers;
