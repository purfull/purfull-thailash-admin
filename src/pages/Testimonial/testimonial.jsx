import React, { useEffect } from 'react'
import { show, testimonialGetAll } from '../../store/slice/testimonailSlice'
import { useDispatch, useSelector } from 'react-redux'
import CustomTable from '../../components/table/Table'



const Testimonial = () => {
    //   const useselector = useSelector((state) => state.com);

    const testimonialSelector =  useSelector((state)=> state.testimonial) 
    
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(testimonialGetAll())
    },[])

    // const data = [{name: "aaa", age:"bbb"}]
    const columns = [
      { title: 'Name', dataIndex: 'name' },
      { title: 'Rating', dataIndex: 'retting' },
      { title: 'createdAt', dataIndex: 'createdAt' },
      { title: 'Action', dataIndex: 'action' },
    ]

  return (
    <CustomTable columns={columns} data={testimonialSelector.testimonialTableData} />
  )
}

export default Testimonial