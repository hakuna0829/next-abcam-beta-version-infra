import Head from 'next/head'
import classnames from 'classnames'

import { Header } from '@browse/product/header/header'
import { P } from '@browse/components/p/p'
import { Container } from '@browse/components/container/container'
import { testTagProp } from '@browse/common/tagging'
import { CopyWrapper } from '@browse/components/copy-wrapper/copy-wrapper'
import { ProductProvider } from '@browse/product/product.context'
import { TabsWrapperContainer } from '@browse/product/tabs-wrapper/tabs-wrapper.container'

import styles from './template.module.css'

import type { FC } from 'react'
import type { TemplatePropTypes } from './template.type'

export const ProductTemplate: FC<TemplatePropTypes> = ({
  abbreviation = null,
  bottomContent,
  children,
  onDownload,
  pageTitle = '',
  summary,
  synonyms,
  title = '',
  topRightContent,
}) => {
  const topContentClassName = classnames(
    topRightContent && styles.topContentContainer
  )
  const heading = classnames(styles.heading, styles.h1)

  return (
    <ProductProvider
      abbreviation={abbreviation}
      productCode={summary.productCode}
    >
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className={styles.container}>
        <Container widthLimited>
          <TabsWrapperContainer />
          {!!title && <Header onDownload={onDownload} title={title} />}
          <div className={topContentClassName}>
            <div>
              <div>
                <CopyWrapper copyValue={summary.name}>
                  <h1 className={heading} {...testTagProp('summary-name')}>
                    {summary.name}
                  </h1>
                </CopyWrapper>
                {synonyms.entitySynonyms && (
                  <P
                    className={styles.synonyms}
                    color="light"
                    {...testTagProp('alternative-names')}
                  >
                    Alternative names: {synonyms.entitySynonyms.toString()}
                  </P>
                )}
              </div>
              {children}
            </div>
            {topRightContent}
          </div>
        </Container>
        {bottomContent}
        <Container widthLimited className={styles.copyright}>
          <P color="light">
            Please note: All products are "FOR RESEARCH USE ONLY. NOT FOR USE IN
            DIAGNOSTIC PROCEDURES"
          </P>
          <P color="light">
            For licensing inquiries, please contact{' '}
            <a href="mailto:partnerships@abcam.com">partnerships@abcam.com</a>
          </P>
        </Container>
      </div>
    </ProductProvider>
  )
}
