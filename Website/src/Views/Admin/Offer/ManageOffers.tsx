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
import OfferModal from './OfferModal'; // Assuming you have an OfferModal component

export interface OfferData {
	offerAdvertisementId: number;
	title: string;
	description: string;
	longDescription: string;
	createdAt: string;
	updatedAt: string;
	companyId: number;
	postedByUserId: number;
}

const fetchOffers = async (
	companyId: number,
	searchTerm: string,
	page: number,
	rowsPerPage: number
) => {
	const response = await fetch(
		`http://localhost:5000/api/Offer/${companyId}?searchTerm=${searchTerm}&page=${page}&pageSize=${rowsPerPage}`
	);
	if (!response.ok) {
		throw new Error('Error fetching offers');
	}
	const result = await response.json();
	return {
		data: result.data,
		totalCount: result.totalCount,
	};
};

const ManageOffers = ({ companyId }: { companyId: number }) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [page, setPage] = useState(1);
	const rowsPerPage = 3;
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedOffer, setSelectedOffer] = useState<OfferData | null>(null);
	const [openModal, setOpenModal] = useState(false);

	// Fetch offers
	const { data: offers, refetch } = useQuery({
		queryKey: ['offers', companyId, page, searchTerm],
		queryFn: () => fetchOffers(companyId, searchTerm, page, rowsPerPage),
	});

	const totalPages = offers ? Math.ceil(offers.totalCount / rowsPerPage) : 0;

	// Add Offer API Call
	const addOfferMutation = useMutation({
		mutationFn: async (offerData: OfferData) => {
			const url = `http://localhost:5000/api/Offer`;
			const response = await fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(offerData),
			});
			if (!response.ok) throw new Error('Failed to add offer');
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['offers'] });
			refetch();
		},
	});

	// Edit Offer API Call
	const editOfferMutation = useMutation({
		mutationFn: async (offerData: OfferData) => {
			const url = `http://localhost:5000/api/Offer/${offerData.offerAdvertisementId}`;
			const response = await fetch(url, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(offerData),
			});
			if (!response.ok) throw new Error('Failed to update offer');
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['offers'] });
			refetch();
		},
	});

	// Delete Offer API Call
	const deleteOfferMutation = useMutation({
		mutationFn: async (offerId: number) => {
			const url = `http://localhost:5000/api/Offer/${offerId}`;
			const response = await fetch(url, {
				method: 'DELETE',
			});
			if (!response.ok) throw new Error('Failed to delete offer');
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['offers'] });
			refetch();
		},
	});

	const handleDeleteOffer = (offerId: number) => {
		deleteOfferMutation.mutate(offerId);
	};

	const handleSaveOffer = (
		offerData: OfferData & { createdAt: string; updatedAt: string }
	) => {
		if (selectedOffer) {
			editOfferMutation.mutate({ ...selectedOffer, ...offerData });
		} else {
			addOfferMutation.mutate({
				...offerData,
				offerAdvertisementId: offerData.offerAdvertisementId ?? 0,
			});
		}
		setOpenModal(false);
		setSelectedOffer(null);
	};

	const handleEditOffer = (offer: OfferData) => {
		setSelectedOffer(offer);
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
			{/* Back Button */}
			<Button
				startIcon={<ArrowBackIcon />}
				variant='contained'
				onClick={() => navigate('/admin')}
				sx={{ mb: 2 }}
			>
				Back to Admin Dashboard
			</Button>

			{/* Page Header */}
			<Typography variant='h4' gutterBottom>
				Manage Offers
			</Typography>

			{/* Search Input */}
			<TextField
				label='Search Offers'
				variant='outlined'
				fullWidth
				sx={{ mb: 2 }}
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder='Search by Title or Description'
			/>

			{/* Add Offer Button */}
			<Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
				<Button
					startIcon={<AddIcon />}
					variant='contained'
					color='primary'
					onClick={() => {
						setSelectedOffer(null);
						setOpenModal(true);
					}}
				>
					Add Offer
				</Button>
			</Box>

			{/* Offer Cards */}
			{offers?.data && offers.data.length > 0 ? (
				offers.data.map((offer: OfferData) => (
					<Card key={offer.offerAdvertisementId} sx={{ mb: 2, p: 2 }}>
						<CardContent>
							<Typography variant='h6'>{offer.title}</Typography>
							<Typography>Description: {offer.description}</Typography>
							<Typography>Posted By User ID: {offer.postedByUserId}</Typography>
							<Box sx={{ mt: 2 }}>
								<IconButton
									color='primary'
									aria-label='edit offer'
									onClick={() => handleEditOffer(offer)}
								>
									<EditIcon />
								</IconButton>
								<IconButton
									color='error'
									aria-label='delete offer'
									onClick={() => handleDeleteOffer(offer.offerAdvertisementId)}
								>
									<DeleteIcon />
								</IconButton>
							</Box>
						</CardContent>
					</Card>
				))
			) : (
				<Typography>No offers found</Typography>
			)}

			{/* Pagination */}
			<Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
				<Pagination
					count={totalPages}
					page={page}
					onChange={handleChangePage}
					color='primary'
				/>
			</Stack>

			{/* Offer Modal */}
			<OfferModal
				open={openModal}
				onClose={() => setOpenModal(false)}
				onSave={handleSaveOffer}
				initialData={selectedOffer || undefined}
			/>
		</Box>
	);
};

export default ManageOffers;
