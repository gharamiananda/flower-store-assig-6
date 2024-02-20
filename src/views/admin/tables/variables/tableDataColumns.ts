type RowObj = {
	name: string;
	progress: string;
	quantity: number;
	date: string; 
};

const tableDataColumns: RowObj[] = [
	
	{
		name: 'Weekly Update',
		quantity: 1024,
		progress: '21.3%',
		date: '13 Mar 2021', 
	},
	{
		name: 'Venus 3D Asset',
		quantity: 858,
		progress: '31.5%',
		date: '24 Jan 2021', 
	}, 
];

export default tableDataColumns;
