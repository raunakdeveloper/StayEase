const map = L.map("map").setView([lat, lng], 12);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

const offsetLat = lat + (Math.random() - 0.5) * 0.02;
const offsetLng = lng + (Math.random() - 0.5) * 0.02;

L.marker([offsetLat, offsetLng])
  .addTo(map)
  .bindPopup("Exact Location will be shown after booking.")
  .openPopup();
