import {renderHook} from '@testing-library/react-hooks'
import './matchMedia.mock' // Must be imported before the tested file
import useMediaBreakpoints from '../'

test('should return new type from values', () => {
  const {result, unmount} = renderHook(() =>
    useMediaBreakpoints(
      ['(min-width: 1024)', 'matches'],
      ['desktop', 'tablet'],
      'mobile',
    ),
  )

  expect(result.current).toBe('tablet')

  // Unmount to force the cleanup (removes listener)
  unmount()
})
