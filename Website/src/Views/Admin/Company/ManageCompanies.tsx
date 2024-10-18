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

const ManageCompanies = () => {
  const navigate = useNavigate();

  // Hardcoded company data
  const companies = [
    { id: 1, name: 'Company A', email: 'contact@companya.com', industry: 'Tech' },
    { id: 2, name: 'Company B', email: 'contact@companyb.com', industry: 'Finance' },
    { id: 3, name: 'Company C', email: 'contact@companyc.com', industry: 'Healthcare' },
    { id: 4, name: 'Company D', email: 'contact@companyd.com', industry: 'Education' },
    { id: 5, name: 'Company E', email: 'contact@companye.com', industry: 'Retail' },
    { id: 6, name: 'Company F', email: 'contact@companyf.com', industry: 'Real Estate' },
  ];

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState('');

  // Search filter
  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  // Get paginated companies based on search results
  const paginatedCompanies = filteredCompanies.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

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

      <Typography variant="h4" gutterBottom>
        Manage Companies
      </Typography>

      {/* Search Input */}
      <TextField
        label="Search Companies"
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by Company Name, Email, or Industry"
      />

      {/* Companies Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Industry</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCompanies.length > 0 ? (
              paginatedCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>{company.id}</TableCell>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.email}</TableCell>
                  <TableCell>{company.industry}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" aria-label="add company">
                      <AddIcon />
                    </IconButton>
                    <IconButton color="secondary" aria-label="edit company">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" aria-label="delete company">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No companies found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
        <Pagination
          count={Math.ceil(filteredCompanies.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Stack>
    </Box>
  );
};

export default ManageCompanies;
