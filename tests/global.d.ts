declare namespace globalThis {
  var mountedComponent: (
    component: {
      new (...args: any[]): {}
      __vccOpts: any
    },
    options: (MountingOptions<any, {}> & Record<string, any>) | undefined = {}
  ) => VueWrapper<ComponentPublicInstance<V>>

  var shallowMountedComponent: (
    component: {
      new (...args: any[]): {}
      __vccOpts: any
    },
    options: (MountingOptions<any, {}> & Record<string, any>) | undefined = {}
  ) => VueWrapper<ComponentPublicInstance<V>>
}
