import React from 'react';
import HeroSection from './HeroSection';

/**
 * Re-exporting HeroSection as default to ensure backwards compatibility with any existing imports.
 */
export default function HeroCarousel(props) {
  return <HeroSection {...props} />;
}
