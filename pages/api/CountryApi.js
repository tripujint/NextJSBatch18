import axios from "axios"
import { domain } from "../config/config"

const list = async()=>{
    try {
        const result = await axios.get(`${domain}/api/country`)
        // console.log(result);
        return result.data
    } catch (error) {
        return await error.message
    }
}
const Delete = async(id)=>{
    try {
        const result = await axios.delete(`${domain}/api/country/${id}`)
        return result
    } catch (error) {
        return await error.message
    }
}
const Create = async(payload)=>{
    try {
        const result = await axios.post(`${domain}/api/country`,payload)
        console.log(payload);
        return result
    } catch (error) {
        return await error.message
    }
}
const Update = async(payload)=>{
    try {
        const result = await axios.put(`${domain}/api/country/${payload.countryId}`,payload)
        return result
    } catch (error) {
        return await error.message
    }
}
const FindOne = async(id)=>{
    try {
        const result = await axios.get(`${domain}/api/country/${id}`)
        return result.data
    } catch (error) {
        return await error.message
    }
}
export default {list,Delete,Create,Update,FindOne}