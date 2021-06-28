import { Hr } from '@browse/components/hr/hr'
import { Table } from './table/table'
import { TableCol } from './table-col/table-col'
import { TableHeading } from './table-heading/table-heading'
import { testTagProp } from '@browse/common/tagging'

import styles from './datasheet.module.css'

import type { FC } from 'react'
import type { DatasheetPageProps } from '@browse/product/datasheet/datasheet.type'

export const Datasheet: FC<DatasheetPageProps> = ({ dataSheet }) => {
  return (
    <>
      <Hr />
      <Table>
        <TableHeading heading="Antibody" {...testTagProp('antibody-column')} />
        {dataSheet.antibody?.description && (
          <TableCol
            content={dataSheet.antibody?.description}
            heading="Description"
          />
        )}
        {dataSheet.antibody?.positiveControl && (
          <TableCol
            content={dataSheet.antibody?.positiveControl}
            heading="Positive control"
          />
        )}
        {dataSheet.antibody.isotype && (
          <TableCol content={dataSheet.antibody.isotype} heading="Isotype" />
        )}
        {dataSheet.antibody.clonality && (
          <TableCol
            content={dataSheet.antibody.clonality}
            heading="Clonality"
          />
        )}
        {dataSheet.antibody.conjugation?.label && (
          <TableCol
            content={dataSheet.antibody.conjugation?.label}
            heading="Conjugation"
            data-cy="conjugation"
          />
        )}
        {dataSheet.antibody.cloneNumber && (
          <TableCol
            content={dataSheet.antibody.cloneNumber}
            heading="Clone number"
            data-cy="cloneNumber"
          />
        )}
        {dataSheet.antibody.immunogen?.description && (
          <TableCol
            className={styles.collFull}
            content={
              <span
                className={styles.copy}
                dangerouslySetInnerHTML={{
                  __html: dataSheet.antibody.immunogen?.description,
                }}
              />
            }
            heading="Immunogen"
            {...testTagProp('notes-column')}
          />
        )}
      </Table>
      {dataSheet.notes && (
        <>
          <Hr />
          <Table>
            <TableHeading heading="Notes" />
            <div
              className={styles.copy}
              dangerouslySetInnerHTML={{
                __html: dataSheet.notes,
              }}
            />
          </Table>
        </>
      )}
    </>
  )
}
