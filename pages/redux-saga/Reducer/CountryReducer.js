import * as ActionType from '../Constants/CountryConst'

const INIT_STATE = {
  countries:[],
  country:[],
}

const CountryReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ActionType.GET_COUNTRY_REQUEST:
      return {...state}
    case ActionType.GET_COUNTRY_SUCCESS:
      return getCountry(state,action)
    case ActionType.GETONE_COUNTRY_REQUEST:
      return {...state}
    case ActionType.GETONE_COUNTRY_SUCCESS:
      return getOneCountry(state,action)
    case ActionType.DEL_COUNTRY_REQUEST:
      return {...state}
    case ActionType.DEL_COUNTRY_SUCCESS:
      return delCountry(state,action)
    case ActionType.ADD_COUNTRY_REQUEST:
      return {...state}
    case ActionType.ADD_COUNTRY_SUCCESS:
      return addCountry(state,action)
    case ActionType.EDIT_COUNTRY_REQUEST:
      return {...state}
    case ActionType.EDIT_COUNTRY_SUCCESS:
      return editCountry(state,action)
    default:
      return state
  }
}

const getCountry = (state,action) => {
  return {
    ...state,
    countries: action.payload
  }
}

const getOneCountry = (state,action) => {
  return {
    ...state,
    country: action.payload
  }
}

const delCountry = (state,action) => {
  const { payload } = action
  const filter = state.countries.filter(el=>el.countryId !== payload)
  return {
    ...state,
    countries: [...filter]
  }
}

const addCountry = (state,action) => {
  const { payload } = action
  return {
    ...state,
    countries: [...state.countries, payload]
    // countries: action
  }
}

const editCountry = (state,action) => {
  const { payload } = action
  const filter = state.countries.filter(el=>el.countryId !== payload.countryId)
  return {
    ...state,
    // countries: [...filter, payload]
    countries: [...state.countries, payload]
  }
}

export default CountryReducer