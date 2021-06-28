type Predicted = {
  percentageOfSimilarity: string
  taxon: string
}

type ValidationApplicationListPropTypes = {
  guaranteed: Array<string>
  notGuaranteed: Array<string>
  notPredicted: Array<Predicted>
  predicted: Array<Predicted>
}

export type { Predicted, ValidationApplicationListPropTypes }
