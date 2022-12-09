import { combineReducers } from "redux";
import CountryReducer from "./CountryReducer";
import RegionReduce from "./RegionReducer";
import UsrReducer from "./UsrReducer";

const rootReducer = combineReducers({
    usrStated: UsrReducer,
    regionStated: RegionReduce,
    countryStated: CountryReducer,
})

export default rootReducer