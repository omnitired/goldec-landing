import { ContentData } from '@/types/content';
import contentData from '@/data/content.json';

export const useContent = (): ContentData => {
  return contentData as ContentData;
};

export default useContent;