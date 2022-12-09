import { ChevronLeftIcon, ChevronRightIcon, InformationCircleIcon, TrashIcon } from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from '../component/Header/Header'
import Layout from '../component/layout/Layout'
import { DelCountryRequest, GetCountryRequest } from '../redux-saga/Action/CountryAction'
import { GetRegionRequest } from '../redux-saga/Action/RegionAction'
import FormEditCountry from './FormEditCountry'
import FormikAddCountry from './FormikAddCountry'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CountryView() {
  const dispatch = useDispatch()
  const [listCountry, setListCountry] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [display, setDisplay] = useState(false)
  const [displayEdit, setDisplayEdit] = useState(false)
  const [id, setId] = useState()
  const [pageNumbers, setPageNumbers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageRange, setPageRange] = useState(0)

  const { countries } = useSelector((state) => state.countryStated)
  const [filter, setFilter] = useState({
    input: ''
  })

  useEffect(() => {
    dispatch(
      GetCountryRequest())
  }, [])

  useEffect(() => {
    setListCountry(
      Array.isArray(countries) && countries.filter(data => (
        (data.countryName.toLowerCase().includes(filter.input.toLowerCase()))
        // (data.region.regionName.toLowerCase().includes(filter.input.toLowerCase()))
      ))
    )
  }, [countries])

  useEffect(() => {
    setPageNumbers(Array.from({ length: Math.ceil(listCountry.length / 5) }, (v, i) => (i + 1 === 1 ? { number: i + 1, active: true } : { number : i + 1, active: false })))
    setCurrentPage(1)
    setPageRange(0)
  }, [listCountry])

  const handleOnChange = (name) => (event) => {
    setFilter({ ...filter, [name]: event.target.value })
  }

  const onSearch = (e) => {
    e.preventDefault()
    setListCountry(
      Array.isArray(countries) && countries.filter(data => (
        (data.countryName.toLowerCase().includes(filter.input.toLowerCase()))
        // (data.region.regionName.toLowerCase().includes(filter.input.toLowerCase()))
      ))
    )
  }

  const onDelete = async (id) => {
    dispatch(DelCountryRequest(id))
    toast.success('Data has been deleted.')
  }

  const onClick = (id) => {
    setDisplayEdit(true)
    setId(id)
  }

  return (
    <div>
      {
        displayEdit ?
          <FormEditCountry
            id={id}
            setDisplay={setDisplayEdit}
            closeAdd={() => setDisplayEdit(false)}
            onRefresh={() => setRefresh(true)}
          />
        :
        display ?
          <FormikAddCountry
            setDisplay={setDisplay}
            closeAdd={() => setDisplay(false)}
            onRefresh={() => setRefresh(true)}
          />
        :
        <>
          <Layout>
            <Header name={'Country'} setDisplay={setDisplay} />
            <form action={(e)=>onSearch(e)}>
              <div className="form-control">
                <div className="input-group relative flex justify-center items-stretch w-full mb-2">
                  <input 
                    type="search"
                    onChange={handleOnChange('input')}
                    placeholder="Search"
                    className="input input-bordered input-sm" />
                  <button
                    type='submit'
                    onClick={(e)=>onSearch(e)}
                    className="btn btn-square btn-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </button>
                </div>
              </div>
            </form>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Country ID</th>
                    <th>Country Name</th>
                    <th>Region</th>
                    <th className='text-right'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    Array.isArray(listCountry) && listCountry.slice((currentPage - 1) * 5, currentPage * 5).map((dt) => (
                      <tr key={dt.countryId}>
                        <td>{dt.countryId}</td>
                        <td>{dt.countryName}</td>
                        <td>{dt.region.regionName}</td>
                        <td className='text-right'>
                          <button className='btn btn-sm btn-accent text-white text-xs font-normal ml-2'onClick={() => onClick(dt.countryId)}>Edit</button>
                          <button className='btn btn-sm btn-error text-white text-xs font-normal ml-2'
                            onClick={() => {
                            if (window.confirm("Delete this data?"))
                              onDelete(dt.countryId)
                            }}
                          > Delete</button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              {listCountry.length === 0 &&
                <div className='px-6 py-3 text-center whitespace-nowrap text-sm font-medium text-gray-900'> Data Not Found...</div>}

              <div  className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(currentPage - 1) * 5 + 1}</span> to <span className="font-medium">{(currentPage) * 5 < listCountry.length ? (currentPage) * 5 : listCountry.length}</span> of{' '}
                    <span className="font-medium">{listCountry.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={()=>{
                        setCurrentPage(1)
                        setPageNumbers([...pageNumbers].map(val => (val.number === 1 ? { ...val, active: true } : { ...val, active: false })))
                        setPageRange(0)
                      }}
                      className="relative inline-flex items-center px-3 py-2 font-medium text-gray-600 hover:text-orange-600"
                    >
                      First
                    </button>
                    <button
                      onClick={()=>{
                        const min=0
                        if (pageRange > min) {
                          setPageRange(pageRange - 1)
                        }
                      }}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </button>

                    {pageNumbers.slice(pageRange * 3, pageRange * 3 + 3).map(el => (
                      <button
                        key={el.number}
                        onClick={()=>{
                          setCurrentPage(el.number)
                          setPageNumbers([...pageNumbers].map(val => (val.number === el.number ? { ...val, active: true } : { ...val, active: false })))
                        }}
                        aria-current="page"
                        className={classNames(el.active ? "z-20 bg-orange-100 border-orange-600 text-orange-900" : "z-10 bg-white border-gray-300 text-gray-600",
                            "relative inline-flex items-center px-4 py-2 border text-sm font-medium")}
                      >
                        {el.number}
                      </button>
                    ))}

                    <button
                      onClick={() => {
                        const max = Math.ceil(pageNumbers.length / 4) - 1
                        if (pageRange < max) {
                            setPageRange(pageRange + 1)
                        }
                      }}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => {
                        const max = Math.ceil(pageNumbers.length / 4) - 1
                        setCurrentPage(pageNumbers.length)
                        setPageNumbers([...pageNumbers].map(val => (val.number === pageNumbers.length ? { ...val, active: true } : { ...val, active: false })))
                        setPageRange(max)
                      }}
                        className="relative inline-flex items-center px-3 py-2 font-medium text-gray-600 hover:text-orange-600"
                    >
                        <span className="underline">Last</span>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
            <div className='z-30' >
                <ToastContainer autoClose={2000} />
            </div>
          </Layout>
        </>
      }
    </div>
  )
}