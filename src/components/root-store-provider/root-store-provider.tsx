import { RootStore } from '@root/store'
import { Provider } from 'mobx-react'
import * as React from 'react'

interface Props {
  store: RootStore
}
export const RootStoreProvider: React.FC<Props> = ({ store, children }) => {
  return <Provider {...store}>{children}</Provider>
}
