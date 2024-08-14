export async function getStrongestTopics() {
  const response = await fetch(`/api/strongest-topics`);
  if (!response.ok) {
    throw new Error('Data could not be received.');
  }
  return response.json();
}