export const amountFormatter = (value: string) => {
  if (!Number.isNaN(parseFloat(value))) {
    const formattedValue = parseFloat(value)
    return `${formattedValue}`.replace(/(\d)(?=(\d\d)+\d(?!\d))/g, '$1,')
  } else return ''
}

export const amountParser = (value: string) => value.replace(/\$\s?|(,*)/g, '')

type Data = {
  emp_id: string
  emp_key: string
  name?: string
  branch_code_cbs: string
  department: string
  img_link: string
}

const removeSalute = (name: string) => name.replace(/(mr|ms|miss|mrs|dr|sir)\.?/i, '').trim()

export const formatHrData = (data: Data) => {
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
