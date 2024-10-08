import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard() {
    return (
        <Card sx={{ minWidth: 345 }}>
            <CardMedia
                sx={{
                    height: 140,
                }}
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
                image="https://placehold.co/400"
                title="logo"
            />

            <CardContent
                sx={{
                    position: "relative",
                    bottom: 20,
                }}
            >

                <Typography gutterBottom variant="h5" component="div"
                    sx={{
                        paddingLeft: "15px"
                    }}
                >
                    Business
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', paddingLeft: "15px" }}>
                    Domain
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', paddingLeft: "15px" }}>
                    Location
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', paddingLeft: "15px" }}>
                    Employees
                </Typography>

            </CardContent>
            <CardActions
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}