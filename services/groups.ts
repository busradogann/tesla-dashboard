export async function getGroups() {
  const response = await fetch(`/api/groups`);
  if (!response.ok) {
    throw new Error('Data could not be received.');
  }
  return response.json();
}