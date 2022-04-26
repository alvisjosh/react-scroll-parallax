import { BannerLayer } from '../types';

export function getImageStyle(layer: BannerLayer) {
  return layer.image
    ? {
        backgroundImage: `url(${layer.image})`,
        backgroundPosition: 'top',
        backgroundSize: 'cover',
      }
    : {};
}
