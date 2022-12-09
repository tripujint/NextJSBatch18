import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { AddCountryRequest, GetCountryRequest } from '../redux-saga/Action/CountryAction'
import { GetOneRegionRequest } from '../redux-saga/Action/RegionAction'

export default function FormikAddCountry(props) {
  const dispatch = useDispatch()
  const router = useRouter()
  const { regions } = useSelector((state) => state.regionStated)
  const { region } = useSelector(state => state.regionStated)
  const validationSchema = Yup.object().shape({
    countryId: Yup.string('Enter Country ID').required('Country ID is Required'),
    countryName: Yup.string('Enter Country Name').required('Country Name is Required'),
    region: Yup.number('Choose Region').required('Region is Required')
  })

  // useEffect(() => {
  //   dispatch(GetCountryRequest())
  // }, [])

  const formik = useFormik({
    initialValues: {
      countryId: '',
      countryName: '',
      region: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const region_id = values.region
      dispatch(GetOneRegionRequest(region_id))

      let payload = {
        countryId: values.countryId,
        countryName: values.countryName,
        regionId: values.region,
        regionName: region.regionName
      };

      dispatch(AddCountryRequest(payload))
      props.closeAdd()
      window.alert('Data Successfully Added')
      props.onRefresh()
    }
  })

  return (
    <div>
      <div className="mt-10 sm:mt-0 w-1/2 justify-center">
        {/* <div className="mt-5 md:col-span-2 md:mt-0"> */}
          <form onSubmit={formik.handleSubmit}>
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6">
                    <label htmlFor="country-Id" className="block text-sm font-medium text-gray-700">
                      Country ID
                    </label>
                    <input
                      type="text"
                      name="countryId"
                      id="countryId"
                      max="2"
                      value={formik.values.countryId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      autoComplete="countryId"
                      onInvalid={formik.validateField}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {formik.touched.countryId && formik.errors.countryId ? <span className="mt-2 text-sm text-red-600">{formik.errors.countryId}</span> : null}
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="countryName" className="block text-sm font-medium text-gray-700">
                      Country Name
                    </label>
                    <input
                      type="text"
                      name="countryName"
                      id="countryName"
                      value={formik.values.countryName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      autoComplete="countryName"
                      onInvalid={formik.validateField}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {formik.touched.countryName && formik.errors.countryName ? <span className="mt-2 text-sm text-red-600">{formik.errors.countryName}</span> : null}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                      Region
                    </label>
                    <input
                      type="number"
                      name="region"
                      id="region"
                      value={formik.values.region}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      autoComplete="region"
                      onInvalid={formik.validateField}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {/* <select
                      id="region"
                      name="region"
                      value={formik.values.region}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      autoComplete="region"
                      onInvalid={formik.validateField}
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      {regions && regions.map((dt) => (
                        <option key={dt.regionId} value={dt.regionId}>{dt.regionName}</option>
                      ))}
                    </select> */}
                    {formik.touched.region && formik.errors.region ? <span className="mt-2 text-sm text-red-600">{formik.errors.region}</span> : null}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  onClick={() => props.setDisplay(false)}
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-200 py-2 px-4 text-sm font-medium shadow-sm hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  // onClick={formik.handleSubmit}
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        {/* </div> */}
      </div>
    </div>
  )
}
