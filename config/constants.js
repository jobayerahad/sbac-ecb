export const EMPLOYEES_DATA = 'employees'
export const BRANCH_DATA = 'branches'

export const empOptions = {
  exclude: [1067, 49],
  range: 7000,
  sort: { rank: 1, emp_id: 1 },
  filter: ['-_id', '-__v', '-rank']
}
