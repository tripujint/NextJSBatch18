import { call, put } from "redux-saga/effects";
import CountryApi from "../../api/CountryApi";
import { GetCountryFailed, GetCountrySuccess, 
  GetOneCountrySuccess, GetOneCountryFailed, 
  DelCountrySuccess, DelCountryFailed,
  AddCountrySuccess, AddCountryFailed,
  EditCountrySuccess, EditCountryFailed 
} from "../Action/CountryAction";

function* handleGetCountry() {
  try {
    const result = yield call(CountryApi.list)
    yield put(GetCountrySuccess(result))
  } catch (error) {
    yield put(GetCountryFailed(error))
  }
}

function* handleGetOneCountry(action) {
  const { payload } = action
  try {
    const result = yield call(CountryApi.FindOne, payload)
    yield put(GetOneCountrySuccess(result))
  } catch (error) {
    yield put(GetOneCountryFailed(error))
  }
}

function* handleDelCountry(action) {
  const { payload } = action
  try {
    const result = yield call(CountryApi.Delete, payload)
    yield put(DelCountrySuccess(payload))
  } catch (error) {
    yield put(DelCountryFailed(error))
  }
}

function* handleAddCountry(action) {
  const { payload } = action
  try {
    const result = yield call(CountryApi.Create, payload)
    yield put(AddCountrySuccess(result.data))
  } catch (error) {
    yield put(AddCountryFailed(error))
  }
}

function* handleEditCountry(action) {
  const { payload } = action
  try {
    const result = yield call(CountryApi.Update, payload)
    yield put(EditCountrySuccess(result.data))
  } catch (error) {
    yield put(EditCountryFailed(error))
  }
}

export { handleGetCountry, handleGetOneCountry, handleDelCountry, handleAddCountry, handleEditCountry }