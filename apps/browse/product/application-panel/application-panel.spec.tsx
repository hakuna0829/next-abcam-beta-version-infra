import React from 'react'
import { render, screen, waitFor } from '@browse/test-utils'

import { ApplicationPanel } from './application-panel'
import { Image, ReactivityApplication } from '../product.type'
import { ApplicationPanelPropTypes } from './application-panel.types'

const image: Image = {
  altText: 'string',
  height: 200,
  image_legend: 'string',
  image_url: 'string',
  title: 'string',
  width: 100,
}

const props: ApplicationPanelPropTypes = {
  guaranteed: [],
  notGuaranteed: [],
  notPredicted: [],
  predicted: [],
  images: [],
  withoutTaxon: [],
  productCode: '123',
  reactivityApplication: {
    abbreviation: 'abc',
    applicationId: '',
    evidence: [
      {
        guaranteed: true,
        percentageOfSimilarity: '1%',
        predicted: true,
        publications: 1,
        reviews: 1,
        taxon: 'taxon-name',
        taxonId: '1',
      },
    ],
    imageUrls: [],
    name: 'reactivity-name',
    order: '',
    predictedReactivity: [],
    publications: 1,
    reactivity: [],
    recommendedDilution: '',
  },
}

describe('ApplicationPanel', () => {
  describe('with images', () => {
    it.skip('should render images container', () => {
      render(
        <ApplicationPanel {...{ ...props, images: [image] }}></ApplicationPanel>
      )
      expect(screen.getByText('Images')).toBeInTheDocument()
    })
  })

  describe('without images', () => {
    it('should not render images container', () => {
      render(<ApplicationPanel {...props}></ApplicationPanel>)
      expect(screen.queryByText('Images')).not.toBeInTheDocument()
    })
  })

  describe('without publications', () => {
    it('should not render publications container', () => {
      const noPublications = {
        ...props,
        reactivityApplication: {
          ...props.reactivityApplication,
          publications: 0,
        },
      }
      render(<ApplicationPanel {...noPublications}></ApplicationPanel>)
      expect(screen.queryByText('Publications')).not.toBeInTheDocument()
    })
  })

  describe('with publications', () => {
    it('should render publications container', () => {
      render(<ApplicationPanel {...props}></ApplicationPanel>)
      expect(screen.getByText('Publications')).toBeInTheDocument()
    })

    it('should display tags for taxon evidence', () => {
      render(<ApplicationPanel {...props}></ApplicationPanel>)
      expect(screen.getByText('taxon-name')).toBeInTheDocument()
    })

    describe('contains items without taxon', () => {
      const withoutTaxon = {
        ...props,
        withoutTaxon: [
          {
            guaranteed: true,
            percentageOfSimilarity: '1%',
            predicted: true,
            publications: 1,
            reviews: 1,
            taxon: '',
            taxonId: '1',
          },
        ],
      }

      it('should render warning', () => {
        const { baseElement } = render(
          <ApplicationPanel {...withoutTaxon}></ApplicationPanel>
        )

        expect(baseElement).toHaveTextContent(
          'We haven’t yet identified the species in'
        )
      })
    })

    describe('contains no items without taxon', () => {
      it('should not render warning', () => {
        render(<ApplicationPanel {...props}></ApplicationPanel>)

        expect(
          screen.queryByText('We haven’t yet identified the species in')
        ).not.toBeInTheDocument()
      })
    })

    describe('ValidationApplicationList', () => {
      it('should be rendered when Guaranteed items are provided', () => {
        render(
          <ApplicationPanel
            {...{ ...props, guaranteed: ['x'] }}
          ></ApplicationPanel>
        )

        expect(screen.getByText('Tested reactivity')).toBeInTheDocument()
      })

      it('should be rendered when NotGuaranteed items are provided', () => {
        render(
          <ApplicationPanel
            {...{ ...props, notGuaranteed: ['x'] }}
          ></ApplicationPanel>
        )

        expect(screen.getByText('Tested reactivity')).toBeInTheDocument()
      })

      it('should not be rendered when nor guaranteed nor NotGuaranteed items are provided', () => {
        render(<ApplicationPanel {...props}></ApplicationPanel>)
        expect(screen.queryByText('Tested reactivity')).not.toBeInTheDocument()
      })
    })
  })
})
