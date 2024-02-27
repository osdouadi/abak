import styled from 'styled-components';
import './../styles/hero.css';

function Hero() {
  return (
    <div className="hero-container relative">
      <div id="video-bg">
        <video
          autoPlay
          muted
          loop
          preload="none"
          poster="/images/general/while-hero.png"
          role="banner"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag
        </video>
      </div>
    </div>
  );
}

export default Hero;
