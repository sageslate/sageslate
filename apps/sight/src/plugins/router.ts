import { doesExist } from '@sageslate/stone'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto/routes'

import { useInitializationStore, InitializedState } from '@/stores/initialization'

export interface SageRouteMeta {
  isInitializedOnly?: boolean
  isPreInitializedOnly?: boolean
  isErrorPage?: boolean
  isInitialStatePage?: boolean
}

declare module 'vue-router' {
  interface RouteMeta extends SageRouteMeta {}
}

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
})

router.beforeEach(async to => {
  const initializationStore = useInitializationStore()
  const initializedState = await initializationStore.getInitializedState()
  const errorRoute = routes.find(route => route.meta?.isInitialStatePage && route.meta.isErrorPage)
  const preInitializedRoute = routes.find(route => route.meta?.isInitialStatePage && route.meta.isPreInitializedOnly)
  const initializedRoute = routes.find(route => route.meta?.isInitialStatePage && route.meta.isInitializedOnly)
  if (!doesExist(errorRoute)) {
    throw new Error('No error route found')
  }
  if (!doesExist(preInitializedRoute)) {
    throw new Error('No pre initialized route found')
  }
  if (!doesExist(initializedRoute)) {
    throw new Error('No initialized route found')
  }
  if (to.meta.isInitializedOnly && initializedState !== InitializedState.Initialized) {
    return {
      path: preInitializedRoute.path,
    }
  }
  if (to.meta.isPreInitializedOnly && initializedState !== InitializedState.Uninitialized) {
    return {
      path: initializedRoute.path,
    }
  }
  if (to.meta.isErrorPage && initializedState !== InitializedState.Error) {
    return {
      path: errorRoute.path,
    }
  }
})
