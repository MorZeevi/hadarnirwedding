import './Map.scss';

function Map() {
  // TODO: Update these with actual venue details
  const venueDetails = {
    name: 'אולמי הגן',
    address: 'רחוב הפרחים 15, תל אביב',
    // You can get this from Google Maps > Share > Embed
    // For now, using a placeholder that centers on Tel Aviv
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108169.00223476289!2d34.74726635!3d32.0852999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4ca6193b7c1f%3A0xc1fb72a2c0963f90!2sTel%20Aviv-Yafo!5e0!3m2!1sen!2sil!4v1234567890',
  };

  // Google Maps navigation URL
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueDetails.address)}`;

  return (
    <section className="map">
      <div className="map__container">
        <h2 className="map__title">איך מגיעים?</h2>

        <div className="map__content">
          <div className="map__info">
            <h3 className="map__venue-name">{venueDetails.name}</h3>
            <p className="map__address">{venueDetails.address}</p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="map__navigate-btn"
            >
              פתח בניווט
            </a>
          </div>

          <div className="map__embed">
            <iframe
              src={venueDetails.embedUrl}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="מיקום האירוע"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Map;
