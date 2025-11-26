import axios from "https://cdn.jsdelivr.net/npm/axios@1.7.7/+esm";

const API_BASE = "https://pixabay.com/api/";
const API_KEY = "53338306-ce631ed7cad64c964742be59c";

const PER_PAGE = 15; 
let page = 1;       


export function resetPage() {
  page = 1;
}

export async function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query.trim(),
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    per_page: PER_PAGE,
    page, 
  };

  const response = await axios.get(API_BASE, { params });


  page += 1;

  return response.data;
}