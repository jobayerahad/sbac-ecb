import { Alert, Button, Container, Group, Title } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { AiOutlineInfoCircle as AlertIcon } from 'react-icons/ai'
import { IoMdAddCircle as AddIcon } from 'react-icons/io'

import Loading from '@components/common/Loading'
import BranchList from '@components/branches/List'
import AddBranch from '@components/branches/Create'
import { useBranchData } from '@components/branches/utils/apiCalls'

const Branches = () => {
  const { openModal, closeModal } = useModals()
  const { isLoading, isError, error, data } = useBranchData()

  const addHandler = () =>
    openModal({
      title: 'Add New Branch',
      centered: true,
      children: <AddBranch closeModal={closeModal} />,
      closeOnClickOutside: false
    })

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        error?.response.data.message
      ) : (
        <>
          <Group position="apart">
            <Title order={3}>Branch List</Title>

            <Button leftIcon={<AddIcon size={16} />} onClick={addHandler}>
              Add Branch
            </Button>
          </Group>

          {data.length > 0 ? (
            <BranchList list={data} />
          ) : (
            <Alert icon={<AlertIcon size={16} />} mt="md" title="No GL Account Found!" radius="md">
              Please start adding general ledger account by clicking &apos;+ Create GL&apos; button above.
            </Alert>
          )}
        </>
      )}
    </Container>
  )
}

export default Branches
