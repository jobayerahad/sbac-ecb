import { TLocation } from '@types'

type HrData = {
  emp_id: string
  emp_key: string
  name?: string
  branch_code_cbs: string
  department: string
  img_link: string
}

const removeSalute = (name: string) => name.replace(/(mr|ms|miss|mrs|dr|sir)\.?/i, '').trim()

export const formatHrData = (data: HrData) => {
  const nameParts = data.name?.split(',')

  return {
    empId: parseInt(data.emp_id),
    empKey: parseInt(data.emp_key),
    name: removeSalute(nameParts ? nameParts[0] : ''),
    designation: nameParts && nameParts[1] ? nameParts[1].trim() : '',
    branch: {
      code: data.branch_code_cbs
    },
    department: data.department,
    avatar: `${process.env.HRBOOK_URL}${data.img_link}`
  }
}

export const convertLocationData = (data: { branches: TLocation[]; sub_branches: TLocation[] }) => {
  let convertedData = []

  // Convert branches
  const branches = data.branches.map((branch) => {
    return {
      value: branch.code,
      label: `${branch.name.english} (${branch.code})`
    }
  })

  convertedData.push({ group: 'Branches', items: branches })

  // Convert sub-branches
  const subBranches = data.sub_branches.map((subBranch) => {
    return {
      value: subBranch.code,
      label: `${subBranch.name.english} (${subBranch.code})`
    }
  })

  convertedData.push({ group: 'Sub-Branches', items: subBranches })

  return convertedData
}
