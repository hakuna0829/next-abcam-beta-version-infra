import styled, { css } from 'styled-components'
import { FormattedMessage } from 'react-intl'

import messages from '@browse/messages'
import { useSelector } from 'react-redux'
import {
  getIsHomePage,
  getSearchStyle,
} from '@browse/store/selectors/selectors'
import { zIndex } from '@browse/constants'
import { testTagProp } from '@browse/common/tagging'

interface WrapperProps {
  isFooterHidden: boolean
}

const Wrapper = styled.footer<WrapperProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  padding: ${({ theme }) => theme.size.layout[2]} 6.25%;
  background-color: ${({ theme }) => theme.color.brandGrey};
  color: ${({ theme }) => theme.color.textWhite};
  ${({ theme }) => theme.text.bodyM}

  @media print {
    display: none;
  }

  ${({ isFooterHidden }) => {
    if (isFooterHidden) {
      return css`
        display: none;
      `
    }
  }}
`

const Copyright = styled.div`
  margin-top: ${({ theme }) => theme.size.spacing[3]};
  margin-bottom: ${({ theme }) => theme.size.spacing[3]};
  margin-right: ${({ theme }) => theme.size.spacing[5]};
`

const Links = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.size.spacing[3]};
  margin-bottom: ${({ theme }) => theme.size.spacing[3]};
  margin-left: -${({ theme }) => theme.size.spacing[5]};
`

const Item = styled.a`
  margin-left: ${({ theme }) => theme.size.spacing[5]};
  color: ${({ theme }) => theme.color.textWhite};
  text-decoration: none;
`

const FooterWrapper = styled.span`
  width: 100%;
  z-index: ${zIndex.footer};
`

export const Footer: React.FC = () => {
  const isHomePage = useSelector(getIsHomePage)
  const searchStyle = useSelector(getSearchStyle)
  const isFooterHidden =
    searchStyle === 'activeSearch' || searchStyle === 'docked'

  const renderMainFooterPart = () => (
    <Wrapper {...testTagProp('footer-wrapper')} isFooterHidden={isFooterHidden}>
      <Copyright>
        <FormattedMessage {...messages.footerCopyright} />
      </Copyright>

      <Links>
        <Item
          href="https://www.abcam.com/index.html?pageconfig=contactus"
          target={'_blank'}
        >
          <FormattedMessage {...messages.footerContact} />
        </Item>

        <Item
          href="https://www.abcam.com/content/privacy-policy"
          target={'_blank'}
        >
          <FormattedMessage {...messages.footerPrivacy} />
        </Item>

        <Item
          href="https://www.abcam.com/content/abcams-terms-and-conditions"
          target={'_blank'}
        >
          <FormattedMessage {...messages.footerTermsAndConditions} />
        </Item>
      </Links>
    </Wrapper>
  )
  return isHomePage ? (
    <FooterWrapper>{renderMainFooterPart()}</FooterWrapper>
  ) : (
    renderMainFooterPart()
  )
}
