const API = '/api/destinations';
const API_REVIEW = '/api/reviews';
const API_ITINERARY = '/api/itineraries';

const API_AUTH = '/api/auth';
let currentUser = null;

function setUser(username) {
  currentUser = username;
  document.getElementById('user-info').style.display = 'block';
  document.getElementById('user-name').textContent = username;
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('register-form').style.display = 'none';
  document.getElementById('booking-history').style.display = 'block';
  loadBookingHistory();
}

function logout() {
  currentUser = null;
  localStorage.removeItem('token');
  document.getElementById('user-info').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
  document.getElementById('register-form').style.display = 'block';
  document.getElementById('booking-history').style.display = 'none';
}

async function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  const res = await fetch(API_AUTH + '/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
    setUser(data.username);
    document.getElementById('login-msg').textContent = '';
  } else {
    document.getElementById('login-msg').textContent = data.error || 'Đăng nhập thất bại';
  }
}

async function register() {
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;
  const res = await fetch(API_AUTH + '/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (data.message === 'Registered') {
    document.getElementById('register-msg').textContent = 'Đăng ký thành công!';
  } else {
    document.getElementById('register-msg').textContent = data.error || 'Đăng ký thất bại';
  }
}

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
  document.getElementById('loading-spinner').style.display = 'block';
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
  setTimeout(() => {
    document.getElementById('loading-spinner').style.display = 'none';
    data.forEach((d, i) => {
      const card = document.createElement('div');
      card.className = 'card animated-card';
      card.style.animationDelay = `${i * 0.08}s`;
      card.onclick = () => showDetails(d._id);
      card.innerHTML = `
        <img src="${d.images?.[0] || 'https://via.placeholder.com/400x160'}" alt="${d.name}">
        <div class="card-title">${d.name}</div>
        <div class="card-info">${d.province} | ${d.type}</div>
        <div class="card-info">Đánh giá: ${d.rating?.toFixed(1) || 0} (${d.reviewCount || 0})</div>
      `;
      container.appendChild(card);
    });
  }, 400);
}

// Hiển thị chi tiết địa điểm
async function showDetails(id) {
  const res = await fetch(`${API}/${id}`);
  const d = await res.json();
  const details = document.getElementById('details');
  details.style.display = 'block';
  details.classList.add('fade-in');
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
    <div id="booking"></div>
    <div id="itinerary"></div>
    <div id="review"></div>
  `;
  showBookingForm(id);
  loadItinerary(id);
  loadReviews(id);
  setTimeout(() => details.classList.remove('fade-in'), 800);
}

// Gửi booking
async function bookService(destinationId) {
  const name = document.getElementById('booking-name').value;
  const phone = document.getElementById('booking-phone').value;
  const date = document.getElementById('booking-date').value;
  if (!name || !phone || !date) {
    document.getElementById('booking-msg').textContent = 'Vui lòng nhập đầy đủ thông tin!';
    return;
  }
  const token = localStorage.getItem('token');
  const res = await fetch('/api/bookings/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ destinationId, name, phone, date })
  });
  const data = await res.json();
  if (data._id) {
    document.getElementById('booking-msg').textContent = 'Đặt dịch vụ thành công!';
  } else {
    document.getElementById('booking-msg').textContent = data.error || 'Đặt dịch vụ thất bại!';
  }
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
  if (!currentUser) return alert('Bạn cần đăng nhập để đánh giá!');
  const userName = currentUser;
  const rating = document.getElementById('review-rating').value;
  const comment = document.getElementById('review-comment').value;
  if (!rating) return alert('Vui lòng nhập điểm đánh giá!');
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
  // Kiểm tra đăng nhập
  const token = localStorage.getItem('token');
  if (token) {
    // Giải mã token đơn giản (không kiểm tra hết hạn)
    const payload = JSON.parse(atob(token.split('.')[1]));
    setUser(payload.username);
  }
  else {
    document.getElementById('booking-history').style.display = 'none';
  }
};
// Lịch sử booking
async function loadBookingHistory() {
  const token = localStorage.getItem('token');
  if (!token) return;
  const res = await fetch('/api/bookings/my', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const data = await res.json();
  const container = document.getElementById('booking-history');
  if (!Array.isArray(data) || data.length === 0) {
    container.innerHTML = '<h3>Lịch sử booking</h3><div>Chưa có booking nào.</div>';
    return;
  }
  container.innerHTML = '<h3>Lịch sử booking</h3>' + data.map(b => `
    <div class="booking-item">
      <b>${b.name}</b> - ${b.phone} - ${b.date}<br>
      Địa điểm: ${b.destinationId?.name || ''}<br>
      Trạng thái: ${b.confirmed ? '<span style="color:green">Đã xác nhận</span>' : `<button onclick="confirmBooking('${b._id}')">Xác nhận</button>`}
    </div>
  `).join('');
}

// Xác nhận booking
async function confirmBooking(id) {
  const token = localStorage.getItem('token');
  const res = await fetch(`/api/bookings/confirm/${id}`, {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const data = await res.json();
  if (data.message === 'Confirmed') {
    loadBookingHistory();
  }
}
