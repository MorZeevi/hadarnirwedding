import './Hero.scss';

function Hero() {
  // TODO: Update these with actual wedding details
  const brideName = 'מיכל';
  const groomName = 'דניאל';
  const weddingDate = '15.06.2025';

  return (
    <section className="hero">
      <div className="hero__overlay"></div>
      <div className="hero__content">
        <div className="hero__decorative-line"></div>
        <h1 className="hero__title">
          <span className="hero__name">{brideName}</span>
          <span className="hero__ampersand">&</span>
          <span className="hero__name">{groomName}</span>
        </h1>
        <p className="hero__subtitle">מתחתנים!</p>
        <div className="hero__date">
          <span className="hero__date-label">שמרו את התאריך</span>
          <span className="hero__date-value">{weddingDate}</span>
        </div>
        <div className="hero__decorative-line"></div>
      </div>
    </section>
  );
}

export default Hero;
