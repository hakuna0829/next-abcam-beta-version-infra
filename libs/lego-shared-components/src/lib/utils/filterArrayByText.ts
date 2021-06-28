type listObject = Record<string, string>
type listElement = string | listObject

export const filterArrayByText = <T extends listElement>(
  list: T[],
  keyword: string,
  filterKey?: string
): T[] => {
  const lowercaseKeyword = keyword.toLowerCase()

  return list.filter((listElem) => {
    if (listElem && filterKey && typeof listElem !== 'object') {
      throw Error(
        `You specified a filter key but didn't pass an array of object`
      )
    }

    if (listElem && !filterKey && typeof listElem === 'object') {
      throw Error(
        `You passed an array of objects but did not specify a filterKey`
      )
    }

    if (filterKey && (listElem as listObject)[filterKey]) {
      return (listElem as listObject)[filterKey]
        .toLowerCase()
        .includes(lowercaseKeyword)
    }
    return (listElem as string).toLowerCase().includes(lowercaseKeyword)
  })
}
