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

export async function getNewsDetails(id) {
  try {
    const res = await fetchWrapper.get(`items/${id}`);
    return { res };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('error at getNewsDetails', { error });
    return { error };
  }
}
