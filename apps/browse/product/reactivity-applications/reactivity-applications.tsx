import { ApplicationPanelContainer } from '@browse/product/application-panel/application-panel.container'
import { Container } from '@browse/components/container/container'
import { StatisticsPanel } from '@browse/product/statistics-panel/statistics-panel'
import { routes } from '@browse/routes/routes'
import Link from '@browse/components/link/link'
import { testTagProp } from '@browse/common/tagging'
import { useProduct } from '@browse/product/product.hook'

import styles from './reactivity-applications.module.css'

import type { FC } from 'react'
import type { Reactivity } from '@browse/product/product.type'
import type { Tag } from '@browse/common/tagging'

type PropTypes = {
  reactivity: Reactivity
}

export const ReactivityApplications: FC<PropTypes> = ({ reactivity }) => {
  const { abbreviation, productCode } = useProduct()
  const validationApplications = reactivity.applications
    .filter(
      (application) => application.applicationId && application.abbreviation
    )
    .map((application) => {
      return {
        applicationId: application.applicationId,
        abbreviation: application.abbreviation,
      }
    })

  const reactivityApplication =
    abbreviation &&
    reactivity.applications.find(
      (application) => application.abbreviation === abbreviation
    )

  return (
    <div className={styles.wrapper}>
      <Container widthLimited>
        <div className={styles.container}>
          <h4 className={styles.heading}>Validation Applications</h4>
          <ul className={styles.tabs}>
            <li>
              <Link
                activeClassName={styles.active}
                to={routes.product.overview(productCode)}
                {...testTagProp('all-tag')}
              >
                All
              </Link>
            </li>
            {validationApplications?.map((application) => {
              const route = routes.product.validationApplications(
                productCode,
                application.abbreviation
              )

              return (
                <li className={styles.tab} key={application.abbreviation}>
                  <Link
                    activeClassName={styles.active}
                    to={route}
                    {...testTagProp(`${application.abbreviation}-tag` as Tag)}
                  >
                    {application.abbreviation}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        {reactivityApplication ? (
          <ApplicationPanelContainer
            productCode={productCode}
            reactivityApplication={reactivityApplication}
          />
        ) : (
          <StatisticsPanel reactivity={reactivity} />
        )}
      </Container>
    </div>
  )
}
