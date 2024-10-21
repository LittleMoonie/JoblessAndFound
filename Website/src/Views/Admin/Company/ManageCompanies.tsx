import React, { useState } from 'react';
import {
	Card,
	CardContent,
	Typography,
	IconButton,
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
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import CompanyModal from './CompanyModal';

export interface CompanyData {
	companyId: number;
	companyName: string;
	location: string;
	domain: string;
	employeesId: number;
}

const fetchCompanies = async (
	searchTerm: string,
	page: number,
	rowsPerPage: number
) => {
	const response = await fetch(
		`http://localhost:5000/api/Company/GetAllCompanies?searchTerm=${searchTerm}&page=${page}&pageSize=${rowsPerPage}`
	);
	if (!response.ok) {
		throw new Error('Error fetching companies');
	}
	const result = await response.json();
	return {
		data: result.data,
		totalCount: result.totalCount,
	};
};

const ManageCompanies = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [page, setPage] = useState(1);
	const rowsPerPage = 3;
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCompany, setSelectedCompany] = useState<CompanyData | null>(null);
	const [openModal, setOpenModal] = useState(false);

	// Fetch companies
	const { data: companies, refetch } = useQuery({
		queryKey: ['companies', page, searchTerm],
		queryFn: () => fetchCompanies(searchTerm, page, rowsPerPage),
	});

	const totalPages = companies ? Math.ceil(companies.totalCount / rowsPerPage) : 0;

	// Add Company API Call
	const addCompanyMutation = useMutation({
		mutationFn: async (companyData: CompanyData) => {
			const url = `http://localhost:5000/api/Company/AddCompany`;
			const response = await fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(companyData),
			});
			if (!response.ok) throw new Error('Failed to add company');
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['companies'] });
			refetch();
		},
	});

	// Edit Company API Call
	const editCompanyMutation = useMutation({
		mutationFn: async (companyData: CompanyData) => {
			const url = `http://localhost:5000/api/Company/UpdateCompany`;
			const response = await fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(companyData),
			});
			if (!response.ok) throw new Error('Failed to update company');
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['companies'] });
			refetch();
		},
	});

	// Delete Company API Call
	const deleteCompanyMutation = useMutation({
		mutationFn: async (companyId: number) => {
			const url = `http://localhost:5000/api/Company/DeleteCompany?companyId=${companyId}`;
			const response = await fetch(url, {
				method: 'POST', 
			});
			if (!response.ok) throw new Error('Failed to delete company');
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['companies'] });
			refetch();
		},
	});

	const handleDeleteCompany = (companyId: number) => {
		deleteCompanyMutation.mutate(companyId);
	};

	const handleSaveCompany = (companyData: {
		companyId: number;
		companyName: string;
		location: string;
		domain: string;
		employeesId: number;
	}) => {
		if (selectedCompany) {
			editCompanyMutation.mutate(companyData); 
		} else {
			addCompanyMutation.mutate({ ...companyData, companyId: companyData.companyId ?? 0 });
		}
		setOpenModal(false);
		setSelectedCompany(null);
	};

	const handleEditCompany = (company: CompanyData) => {
		setSelectedCompany(company);
		setOpenModal(true);
	};

	const handleChangePage = (
		event: React.ChangeEvent<unknown>,
		newPage: number
	) => {
		setPage(newPage);
	};

	return (
		<Box sx={{ p: 2 }}>
			<Button
				startIcon={<ArrowBackIcon />}
				variant='contained'
				onClick={() => navigate('/admin')}
				sx={{ mb: 2 }}
			>
				Back to Admin Dashboard
			</Button>

			<Typography variant='h4' gutterBottom>
				Manage Companies
			</Typography>

			<TextField
				label='Search Companies'
				variant='outlined'
				fullWidth
				sx={{ mb: 2 }}
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder='Search by Company Name or Domain'
			/>

			<Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
				<Button
					startIcon={<AddIcon />}
					variant='contained'
					color='primary'
					onClick={() => {
						setSelectedCompany(null);
						setOpenModal(true);
					}}
				>
					Add Company
				</Button>
			</Box>

			{companies?.data && companies.data.length > 0 ? (
				companies.data.map((company: CompanyData) => (
					<Card key={company.companyId} sx={{ mb: 2, p: 2 }}>
						<CardContent>
							<Typography variant='h6'>
								{company.companyName}
							</Typography>
							<Typography>Location: {company.location}</Typography>
							<Typography>Domain: {company.domain}</Typography>
							<Typography>Employees: {company.employeesId}</Typography>
							<Box sx={{ mt: 2 }}>
								<IconButton
									color='primary'
									aria-label='edit company'
									onClick={() => handleEditCompany(company)}
								>
									<EditIcon />
								</IconButton>
								<IconButton
									color='error'
									aria-label='delete company'
									onClick={() => handleDeleteCompany(company.companyId)}
								>
									<DeleteIcon />
								</IconButton>
							</Box>
						</CardContent>
					</Card>
				))
			) : (
				<Typography>No companies found</Typography>
			)}

			<Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
				<Pagination
					count={totalPages}
					page={page}
					onChange={handleChangePage}
					color='primary'
				/>
			</Stack>

			<CompanyModal
				open={openModal}
				onClose={() => setOpenModal(false)}
				onSave={handleSaveCompany}
				initialData={selectedCompany || undefined}
			/>
		</Box>
	);
};

export default ManageCompanies;
