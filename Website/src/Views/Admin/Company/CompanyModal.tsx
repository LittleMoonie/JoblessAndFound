import React, { useState, useEffect } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material';
import { CompanyData } from './ManageCompanies';

interface CompanyModalProps {
	open: boolean;
	onClose: () => void;
	onSave: (company: {
		companyId: number;
		companyName: string;
		location: string;
		domain: string;
		employeesId: number;
	}) => void;
	initialData?: CompanyData;
}

const CompanyModal: React.FC<CompanyModalProps> = ({
	open,
	onClose,
	onSave,
	initialData,
}) => {
	const [companyData, setCompanyData] = useState({
		companyId: 0,
		companyName: '',
		location: '',
		domain: '',
		employeesId: 0,
	});

	// Initialize modal data with initial values (for editing)
	useEffect(() => {
		if (initialData) {
			setCompanyData({
				companyId: initialData.companyId,
				companyName: initialData.companyName,
				location: initialData.location,
				domain: initialData.domain,
				employeesId: initialData.employeesId,
			});
		} else {
			setCompanyData({
				companyId: 0,
				companyName: '',
				location: '',
				domain: '',
				employeesId: 0,
			});
		}
	}, [initialData]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCompanyData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = () => {
		onSave(companyData);
		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
			<DialogTitle>{initialData ? 'Edit Company' : 'Add Company'}</DialogTitle>
			<DialogContent>
				<TextField
					margin='dense'
					label='Company Name'
					name='companyName'
					value={companyData.companyName}
					onChange={handleInputChange}
					fullWidth
					required
				/>
				<TextField
					margin='dense'
					label='Location'
					name='location'
					value={companyData.location}
					onChange={handleInputChange}
					fullWidth
					required
				/>
				<TextField
					margin='dense'
					label='Domain'
					name='domain'
					value={companyData.domain}
					onChange={handleInputChange}
					fullWidth
					required
				/>
				<TextField
					margin='dense'
					label='Employees ID'
					name='employeesId'
					value={companyData.employeesId}
					onChange={handleInputChange}
					fullWidth
					required
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

export default CompanyModal;
