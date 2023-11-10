import axios from "axios";

const URL = "https://651d81ac44e393af2d59ebff.mockapi.io/notifications";
export const getNotifications = async() => {
    const resp = await axios.get(URL);
    return resp.data;
 } 
 export const addNotification = async(data) => {
    const resp = await axios.post(URL, data);
    return resp.data;
 }
 export const deleteNotification = async(id) => {
    const resp = await axios.delete(`https://651d81ac44e393af2d59ebff.mockapi.io/notifications/${id}`);
    return resp.data;
 }
