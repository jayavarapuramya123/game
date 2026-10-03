import axios from 'axios';
const api=axios.create({baseURL:import.meta.env.VITE_API_URL||'http://localhost:4000/api'});
api.interceptors.request.use(config=>{const token=localStorage.getItem('gz_token');if(token)config.headers.Authorization=`Bearer ${token}`;return config;});
api.interceptors.response.use(r=>r.data,err=>Promise.reject(new Error(err.response?.data?.message||'Could not reach GameZone API')));
export default api;
