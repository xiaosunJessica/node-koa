export const getRouteFullPath = (route: any) => {
  const { layoutPath, path } = route
  return `${layoutPath}${layoutPath?.endsWith('/') ? '' : '/'}${path}`
}