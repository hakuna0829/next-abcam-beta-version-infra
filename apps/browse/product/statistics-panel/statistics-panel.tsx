/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

// TODO - this file has mostly been copied over from original repo and has lots of TS issues, which need urgent attention.
// Also, it is too large & needs splitting up into separate components/modules

import React, { useMemo } from 'react'
import { useTable } from 'react-final-table'
import { useRouter } from 'next/router'
import classnames from 'classnames'

import { ReactComponent as BetaIcon } from '@browse/public/icons/icon-beta.svg'
import { ReactComponent as Check } from '@browse/public/icons/check.svg'
import { ReactComponent as Cross } from '@browse/public/icons/cross.svg'

import Link from '@browse/components/link/link'
import IconWithLabel from '@browse/product/icon-with-label/icon-with-label'
import { routes } from '@browse/routes/routes'

import styles from './statistics-panel.module.css'

import type {
  CountWrapProps,
  StatisticsPanelPropTypes,
} from './statistics-panel.type'
import type { ValidationDetail } from '../product.type'

export const CountWrap: React.FC<CountWrapProps> = (props) => {
  return (
    <div>
      <span className={styles.tableLabel}>{props.label}</span>
      <span className={styles.countWrap}>
        <span className={styles.tableLabel}>{props.count}</span>
      </span>
    </div>
  )
}

const createColumn = (
  id: string,
  name: string,
  path: string,
  productCode: string
) => {
  const route = routes.product.validationApplications(productCode, path)
  if (!route) throw new Error('route does not exist')

  return {
    name: id,
    label: (
      <>
        <h3>{name}</h3>
        <Link to={route}>view details</Link>
      </>
    ),
    render: ({ value }: { value: string }) => <span>{value}</span>,
  }
}

const initColumn = {
  name: '0',
  label: ' ',
  headerRender: ({ label }: { label: string }) => <h2>{label}</h2>,
  render: ({ value }: { value: string }) => (
    <span className={styles.column}>{value}</span>
  ),
}

const takeStatus = (
  guaranteed: boolean | undefined,
  publications: number | undefined
) => {
  const checkClassName = classnames(
    styles.iconWrapper,
    styles.rowFontStyle,
    styles.check
  )
  const crossClassName = classnames(
    styles.iconWrapper,
    styles.rowFontStyle,
    styles.cross
  )
  if (guaranteed !== undefined) {
    if (guaranteed) {
      return (
        <IconWithLabel
          className={checkClassName}
          title="Tested.Guaranteed"
          icon={<Check />}
        />
      )
    }

    return (
      <IconWithLabel
        className={crossClassName}
        title="Will not work"
        icon={<Cross />}
      />
    )
  }

  if (publications && publications > 0) {
    return <CountWrap label="Publications" count={publications} />
  }

  return <>-</>
}

export const StatisticsPanel = ({ reactivity }: StatisticsPanelPropTypes) => {
  const {
    query: { productCode = '' },
  } = useRouter()

  const uniqueTaxons = (value: string, index: number, self: string[]) => {
    return self.indexOf(value) === index
  }

  const { applications } = reactivity
  const taxons = applications
    ?.map((application) => {
      const evidenceTaxons = application.evidence.map((e) => e.taxon)
      const reactivityTaxons = application.reactivity.map((e) => e.taxon)
      return evidenceTaxons.concat(reactivityTaxons)
    })
    .flat()
    .filter(uniqueTaxons)

  const publicationsMemo = useMemo(() => {
    const withoutTaxon = applications
      ?.map((a) =>
        a?.evidence.filter((e) => e.taxon === '').map((p) => p.publications)
      )
      .reduce((a, c) => a.concat(c), [])
      .reduce((a, c) => (a ?? 0) + (c ?? 0), 0)

    return withoutTaxon
  }, [applications])

  const memoColumns = useMemo(() => {
    const columns = []
    if (applications && applications.length > 0) {
      columns.push(initColumn)
      applications.forEach((app) => {
        const col = createColumn(
          app.applicationId,
          app.abbreviation,
          app.abbreviation,
          productCode.toString()
        )
        if (app.applicationId && app.abbreviation) {
          columns.push(col)
        }
      })
    }
    return columns.length === 0 ? [] : columns
  }, [applications, productCode])

  const memoData = useMemo(() => {
    const allData: ValidationDetail[] = []

    if (applications && applications.length > 0) {
      taxons?.forEach((taxon) => {
        if (!taxon) return
        let item = { 0: taxon?.charAt(0).toUpperCase() + taxon?.slice(1) }
        applications.forEach((app) => {
          const effect = app.evidence.find((_) => _.taxon === taxon)
          const reactivity = app.reactivity.find((_) => _.taxon === taxon)
          const validationDetail = {
            ...effect,
            ...reactivity,
          } as ValidationDetail
          item = {
            ...item,
            [app.applicationId]: takeStatus(
              validationDetail.guaranteed,
              validationDetail.publications
            ),
          }
        })
        // @ts-ignore
        allData.push(item)
      })
    }
    return allData.length === 0 ? [] : allData
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applications])
  const { headers, rows } = useTable(memoColumns, memoData)

  return (
    <div className={styles.container}>
      {headers.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              {headers.map((header, idx) => (
                <th key={idx}>{header.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
              return (
                <React.Fragment key={idx}>
                  <tr>
                    {row.cells.map((cell, idx) => {
                      return (
                        <td key={idx}>
                          <span>{cell.render()}</span>
                        </td>
                      )
                    })}
                  </tr>
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      )}

      <div className={styles.noIdentifiedWrap}>
        {headers.length === 0 && (
          <>
            <div className={styles.betIcon}>
              <BetaIcon />
            </div>{' '}
            <span>
              We don’t have enough data about this product. We’re working on
              improving this.
            </span>
          </>
        )}
        {publicationsMemo && publicationsMemo > 0 ? (
          <>
            <div className={styles.betIcon}>
              <BetaIcon />
            </div>{' '}
            <span>
              We haven’t yet identified the species in {publicationsMemo}{' '}
              {publicationsMemo && publicationsMemo > 1
                ? 'publications'
                : 'publication'}
              . We’re working on improving this.
            </span>
          </>
        ) : null}
      </div>
    </div>
  )
}
