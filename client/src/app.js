const API = '/api/destinations';
const API_REVIEW = '/api/reviews';
const API_ITINERARY = '/api/itineraries';

// Lấy danh sách tỉnh/thành từ dữ liệu địa điểm
async function loadProvinces() {
  const res = await fetch(API);
  const data = await res.json();
  const provinces = [...new Set(data.map(d => d.province))];
  const select = document.getElementById('province');
  provinces.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p; opt.textContent = p;
    select.appendChild(opt);
  });
}

// Hiển thị danh sách địa điểm
async function fetchDestinations() {
  const q = document.getElementById('search').value;
  const province = document.getElementById('province').value;
  const type = document.getElementById('type').value;
  let url = `${API}?`;
  if (q) url += `q=${encodeURIComponent(q)}&`;
  if (province) url += `province=${encodeURIComponent(province)}&`;
  if (type) url += `type=${encodeURIComponent(type)}&`;
  const res = await fetch(url);
  const data = await res.json();
  const container = document.getElementById('destinations');
  container.innerHTML = '';
  data.forEach(d => {
    const card = document.createElement('div');
    card.className = 'card';
    card.onclick = () => showDetails(d._id);
    card.innerHTML = `
      <img src="${d.images?.[0] || 'https://via.placeholder.com/400x160'}" alt="${d.name}">
      <div class="card-title">${d.name}</div>
      <div class="card-info">${d.province} | ${d.type}</div>
      <div class="card-info">Đánh giá: ${d.rating?.toFixed(1) || 0} (${d.reviewCount || 0})</div>
    `;
    container.appendChild(card);
  });
}

// Hiển thị chi tiết địa điểm
async function showDetails(id) {
  const res = await fetch(`${API}/${id}`);
  const d = await res.json();
  const details = document.getElementById('details');
  details.style.display = 'block';
  details.innerHTML = `
    <img class="details-img" src="${d.images?.[0] || 'https://via.placeholder.com/400x160'}" alt="${d.name}">
    <div class="details-title">${d.name}</div>
    <div class="details-info">${d.province} | ${d.type}</div>
    <div class="details-info">Địa chỉ: ${d.address || ''}</div>
    <div class="details-info">Giá vé: ${d.ticketPrice || 'Miễn phí'}</div>
    <div class="details-info">Thời gian mở cửa: ${d.openTime || ''}</div>
    <div class="details-info">Thời điểm phù hợp: ${d.bestTime || ''}</div>
    <div class="details-info">${d.description || ''}</div>
    <div class="details-info">Đánh giá: ${d.rating?.toFixed(1) || 0} (${d.reviewCount || 0})</div>
    <div id="itinerary"></div>
    <div id="review"></div>
  `;
  loadItinerary(id);
  loadReviews(id);
}

// Gợi ý lịch trình
async function loadItinerary(destinationId) {
  const res = await fetch(`${API_ITINERARY}/${destinationId}`);
  const data = await res.json();
  const container = document.getElementById('itinerary');
  if (data.length === 0) return;
  container.innerHTML = '<h3>Gợi ý lịch trình</h3>' + data.map(i => `<div><b>${i.title}</b><ul>${i.details.map(d => `<li>${d}</li>`).join('')}</ul></div>`).join('');
}

// Đánh giá/nhận xét
async function loadReviews(destinationId) {
  const res = await fetch(`${API_REVIEW}/${destinationId}`);
  const data = await res.json();
  const container = document.getElementById('review');
  container.innerHTML = '<h3>Đánh giá & Nhận xét</h3>' +
    '<div class="review-list">' + data.map(r => `<div class="review-item"><b>${r.userName}</b> - ${r.rating}/5<br>${r.comment}</div>`).join('') + '</div>' +
    `<div class="add-review">
      <input type="text" id="review-name" placeholder="Tên của bạn">
      <input type="number" id="review-rating" min="1" max="5" placeholder="Đánh giá (1-5)">
      <textarea id="review-comment" placeholder="Nhận xét..."></textarea>
      <button onclick="addReview('${destinationId}')">Gửi đánh giá</button>
    </div>`;
}

// Thêm đánh giá
async function addReview(destinationId) {
  const userName = document.getElementById('review-name').value;
  const rating = document.getElementById('review-rating').value;
  const comment = document.getElementById('review-comment').value;
  if (!userName || !rating) return alert('Vui lòng nhập tên và điểm đánh giá!');
  await fetch(API_REVIEW + '/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ destinationId, userName, rating, comment })
  });
  loadReviews(destinationId);
}

window.onload = () => {
  loadProvinces();
  fetchDestinations();
};
