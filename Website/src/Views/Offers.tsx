import React from 'react';
import MediaCard from '../Components/AdCards';
import { ApiProvider } from '../Context/apiContext';

function OffersPage() {
	return (
		<ApiProvider>
			<MediaCard />
		</ApiProvider>
	);
}

export default OffersPage;
