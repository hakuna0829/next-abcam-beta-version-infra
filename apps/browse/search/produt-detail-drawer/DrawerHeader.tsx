import React from 'react'
import styled from 'styled-components'
import { Flex } from '@browse/components/flex'
import CopyWrapper from '@browse/components/copy-wrapper'
import {
  ProductCode,
  ProductDescription,
  ProductIcon,
  ProductInfoButton,
} from '@browse/search/product-detail.style'
import { Tabs } from '@browse/search/tabs/tabs'
import { Button } from '@browse/components/button'
import { ReactComponent as ArrowRight } from '@browse/public/icons/arrow-right.svg'
import { ReactComponent as PrimaryAntibody } from '@browse/public/icons/primary-antibody.svg'
import { grey20 } from '@browse/public'
import { useDispatch, useSelector } from 'react-redux'
import { ClearSearch } from '@browse/store/actions/search-result-actions'
import {
  getSelectedAppId,
  reactivityLoading,
} from '@browse/store/selectors/product-selectors'
import QuickViewHeaderLoader from '../loaders/QuickViewHeaderLoader'
import { rem } from 'csx'
import { tabs } from '@browse/search/tabs/items'
import { Product } from '@browse/search/search.type'
import { useRouter } from 'next/router'
import { SetCurrentViewInterface } from '@browse/search/column-config/column-config.types'
import { routes } from '@browse/routes/routes'

const SvgProps = {
  width: '16',
  height: '16',
  viewBox: '0 0 24 24',
  fill: grey20,
}

const ButtonStyles = {
  border: '1px solid rgba(255, 255, 255, 0.2)',
  height: '2rem',
}

const FullProductButton = styled(Button)`
  margin-bottom: 1rem;
`

const FlexWrap = styled.div`
  display: flex;
  padding-top: 1.8rem;
  flex-direction: column;
  width: 100%;
`

const QuickViewHeaderWrap = styled.div`
  margin-bottom: ${rem(1)};
`

interface DrawerHeaderProps {
  productItems: Product[]
  productCode: string
  currentView: string
  setCurrentView: SetCurrentViewInterface
}

const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  productItems,
  productCode,
  currentView,
  setCurrentView,
}) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const application = useSelector(getSelectedAppId) || ''
  const isReactivity = useSelector(reactivityLoading)

  const product = productItems.find((item) => item.productCode === productCode)

  return (
    <FlexWrap>
      {isReactivity && (
        <QuickViewHeaderWrap>
          <QuickViewHeaderLoader />
        </QuickViewHeaderWrap>
      )}

      {!isReactivity && (
        <>
          <CopyWrapper copyValue={productCode}>
            <ProductIcon>
              <PrimaryAntibody />
            </ProductIcon>
            <ProductCode>{productCode}</ProductCode>
          </CopyWrapper>
          <CopyWrapper copyValue={product?.productName || ''}>
            <ProductDescription data-cy={'product-description'}>
              {product?.productName}
            </ProductDescription>
          </CopyWrapper>

          <Flex
            direction={'row'}
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '1.68rem',
            }}
          >
            <FullProductButton
              data-cy={'full-product-button'}
              variant={'primary'}
              rightIcon={<ArrowRight {...SvgProps} />}
              size={'small'}
              background={'light'}
              onClick={() => {
                dispatch(ClearSearch())

                router.push(
                  routes.product.validationApplications(
                    productCode,
                    application
                  )
                )
              }}
              style={ButtonStyles}
            >
              <ProductInfoButton>Full product info</ProductInfoButton>
            </FullProductButton>

            <Tabs
              items={tabs}
              currentView={currentView}
              setCurrentView={setCurrentView}
            />
          </Flex>
        </>
      )}
    </FlexWrap>
  )
}

export default DrawerHeader
