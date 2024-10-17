import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Link from '@mui/material/Link';
import { Box, Snackbar, Alert } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { CompanyDTO } from '../API/Api';
import TextWithFormatting from './TextWithFormattingProps';
import { useAuth } from '../Context/authContext';
import { Api } from '../API/Api';

const api = new Api({ baseUrl: 'http://localhost:5000' });

const formatDistanceToNow = (date: Date): string => {
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

const fetchCompanyData = async (): Promise<CompanyDTO[]> => {
	const company1Response = await fetch(
		'http://localhost:5000/api/Company/GetCompanyById?CompanyId=1'
	);
	const company2Response = await fetch(
		'http://localhost:5000/api/Company/GetCompanyById?CompanyId=2'
	);

	if (!company1Response.ok || !company2Response.ok) {
		throw new Error('Error fetching company data');
	}

	const company1Data = await company1Response.json();
	const company2Data = await company2Response.json();

	return [company1Data, company2Data];
};

export default function MediaCard() {
	const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [searchParams] = useSearchParams();
	const location = useLocation();
	const { userId } = useAuth();

	const {
		data: companies = [],
		isLoading: isLoadingCompanies,
		isError: isErrorCompanies,
	} = useQuery({
		queryKey: ['companies'],
		queryFn: fetchCompanyData,
	});

	useEffect(() => {
		const companyIdFromUrl = searchParams.get('companyId');

		if (companyIdFromUrl && !isNaN(Number(companyIdFromUrl))) {
			const companyId = Number(companyIdFromUrl);

			const companyExists = companies.some((company) => company.companyId === companyId);

			if (companyExists) {
				setExpandedCardId(companyId);
			} else {

				setError('This company cannot be found or does not exist.');
			}
		}
	}, [location.search, companies, searchParams]);

	const handleLearnMore = (offerId: number) => {
		setExpandedCardId(expandedCardId === offerId ? null : offerId);
	};

	const handleApply = async (offerId: number, userId: number) => {
		try {
			const response = await api.api.offerAddJobApplication({
				AdId: offerId,                // ID de l'offre
				ApplicantUserId: userId,      // ID de l'utilisateur
				CreatedAt: new Date().toISOString(), // Date actuelle au format ISO
				statusId: 1                   // Statut défini à 1 pour l'application
			});
	
			console.log('Application soumise avec succès', response);
			alert('Candidature soumise avec succès');
		} catch (error) {
			console.error('Erreur lors de la soumission de la candidature', error);
		}
	};

	const handleCopy = (companyId: number) => {
		const url = `${window.location.href}?companyId=${companyId}`;
		navigator.clipboard.writeText(url);
		alert('URL copied to clipboard!');
	};

	if (isLoadingCompanies) {
		return <div>Loading...</div>;
	}

	if (isErrorCompanies) {
		return <div>Error loading data.</div>;
	}

	return (
		<div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', maxWidth: "100%" }}>
			{companies.map((company) => {
				return company.offerAdvertisement?.map((offer) => {
					const isExpanded = expandedCardId === offer.offerAdvertisementId;
					const itemDate = offer.createdAt
						? new Date(offer.createdAt)
						: new Date();
					const postedSince = formatDistanceToNow(itemDate);

					return (
						<Card
							key={offer.offerAdvertisementId}
							sx={{
								width: isExpanded ? '100%' : '400px',
								height: isExpanded ? 'auto' : '500px',
								margin: 'auto',
								padding: '16px',
								transition: 'all 0.3s ease',
								display: 'flex',
								flexDirection: 'column', // S'assure que le contenu s'aligne correctement
							}}
						>
							<CardMedia
								sx={{
									height: isExpanded ? 300 : 160,
								}}
								image={'https://placehold.co/600x400'}
								title='Company Image'
							/>

							<Box sx={{ display: 'flex' }}>
								<CardMedia
									sx={{
										height: 90,
										width: '6rem',
										borderRadius: '10px',
										border: '1px solid black',
										position: 'relative',
										bottom: 40,
										left: 20,
										zIndex: 5,
										marginRight: '2rem',
									}}
									image={'https://placehold.co/600x400'}
									title='Company Logo'
								/>

								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'start',
										width: '80%',
									}}
								>
									<Link
										href='#'
										variant='h5'
										sx={{
											marginTop: "2%",
											color: '#6568FF',
											'&:hover': {
												color: '#33348A',
											},
										}}
									>
										{company.companyName}
									</Link>

									<Typography
										component='div'
										sx={{ display: 'flex', alignItems: 'center', backgroundColor: "#232453", color: "#FFFFFF", padding: "3px", marginTop: "2%", borderRadius: "10px", '&:hover': { backgroundColor: '#33348A' }, }}
									>
										<PersonIcon sx={{ width: '1.3rem', paddingRight: '2px' }} />
										{(company?.employeesId ?? 0) > 100
											? '100+ current applicants'
											: (company?.employeesId ?? 0) + ' applicants'}
									</Typography>
								</Box>
							</Box>

							<CardContent sx={{ position: 'relative', bottom: 20 }}>
								<Typography
									gutterBottom
									variant='h5'
									component='div'
									sx={{ paddingLeft: '15px' }}
								>
									{offer.title}
								</Typography>

								<Typography
									variant='body2'
									sx={{
										color: 'text.secondary',
										paddingLeft: '15px',
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<PlaceIcon sx={{ width: '1rem', marginRight: '5px' }} />{' '}
									{company.location}
								</Typography>
								<Typography
									variant='body2'
									sx={{
										color: 'text.secondary',
										paddingLeft: '15px',
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<GroupsIcon sx={{ width: '1rem', marginRight: '5px' }} />
									{company.employeesId} employees
								</Typography>
								<Typography
									variant='body2'
									sx={{
										color: 'text.secondary',
										paddingLeft: '15px',
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
									sx={{ color: 'text.secondary', padding: '15px' }}
								>
									<TextWithFormatting text={isExpanded ? (offer.longDescription || '') : (offer.description || '')} />
								</Typography>

							</CardContent>

							<CardActions
								sx={{
									display: 'flex',
									justifyContent: 'flex-end',
									paddingRight: '15px',
								}}
							>
								<Button
									size='small'
									onClick={() => userId && offer.offerAdvertisementId !== undefined && handleApply(offer.offerAdvertisementId, userId)}
									sx={{
										backgroundColor: '#232453',
										color: 'white',
										width: { xs: '40%', sm: '30%', md: '20%' },
										'&:hover': {
											backgroundColor: '#33348A',
										},
									}}
								>
									Apply
								</Button>

								<Box
									sx={{
										display: 'flex',
										justifyContent: 'flex-end',
										width: "100%"
									}}
								>
									<Button
										size='small'
										onClick={() => company.companyId && handleCopy(company.companyId)}
										sx={{
											backgroundColor: '#232453',
											color: 'white',
											marginRight: "2%",
											width: { xs: '40%', sm: '30%', md: '30%' },
											'&:hover': {
												backgroundColor: '#33348A',
											},
										}}
									>
										Copy URL
									</Button>

									<Button
										size='small'
										onClick={() =>
											company.companyId &&
											offer.offerAdvertisementId !== undefined && handleLearnMore(offer.offerAdvertisementId)
										}
										sx={{
											backgroundColor: '#232453',
											color: 'white',
											width: { xs: '40%', sm: '30%', md: '30%' },
											'&:hover': {
												backgroundColor: '#33348A',
											},
										}}
									>
										{isExpanded ? 'Show Less' : 'Learn More'}
									</Button>
								</Box>
							</CardActions>
						</Card>
					);
				});
			})}

			<Snackbar
				open={!!error}
				autoHideDuration={6000}
				onClose={() => setError(null)}
			>
				<Alert onClose={() => setError(null)} severity="error">
					{error}
				</Alert>
			</Snackbar>
		</div>
	);
}
