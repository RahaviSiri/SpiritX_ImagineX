import axios from 'axios';

export const resolveShortLink = async (shortUrl) => {
  try {
    const response = await axios.get(shortUrl, { maxRedirects: 5 });
    return response.request.res.responseUrl; // Get the final URL after redirect
  } catch (error) {
    throw new Error('Unable to resolve short link.');
  }
};
