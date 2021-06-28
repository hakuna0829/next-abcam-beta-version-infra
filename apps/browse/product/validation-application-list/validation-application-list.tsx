import { IconWithLabel } from '@browse/product/icon-with-label/icon-with-label'
import { ReactComponent as Check } from '@browse/public/icons/check.svg'
import { ReactComponent as Cross } from '@browse/public/icons/cross.svg'
import { ReactComponent as SpinnerFull } from '@browse/public/icons/spinner-full.svg'
import { Title } from '@browse/product/application-panel/title'

import styles from './validation-application-list.module.css'

import type { FC } from 'react'
import type {
  Predicted,
  ValidationApplicationListPropTypes,
} from './validation-application-list.types'

const renderGuaranteedText = (guaranteed: Array<string>) =>
  guaranteed.map(
    (guaranteedItem, index) =>
      guaranteedItem + (guaranteed.length === index + 1 ? '' : ', ')
  )
const renderPredictedText = (predicted: Array<Predicted>) =>
  predicted.map(
    (predictedItem, index) =>
      predictedItem.taxon +
      (predictedItem.percentageOfSimilarity.length
        ? '(' + predictedItem.percentageOfSimilarity + '%)'
        : '') +
      (predicted.length === index + 1 ? '' : ', ')
  )

export const ValidationApplicationList: FC<ValidationApplicationListPropTypes> = ({
  guaranteed,
  notGuaranteed,
  notPredicted,
  predicted,
}) => {
  return (
    <>
      {(guaranteed.length > 0 || notGuaranteed.length > 0) && (
        <div className="mb-4">
          <Title data-cy="tested-reactivity">Tested reactivity</Title>
        </div>
      )}
      {guaranteed.length > 0 && (
        <>
          <IconWithLabel
            className={styles.guaranteed}
            dataCy="tested-guaranted"
            icon={<Check />}
            title="Tested and guaranteed to react with"
          />
          <p className={styles.text}>{renderGuaranteedText(guaranteed)}</p>
        </>
      )}
      {notGuaranteed.length > 0 && (
        <>
          <IconWithLabel
            className={styles.notGuaranteed}
            dataCy="does-not-react-with"
            icon={<Cross />}
            title="Does not react with"
          />
          <p className={styles.text}>{renderGuaranteedText(notGuaranteed)}</p>
        </>
      )}
      {(predicted.length > 0 || notPredicted.length > 0) && (
        <div className="border-grey10 border-solid border-t mt-8 mb-5 pt-5">
          <Title data-cy="predicted-reactivity">Predicted reactivity</Title>
        </div>
      )}
      {predicted.length > 0 && (
        <>
          <IconWithLabel
            className={styles.predicted}
            dataCy="predicted-to-react-with"
            icon={<SpinnerFull />}
            title="Predicted to react with"
          />
          <p className={styles.text}>{renderPredictedText(predicted)}</p>
        </>
      )}
      {notPredicted.length > 0 && (
        <>
          <IconWithLabel
            className={styles.notPredicted}
            dataCy="predicted-not-to-react-with"
            icon={<Cross />}
            title="Predicted not to react with"
          />
          <p className={styles.text}>{renderPredictedText(notPredicted)}</p>
        </>
      )}
    </>
  )
}
