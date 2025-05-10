<script>
  // You can make this a bit fuzzy for privacy if needed
  const lat = <%= listing.geometry?.coordinates[1] || 28.6139 %>; // fallback: Delhi lat
  const lng = <%= listing.geometry?.coordinates[0] || 77.2090 %>; // fallback: Delhi lng

  const map = L.map('map').setView([lat, lng], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Optional fuzzy location offset
  const offsetLat = lat + (Math.random() - 0.5) * 0.02;
  const offsetLng = lng + (Math.random() - 0.5) * 0.02;

  L.marker([offsetLat, offsetLng]).addTo(map)
    .bindPopup('Approximate Location')
    .openPopup();
</script>
