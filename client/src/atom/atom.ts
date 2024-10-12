import { atom } from 'recoil';
import { ApiResponse } from '@/types/facialtypes';

export const  faceAtom = atom<ApiResponse | null>({
  key: 'faceAtom',
  default: null,
});

