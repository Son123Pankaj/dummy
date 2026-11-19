import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAssetUrl } from '../utils/assetUrl';

export default function FullWidthShowcase({ 
  id, 
  heading, 
  imageSrc, 
  imageAlt, 
  width = 1365, 
  height = 768,
  images
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Support both single image and multi-image list
  const imageList = images && images.length > 0 
    ? images 
    : [{ label: heading, src: imageSrc, alt: imageAlt, width, height }];

  const currentImage = imageList[activeIndex] || imageList[0];
  const hasMultiple = imageList.length > 1;

  const prevImage = () => {
    setActiveIndex(prev => (prev - 1 + imageList.length) % imageList.length);
  };

  const nextImage = () => {
    setActiveIndex(prev => (prev + 1) % imageList.length);
  };

  return (
    <section id={id} className="fullwidth-showcase-section" aria-label={heading}>
      <div className="fullwidth-showcase-container">
        
        <div className="fullwidth-showcase-header">
          {/* Required Structure: H1 Heading Displayed First */}
          <h1 className="fullwidth-showcase-heading">{heading}</h1>

          {/* If multiple images, show clean toggle pills & nav arrows */}
          {hasMultiple && (
            <div className="showcase-image-switcher" role="tablist" aria-label={`${heading} views`}>
              <div className="showcase-switcher-pills">
                {imageList.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={activeIndex === idx}
                    className={`showcase-switcher-btn ${activeIndex === idx ? 'active' : ''}`}
                    onClick={() => setActiveIndex(idx)}
                  >
                    <span>{img.label}</span>
                  </button>
                ))}
              </div>

              <div className="showcase-nav-arrows">
                <button
                  type="button"
                  className="showcase-arrow-btn"
                  onClick={prevImage}
                  aria-label="Previous image"
                  title="Previous image"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  className="showcase-arrow-btn"
                  onClick={nextImage}
                  aria-label="Next image"
                  title="Next image"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Relevant Image Placed Immediately After H1 */}
        <div className="fullwidth-showcase-frame">
          <img 
            key={currentImage.src}
            src={getAssetUrl(currentImage.src)} 
            alt={currentImage.alt}
            className="fullwidth-showcase-image"
            width={currentImage.width || 1365}
            height={currentImage.height || 768}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
