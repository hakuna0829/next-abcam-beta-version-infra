import ContentLoader from 'react-content-loader'
import React from 'react'

export const ProductDetailLoader = () => (
  <ContentLoader
    speed={2}
    width={304}
    height={114}
    viewBox="0 0 304 114"
    backgroundColor="#e6eaea"
    foregroundColor="#dadede"
  >
    <path d="M 0 0 h 96 v 14 H 0 z" />{' '}
    <rect x="0" y="82" rx="16" ry="16" width="156" height="32" />
    <path d="M 0 32 h 304 v 20 H 0 z" />
  </ContentLoader>
)

export default ProductDetailLoader
