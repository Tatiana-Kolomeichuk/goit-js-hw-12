import axios from "https://cdn.jsdelivr.net/npm/axios@1.7.7/+esm";
const API_BASE = "https://pixabay.com/api/";
const API_KEY = "53338306-ce631ed7cad64c964742be59c";

export function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query.trim(),
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    per_page: 40
  };

  return axios
    .get(API_BASE, { params })
    .then((res) => res.data);

}