import axios from "axios";

const api = axios.create({ baseURL: "https://api.dinver.eu/api", });

export default api;