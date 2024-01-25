import { doesExist } from '@sageslate/stone'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto/routes'

import { useAuthenticationStore } from '@/stores/authentication'
import { useInitializationStore, InitializedState } from '@/stores/initialization'

export interface SageRouteMeta {
  isInitializedOnly?: boolean
  isPreInitializedOnly?: boolean
  isErrorPage?: boolean
  isInitialStatePage?: boolean
  isGuestOnly?: boolean
  isAdminOnly?: boolean
}

declare module 'vue-router' {
  interface RouteMeta extends SageRouteMeta {}
}

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
})

router.beforeEach(async to => {
  const initializationStore = useInitializationStore()
  const authenticationStore = useAuthenticationStore()
  await Promise.all([initializationStore.waitForStoreReady(), authenticationStore.waitForStoreReady()])
  const errorRoute = routes.find(route => route.meta?.isInitialStatePage && route.meta.isErrorPage)
  const preInitializedRoute = routes.find(route => route.meta?.isInitialStatePage && route.meta.isPreInitializedOnly)
  const initializedRouteGuest = routes.find(
    route => route.meta?.isInitialStatePage && route.meta.isInitializedOnly && route.meta.isGuestOnly,
  )
  const initializedRouteAdmin = routes.find(
    route => route.meta?.isInitialStatePage && route.meta.isInitializedOnly && route.meta.isAdminOnly,
  )
  if (!doesExist(errorRoute)) {
    throw new Error('No error route found')
  }
  if (!doesExist(preInitializedRoute)) {
    throw new Error('No pre initialized route found')
  }
  if (!doesExist(initializedRouteGuest)) {
    throw new Error('No initialized route found for guest')
  }
  if (!doesExist(initializedRouteAdmin)) {
    throw new Error('No initialized route found for admin')
  }
  if (to.meta.isInitializedOnly && initializationStore.initializedState === InitializedState.Uninitialized) {
    return {
      path: preInitializedRoute.path,
    }
  }
  if (to.meta.isPreInitializedOnly && initializationStore.initializedState == InitializedState.Initialized) {
    return {
      path: authenticationStore.isAdmin ? initializedRouteAdmin.path : initializedRouteGuest.path,
    }
  }
  if (!to.meta.isErrorPage && initializationStore.initializedState === InitializedState.Error) {
    return {
      path: errorRoute.path,
    }
  }
  if (to.meta.isErrorPage && initializationStore.initializedState !== InitializedState.Error) {
    return {
      path:
        initializationStore.initializedState === InitializedState.Uninitialized
          ? preInitializedRoute.path
          : authenticationStore.isAdmin
            ? initializedRouteAdmin.path
            : initializedRouteGuest.path,
    }
  }
  if (to.meta.isGuestOnly && authenticationStore.isAdmin) {
    return {
      path: initializedRouteAdmin.path,
    }
  }
  if (to.meta.isAdminOnly && !authenticationStore.isAdmin) {
    return {
      path: initializedRouteGuest.path,
    }
  }
})
