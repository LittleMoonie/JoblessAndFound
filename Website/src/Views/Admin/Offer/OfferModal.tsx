import React, { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';

interface OfferModalProps {

    open: boolean;

    onClose: () => void;

    onSave: (offer: OfferData & { createdAt: string; updatedAt: string }) => void;

    initialData?: OfferData;

}

export interface OfferData {
    offerAdvertisementId: number;
    title: string;
    description: string;
    longDescription: string;
    companyId: number;
    postedByUserId: number;
}

const OfferModal: React.FC<OfferModalProps> = ({ open, onClose, onSave, initialData }) => {
    const [offerData, setOfferData] = useState<OfferData>({
        offerAdvertisementId: 0,
        title: '',
        description: '',
        longDescription: '',
        companyId: 0,
        postedByUserId: 0,
    });

    useEffect(() => {
        if (initialData) {
            setOfferData(initialData);
        } else {
            setOfferData({
                offerAdvertisementId: 0,
                title: '',
                description: '',
                longDescription: '',
                companyId: 0,
                postedByUserId: 0,
            });
        }
    }, [initialData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOfferData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        onSave({
            ...offerData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
            <DialogTitle>{initialData ? 'Edit Offer' : 'Add Offer'}</DialogTitle>
            <DialogContent>
                <TextField
                    margin='dense'
                    label='Title'
                    name='title'
                    value={offerData.title}
                    onChange={handleInputChange}
                    fullWidth
                    required
                />
                <TextField
                    margin='dense'
                    label='Description'
                    name='description'
                    value={offerData.description}
                    onChange={handleInputChange}
                    fullWidth
                    required
                />
                <TextField
                    margin='dense'
                    label='Long Description'
                    name='longDescription'
                    value={offerData.longDescription}
                    onChange={handleInputChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color='secondary'>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color='primary'>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default OfferModal;
