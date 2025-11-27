import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery, resetPage } from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  hideLoadMoreButton,
  showLoadMoreButton
} from "./js/render-functions.js";

const refs = {
  form: document.querySelector(".form"),
  input: document.querySelector(".input"),
  button: document.querySelector(".button"),
  loadMoreBtn: document.querySelector('.load-more'),
};

const { form, input, button,loadMoreBtn } = refs;


let currentQuery = "";
let loadedImages = 0;  
let totalImages = 0;

function notifyEmptyQuery() {
  iziToast.warning({
    title: "Увага",
    message: "Введіть слово для пошуку.",
    position: "topRight",
    timeout: 2500,
  });
}

function notifyNoResults() {
  iziToast.info({
    title: "Немає збігів",
    message:
      "Sorry, there are no images matching your search query. Please try again!",
    position: "topRight",
    timeout: 3200,
  });
}

function notifyError(msg = "Сталася помилка. Спробуйте знову.") {
  iziToast.error({
    title: "Помилка",
    message: msg,
    position: "topRight",
    timeout: 4000,
  });
}

function notifyEndOfResults() {
  iziToast.info({
    title: 'Info',
    message: "We're sorry, but you've reached the end of search results.",
    position: 'topRight',
    timeout: 3000,
  });
}

form.addEventListener("submit", onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);
async function onFormSubmit(event) {
  event.preventDefault();

  const query = input.value.trim();

  if (!query) {
    notifyEmptyQuery();
    return;
  }

  
  if (query !== currentQuery) {
    currentQuery = query;
    resetPage();
    loadedImages = 0;
    totalImages = 0;
    clearGallery();
  }


  hideLoadMoreButton();

  await fetchAndRenderImages();
}


async function onLoadMore() {
  await fetchAndRenderImages();
}
function smoothScrollAfterLoad() {
  const firstCard = document.querySelector('.gallery .card');
  if (!firstCard) return;

  const cardHeight = firstCard.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

async function fetchAndRenderImages() {
  showLoader();
  button.disabled = true;
  input.disabled = true;
  loadMoreBtn.disabled = true;

  
  const isFirstPageLoad = loadedImages === 0;

  try {
    const data = await getImagesByQuery(currentQuery);
    const hits = Array.isArray(data?.hits) ? data.hits : [];
    const totalHits = Number(data?.totalHits) || 0;

    
    if (!hits.length && loadedImages === 0) {
      notifyNoResults();
      hideLoadMoreButton();
      return;
    }

    
    totalImages = totalHits;

    
    createGallery(hits);
    loadedImages += hits.length;

    
    if (!isFirstPageLoad) {
      smoothScrollAfterLoad();
    }

    if (loadedImages >= totalImages) {
      hideLoadMoreButton();
      notifyEndOfResults();
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error(error);
    notifyError();
    hideLoadMoreButton();
  } finally {
    hideLoader();
    button.disabled = false;
    input.disabled = false;
    loadMoreBtn.disabled = false;
  }
}