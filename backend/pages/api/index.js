const { GoogleSpreadsheet } = require('google-spreadsheet');

const VALIDATE_KEY = process.env.KEY
const SHEET_ID = process.env.SHEET_ID

const getDoc = async () => {
  const doc = new GoogleSpreadsheet(SHEET_ID);

  await doc.useServiceAccountAuth({
    client_email: process.env.CLIENT_EMAIL,
    private_key:  process.env.PRIVATE_KEY.replace(/\\n/g, '\n')
  })
  await doc.loadInfo();
  return doc;
}

const saveWord = async (word) => {
  const doc = await getDoc()
  const sheet = doc.sheetsByIndex[0];
  return sheet.addRow({ "WORDS": word })
}

const enableCorsHeaders = (response) => {
  response.setHeader('Access-Control-Allow-Credentials', true)
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
}

export default async function handler(
  request,
  response
) {
  enableCorsHeaders(response)

  if (request.method === 'OPTIONS') {
    response.status(200).end()
    return;
  }

  if (request.query.key !== VALIDATE_KEY) {
   response.status(201).json();
   return;
  }

  await saveWord(request.query.word)
  response.status(201).json();
}
