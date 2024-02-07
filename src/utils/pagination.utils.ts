export const getQueryString = (searchParams: URLSearchParams, name: string, value: string): string => {
  const params = new URLSearchParams(searchParams)
  params.set(name, value)
  return params.toString()
}
