export const sanitizeTableData = (data) =>
  data?.map((row) => {
    Object.keys(row).forEach((column) => {
      if (typeof row[column] === 'number') row[column] = row[column].toString()
    })

    return row
  })

export const apiSuccessMsg = (message) => ({
  statusCode: 200,
  message,
  status: 'Success'
})

export const apiErrorMsg = (statusCode, message, error) => ({
  statusCode,
  message,
  error
})

const removeSalute = (name) => name.replace(/(Mr|MR|Ms|Miss|Mrs|Dr|Sir)(\.?)\s/, '').trim()

export const formatHrData = (data) => ({
  emp_id: parseInt(data.emp_id),
  emp_key: parseInt(data.emp_key),
  name: removeSalute(data?.name.split(',')[0]),
  designation: data?.name.split(',')[1].trim(),
  branch_code: data.branch_code_cbs,
  department: data.department,
  avatar: process.env.HRBOOK_URL + data.img_link
})
