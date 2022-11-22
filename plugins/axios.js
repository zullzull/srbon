import axios from "axios";
import nextConfig from "../next.config";

export default axios.create({
  baseURL: nextConfig.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // 'User-Agent': typeof(window) == 'undefined' ? 'mineral-store-ssr' : navigator.userAgent
  },
});
