import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// const data = [
//   {
//     image: "https://placehold.co/600x400",
//     logo: "https://placehold.co/400",
//     business: "Business 1",
//     domain: "Tech",
//     location: "New York",
//     employees: "50",
//   },
//   {
//     image: "https://placehold.co/600x400",
//     logo: "https://placehold.co/400",
//     business: "Business 2",
//     domain: "Finance",
//     location: "Paris",
//     employees: "200",
//   },
//   {
//     image: "https://placehold.co/600x400",
//     logo: "https://placehold.co/400",
//     business: "Business 3",
//     domain: "Health",
//     location: "Berlin",
//     employees: "100",
//   },
// ];

export default function MediaCard() {

    const fetchData = async () => {
        const { data } = await axios.get('https://localhost:5001/api');
        return data;
      };
    
    const { data } = useQuery({
        queryKey: ['CompanyName'],
        queryFn: fetchData,
        // queryFn: apiClient.authentication_login()
      });

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {data.map((item: { CompanyName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; Domain: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; Location: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; EmployeeCount: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
        <Card key={index} sx={{ minWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image="https://placehold.co/600x400"
            title="img"
          />
          <CardMedia
            sx={{
              height: 80,
              width: 80,
              borderRadius: "10px",
              border: "1px solid black",
              position: "relative",
              bottom: 40,
              left: 20,
              zIndex: 5,
            }}
            image="https://placehold.co/600x400"
            title="logo"
          />
          <CardContent sx={{ position: "relative", bottom: 20 }}>
            <Typography gutterBottom variant="h5" component="div" sx={{ paddingLeft: "15px" }}>
              {item.CompanyName}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', paddingLeft: "15px" }}>
              {item.Domain}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', paddingLeft: "15px" }}>
              {item.Location}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', paddingLeft: "15px" }}>
              {item.EmployeeCount} Employees
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button size="small" href={`/share/${item.CompanyName}`}>Share</Button>
            <Button size="small" href={`/ads/${item.CompanyName}`}>Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
