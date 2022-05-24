const branch_list = [
  {
    branch_code: '0001',
    branch_name: 'Head Office'
  },
  {
    branch_code: '0002',
    branch_name: 'Principal Branch'
  },
  {
    branch_code: '0003',
    branch_name: 'Hemayetpur Branch'
  },
  {
    branch_code: '0004',
    branch_name: 'Agrabad Branch'
  },
  {
    branch_code: '0005',
    branch_name: 'Bhatiary Branch'
  },
  {
    branch_code: '0006',
    branch_name: 'Khulna Branch'
  },
  {
    branch_code: '0007',
    branch_name: 'Katakhali Branch'
  },
  {
    branch_code: '0008',
    branch_name: 'Keranigonj Branch'
  },
  {
    branch_code: '0009',
    branch_name: 'Uttara Branch'
  },
  {
    branch_code: '0010',
    branch_name: 'Gulshan Branch'
  },
  {
    branch_code: '0011',
    branch_name: 'Velanagar Branch'
  },
  {
    branch_code: '0012',
    branch_name: 'Imamgonj Branch'
  },
  {
    branch_code: '0013',
    branch_name: 'Ashulia Branch'
  },
  {
    branch_code: '0014',
    branch_name: 'SBAC Card Division'
  },
  {
    branch_code: '0015',
    branch_name: 'Dhanmondi Branch'
  },
  {
    branch_code: '0016',
    branch_name: 'Sylhet Branch'
  },
  {
    branch_code: '0017',
    branch_name: 'Mawna Branch'
  },
  {
    branch_code: '0018',
    branch_name: 'Jubilee Road Branch'
  },
  {
    branch_code: '0019',
    branch_name: 'Bogra Branch'
  },
  {
    branch_code: '0020',
    branch_name: 'Islampur Branch'
  },
  {
    branch_code: '0021',
    branch_name: 'Gazipur Branch'
  },
  {
    branch_code: '0022',
    branch_name: 'Modhunaghat Branch'
  },
  {
    branch_code: '0023',
    branch_name: 'Shyamnagar Branch'
  },
  {
    branch_code: '0024',
    branch_name: 'Moynamoti Branch'
  },
  {
    branch_code: '0025',
    branch_name: 'Bangla Bazar Branch'
  },
  {
    branch_code: '0026',
    branch_name: 'Banani Branch'
  },
  {
    branch_code: '0027',
    branch_name: 'Chuknagar Branch'
  },
  {
    branch_code: '0028',
    branch_name: 'Satkhira Branch'
  },
  {
    branch_code: '0029',
    branch_name: 'Barisal Branch'
  },
  {
    branch_code: '0030',
    branch_name: 'Sarbolokkhona Branch'
  },
  {
    branch_code: '0031',
    branch_name: 'Rajshahi Branch'
  },
  {
    branch_code: '0032',
    branch_name: 'Nawabpur Branch'
  },
  {
    branch_code: '0033',
    branch_name: 'Mirpur Branch'
  },
  {
    branch_code: '0034',
    branch_name: 'Shibu Market Branch'
  },
  {
    branch_code: '0035',
    branch_name: 'Ghonapara Branch'
  },
  {
    branch_code: '0036',
    branch_name: 'Digraj Branch'
  },
  {
    branch_code: '0037',
    branch_name: 'Baburhat Branch'
  },
  {
    branch_code: '0038',
    branch_name: 'Narayanganj Branch'
  },
  {
    branch_code: '0039',
    branch_name: 'Bijoy Nagar Branch'
  },
  {
    branch_code: '0040',
    branch_name: 'Rangpur Branch'
  },
  {
    branch_code: '0041',
    branch_name: 'Jessore Branch'
  },
  {
    branch_code: '0042',
    branch_name: 'Takerhat Branch'
  },
  {
    branch_code: '0043',
    branch_name: 'Fatikchhari Branch'
  },
  {
    branch_code: '0044',
    branch_name: 'Nasirabad Branch'
  },
  {
    branch_code: '0045',
    branch_name: 'Bhomra Branch'
  },
  {
    branch_code: '0046',
    branch_name: 'Morrelganj Branch'
  },
  {
    branch_code: '0047',
    branch_name: 'Hasnabad Branch'
  },
  {
    branch_code: '0048',
    branch_name: 'Kharabad Baintola Branch'
  },
  {
    branch_code: '0049',
    branch_name: 'Chalakchor Branch'
  },
  {
    branch_code: '0050',
    branch_name: 'Panthapath Branch'
  },
  {
    branch_code: '0051',
    branch_name: 'Mouchak Branch'
  },
  {
    branch_code: '0052',
    branch_name: 'Maligram Branch'
  },
  {
    branch_code: '0053',
    branch_name: 'EPZ Branch CTG'
  },
  {
    branch_code: '0054',
    branch_name: 'Dinajpur Branch'
  },
  {
    branch_code: '0055',
    branch_name: 'KDA C/A Branch'
  },
  {
    branch_code: '0056',
    branch_name: 'Natore Branch'
  },
  {
    branch_code: '0057',
    branch_name: 'Feni Branch'
  },
  {
    branch_code: '0058',
    branch_name: 'Kushtia Branch'
  },
  {
    branch_code: '0059',
    branch_name: 'Labonchora Branch'
  },
  {
    branch_code: '0060',
    branch_name: 'Pragati Sarani Branch'
  },
  {
    branch_code: '0061',
    branch_name: 'Khatungonj Branch'
  },
  {
    branch_code: '0062',
    branch_name: 'Amin Bazar Branch'
  },
  {
    branch_code: '0063',
    branch_name: 'Banari Para Branch'
  },
  {
    branch_code: '0064',
    branch_name: 'Faltita Branch'
  },
  {
    branch_code: '0065',
    branch_name: 'Adda Bazar Branch'
  },
  {
    branch_code: '0066',
    branch_name: 'Jibannagar Branch'
  },
  {
    branch_code: '0067',
    branch_name: 'SBAC Corporate Branch'
  },
  {
    branch_code: '0068',
    branch_name: 'Abdullahpur Branch'
  },
  {
    branch_code: '0069',
    branch_name: 'Bhulta Branch'
  },
  {
    branch_code: '0070',
    branch_name: 'Mymensingh Branch'
  },
  {
    branch_code: '0071',
    branch_name: 'Birganj Branch'
  },
  {
    branch_code: '0072',
    branch_name: 'Nazipur Branch'
  },
  {
    branch_code: '0073',
    branch_name: 'Mehendiganj Branch'
  },
  {
    branch_code: '0074',
    branch_name: 'Cumilla Branch'
  },
  {
    branch_code: '0075',
    branch_name: 'Bhola Branch'
  },
  {
    branch_code: '0076',
    branch_name: 'Bashundhara Mahila Branch'
  },
  {
    branch_code: '0077',
    branch_name: 'Babubazar Branch'
  },
  {
    branch_code: '0078',
    branch_name: 'Ramganj Branch'
  },
  {
    branch_code: '0079',
    branch_name: 'Kaliganj Branch'
  },
  {
    branch_code: '0080',
    branch_name: 'Palashbari Branch'
  },
  {
    branch_code: '0081',
    branch_name: 'Mohakhali Branch'
  },
  {
    branch_code: '0082',
    branch_name: 'Bhandaria Branch'
  },
  {
    branch_code: '0083',
    branch_name: 'Benapole Branch'
  },
  {
    branch_code: '0084',
    branch_name: 'Lohagara Branch'
  },
  {
    branch_code: '0085',
    branch_name: 'KhanJahan Ali Mazar Branch'
  },
  {
    branch_code: '0086',
    branch_name: 'Tejgaon Link Road'
  },
  {
    branch_code: '2001',
    branch_name: 'Gopalgonj Sub-Branch'
  },
  {
    branch_code: '2002',
    branch_name: 'Jatrabari Sub-Branch'
  },
  {
    branch_code: '2003',
    branch_name: 'Rayenda Bazar Sub-Branch'
  },
  {
    branch_code: '2004',
    branch_name: 'Rupatoli Sub-Branch'
  },
  {
    branch_code: '2005',
    branch_name: 'Pacchor Sub-Branch'
  },
  {
    branch_code: '2006',
    branch_name: 'Muladi Sub-Branch'
  },
  {
    branch_code: '2007',
    branch_name: 'Hatirpul Sub-Branch'
  },
  {
    branch_code: '2008',
    branch_name: 'Laxmipur Sub-Branch'
  },
  {
    branch_code: '2009',
    branch_name: 'Yousuf Market Sub-Branch'
  },
  {
    branch_code: '2010',
    branch_name: 'Dupchanchia Sub-Branch'
  },
  {
    branch_code: '2011',
    branch_name: 'Gopalpur Sub-Branch'
  },
  {
    branch_code: '2012',
    branch_name: 'Thermax Shilpo Sub-Branch'
  },
  {
    branch_code: '2013',
    branch_name: 'Pirganj Sub-Branch'
  },
  {
    branch_code: '2014',
    branch_name: 'Trunk Road Sub-Branch'
  },
  {
    branch_code: '2015',
    branch_name: 'Barura Sub-Branch'
  },
  {
    branch_code: '2016',
    branch_name: 'Madhabdi Sub-Branch'
  },
  {
    branch_code: '2017',
    branch_name: 'Bagerhat Sub-Branch'
  },
  {
    branch_code: '2018',
    branch_name: 'Dania Sub-Branch'
  },
  {
    branch_code: '2019',
    branch_name: 'Reazuddin Bazar Sub-Branch'
  },
  {
    branch_code: '2020',
    branch_name: 'Kalaroa Sub-Branch'
  },
  {
    branch_code: '2021',
    branch_name: 'Mongla Sub-Branch'
  },
  {
    branch_code: '2022',
    branch_name: 'Indira Road Sub-Branch'
  },
  {
    branch_code: '2023',
    branch_name: 'Fakirhat Sub-Branch'
  },
  {
    branch_code: '7001',
    branch_name: 'Head Office IBW'
  },
  {
    branch_code: '7002',
    branch_name: 'Principal IBW Branch'
  },
  {
    branch_code: '7004',
    branch_name: 'Agrabad IBW Branch'
  },
  {
    branch_code: '7006',
    branch_name: 'Khulna IBW Branch'
  },
  {
    branch_code: '7007',
    branch_name: 'Katakhali IBW Branch'
  },
  {
    branch_code: '7012',
    branch_name: 'Imamgonj IBW Branch'
  },
  {
    branch_code: '7020',
    branch_name: 'Islampur IBW Branch'
  },
  {
    branch_code: '7026',
    branch_name: 'Banani IBW Branch'
  },
  {
    branch_code: '7029',
    branch_name: 'Barisal IBW Branch'
  },
  {
    branch_code: '7031',
    branch_name: 'Rajshahi IBW Branch'
  },
  {
    branch_code: '7045',
    branch_name: 'Bhomra IBW Branch'
  }
]

export default branch_list

export const getBranch = (branch_name) => {
  let branch = branch_list.find((branch) => branch.branch_name === branch_name)
  return branch
}
