import {renderHook} from '@testing-library/react-hooks'
import './matchMedia.mock' // Must be imported before the tested file
import useMediaBreakpoints from '../'

test('should return value on matches', () => {
  let queries = ['(min-width: 1024)', 'matches']
  let values = ['desktop', 'tablet']
  const {result, rerender, unmount} = renderHook(() =>
    useMediaBreakpoints(queries, values, 'mobile'),
  )

  expect(result.current).toBe('tablet')

  // Checking for string in values and less length
  queries = ['no-matches', 'matches']
  values = ['desktop']
  rerender()
  expect(result.current).toBe('mobile')

  // Checking normal now
  queries = ['no-matches', 'matches', 'othermedia']
  values = ['desktop', 'tablet']
  rerender()
  expect(result.current).toBe('tablet')

  // Unmount to force the cleanup (removes listener)
  unmount()
})

test('strings resolve to arrays and default to no matches', () => {
  let queries = 'matches'
  let values = 'desktop'
  const {result, rerender, unmount} = renderHook(() =>
    useMediaBreakpoints(queries, values, 'mobile'),
  )

  expect(result.current).toBe('desktop')

  queries = ['no-matches', 'othermedia']
  values = ['desktop', 'tablet']
  rerender()
  expect(result.current).toBe('mobile')

  // Unmount to force the cleanup (removes listener)
  unmount()
})

test('window missing (ssr) should be default', () => {
  const {result, unmount} = renderHook(() => {
    return useMediaBreakpoints([], [], 'mobile')
  })

  expect(result.current).toBe('mobile')

  // Unmount to force the cleanup (removes listener)
  unmount()
})
