const API_KEY = "499d03534f224e8890dcd1f95376001c";
const url = "https://newsapi.org/v2/everything?q="; // ✅ use HTTPS

let main = document.querySelector("main");

// Fetch Data
async function fetchData(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  return data;
}

// Initial load
fetchData("all").then(data => renderMain(data.articles));

// Menu button (mobile toggle)
let mobilemenu = document.querySelector(".mobile");
let menuBtn = document.querySelector(".menuBtn");

menuBtn.addEventListener("click", () => {
  mobilemenu.classList.toggle("hidden");
  main.classList.toggle("main-card");
});

// Render News Cards
function renderMain(arr) {
  let mainHTML = "";
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].urlToImage) {
      mainHTML += `
        <div class="card">
          <a href="${arr[i].url}" target="_blank">
            <img src="${arr[i].urlToImage}" loading="lazy" />
            <h4>${arr[i].title}</h4>
            <div class="publishbyDate">
              <p>${arr[i].source.name}</p>
              <span>•</span>
              <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
            </div>
            <div class="desc">
              ${arr[i].description || ""}
            </div>
          </a>
        </div>
      `;
    }
  }

  document.querySelector("main").innerHTML = mainHTML;
}

// Search Desktop
const searchBtn = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = await fetchData(searchInput.value);
  renderMain(data.articles);
});

// Search Mobile
const searchBtnMobile = document.getElementById("searchFormMobile");
const searchInputMobile = document.getElementById("searchInputMobile");

searchBtnMobile.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = await fetchData(searchInputMobile.value);
  renderMain(data.articles);
});

// Global Search function (for inline onclick)
async function Search(query) {
  const data = await fetchData(query);
  renderMain(data.articles);
}
window.Search = Search; // ✅ make it global
