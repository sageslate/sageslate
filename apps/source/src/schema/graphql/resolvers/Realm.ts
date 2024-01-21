import type { RealmResolvers } from './../../types.generated.js'

export const Realm: RealmResolvers = {
  id: parent => {
    return parent._id.toHexString()
  },
}
