import { Meme } from './types';

const BASE_URL = 'https://6802194081c7e9fbcc445859.mockapi.io';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

async function get<T>(url: string): Promise<T> {
  const fullURL = `${BASE_URL}${url}`;
  return wait(500)
    .then(() => fetch(fullURL))
    .then(res => res.json());
}

export async function put<T>(url: string, data: unknown): Promise<T> {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}

export const getMemes = () => get<Meme[]>('/memes');
export const getMeme = (id: string) => get<Meme>(`/memes/${id}`);
export const updateMeme = (id: string, changes: Partial<Meme>) =>
  put<Meme>(`/memes/${id}`, changes);
