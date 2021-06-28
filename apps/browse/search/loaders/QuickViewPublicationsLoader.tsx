import ContentLoader from 'react-content-loader'
import React from 'react'

export const QuickViewPublicationsLoader = () => (
  <ContentLoader
    speed={2}
    width={448}
    height={372}
    viewBox="0 0 448 372"
    backgroundColor="#e6eaea"
    foregroundColor="#dadede"
  >
    <path d="M 0 0 h 214 v 25 H 0 z" />
    <rect x="0" y="54" rx="4" ry="4" width="448" height="149" />
    <rect x="0" y="223" rx="4" ry="4" width="448" height="149" />
  </ContentLoader>
)

export default QuickViewPublicationsLoader
