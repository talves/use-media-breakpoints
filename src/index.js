import React from 'react'

const resolveQueriesArray = queries => {
  let queriesArray = []
  if (typeof queries === 'string') {
    queriesArray.push(queries)
  } else {
    queriesArray = queries.map(q => q)
  }
  return queriesArray
}

const resolveValuesArray = (queriesArray, values, defaultValue) => {
  let valuesArray = []
  if (typeof values === 'string') {
    valuesArray.push(values)
  } else {
    valuesArray = values.map(q => q)
  }
  if (valuesArray.length < queriesArray.length) {
    for (let i = valuesArray.length; i < queriesArray.length; i++)
      valuesArray.push(defaultValue)
  }
  return valuesArray
}

export const getDefaultBreakpoint = (queries, values, defaultValue) => {
  const queriesArray = resolveQueriesArray(queries)
  const valuesArray = resolveValuesArray(queriesArray, values, defaultValue)
  if (typeof window === 'undefined' || queries.length === 0) {
    return defaultValue
  } else {
    const index = queriesArray.findIndex(query => {
      const mq = window.matchMedia(query)
      return mq.matches
    })
    return index === -1 ? defaultValue : valuesArray[index]
  }
}

export default function useMediaBreakpoints(queries, values, defaultValue) {
  const [value, setValue] = React.useState(
    getDefaultBreakpoint(queries, values, defaultValue),
  )

  React.useEffect(() => {
    const queriesArray = resolveQueriesArray(queries)
    const valuesArray = resolveValuesArray(queriesArray, values, defaultValue)
    let queryList = []
    function queryHandler() {
      // Get index of first media query that matches
      const index = queryList.findIndex(mq => mq.matches)
      // Return related value or defaultValue if none
      setValue(index === -1 ? defaultValue : valuesArray[index])
    }

    if (typeof window !== 'undefined') {
      queryList = queriesArray.map(query => {
        const mq = window.matchMedia(query)
        mq.addListener(queryHandler)
        return mq
      })
    }

    queryHandler()
    return () => queryList.forEach(mq => mq.removeListener(queryHandler))
  }, [queries, values, defaultValue])

  return value
}
