import React, { useState } from 'react';
import './ImageWithFallback.css';

const ImageWithFallback = ({ src, alt, size = 44, className = '' }) => {
  const [errored, setErrored] = useState(false);

  const fallback = '/og-image.png';

  if (!src || errored) {
    return (
      <div className={`img-fallback ${className}`} style={{ width: size, height: size }} aria-hidden>
        <img src={fallback} alt={alt} style={{ width: size, height: size, borderRadius: 10, objectFit: 'cover' }} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ width: size, height: size, borderRadius: 10, objectFit: 'cover' }}
      onError={() => setErrored(true)}
      loading="lazy"
    />
  );
};

export default ImageWithFallback;
