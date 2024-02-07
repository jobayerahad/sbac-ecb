'use server'

import axios from 'axios'
import https from 'https'

import { rmReportParams } from '@types'

export const getRmData = async ({ emp_id, start_date, end_date }: rmReportParams): Promise<any> => {
  try {
    if (!process.env.CBS_API) throw new Error('CBS_API is not defined in environment variables')

    const httpsAgent = new https.Agent({ rejectUnauthorized: false })

    const { data } = await axios.get(`${process.env.CBS_API}/rm-report`, {
      httpsAgent,
      headers: {
        Authorization: `Bearer ${process.env.CBS_API_TOKEN}`
      },
      timeout: 5000,
      params: {
        emp_id,
        start_date,
        end_date
      }
    })

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) throw new Error(`Request error: ${error.message}`)
    throw new Error('Internal Server Error')
  }
}
