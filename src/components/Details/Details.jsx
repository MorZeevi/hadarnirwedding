import './Details.scss';

function Details() {
  // TODO: Update these with actual wedding details
  const weddingDetails = {
    date: 'יום ראשון, ט״ז בסיון תשפ״ה',
    dateGregorian: '15.06.2025',
    time: '19:00',
    receptionTime: '18:00',
    venue: 'אולמי הגן',
    address: 'רחוב הפרחים 15, תל אביב',
    dressCode: 'אלגנטי',
  };

  return (
    <section className="details">
      <div className="details__container">
        <h2 className="details__title">פרטי האירוע</h2>

        <div className="details__cards">
          <div className="details__card">
            <div className="details__icon">📅</div>
            <h3 className="details__card-title">תאריך</h3>
            <p className="details__card-text">{weddingDetails.date}</p>
            <p className="details__card-subtext">{weddingDetails.dateGregorian}</p>
          </div>

          <div className="details__card">
            <div className="details__icon">⏰</div>
            <h3 className="details__card-title">שעות</h3>
            <p className="details__card-text">קבלת פנים: {weddingDetails.receptionTime}</p>
            <p className="details__card-text">חופה: {weddingDetails.time}</p>
          </div>

          <div className="details__card">
            <div className="details__icon">📍</div>
            <h3 className="details__card-title">מקום</h3>
            <p className="details__card-text">{weddingDetails.venue}</p>
            <p className="details__card-subtext">{weddingDetails.address}</p>
          </div>

          <div className="details__card">
            <div className="details__icon">👔</div>
            <h3 className="details__card-title">דרס קוד</h3>
            <p className="details__card-text">{weddingDetails.dressCode}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Details;
