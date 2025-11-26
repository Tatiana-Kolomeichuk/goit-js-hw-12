
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from "./js/render-functions.js";

const refs = {
  form: document.querySelector(".form"),
  input: document.querySelector(".input"),
  button: document.querySelector(".button"),
};

const { form, input, button } = refs;

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

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const query = input.value.trim();

  if (!query) {
    notifyEmptyQuery();
    return;
  }

  clearGallery();
  showLoader();
  button.disabled = true;
  input.disabled = true;

  getImagesByQuery(query)
    .then((data) => {
      const hits = Array.isArray(data?.hits) ? data.hits : [];

      if (!hits.length) {
        notifyNoResults();
        return;
      }

      createGallery(hits);
    })
    .catch((err) => {
      console.error(err);
      notifyError();
    })
    .finally(() => {
      hideLoader();
      button.disabled = false;
      input.disabled = false;
    });
});
