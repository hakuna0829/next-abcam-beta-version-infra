import { ReactComponent as CrossIcon } from '@browse/public/icons/cross.svg'
import { Button } from '@browse/components/button'
import { CloseActiveSearchProps } from '@browse/search/close-active-search/close-active-search.type'

export const CloseActiveSearch: React.FC<CloseActiveSearchProps> = ({
  onClick,
}) => {
  return (
    <Button
      variant="text"
      rightIcon={<CrossIcon />}
      size="large"
      onClick={onClick}
    >
      Close
    </Button>
  )
}
