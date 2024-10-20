import { get } from '@/app/lib/api/crud'
import { Constants } from '@/app/lib/config/constants'

export const cryptoApi = {
  list: async (params?: GetDataType) =>
    get({
      url: `${Constants.ApiBseURL}`,
      params,
    }),
}
