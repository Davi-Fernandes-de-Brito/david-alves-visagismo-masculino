// <img> com dimensões intrínsecas (evita CLS), srcset e ponto focal.
export default function Picture({ image, sizes = '100vw', eager = false, className = '', fit = 'cover', focus, style, ...rest }) {
  return (
    <img
      className={`pic ${className}`}
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      style={{ objectFit: fit, objectPosition: focus || image.focus, ...style }}
      {...rest}
    />
  );
}
