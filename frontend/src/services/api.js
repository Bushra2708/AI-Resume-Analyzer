import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://ai-resume-analyzer-73jb.onrender.com",
});

export default API;