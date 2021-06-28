import React from 'react'
import { render, screen } from '@browse/test-utils'

import { Overview } from '@browse/product/overview/overview'
import { OverviewPageProps } from '@browse/product/overview/overview.type'

const props = {
  keyFacts: {
    immunogen: {},
  },
  summary: { shortDescription: 'short' },
} as OverviewPageProps

describe('Overview', () => {
  it('should display the short summary', () => {
    render(<Overview {...props} />)
    expect(screen.getByText('short')).toBeInTheDocument()
  })

  it('should display isotype heading if provided', () => {
    const withIsoType = {
      ...props,
      keyFacts: {
        ...props.keyFacts,
        isoType: 'isovalue',
      },
    }

    render(<Overview {...withIsoType} />)
    expect(screen.getByText('Isotype')).toBeInTheDocument()
  })

  it('should display isotype value if provided', () => {
    const withIsoType = {
      ...props,
      keyFacts: {
        ...props.keyFacts,
        isoType: 'isovalue',
      },
    }

    render(<Overview {...withIsoType} />)
    expect(screen.getByText('isovalue')).toBeInTheDocument()
  })

  it('should display hostTaxa heading if provided', () => {
    const withHostTaxa = {
      ...props,
      keyFacts: {
        ...props.keyFacts,
        hostTaxa: 'taxavalue',
      },
    }

    render(<Overview {...withHostTaxa} />)
    expect(screen.getByText('Host species')).toBeInTheDocument()
  })

  it('should display hostTaxa value if provided', () => {
    const withHostTaxa = {
      ...props,
      keyFacts: {
        ...props.keyFacts,
        hostTaxa: 'taxavalue',
      },
    }

    render(<Overview {...withHostTaxa} />)
    expect(screen.getByText('taxavalue')).toBeInTheDocument()
  })

  it('should display immunogen heading if provided', () => {
    const withImmunogen = {
      ...props,
      keyFacts: {
        ...props.keyFacts,
        immunogen: { description: 'immunovalue' },
      },
    } as OverviewPageProps

    render(<Overview {...withImmunogen} />)
    expect(screen.getByText('Immunogen')).toBeInTheDocument()
  })

  it('should display immunogen value if provided', () => {
    const withImmunogen = {
      ...props,
      keyFacts: {
        ...props.keyFacts,
        immunogen: { description: 'immunovalue' },
      },
    } as OverviewPageProps

    render(<Overview {...withImmunogen} />)
    expect(screen.getByText('immunovalue')).toBeInTheDocument()
  })

  describe('with minimal data', () => {
    it('should not display immunogen', () => {
      render(<Overview {...props} />)
      expect(screen.queryByText('Immunogen')).not.toBeInTheDocument()
    })

    it('should not display Isotype', () => {
      render(<Overview {...props} />)
      expect(screen.queryByText('Isotype')).not.toBeInTheDocument()
    })

    it('should not display Host species', () => {
      render(<Overview {...props} />)
      expect(screen.queryByText('Host species')).not.toBeInTheDocument()
    })
  })
})
