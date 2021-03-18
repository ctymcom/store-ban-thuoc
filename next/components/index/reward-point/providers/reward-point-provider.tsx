import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../../../../lib/providers/auth-provider";
import { Pagination } from "../../../../lib/repo/crud.repo";
import { UserPointLog, UserPointLogService } from "../../../../lib/repo/user-point-log.repo";

export const RewardPointContext = createContext<
  Partial<{
    listRewardPoint: UserPointLog[];
    setListRewardPoint: Function;
    pagination: Pagination;
    setPagination: Function;
  }>
>({});

export function RewardPointProvider({ children }: any) {
  const [listRewardPoint, setListRewardPoint] = useState<UserPointLog[]>(null);
  const { user } = useAuth();
  const [pagination, setPagination] = useState<Pagination>({
    limit: 10,
    page: 1,
    total: 0,
  });

  useEffect(() => {
    if (user) {
      loadListRewardPoint();
    }
  }, [user, pagination.page]);

  const loadListRewardPoint = () => {
    setListRewardPoint(null);
    UserPointLogService.getAll({
      query: {
        limit: pagination.limit,
        page: pagination.page,
        order: { createdAt: -1 },
        filter: { userId: user.id },
      },
      fragment: UserPointLogService.shortFragment,
    }).then((res) => {
      // console.log(res.data);

      setListRewardPoint(res.data);
      setPagination({ ...pagination, total: res.pagination.total });
    });
  };

  return (
    <RewardPointContext.Provider value={{ listRewardPoint, pagination, setPagination }}>
      {children}
    </RewardPointContext.Provider>
  );
}

export const useRewardPointContext = () => useContext(RewardPointContext);
