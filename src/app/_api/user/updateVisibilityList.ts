import axiosInstance from '@/lib/axios/axiosInstance';

interface updateVisibilityListProps {
  listId: number;
  isPublic: boolean;
}

const updateVisibilityList = async (listData: updateVisibilityListProps) => {
  const response = await axiosInstance.patch('/users/list-visibility', listData);
  return response.data;
};

export default updateVisibilityList;
