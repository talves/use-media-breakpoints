import React from 'react'

export const getDefaultBreakpoint = (queries, values, defaultValue) => {
  if (queries.length !== values.length) {
    throw new Error(
      '[use-media-breakpoints] queries and values array must have same length',
    )
  }
  if (typeof window === 'undefined') {
    return defaultValue
  } else {
    const index = queries.findIndex(query => {
      const mq = window.matchMedia(query)
      return mq.matches
    })
    return index === -1 ? defaultValue : values[index]
  }
}

export default function useMediaBreakpoints(queries, values, defaultValue) {
  const [value, setValue] = React.useState(
    getDefaultBreakpoint(queries, values, defaultValue),
  )

  React.useEffect(() => {
    if (queries.length !== values.length) {
      throw new Error(
        '[use-media-breakpoints] queries and values array must have same length',
      )
    }
    let queryList = []
    function queryHandler() {
      // Get index of first media query that matches
      const index = queryList.findIndex(mq => mq.matches)
      // Return related value or defaultValue if none
      setValue(index === -1 ? defaultValue : values[index])
    }

    if (typeof window !== 'undefined') {
      queryList = queries.map(query => {
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
