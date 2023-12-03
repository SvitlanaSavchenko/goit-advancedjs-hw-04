import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';

const searchForm = document.getElementById('search-form');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.getElementById('gallery');

let page = 1;
let searchQuery = '';

const baseURL = 'https://pixabay.com/api/';
const apiKey = '41042730-e71566aaa26e0b69c1c299757';

const fetchImages = async (query, pageNumber, perPage = 20) => {
  try {
    const response = await axios.get(baseURL, {
      params: {
        key: apiKey,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: pageNumber,
        per_page: perPage,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};

const displayImages = images => {
  const htmlString = images
    .map(
      image => `
    <div class="photo-card">
      <a href="${image.largeImageURL}" data-lightbox="image">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${image.likes}</p>
        <p class="info-item"><b>Views:</b> ${image.views}</p>
        <p class="info-item"><b>Comments:</b> ${image.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
      </div>
    </div>
  `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', htmlString);

  // Оновлення SimpleLightbox після додавання нових карток
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
};

const showMessage = message => {
  iziToast.info({
    message: message,
    theme: 'dark',
    position: 'topCenter',
  });
};

loadMoreBtn.style.display = 'none';

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  searchQuery = event.target.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    showMessage('Please enter a search term');
    return;
  }

  page = 1;
  const data = await fetchImages(searchQuery, page);

  if (data.totalHits === 0) {
    showMessage(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    gallery.innerHTML = '';
    return;
  }

  gallery.innerHTML = ''; // Очищення галереї перед новим пошуком
  displayImages(data.hits);
  showMessage(`Hooray! We found ${data.totalHits} images.`);
  loadMoreBtn.style.display = 'block';
});

loadMoreBtn.addEventListener('click', async () => {
  page++;
  const data = await fetchImages(searchQuery, page);

  if (data.hits.length === 0) {
    showMessage("We're sorry, but you've reached the end of search results.");
    loadMoreBtn.style.display = 'none';
    return;
  }

  displayImages(data.hits);

  // Плавне прокручування після завантаження нових зображень
  const { height: cardHeight } = document
    .querySelector('.photo-card')
    .getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
});
