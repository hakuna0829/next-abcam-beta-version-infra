import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import {
  Dropdown,
  DropDownRow,
  DropDownType,
  SelectorType,
} from '@browse/components/dropdown'
import { theme } from '@browse/theme'
import {
  ReactivityApplication,
  ValidationDetail,
} from '@browse/product/product.type'
import { useDispatch, useSelector } from 'react-redux'
import {
  getSelectedAppId,
  getSelectedSpecie,
  getSpecies,
  getReactivityApplications,
} from '@browse/store/selectors/product-selectors'
import { loadPublications } from '@browse/product/product.effects'
import {
  LoadPublicationsSuccess,
  SetApplicationId,
  SetSpecieId,
  SetSpecies,
} from '@browse/store/actions/product-actions'
import { getProductCode } from '@browse/store/selectors/search-result-selectors'
import { medium } from '@browse/breakpoints'

const DropDownLabel = styled.span`
  padding-right: 0.5rem;

  @media (max-width: ${medium}px) {
    padding-right: 0rem;
  }
`

const DropDownsWrap = styled.div`
  display: flex;
  justify-content: right;
`

const ANY_APPLICATIONS = 'Any applications'
const ANY_REACTIVE_SPECIES = 'Any reactive species'
export const ProductDropdowns: React.FC = () => {
  const dispatch = useDispatch()

  const productCode = useSelector(getProductCode)
  const reactivityApplications = useSelector(getReactivityApplications)
  const species = useSelector(getSpecies)
  const selectedAppId = useSelector(getSelectedAppId)
  const selectedSpecie = useSelector(getSelectedSpecie)

  const [application, setApplication] = useState(
    <div>
      <DropDownLabel>{ANY_APPLICATIONS}</DropDownLabel>
    </div>
  )

  useEffect(() => {
    const currentApplication = !selectedAppId
      ? ANY_APPLICATIONS
      : reactivityApplications?.find(
          (app) => app.applicationId === selectedAppId
        )?.abbreviation

    setApplication(
      <div>
        <DropDownLabel>{currentApplication}</DropDownLabel>
      </div>
    )
  }, [reactivityApplications, selectedAppId])

  function getReactiveSpecies() {
    if (!selectedSpecie || !species?.length) {
      return ANY_REACTIVE_SPECIES
    }
    return species?.find((sp) => sp?.taxonId === selectedSpecie)?.taxon
  }

  const [reactiveSpecies, setReactiveSpecies] = useState(
    <div>
      <DropDownLabel>{getReactiveSpecies()}</DropDownLabel>
    </div>
  )

  async function applicationSelected(application?: ReactivityApplication) {
    dispatch(
      SetApplicationId(application ? application?.applicationId : undefined)
    )

    if (reactivityApplications) {
      const species = reactivityApplications?.find(
        (app) => app.applicationId === application?.applicationId
      )?.evidence
      dispatch(SetSpecies(species || []))
    }

    setApplication(
      <div>
        <DropDownLabel>
          {application?.applicationId ? application?.name : ANY_APPLICATIONS}
        </DropDownLabel>
      </div>
    )

    const res = await loadPublications(
      productCode,
      application?.applicationId,
      selectedSpecie
    )
    dispatch(LoadPublicationsSuccess(res))
  }

  async function reactiveSelected(specie: ValidationDetail | undefined) {
    dispatch(SetSpecieId(specie ? specie.taxonId : undefined))
    setReactiveSpecies(
      <div>
        <DropDownLabel>
          {specie ? specie.taxon : ANY_REACTIVE_SPECIES}
        </DropDownLabel>
      </div>
    )

    const res = await loadPublications(
      productCode,
      selectedAppId,
      specie?.taxonId
    )
    dispatch(LoadPublicationsSuccess(res))
  }

  return (
    <DropDownsWrap>
      <Dropdown
        label={application}
        size={'small'}
        type={DropDownType.Single}
        style={{ paddingRight: theme.size.layout[1] }}
        selectorType={SelectorType.Base}
      >
        <DropDownRow
          key={0}
          tabIndex={0}
          onKeyPress={() => applicationSelected(undefined)}
          onClick={() => applicationSelected(undefined)}
        >
          Any applications
        </DropDownRow>
        {reactivityApplications?.map((application, index) => (
          <DropDownRow
            tabIndex={0}
            onKeyPress={() => applicationSelected(application)}
            key={index}
            onClick={() => applicationSelected(application)}
          >
            {application.applicationId}
          </DropDownRow>
        ))}
      </Dropdown>

      <Dropdown
        label={reactiveSpecies}
        size={'small'}
        type={DropDownType.Single}
        selectorType={SelectorType.Base}
      >
        <DropDownRow
          key={0}
          tabIndex={0}
          onKeyPress={() => reactiveSelected(undefined)}
          onClick={() => reactiveSelected(undefined)}
        >
          Any reactive species
        </DropDownRow>
        {species?.map((specie, index) => (
          <DropDownRow
            key={index}
            tabIndex={0}
            onKeyPress={() => reactiveSelected(specie)}
            onClick={() => reactiveSelected(specie)}
          >
            {specie.taxon}
          </DropDownRow>
        ))}
      </Dropdown>
    </DropDownsWrap>
  )
}

export default ProductDropdowns
