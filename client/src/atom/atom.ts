import { atom } from 'recoil';
import { ApiResponse } from '@/types/facialtypes';

export const  faceAtom = atom<ApiResponse | null>({
  key: 'faceAtom',
  default: null,
});


export const userAtom = atom<string | null >({
  key:'userAtom',
  default: null,
})