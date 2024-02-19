import Card from 'components/card'
import Checkbox from 'components/checkbox'
import { useGetFilterOptionsQuery } from '../../../../redux/features/product/productApi';
import { IFilterData } from './ProductList';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';
import { MdOutlinePauseCircleOutline } from 'react-icons/md';
import { IoAddCircleOutline } from 'react-icons/io5';
import React from 'react';




type TProps={
  productTypes:string[],
  setproductTypes:React.Dispatch<React.SetStateAction<string[]>>,
  productSizes:string[],
  setproductSizes:React.Dispatch<React.SetStateAction<string[]>>
  productFragnences:string[],
  setproductFragnences :   React.Dispatch<React.SetStateAction<string[]>>,
  productPrices: undefined| {minPrice:number,maxPrice:number},
  setproductPrices:React.Dispatch<React.SetStateAction<undefined| {minPrice:number,maxPrice:number}>>;
  settoDates :  React.Dispatch<React.SetStateAction<string>>,
  setFromDates: React.Dispatch<React.SetStateAction<string>>,
}



const FilterOptions :React.FC<TProps>= ({setproductPrices,setproductSizes,setproductFragnences,setproductTypes,productSizes,productFragnences,productTypes,setFromDates,settoDates}) => {


  const {data}=useGetFilterOptionsQuery<{data:{data:IFilterData}}>(undefined);


  const typesOptions= data?.data?.Products?.[0]?.types;
  const sizesOptions= data?.data?.Products?.[0]?.sizes;
  const fragrancesOptions= data?.data?.Products?.[0]?.fragrances;
  const suucessClassNameInput='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
  const successLabel=`block mb-2 text-sm font-medium text-gray-900 dark:text-white  text-left`;


  const onChange = (item:string,setcheckedOptions:React.Dispatch<React.SetStateAction<string[]>>,checkedOptions:string[]) => {
    
    setcheckedOptions(checkedOptions.includes(item) ? checkedOptions.filter(it=>it!==item) :  [...checkedOptions,item as string] );
  };


  return (


<Card>
  <div className="p-3">

    <div className="mb-4">


      <Accordion allowMultiple>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
      
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">    Select a Size</label>

        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    {
          sizesOptions?.map(it=>(

            <div className="flex mb-2" key={it}>



    <Checkbox
        // defaultChecked={info.getValue()[1]}
        // checked={selectedRowKeys.includes(info.getValue())}
        colorScheme="brandScheme"
        me="10px"
        name='sizes'
        value={it}
        onChange={() => {
          onChange(it,setproductSizes,productSizes)
        }}
        />
      <p className="ml-3 text-sm font-bold text-navy-700 dark:text-white">
      {it}
      </p>
    </div>
          ))
        }
    </AccordionPanel>
  </AccordionItem>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
      
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">    Select  types</label>

        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    {
          typesOptions?.map(it=>(

            <div className="flex mb-2" key={it}>



    <Checkbox
        // defaultChecked={info.getValue()[1]}
        // checked={selectedRowKeys.includes(info.getValue())}
        colorScheme="brandScheme"
        me="10px"
        name='sizes'
        value={it}
        onChange={() => {
          onChange(it,setproductTypes,productTypes)
        }}
        />
      <p className="ml-3 text-sm font-bold text-navy-700 dark:text-white">
      {it}
      </p>
    </div>
          ))
        }
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
      
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">  Select  Price Range</label>

        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
   
    <div className="mb-4 ">


    <div className="flex mb-2">



    <Checkbox
        // defaultChecked={info.getValue()[1]}
        // checked={selectedRowKeys.includes(info.getValue())}
        colorScheme="brandScheme"
        me="10px"
        onChange={() => {
          // const seletedId=info.getValue()
          // setSelectedRowKeys(prev=>prev.includes(tData?._id) ? prev.filter(it=>it!==tData?._id):[...prev,tData?._id])
        }}
        />
      <p className="ml-3 text-sm font-bold text-navy-700 dark:text-white">
        10-99
      </p>
    </div>
    <div className="flex  mb-2">



<Checkbox
    // defaultChecked={info.getValue()[1]}
    // checked={selectedRowKeys.includes(info.getValue())}
    colorScheme="brandScheme"
    me="10px"
    onChange={() => {
      // const seletedId=info.getValue()
      // setSelectedRowKeys(prev=>prev.includes(tData?._id) ? prev.filter(it=>it!==tData?._id):[...prev,tData?._id])
    }}
    />
  <p className="ml-3 text-sm font-bold text-navy-700 dark:text-white">
    100-499
  </p>
</div> 
<div className="flex  mb-2">



<Checkbox
    // defaultChecked={info.getValue()[1]}
    // checked={selectedRowKeys.includes(info.getValue())}
    colorScheme="brandScheme"
    me="10px"
    onChange={() => {
      // const seletedId=info.getValue()
      // setSelectedRowKeys(prev=>prev.includes(tData?._id) ? prev.filter(it=>it!==tData?._id):[...prev,tData?._id])
    }}
    />
  <p className="ml-3 text-sm font-bold text-navy-700 dark:text-white">
    500-1000
  </p>
</div>
        </div>
    </AccordionPanel>
  </AccordionItem>

</Accordion>
    



    

     
    </div>

    
    <div className="mb-4">



    <div className='mb-3'>
        <label htmlFor="first_name" className={successLabel}>Start Date</label>

            <input type="date" id="company"  onChange={e=>settoDates(e.target.value)}  name="soldDate" className={suucessClassNameInput} placeholder="Flowbite"  />
         {/* {formState?.errors?.soldDate &&   <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> {formState?.errors?.soldDate?.message}!</p>} */}

        </div>  

        <div className=''>
        <label htmlFor="first_name" className={successLabel}>End Date</label>

            <input type="date" id="company" onChange={e=>setFromDates(e.target.value)} name="soldDate" className={suucessClassNameInput} placeholder="Flowbite"  />
         {/* {formState?.errors?.soldDate &&   <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> {formState?.errors?.soldDate?.message}!</p>} */}

        </div>  

  

    </div>


<div className="">
<Accordion allowMultiple>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a Fragnance</label>

        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
     
{
          fragrancesOptions?.map(it=>(

            <div className="flex mb-2" key={it}>



    <Checkbox
        // defaultChecked={info.getValue()[1]}
        // checked={selectedRowKeys.includes(info.getValue())}
        colorScheme="brandScheme"
        me="10px"
        name='fragrances'

        onChange={() => onChange(it,setproductFragnences,fragrancesOptions)}
        />
      <p className="ml-3 text-sm font-bold text-navy-700 dark:text-white">
      {it}
      </p>
    </div>
          ))
        }
    </AccordionPanel>
  </AccordionItem>

</Accordion>
</div>
  
  </div>
    </Card>
  
    
  )
}

export default FilterOptions