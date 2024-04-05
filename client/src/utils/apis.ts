export const fetchContentData = async () => {
  const serverUrl = process.env.SERVER_URL ?? 'http://localhost:8000'
  const response = await fetch(`${serverUrl}/api/influencer-data`)
  if (!response.ok) {
    throw new Error('failed to fetch influencer data')
  }
  return response.json()
}
