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

export type MenuItem = {
  value: string
  label: string
}

export type GroupMenuItem = {
  group: string
  items: MenuItem[]
}
