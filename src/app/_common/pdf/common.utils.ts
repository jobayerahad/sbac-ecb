import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export const initializePDF = (orientation: 'landscape' | 'portrait') => {
  const doc = new jsPDF({ orientation })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const logoWidth = 40
  const logoHeight = 16
  const marginLeft = 20

  doc.addImage('/logo-full.png', 'PNG', marginLeft, 10, logoWidth, logoHeight)

  doc.setFontSize(10) // Reduced the font size for location text
  doc.setTextColor(51, 51, 51)

  const textYPosition = logoHeight + 16 // Adjust the Y position to appear below the logo
  doc.text('BSC Tower, (5th - 16th Floor)', marginLeft, textYPosition)
  doc.text('2-3 Rajuk Avenue', marginLeft, textYPosition + 5)
  doc.text('Motijheel, Dhaka-1000', marginLeft, textYPosition + 10)

  return { doc, pageWidth, pageHeight, logoHeight }
}

export const addTable = (doc: jsPDF, body: any, startY: number, margin: number, lineHeight: number) => {
  autoTable(doc, {
    startY,
    body,
    theme: 'grid',
    styles: {
      cellPadding: 2,
      fontSize: 10
    },
    margin: { left: margin, right: margin },
    tableWidth: 'auto' // Automatically adjust the table width
  })

  return (doc as any).lastAutoTable.finalY || startY + lineHeight
}

export const addFooterText = (doc: jsPDF, pageWidth: number, pageHeight: number) => {
  doc.setFontSize(8)
  const footerText = 'This is a system-generated document and does not require any signature or seal.'
  doc.text(footerText, pageWidth / 2, pageHeight - 10, { align: 'center' })
}

export const savePDF = (doc: jsPDF, refNo: string) => {
  if (process.env.NODE_ENV === 'development') {
    const blob = doc.output('blob')
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
  } else {
    const filename = `${refNo}_${new Date().toLocaleString('en-BD', {
      timeStyle: 'medium',
      hour12: false
    })}.pdf`
    doc.save(filename)
  }
}
