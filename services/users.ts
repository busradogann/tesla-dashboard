export async function getUsers() {
  const response = await fetch(`/api/users`);
  if (!response.ok) {
    throw new Error('Data could not be received.');
  }
  return response.json();
}