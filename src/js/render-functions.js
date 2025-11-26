import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import "loaders.css";

const galleryEl = document.querySelector("#gallery");
const loaderEl = document.querySelector("#loader");
let lightbox = null;

export function createGallery(images = []) {
    const markup = images.map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads
    }) => `
    <li class="card">
      <a class="gallery__link" href="${largeImageURL}" title="${tags}">
        <img class="thumb" src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="meta">
        <span class="stat"><span class="label">Likes:</span> ${likes.toLocaleString()}</span>
        <span class="stat"><span class="label">Views:</span> ${views.toLocaleString()}</span>
        <span class="stat"><span class="label">Comments:</span> ${comments.toLocaleString()}</span>
        <span class="stat"><span class="label">Downloads:</span> ${downloads.toLocaleString()}</span>
      </div>
    </li>
  `).join("");

    galleryEl.innerHTML = markup;

if (!lightbox) {
    lightbox = new SimpleLightbox(".gallery a", {
      captions: true,
      captionsData: "alt",
      captionDelay: 200,
      animationSpeed: 200
    });
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  galleryEl.innerHTML = "";
}
export function showLoader() {
  loaderEl.classList.remove('hidden'); 
}

export function hideLoader() {
  loaderEl.classList.add('hidden');
}