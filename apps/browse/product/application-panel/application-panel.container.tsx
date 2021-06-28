import { useEffect, useState } from 'react'

import { loadImages } from '@browse/product/product.effects'

import type { FC } from 'react'
import type { Image, ReactivityApplication } from '@browse/product/product.type'
import type { ApplicationPanelContainerPropTypes } from './application-panel.types'
import { ApplicationPanel } from './application-panel'

export const ApplicationPanelContainer: FC<ApplicationPanelContainerPropTypes> = (
  props
) => {
  const { productCode, reactivityApplication } = props
  const [images, setImages] = useState<Image[]>([])

  const withoutTaxon = reactivityApplication?.evidence.filter(
    (evidence) => evidence.taxon === ''
  )

  const guaranteed = reactivityApplication.reactivity
    ?.filter((reactivity) => reactivity.guaranteed === true && reactivity.taxon)
    .map((reactivity) => reactivity.taxon)

  const notGuaranteed = reactivityApplication.reactivity
    ?.filter(
      (reactivity) => reactivity.guaranteed === false && reactivity.taxon
    )
    .map((reactivity) => reactivity.taxon)

  const predicted = reactivityApplication.predictedReactivity
    ?.filter((reactivity) => reactivity.predicted === true && reactivity.taxon)
    .map((reactivity) => {
      return {
        percentageOfSimilarity: reactivity.percentageOfSimilarity,
        taxon: reactivity.taxon,
      }
    })

  const notPredicted = reactivityApplication.predictedReactivity
    ?.filter((reactivity) => reactivity.predicted === false && reactivity.taxon)
    .map((reactivity) => {
      return {
        percentageOfSimilarity: reactivity.percentageOfSimilarity,
        taxon: reactivity.taxon,
      }
    })

  useEffect(() => {
    async function getImages() {
      const response = await loadImages(
        productCode,
        reactivityApplication.abbreviation
      )
      if (response) setImages(response)
    }

    getImages()
  }, [productCode, reactivityApplication.abbreviation])

  return (
    <ApplicationPanel
      {...props}
      guaranteed={guaranteed}
      images={images}
      notGuaranteed={notGuaranteed}
      notPredicted={notPredicted}
      predicted={predicted}
      withoutTaxon={withoutTaxon}
    />
  )
}
