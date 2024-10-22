import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	Box,
	Snackbar,
	Alert,
	Grid,
	Pagination,
} from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useQuery } from '@tanstack/react-query';
import TextWithFormatting from './TextWithFormattingProps';
import { OfferAdvertisementDTO } from '../API/Api';
import { useAuth } from '../Context/authContext'; // Import useAuth for user ID

const formatDistanceToNow = (date: Date) => {
	const now = new Date();
	const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	let interval = Math.floor(seconds / 31536000);
	if (interval > 1) {
		return `${interval} years ago`;
	}
	interval = Math.floor(seconds / 2592000);
	if (interval > 1) {
		return `${interval} months ago`;
	}
	interval = Math.floor(seconds / 86400);
	if (interval > 1) {
		return `${interval} days ago`;
	}
	interval = Math.floor(seconds / 3600);
	if (interval > 1) {
		return `${interval} hours ago`;
	}
	interval = Math.floor(seconds / 60);
	if (interval > 1) {
		return `${interval} minutes ago`;
	}
	return `${Math.floor(seconds)} seconds ago`;
};

const fetchOffers = async (
	searchTerm: string,
	page: number,
	rowsPerPage: number
) => {
	const response = await fetch(
		`http://localhost:5000/api/Offer/GetAllOffers?searchTerm=${searchTerm}&page=${page}&pageSize=${rowsPerPage}`
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

const checkIfUserApplied = async (offerId: number, userId: number) => {
	const response = await fetch(
		`http://localhost:5000/api/Apply/HasUserApplied?offerId=${offerId}&userId=${userId}`
	);
	if (!response.ok) {
		throw new Error('Error checking application status');
	}
	const result = await response.json();
	return result.hasApplied;
};

export default function MediaCard() {
	const { userId } = useAuth();
	const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [searchParams] = useSearchParams();
	const location = useLocation();
	const [page, setPage] = useState(1);
	const rowsPerPage = 6;
	const [appliedOffers, setAppliedOffers] = useState<{
		[key: number]: boolean;
	}>({});

	const {
		data: offersData = { data: [], totalCount: 0 },
		isLoading: isLoadingOffers,
		isError: isErrorOffers,
	} = useQuery({
		queryKey: ['offers', page],
		queryFn: () => fetchOffers('', page, rowsPerPage),
	});

	useEffect(() => {
		const offerIdFromUrl = searchParams.get('offerId');

		if (offerIdFromUrl && !isNaN(Number(offerIdFromUrl))) {
			const offerId = Number(offerIdFromUrl);

			const offerExists = offersData.data.some(
				(offer: OfferAdvertisementDTO) => offer.offerAdvertisementId === offerId
			);

			if (offerExists) {
				setExpandedCardId(offerId);
			} else {
				setError('This offer cannot be found or does not exist.');
			}
		}
	}, [location.search, offersData, searchParams]);

	useEffect(() => {
		const checkApplications = async () => {
			if (offersData.data.length > 0 && userId) {
				try {
					// Create an array of promises that all execute concurrently
					const appliedStatusPromises = offersData.data.map(
						(offer: OfferAdvertisementDTO) =>
							offer.offerAdvertisementId !== undefined &&
							checkIfUserApplied(offer.offerAdvertisementId, userId)
								.then((hasApplied) => ({
									[String(offer.offerAdvertisementId)]: hasApplied,
								}))
								.catch(() => ({ [String(offer.offerAdvertisementId)]: false })) // Handle errors at individual level to prevent halting all
					);

					// Wait for all promises to resolve
					const appliedStatusArray = await Promise.all(appliedStatusPromises);

					// Convert array to an object
					const appliedStatus = Object.assign({}, ...appliedStatusArray);
					setAppliedOffers(appliedStatus);
				} catch (err) {
					console.error('Error while checking application statuses:', err);
					setError('Error while checking application status.');
				}
			}
		};

		checkApplications();
	}, [offersData, userId]);

	const handleLearnMore = (offerId: number) => {
		setExpandedCardId(expandedCardId === offerId ? null : offerId);
	};

	const handleCopy = (offerId: number) => {
		const url = `${window.location.href}?offerId=${offerId}`;
		navigator.clipboard.writeText(url);
		alert('URL copied to clipboard!');
	};

	const handleApply = async (offerId: number) => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/Apply/ApplyForOffer?offerId=${offerId}&userId=${userId}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			if (!response.ok) {
				throw new Error('Error applying for offer');
			}
			alert('Successfully applied for the offer.');
			setAppliedOffers((prev) => ({ ...prev, [offerId]: true }));
		} catch (err) {
			setError('Failed to apply for the offer.');
		}
	};

	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setPage(value);
	};

	if (isLoadingOffers) {
		return <div>Loading...</div>;
	}

	if (isErrorOffers) {
		return <div>Error loading data.</div>;
	}

	return (
		<Box sx={{ flexGrow: 1, padding: 2 }}>
			{expandedCardId ? (
				// Full screen view for expanded card
				<Box sx={{ padding: 2 }}>
					{offersData.data.map((offer: OfferAdvertisementDTO) => {
						if (offer.offerAdvertisementId === expandedCardId) {
							const itemDate = offer.createdAt
								? new Date(offer.createdAt)
								: new Date();
							const postedSince = formatDistanceToNow(itemDate);

							return (
								<Card
									key={offer.offerAdvertisementId}
									sx={{
										height: '100vh',
										display: 'flex',
										flexDirection: 'column',
										overflow: 'auto',
									}}
								>
									<CardMedia
										sx={{ height: 400 }}
										image={'https://placehold.co/600x400'}
										title='Offer Image'
									/>

									<CardContent sx={{ flexGrow: 1 }}>
										<Typography gutterBottom variant='h4' component='div'>
											{offer.title}
										</Typography>

										<Typography
											variant='body2'
											sx={{
												color: 'text.secondary',
												display: 'flex',
												alignItems: 'center',
											}}
										>
											<PlaceIcon sx={{ width: '1rem', marginRight: '5px' }} />
											{offer.location || 'Location not specified'}
										</Typography>
										<Typography
											variant='body2'
											sx={{
												color: 'text.secondary',
												display: 'flex',
												alignItems: 'center',
											}}
										>
											<CalendarMonthIcon
												sx={{ width: '1rem', marginRight: '5px' }}
											/>
											Posted {postedSince}
										</Typography>

										<Typography
											variant='body2'
											sx={{ color: 'text.secondary', marginTop: 2 }}
										>
											<TextWithFormatting
												text={offer.longDescription || offer.description || ''}
											/>
										</Typography>
									</CardContent>

									<CardActions sx={{ justifyContent: 'flex-end' }}>
										<Button
											size='small'
											onClick={() =>
												offer.offerAdvertisementId !== undefined &&
												handleLearnMore(offer.offerAdvertisementId)
											}
											sx={{
												backgroundColor: '#232453',
												color: 'white',
												'&:hover': {
													backgroundColor: '#33348A',
												},
											}}
										>
											Show Less
										</Button>
									</CardActions>
								</Card>
							);
						}
						return null;
					})}
				</Box>
			) : (
				// Grid view for cards
				<>
					<Grid container spacing={3}>
						{offersData.data.map((offer: OfferAdvertisementDTO) => {
							const isExpanded = expandedCardId === offer.offerAdvertisementId;
							const itemDate = offer.createdAt
								? new Date(offer.createdAt)
								: new Date();
							const postedSince = formatDistanceToNow(itemDate);
							const hasApplied =
								offer.offerAdvertisementId !== undefined
									? appliedOffers[offer.offerAdvertisementId] || false
									: false;

							return (
								<Grid
									item
									xs={12}
									sm={6}
									md={4}
									key={offer.offerAdvertisementId}
								>
									<Card
										sx={{
											transition: 'all 0.3s ease',
											height: '100%',
											display: 'flex',
											flexDirection: 'column',
										}}
									>
										<CardMedia
											sx={{ height: isExpanded ? 300 : 160 }}
											image={'https://placehold.co/600x400'}
											title='Offer Image'
										/>

										<CardContent sx={{ flexGrow: 1 }}>
											<Typography gutterBottom variant='h5' component='div'>
												{offer.title}
											</Typography>

											<Typography
												variant='body2'
												sx={{
													color: 'text.secondary',
													display: 'flex',
													alignItems: 'center',
												}}
											>
												<PlaceIcon sx={{ width: '1rem', marginRight: '5px' }} />
												{offer.location || 'Location not specified'}
											</Typography>
											<Typography
												variant='body2'
												sx={{
													color: 'text.secondary',
													display: 'flex',
													alignItems: 'center',
												}}
											>
												<CalendarMonthIcon
													sx={{ width: '1rem', marginRight: '5px' }}
												/>
												Posted {postedSince}
											</Typography>

											<Typography
												variant='body2'
												sx={{ color: 'text.secondary', marginTop: 2 }}
											>
												<TextWithFormatting text={offer.description || ''} />
											</Typography>
										</CardContent>

										<CardActions sx={{ justifyContent: 'space-between' }}>
											<Button
												size='small'
												onClick={() =>
													offer.offerAdvertisementId !== undefined &&
													handleLearnMore(offer.offerAdvertisementId)
												}
												sx={{
													backgroundColor: '#232453',
													color: 'white',
													'&:hover': {
														backgroundColor: '#33348A',
													},
												}}
											>
												{isExpanded ? 'Show Less' : 'Learn More'}
											</Button>
											<Button
												size='small'
												onClick={() =>
													offer.offerAdvertisementId !== undefined &&
													handleCopy(offer.offerAdvertisementId)
												}
											>
												Copy URL
											</Button>
											<Button
												size='small'
												disabled={hasApplied}
												onClick={() =>
													offer.offerAdvertisementId !== undefined &&
													handleApply(offer.offerAdvertisementId)
												}
												sx={{
													backgroundColor: hasApplied ? '#ccc' : '#232453',
													color: 'white',
													'&:hover': {
														backgroundColor: hasApplied ? '#ccc' : '#33348A',
													},
												}}
											>
												{hasApplied ? 'Applied' : 'Apply'}
											</Button>
										</CardActions>
									</Card>
								</Grid>
							);
						})}
					</Grid>
					<Pagination
						count={Math.ceil(offersData.totalCount / rowsPerPage)}
						page={page}
						onChange={handlePageChange}
						sx={{ marginTop: 2, justifyContent: 'center' }}
					/>
				</>
			)}
			<Snackbar
				open={!!error}
				autoHideDuration={6000}
				onClose={() => setError(null)}
			>
				<Alert severity='error'>{error}</Alert>
			</Snackbar>
		</Box>
	);
}
