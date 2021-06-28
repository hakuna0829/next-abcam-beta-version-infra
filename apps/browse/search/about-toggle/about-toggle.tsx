import { ReactComponent as InfoIcon } from '@browse/public/icons/info.svg'
import { ReactComponent as CrossIcon } from '@browse/public/icons/cross.svg'
import { Button } from '@browse/components/button'
import styles from '@browse/search/about-toggle/about-toggle.module.css'
import { AboutToggleProps } from '@browse/search/about-toggle/about-toggle.type'
import { Tag, testTagProp } from '@browse/common/tagging'

export const AboutToggle: React.FC<AboutToggleProps> = ({
  disclaimerIsShown,
  onClick,
  showLabel = true,
}) => {
  return (
    <div className={styles.aboutBtnWrap}>
      <Button
        {...testTagProp(
          `${disclaimerIsShown ? 'close' : 'about'}-toggle-button` as Tag
        )}
        variant="text"
        rightIcon={disclaimerIsShown ? <CrossIcon /> : <InfoIcon />}
        size="large"
        onClick={onClick}
      >
        {showLabel && (disclaimerIsShown ? 'Close' : 'About')}
      </Button>
    </div>
  )
}
