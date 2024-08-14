export async function getWeakestTopics() {
  const response = await fetch(`/api/weakest-topics`);
  if (!response.ok) {
    throw new Error('Data could not be received.');
  }

  return response.json();
}