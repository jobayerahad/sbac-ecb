import { TLocation } from '@types'

export const convertLocationData = (data: { branches: TLocation[]; subBranches: TLocation[] }) => {
  let convertedData = []

  // Convert branches
  const branches = data.branches.map((branch) => {
    return {
      value: branch.code,
      label: `${branch.name.english} (${branch.code})`
    }
  })

  convertedData.push({ group: 'Branches', items: branches })
  // convertedData.push(...branches)

  // Convert sub-branches
  const subBranches = data.subBranches.map((subBranch) => {
    return {
      value: subBranch.code,
      label: `${subBranch.name.english} (${subBranch.code})`
    }
  })

  convertedData.push({ group: 'Sub-Branches', items: subBranches })
  // convertedData.push(...subBranches)

  return convertedData
}
