import autoTable, { Styles } from 'jspdf-autotable'
import { addFooterText, initializePDF, savePDF } from './common.utils'
import { capWords } from '@utils/helpers.utils'
import { AccountInfo } from '@types'

const bdt = new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export const genRmReportPDF = (data: AccountInfo[], duration: string) => {
  const { doc, pageWidth, pageHeight } = initializePDF('portrait')

  const margin = 20

  doc.setFontSize(14)
  doc.text('Relationship Manager Report', pageWidth - margin, margin, { align: 'right' })

  // Employee Detatils
  autoTable(doc, {
    startY: margin + 5,
    body: [
      ['Employee Name', ': ' + capWords(data[0]?.rmName)],
      ['Employee ID', ': ' + data[0]?.empId],
      ['RM ID', ': ' + data[0]?.rmId],
      ['Duration', ': ' + duration]
    ],
    theme: 'plain',
    margin: { left: margin + 90, right: margin },
    styles: {
      fontSize: 8,
      cellPadding: 1
    }
  })

  const header = [['#', 'A/C No', 'A/C Name', 'Product Name', 'Opening Date', 'Status', 'Balance']]
  const footer = [
    [
      '',
      '',
      '',
      '',
      '',
      'Total',
      bdt.format(data.reduce((totalBalance, currentItem) => totalBalance + currentItem.balance, 0))
    ]
  ]

  const trxBody: any = data.map(({ accountno, accountName, glHead, openDate, status, balance }, index) => [
    index + 1,
    accountno,
    capWords(accountName),
    glHead,
    new Date(openDate || '').toLocaleString('en-US', { dateStyle: 'medium' }),
    capWords(status),
    bdt.format(balance)
  ])

  const headFootStyle: Partial<Styles> = {
    fillColor: '#f8f9fa',
    textColor: '#333333',
    lineColor: '#dee2e6', // Border color
    lineWidth: 0.5, // Border thickness for header
    fontStyle: 'bold'
  }

  // Add table for each account
  autoTable(doc, {
    startY: 50,
    head: header,
    foot: footer,
    body: trxBody,
    theme: 'grid',
    margin: { left: margin, right: margin },
    styles: {
      fontSize: 8.5,
      cellPadding: 1.5
      // lineWidth: 0.1 // Set line width for table borders
    },
    headStyles: headFootStyle,
    footStyles: headFootStyle
  })

  // Add system-generated footer on the last page
  addFooterText(doc, pageWidth, pageHeight)

  // Save PDF
  savePDF(doc, data[0]?.rmId.toString())
}
