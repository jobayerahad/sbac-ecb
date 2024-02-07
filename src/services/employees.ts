'use server'

import axios from 'axios'
import https from 'https'

import Employee from '@models/Employee'
import { connectToDB } from '@utils/database.utils'

export const getEmployees = async (page: number, limit: number, search?: string, branch?: string) => {
  try {
    await connectToDB()

    const skipCount = (page - 1) * limit

    let query: any = { empId: { $nin: [1067, 49], $lt: 8000 } }

    if (search) {
      query = {
        ...query,
        $or: [
          { empId: isNaN(parseInt(search)) ? null : parseInt(search) },
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
          { cellNo: { $regex: search, $options: 'i' } },
          { department: { $regex: search, $options: 'i' } },
          { designation: { $regex: search, $options: 'i' } }
        ].filter((condition) => condition.empId !== null)
      }
    }

    if (branch) query['branch.code'] = { $regex: branch, $options: 'i' }

    const totalEmployees = await Employee.countDocuments(query)
    const totalPages = Math.ceil(totalEmployees / limit)

    const employees = await Employee.find(query)
      .sort({ rank: 1, empId: 1 })
      .skip(skipCount)
      .limit(limit)
      .select('-_id -__v -rank')
      .lean()

    return {
      employees,
      pagination: {
        total: totalEmployees,
        totalPages,
        currentPage: page,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
    }
  } catch (error) {
    return { employees: [], pagination: {} }
  }
}

export const getEmployeeByEmpId = async (empId: number) => {
  await connectToDB()

  const employee = await Employee.findOne({ empId }).select('-_id -__v -rank')

  return employee
}

export const getEmployeeByRmId = async (rmId: number) => {
  await connectToDB()

  const employee = await Employee.findOne({ rmId }).select('-_id -__v -rank')

  return employee
}

export const updateExisting = async () => {
  await connectToDB()

  const employee = await Employee.updateMany(
    {},
    { $unset: { __v: 0 }, $rename: { emp_id: 'empId', emp_key: 'empKey', rm_id: 'rmId', cell_phone: 'cellNo' } }
  )

  return employee
}

export const updateEmployees = async () => {
  try {
    await connectToDB()

    const httpsAgent = new https.Agent({ rejectUnauthorized: false })
    const hrbookUrl = process.env.HRBOOK_URL as string
    const { data: allEmployeeIds } = await axios.get(`${hrbookUrl}/api/emp_info_all.php`, { httpsAgent })

    const employees: any[] = []
    const chunkSize = 100

    for (let i = 0; i < allEmployeeIds.length; i += chunkSize) {
      const chunk = allEmployeeIds.slice(i, i + chunkSize)

      const promises = chunk.map(async (employeeId: any) => {
        const { data: empData } = await axios.post(
          `${hrbookUrl}/api/emp_info.php`,
          { emp_id: employeeId.emp_id },
          { httpsAgent }
        )
        return {
          name: empData.name,
          empId: employeeId.emp_id,
          empKey: employeeId.emp_key,
          rank: employeeId.desCode,
          designation: empData.designation,
          department: empData.department,
          avatar: empData.img_link,
          cellNo: empData.contact,
          email: empData.email,
          branch: {
            code: empData.branch_code_cbs,
            name: empData.branch
          }
        }
      })

      const results = await Promise.all(promises)
      employees.push(...results)
    }

    await Employee.deleteMany()
    await Employee.insertMany(employees)

    return { message: `Contact Info updated at: ${new Date().toLocaleString('en-US')}` }
  } catch (error) {
    if (error instanceof Error) return { error: 500, message: error.message }
    return { error: 500, message: 'Internal Server Error' }
  }
}
