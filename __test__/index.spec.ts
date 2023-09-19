import test from 'ava'

import { crateVersion } from '../index'

test('returns native code version', (t) => {
  t.truthy(crateVersion())
})
