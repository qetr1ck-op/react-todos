import { RouterStore } from 'mobx-react-router'

interface RootStores {
  routerStore: RouterStore
}

export class RootStore {
  routerStore: RouterStore
  constructor({ routerStore }: RootStores) {
    this.routerStore = routerStore
  }
}
