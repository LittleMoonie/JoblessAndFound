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
import { differenceInMonths } from 'date-fns';
import { useState } from 'react';

const data = [
  {
    image: 'https://placehold.co/600x400',
    logo: 'https://placehold.co/400',
    CompanyName: 'CompanyName',
    ApplyCount: 18,
    JobOffer: 'Développeur Web',
    EmployeeCount: '50',
    Date: '2024-05-12',
    Location: 'New York',
    ShortDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, harum.',
  },
  {
    image: 'https://placehold.co/600x400',
    logo: 'https://placehold.co/400',
    CompanyName: 'Business 2',
    ApplyCount: 82,
    JobOffer: 'Développeur Web',
    EmployeeCount: '50',
    Date: '2024-02-12',
    Location: 'New York',
    ShortDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, harum.',
  },
  {
    image: 'https://placehold.co/600x400',
    logo: 'https://placehold.co/400',
    CompanyName: 'Business 2',
    ApplyCount: 103,
    JobOffer: 'Développeur Web',
    EmployeeCount: '50',
    Date: '2024-05-12',
    Location: 'New York',
    ShortDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, harum.',
  },
];

export default function MediaCard() {
  const [clickedCards, setClickedCards] = useState<{ [key: number]: boolean }>({});

  const handleClick = (id: number) => {
    setClickedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {data.map((item, index) => {
        const itemDate = new Date(item.Date);
        const dateNow = new Date();
        const monthsSince = Math.round(differenceInMonths(dateNow, itemDate));

        const isClicked = clickedCards[index] || false;

        return (
          <Card
            key={index}
            sx={{
              minWidth: isClicked ? '100%' : 345,
              maxWidth: isClicked ? '100%' : 450,
              height: isClicked ? '100vh' : '100%',
            }}
          >
            <CardMedia sx={{ height: 140 }} image={item.image} title="img" />

            <Box
              sx={{
                display: 'flex',
              }}
            >
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
                image={item.logo}
                title="logo"
              />

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  height: '10%',
                  width: '80%',
                }}
              >
                <Link
                  href=""
                  variant="h5"
                  sx={{
                    height: '10%',
                    color: '#6568FF',
                    '&:hover': {
                      color: '#33348A',
                    },
                  }}
                >
                  {item.CompanyName}
                </Link>

                <Typography
                  gutterBottom
                  component="div"
                  sx={{ display: 'flex', alignItems: 'center', height: '10%' }}
                >
                  <PersonIcon
                    sx={{
                      width: '1rem',
                      paddingRight: '2px',
                    }}
                  />
                  {item.ApplyCount > 100 ? '100+' : item.ApplyCount}
                </Typography>
              </Box>
            </Box>

            <CardContent sx={{ position: 'relative', bottom: 20 }}>
              <Typography gutterBottom variant="h5" component="div" sx={{ paddingLeft: '15px' }}>
                {item.JobOffer}
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
                <PlaceIcon sx={{ width: '1rem', margin: '0px 5px 0px 5px' }} /> {item.Location}
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
                <GroupsIcon sx={{ width: '1rem', margin: '0px 5px 0px 5px' }} />
                {item.EmployeeCount} employees
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
                <CalendarMonthIcon sx={{ width: '1rem', margin: '0px 5px 0px 5px' }} /> {item.Date}{' '}
                <QueryBuilderIcon sx={{ width: '1rem', margin: '0px 5px 0px 5px' }} /> Since {monthsSince}{' '}
                months
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary', padding: '15px 15px 0px 15px' }}>
                {item.ShortDescription}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
              <Button
                size="small"
                href={`/share/${item.CompanyName}`}
                sx={{
                  backgroundColor: '#232453',
                  color: 'white',
                  width: { xs: '40%', sm: '30%', md: '20%' },
                  '&:hover': {
                    backgroundColor: '#33348A',
                  },
                }}
              >
                Share
              </Button>

              <Button
                onClick={() => handleClick(index)}
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
                Learn More
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}