export default async function useProjectsData() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`,
      {
        cache: 'no-store',
      }
    );
    return await response.json();
  } catch (error) {
    return [];
  }
}
