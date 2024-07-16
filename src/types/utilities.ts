export type TPaginatedRes<T> = {
  employees: T[]
  pagination: {
    total: number
    totalPages: number
    currentPage: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}
