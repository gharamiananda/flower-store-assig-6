type RowObj = {
	name: [string, boolean];
	progress: string;
	quantity: number;
	date: string; 
};

const tableDataCheck: RowObj[] = [

	{
		name: [ 'Weekly Update', true ],
		quantity: 1024,
		progress: '21.3%',
		date: '13 Mar 2021',
	},
	{
		name: [ 'Venus 3D Asset', true ],
		quantity: 858,
		progress: '31.5%',
		date: '24 Jan 2021',
	},
	{
		name: [ 'Marketplace', true ],
		quantity: 258,
		progress: '12.2%',
		date: '24 Oct 2022',
	}
];

export default tableDataCheck;
