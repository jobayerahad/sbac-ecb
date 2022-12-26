import { ActionIcon, Menu } from '@mantine/core'
import { closeModal, openModal } from '@mantine/modals'
import { MdUpdate as UpdateIcon } from 'react-icons/md'
import { BsThreeDots as MoreIcon } from 'react-icons/bs'
import PropTypes from 'prop-types'

import UpdateBranch from './Update'

const BranchActions = ({ data }) => {
  const updateHandler = () =>
    openModal({
      title: `Update '${data.branch_name} (${data.branch_code})' information`,
      size: 'lg',
      centered: true,
      children: <UpdateBranch data={data} closeModal={closeModal} />
    })

  return (
    <Menu withArrow>
      <Menu.Target>
        <ActionIcon size="xs" variant="subtle">
          <MoreIcon />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<UpdateIcon size={16} />} onClick={updateHandler}>
          Update
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

BranchActions.propTypes = {
  id: PropTypes.string.isRequired
}

export default BranchActions
