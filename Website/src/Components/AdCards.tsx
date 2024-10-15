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
import { useState, useEffect } from 'react';
import axios from 'axios';
import { differenceInMonths } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../API/apiClient';

interface OfferAdvertisement {
	offerAdvertisementId: number;
	title: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	companyId: number;
	postedByUserId: number;
}

interface Data {
	companyId: number;
	companyName: string;
	location: string;
	domain: string;
	employeesId: number;
	offerAdvertisement: OfferAdvertisement[];
}

export default function MediaCard() {
	// UseQuery to fetch data from the API
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['companies'],
		queryFn: () => apiClient.company_get_company_by_id({ companyId: 1 }),
	});

	// Handle loading state
	if (isLoading) {
		return <div>Loading...</div>;
	}

	// Handle error state
	if (isError) {
		return <div>Error: {(error as Error).message}</div>;
	}
    
    return (
		<div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
			{data?.map((item) => {
				// Ensure there is at least one offer advertisement
				const offer = item.offerAdvertisement[0];
				if (!offer) {
					return null; // If no offer exists, don't display the card
				}

				const itemDate = new Date(offer.createdAt);
				const dateNow = new Date();
				const monthsSince = Math.round(differenceInMonths(dateNow, itemDate));

				return (
					<Card
						key={offer.offerAdvertisementId}
						sx={{
							minWidth: 345,
							maxWidth: 450,
							margin: 'auto',
						}}
					>
						<CardMedia
							sx={{ height: 140 }}
							image={'https://placehold.co/600x400'}
							title='img'
						/>

						<Box sx={{ display: 'flex' }}>
							<CardMedia
								sx={{
									height: 80,
									width: '5.5rem',
									borderRadius: '10px',
									border: '1px solid black',
									position: 'relative',
									bottom: 40,
									left: 20,
									zIndex: 5,
									marginRight: '2rem',
								}}
								image={'https://placehold.co/600x400'}
								title='logo'
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
										color: '#6568FF',
										'&:hover': {
											color: '#33348A',
										},
									}}
								>
									{item.companyName}
								</Link>

								<Typography
									component='div'
									sx={{ display: 'flex', alignItems: 'center' }}
								>
									<PersonIcon sx={{ width: '1rem', paddingRight: '2px' }} />
									{item.employeesId > 100 ? '100+' : item.employeesId}
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
								{item.location}
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
								{item.employeesId} employés
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
								<CalendarMonthIcon sx={{ width: '1rem', marginRight: '5px' }} />{' '}
								{offer.createdAt}{' '}
								<QueryBuilderIcon sx={{ width: '1rem', marginLeft: '5px' }} />{' '}
								Depuis {monthsSince} mois
							</Typography>

							<Typography
								variant='body2'
								sx={{ color: 'text.secondary', padding: '15px' }}
							>
								{offer.description}
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
								href={`/share/${item.companyName}`}
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
								size='small'
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
