import ContentLoader from 'react-content-loader'
import React from 'react'

export const QuickViewImagesLoader = () => (
  <ContentLoader
    speed={2}
    width={405}
    height={180}
    viewBox="0 0 405 180"
    backgroundColor="#e6eaea"
    foregroundColor="#dadede"
  >
    <rect x="0" y="0" rx="4" ry="4" width="124" height="124" />
    <rect x="135" y="0" rx="4" ry="4" width="124" height="124" />
    <rect x="270" y="0" rx="4" ry="4" width="124" height="124" />
  </ContentLoader>
)

export default QuickViewImagesLoader
