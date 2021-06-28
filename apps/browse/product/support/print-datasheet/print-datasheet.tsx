import { testTagProp } from '@browse/common/tagging'

import styles from './print-datasheet.module.css'

type PrintDatasheetPropTypes = {
  onClick: () => void
}

const PrintDatasheet = ({ onClick }: PrintDatasheetPropTypes) => {
  return (
    <div
      className={styles.downloadContainer}
      {...testTagProp('download')}
      onClick={onClick}
      role="button"
    >
      <span className="f1y0vpl6">
        <svg width="24" height="24" fill="none">
          <path
            fill="#0047bb"
            fillRule="evenodd"
            d="M6 3a1 1 0 00-1 1v7H3a1 1 0 00-1 1v8a1 1 0 001 1h18a1 1 0 001-1v-8a1 1 0 00-1-1h-2V4a1 1 0 00-1-1H6zm1 8h10V5H7v6zm-3 2v6h16v-6H4zm4 3a1 1 0 11-2 0 1 1 0 012 0zm2-9a1 1 0 000 2h4a1 1 0 000-2h-4z"
            clipRule="evenodd"
          ></path>
        </svg>
      </span>
      <div className="f7fz46j">Print Datasheet</div>
    </div>
  )
}

export { PrintDatasheet }
