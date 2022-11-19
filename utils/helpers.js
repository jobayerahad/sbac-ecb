export const sanitizeTableData = (data) =>
  data?.map((row) => {
    Object.keys(row).forEach((column) => {
      if (typeof row[column] === 'number') row[column] = row[column].toString()
    })

    return row
  })
