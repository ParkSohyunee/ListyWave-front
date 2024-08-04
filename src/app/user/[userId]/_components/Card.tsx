import Image from 'next/image';
import { MouseEvent } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import * as styles from './Card.css';
import LockIcon from '/public/icons/lock_alt.svg';

import useMoveToPage from '@/hooks/useMoveToPage';
import useBooleanOutput from '@/hooks/useBooleanOutput';
import useOnClickOutside from '@/hooks/useOnClickOutside';

import { ListType } from '@/lib/types/listType';
import { BACKGROUND_COLOR_READ } from '@/styles/Color';
import updateVisibilityList from '@/app/_api/user/updateVisibilityList';
import { QUERY_KEYS } from '@/lib/constants/queryKeys';

interface CardProps {
  list: ListType;
  isOwner: boolean;
  userId: number;
}

export default function Card({ list, isOwner, userId }: CardProps) {
  const queryClient = useQueryClient();
  const { onClickMoveToPage } = useMoveToPage();
  const { isOn, handleSetOff, handleSetOn } = useBooleanOutput();
  const { ref } = useOnClickOutside(() => {
    handleSetOff();
  });

  const updateVisibilityListMutation = useMutation({
    mutationFn: updateVisibilityList,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getAllList, userId + ''],
      });
      handleSetOff();
    },
  });

  const isVisibleLockIcon = isOwner && !list.isPublic;

  const handleVisibleOption = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    handleSetOn();
  };

  const handleToggleVisibilityList = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    updateVisibilityListMutation.mutate({
      listId: list.id,
      isPublic: list.isPublic ? true : false, // true로 보내면 비공개 처리가 됨, flase를 보내면 공개 처리가 됨
    });
  };

  return (
    // MasonryGrid 라이브러리에서는 ul로 감싸줘야 하므로 Link태그 미사용
    <ul
      onClick={onClickMoveToPage(`/list/${list.id}`)}
      className={styles.container}
      style={assignInlineVars({
        [styles.listColor]: `${BACKGROUND_COLOR_READ[list.backgroundColor as keyof typeof BACKGROUND_COLOR_READ]}`,
      })}
    >
      {isOn && (
        <div ref={ref} onClick={handleToggleVisibilityList} className={styles.optionMenu}>
          <button>비공개</button>
        </div>
      )}
      <div className={`${isVisibleLockIcon ? styles.listInfoPrivate : styles.listInfo}`}>
        {isVisibleLockIcon && (
          <div className={styles.lockIcon}>
            <span className={styles.lockText}>비공개</span>
            <LockIcon alt="비공개 리스트 표시" />
          </div>
        )}
        <div ref={ref} className={styles.optionButton} onClick={handleVisibleOption}>
          <Image src="/icons/more_option_button.svg" alt="더보기 버튼" width={2} height={10} />
        </div>
      </div>
      <h2 className={styles.title}>{list.title}</h2>
      <ul className={styles.list}>
        {list.listItems.map((item) => (
          <li key={item.id} className={styles.item}>
            <span className={styles.rank}>
              {item.rank}
              {'.'}
            </span>
            <span className={styles.itemTitle}>{item.title}</span>
          </li>
        ))}
      </ul>
    </ul>
  );
}
