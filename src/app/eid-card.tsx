'use client'

import * as htmlToImage from 'html-to-image'
import { jsPDF } from 'jspdf'
import { useState } from 'react'
import { Box, Button, Container, Flex, Group, Image, NumberInput, Paper, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IoMdSend as SubmitIcon } from 'react-icons/io'
import { GrPowerReset as ResetIcon } from 'react-icons/gr'

import { getEmployee } from '@actions/employees'
import { TEmployee } from '@types'

const EidCard = () => {
  const [empInfo, setEmpInfo] = useState<TEmployee | undefined>()

  const { getInputProps, onSubmit, reset } = useForm({
    initialValues: {
      empId: ''
    }
  })

  const submitHandler = async (val: any) => {
    const data = await getEmployee(+val.empId)
    setEmpInfo(data)
  }

  const downloadPDF = () => {
    const doc = new jsPDF({
      orientation: 'landscape'
    })
    const element = document.getElementById('eid-card-container')

    if (element) {
      doc.html(element, {
        callback: function () {
          doc.save(`Eid-Card-2024-${empInfo?.empId}.pdf`)
        }
      })
    }
  }

  const downloadImage = async () => {
    const element = document.getElementById('eid-card-container')

    if (element) {
      try {
        const dataUrl = await htmlToImage.toJpeg(element)
        const link = document.createElement('a')
        link.download = `Eid-Card-2024-${empInfo?.empId}.jpg`
        link.href = dataUrl
        link.click()
      } catch (error) {
        console.error('Error generating image:', error)
      }
    }
  }

  return (
    <Container mt="md">
      <form onSubmit={onSubmit(submitHandler)}>
        <Paper component={Group} shadow="xs" p="md" align="flex-end">
          <NumberInput
            label="Employee ID"
            placeholder="Write your employee ID"
            flex={1}
            hideControls
            {...getInputProps('empId')}
          />

          <Button type="submit" leftSection={<SubmitIcon />}>
            Get Your Eid Card
          </Button>

          <Button variant="outline" onClick={reset} leftSection={<ResetIcon />}>
            Reset
          </Button>
        </Paper>
      </form>

      {empInfo && (
        <Button onClick={downloadImage} my="md">
          Download PDF
        </Button>
      )}

      {empInfo && (
        <Box id="eid-card-container" pos="relative">
          <Image src="/eid-card-horizontal.jpg" alt="Eid Card" />

          <Flex pos="absolute" bottom="3.5rem" right="5rem" direction="column" align="center">
            <Text c="yellow.4" size="lg">
              {empInfo.name}
            </Text>
            <Text c="white" size="sm">
              {`${empInfo.designation}, ${empInfo.branch.code === '0001' ? `${empInfo.department}, ` : ''}${
                empInfo.branch.name
              }`}
            </Text>
            <Text c="white" size="sm">
              SBAC BANK PLC.
            </Text>
          </Flex>
        </Box>
      )}
    </Container>
  )
}

export default EidCard
