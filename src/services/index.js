import { fetchWrapper } from '@/utils/fetch-wrapper';

export async function searchHackerNews(text) {
  try {
    const res = await fetchWrapper.get(`search?query=${text}`);
    return { res };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('error at searchHackerNews', { error });
    return { error };
  }
}
