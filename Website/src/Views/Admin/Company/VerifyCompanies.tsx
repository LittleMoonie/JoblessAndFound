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
  Check as CheckIcon,
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const VerifyCompanies = () => {
  const navigate = useNavigate();

  // Hardcoded unverified companies data
  const companies = [
    { id: 1, name: 'Unverified Company A', email: 'contact@companya.com', industry: 'Tech' },
    { id: 2, name: 'Unverified Company B', email: 'contact@companyb.com', industry: 'Finance' },
    { id: 3, name: 'Unverified Company C', email: 'contact@companyc.com', industry: 'Healthcare' },
    { id: 4, name: 'Unverified Company D', email: 'contact@companyd.com', industry: 'Education' },
  ];

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Pagination logic
  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  // Get paginated companies
  const paginatedCompanies = companies.slice((page - 1) * rowsPerPage, page * rowsPerPage);

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
          Verify Companies
        </Typography>
  
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
                      {/* Approve (Verify) Company */}
                      <IconButton color="success" aria-label="verify company">
                        <CheckIcon />
                      </IconButton>
                      {/* Reject Company */}
                      <IconButton color="error" aria-label="reject company">
                        <CloseIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No companies to verify
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
  
        {/* Pagination */}
        <Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
          <Pagination
            count={Math.ceil(companies.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Stack>
      </Box>
    );
  };
  
  export default VerifyCompanies;
  
