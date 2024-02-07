import { updateEmployees } from '@services/employees'

export async function GET(_: Request) {
  const employees = await updateEmployees()
  return Response.json(employees)
}
