const API_BASE = '/api';

export async function fetchDestinations(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/destinations?${query}`);
  return res.json();
}

export async function fetchDestinationById(id) {
  const res = await fetch(`${API_BASE}/destinations/${id}`);
  return res.json();
}

export async function fetchItinerary(destinationId) {
  const res = await fetch(`${API_BASE}/itineraries/${destinationId}`);
  return res.json();
}

export async function fetchReviews(destinationId) {
  const res = await fetch(`${API_BASE}/reviews/${destinationId}`);
  return res.json();
}

export async function addReview(data) {
  const res = await fetch(`${API_BASE}/reviews/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}
