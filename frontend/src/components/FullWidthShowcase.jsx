import React from 'react';
import { getAssetUrl } from '../utils/assetUrl';

export default function FullWidthShowcase({ id, heading, imageSrc, imageAlt, width = 1365, height = 768 }) {
  return (
    <section id={id} className="fullwidth-showcase-section" aria-label={heading}>
      <div className="fullwidth-showcase-container">
        <div className="fullwidth-showcase-frame">
          <div className="fullwidth-showcase-overlay">
            <h2 className="fullwidth-showcase-heading">{heading}</h2>
          </div>
          <img 
            src={getAssetUrl(imageSrc)} 
            alt={imageAlt}
            className="fullwidth-showcase-image"
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
