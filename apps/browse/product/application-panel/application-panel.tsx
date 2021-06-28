import { useState } from 'react'
import { testTagProp } from '@browse/common/tagging'
import { ApplicationImages } from '@browse/product/application-images/application-images'
import { Button } from '@abcam-web/lego-shared-components/lib'
import { Tag } from '@browse/components/tag/tag'
import { ValidationApplicationList } from '@browse/product/validation-application-list/validation-application-list'
import { ReactComponent as BetaIcon } from '@browse/public/icons/icon-beta.svg'
import { Title } from './title'

import styles from './application-panel.module.css'

import type { FC } from 'react'
import type { ApplicationPanelPropTypes } from './application-panel.types'

export const ApplicationPanel: FC<ApplicationPanelPropTypes> = ({
  guaranteed,
  images,
  notGuaranteed,
  notPredicted,
  predicted,
  reactivityApplication,
  withoutTaxon,
}) => {
  const [showImageOverlay, setShowImageOverlay] = useState<boolean>(false)
  const onClickImagesOverlay = () => {
    setShowImageOverlay((open) => !open)
  }
  return (
    <>
      <div className={styles.headingContainer}>
        <h1 className={styles.heading}>{reactivityApplication.name}</h1>
        <span className={styles.recommendedDilution}>
          Recommended dilution {reactivityApplication.recommendedDilution}
        </span>
      </div>
      <div className={styles.gridContainer}>
        <div>
          {images.length > 0 && (
            <div>
              <div className={styles.gridColumn}>
                <div>
                  <Title {...testTagProp('images-count')}>Images</Title>
                </div>
                <div className={styles.buttonContainer}>
                  <Button
                    variant="secondary"
                    data-cy="images-view-all"
                    onClick={onClickImagesOverlay}
                    size="small"
                  >
                    View all {images.length}
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <ApplicationImages
                  imagesData={images}
                  isOverlayOpen={showImageOverlay}
                  overlayClick={onClickImagesOverlay}
                />
              </div>
            </div>
          )}
        </div>
        {reactivityApplication.publications > 0 && (
          <div className={styles.gridColumn}>
            <div>
              <Title {...testTagProp('images-count')}>Publications</Title>
            </div>
            <div className={styles.buttonContainer}>
              <Button
                variant="secondary"
                // onClick={onClickImagesOverlay}
                size="small"
                {...testTagProp('publications-view-all')}
              >
                View all {reactivityApplication.publications}
              </Button>
            </div>
            <div className={styles.evidenceContainer}>
              {reactivityApplication.evidence
                ?.filter((ev) => ev.taxon)
                .map((evidenceItem) => {
                  return (
                    <Tag
                      key={evidenceItem.taxon}
                      name={evidenceItem.taxon}
                      count={evidenceItem.publications}
                    />
                  )
                })}

              {withoutTaxon.length > 0 && (
                <>
                  <BetaIcon />
                  <span>
                    We haven’t yet identified the species in{' '}
                    {withoutTaxon.length}{' '}
                    {withoutTaxon.length > 1 ? 'publications' : 'publication'}.
                    We’re working on improving this.
                  </span>
                </>
              )}
            </div>
          </div>
        )}
        <div className={styles.validationApplicationListContainer}>
          {(guaranteed.length > 0 || notGuaranteed.length > 0) && (
            <ValidationApplicationList
              guaranteed={guaranteed}
              notGuaranteed={notGuaranteed}
              predicted={predicted}
              notPredicted={notPredicted}
            />
          )}
        </div>
      </div>
    </>
  )
}
