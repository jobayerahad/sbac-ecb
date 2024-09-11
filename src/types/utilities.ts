import { ReactNode } from 'react'
import { StatusMsg } from '@config/strings'

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

export type ActionRes = {
  status: StatusMsg
  message: string
  data?: any
}

export type Message = {
  title: string
  icon: ReactNode
  message: string
  color: string
}
