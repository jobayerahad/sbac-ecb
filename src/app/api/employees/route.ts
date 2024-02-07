import { getEmployeeByEmpId, getEmployeeByRmId, getEmployees } from '@services/employees'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const empId = searchParams.get('emp_id')
  const rmId = searchParams.get('rm_id')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')

  if (empId) {
    const employee = await getEmployeeByEmpId(+empId)
    return Response.json(employee)
  }

  if (rmId) {
    const employee = await getEmployeeByRmId(+rmId)
    return Response.json(employee)
  }

  const employees = await getEmployees(page, limit)
  return Response.json(employees)
}
