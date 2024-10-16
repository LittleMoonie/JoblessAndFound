import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import GroupsIcon from '@mui/icons-material/Groups';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Link from '@mui/material/Link';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { differenceInMonths } from 'date-fns';
import { CompanyDTO } from '../API/Api';

// Fetch company data for multiple companies, including offers
const fetchCompanyData = async (): Promise<CompanyDTO[]> => {
	// Fetching data for both Company 1 and Company 2
	const company1Response = await fetch('http://localhost:5000/api/Company/GetCompanyById?CompanyId=1');
	const company2Response = await fetch('http://localhost:5000/api/Company/GetCompanyById?CompanyId=2');

	if (!company1Response.ok || !company2Response.ok) {
		throw new Error('Error fetching company data');
	}

	const company1Data = await company1Response.json();
	const company2Data = await company2Response.json();

	return [company1Data, company2Data]; // Return both companies' data
};

export default function MediaCard() {
	const { data: companies = [], isLoading: isLoadingCompanies, isError: isErrorCompanies } = useQuery({
		queryKey: ['companies'],
		queryFn: fetchCompanyData,
	});

	if (isLoadingCompanies) {
		return <div>Loading...</div>;
	}

	if (isErrorCompanies) {
		return <div>Error loading data.</div>;
	}

	return (
		<div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
			{companies.map((company) => {
				// Get the offers directly from the company data
				const offers = company.offerAdvertisement || [];

				return (
					<Card
						key={company.companyId}
						sx={{
							minWidth: 500,
							maxWidth: 550,
							margin: 'auto',
							padding: '16px',
						}}
					>
						<CardMedia
							sx={{ height: 160 }}
							image={'https://placehold.co/600x400'}
							title="Company Image"
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
								title="Company Logo"
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
									href="#"
									variant="h5"
									sx={{
										color: '#6568FF',
										'&:hover': {
											color: '#33348A',
										},
									}}
								>
									{company.companyName}
								</Link>

								<Typography component="div" sx={{ display: 'flex', alignItems: 'center' }}>
									<PersonIcon sx={{ width: '1rem', paddingRight: '2px' }} />
									{(company?.employeesId ?? 0) > 100 ? '100+' : company?.employeesId ?? 0}
								</Typography>
							</Box>
						</Box>

						<CardContent sx={{ position: 'relative', bottom: 20 }}>
							{/* If there are no offers, display a message */}
							{offers.length === 0 ? (
								<Typography sx={{ paddingLeft: '15px', color: 'gray' }}>
									No job offers available
								</Typography>
							) : (
								offers.map((offer) => {
									const itemDate = offer.createdAt ? new Date(offer.createdAt) : new Date();
									const dateNow = new Date();
									const monthsSince = Math.round(differenceInMonths(dateNow, itemDate));

									return (
										<Box key={offer.offerAdvertisementId}>
											<Typography
												gutterBottom
												variant="h5"
												component="div"
												sx={{ paddingLeft: '15px' }}
											>
												{offer.title}
											</Typography>

											<Typography
												variant="body2"
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
												variant="body2"
												sx={{
													color: 'text.secondary',
													paddingLeft: '15px',
													display: 'flex',
													alignItems: 'center',
												}}
											>
												<GroupsIcon sx={{ width: '1rem', marginRight: '5px' }} />
												{company.employeesId} employés
											</Typography>
											<Typography
												variant="body2"
												sx={{
													color: 'text.secondary',
													paddingLeft: '15px',
													display: 'flex',
													alignItems: 'center',
												}}
											>
												<CalendarMonthIcon sx={{ width: '1rem', marginRight: '5px' }} />
												{offer.createdAt ? new Date(offer.createdAt).toLocaleDateString('fr-FR') : 'Date not available'}{' '}
												<QueryBuilderIcon sx={{ width: '1rem', marginLeft: '5px' }} />
												Depuis {monthsSince} mois
											</Typography>

											<Typography
												variant="body2"
												sx={{ color: 'text.secondary', padding: '15px' }}
											>
												{offer.description}
											</Typography>
										</Box>
									);
								})
							)}
						</CardContent>

						<CardActions
							sx={{
								display: 'flex',
								justifyContent: 'flex-end',
								paddingRight: '15px',
							}}
						>
							<Button
								size="small"
								href={`/share/${company.companyName}`}
								sx={{
									backgroundColor: '#232453',
									color: 'white',
									width: { xs: '40%', sm: '30%', md: '20%' },
									'&:hover': {
										backgroundColor: '#33348A',
									},
								}}
							>
								Partager
							</Button>

							<Button
								size="small"
								sx={{
									backgroundColor: '#232453',
									color: 'white',
									width: { xs: '40%', sm: '30%', md: '30%' },
									'&:hover': {
										backgroundColor: '#33348A',
									},
								}}
							>
								En savoir plus
							</Button>
						</CardActions>
					</Card>
				);
			})}
		</div>
	);
}
