import { useState } from 'react'

import { testTagProp } from '@browse/common/tagging'
import { Badge } from '@browse/product/badge/badge'
import { InfoIcon } from '@browse/product/our-brands-drawer/our-brands-drawer'
import { Drawer } from '@browse/components/drawer'
import { OurBrandsDrawer } from '@browse/product/our-brands-drawer/our-brands-drawer'
import { ReactComponent as Info } from '@browse/public/icons/info.svg'

import styles from './overview.module.css'

import type { FC } from 'react'
import type { OverviewPageProps } from '@browse/product/overview/overview.type'

export const Overview: FC<OverviewPageProps> = ({ keyFacts, summary }) => {
  const [showBrands, setShowBrands] = useState<boolean>(false)
  return (
    <>
      <h3 className="text-xl" {...testTagProp('short-description')}>
        {summary.shortDescription}
      </h3>
      <table className="mt-6">
        <thead>
          <tr>
            {keyFacts.isoType && (
              <th className="pr-20 text-grey60" {...testTagProp('iso-type')}>
                Isotype
              </th>
            )}
            {keyFacts.hostTaxa && (
              <th className="text-grey60" {...testTagProp('host-taxa')}>
                Host species
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            {keyFacts.isoType && <td>{keyFacts.isoType}</td>}
            {keyFacts.hostTaxa && <td>{keyFacts.hostTaxa}</td>}
          </tr>
        </tbody>
      </table>
      <br />
      {keyFacts.immunogen.description && (
        <div className={styles.description}>
          <h4 className="text-grey60" {...testTagProp('immunogen-description')}>
            Immunogen
          </h4>
          <div
            dangerouslySetInnerHTML={{ __html: keyFacts.immunogen.description }}
          />
        </div>
      )}
      {keyFacts.productTags &&
        keyFacts.productTags.map((productTag, index) => (
          <>
            <div className={styles.badgeContainer} key={index}>
              <Badge colorId={productTag.tagCode} title={productTag.tagCode} />
              <InfoIcon onClick={() => setShowBrands(!showBrands)}>
                <Info />
              </InfoIcon>
            </div>
            <Drawer
              header={<h3 className={styles.drawerHeader}>Our brands</h3>}
              onClose={setShowBrands}
              show={showBrands}
              isCloseOnOutsideClick
              showOverlay
            >
              <OurBrandsDrawer productTags={keyFacts.productTags} />
            </Drawer>
          </>
        ))}
    </>
  )
}
