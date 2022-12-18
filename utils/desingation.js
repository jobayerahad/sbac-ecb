export const designations = [
  { designation: 'MD', rank: 1 },
  { designation: 'AMD', rank: 2 },
  { designation: 'DMD', rank: 3 },
  { designation: 'DMD-PROCUREMENT', rank: 3 },
  { designation: 'SEVP', rank: 4 },
  { designation: 'PRINCIPAL', rank: 4 },
  { designation: 'CEO', rank: 4 },
  { designation: 'EVP', rank: 5 },
  { designation: 'SVP', rank: 6 },
  { designation: 'VP', rank: 7 },
  { designation: 'FVP', rank: 8 },
  { designation: 'AVP', rank: 9 },
  { designation: 'FAVP', rank: 10 },
  { designation: 'SEO', rank: 11 },
  { designation: 'SEO-CASH', rank: 11 },
  { designation: 'EO', rank: 12 },
  { designation: 'EO-CASH', rank: 12 },
  { designation: 'FEO', rank: 13 },
  { designation: 'FEO-CASH', rank: 13 },
  { designation: 'FEO', rank: 13 },
  { designation: 'FEO-CASH', rank: 13 },
  { designation: 'SO', rank: 14 },
  { designation: 'SO-CASH', rank: 14.5 },
  { designation: 'MTO', rank: 14.6 },
  { designation: 'OFFICER', rank: 15 },
  { designation: 'OFFICER-CASH', rank: 15.5 },
  { designation: 'PROBATIONARY OFFICER', rank: 15.4 },
  { designation: 'JO', rank: 16 },
  { designation: 'JO-CASH', rank: 16.5 },
  { designation: 'TJO', rank: 17 },
  { designation: 'TJO-CASH', rank: 17.5 },
  { designation: 'AO', rank: 18 },
  { designation: 'AO-CASH', rank: 18.5 },
  { designation: 'TAO', rank: 19 },
  { designation: 'TAO-CASH', rank: 19.5 }
]

export const getRank = (designation) => {
  const desig = designations.find((d) => d.designation === designation)
  return desig ? desig.rank : 404
}
