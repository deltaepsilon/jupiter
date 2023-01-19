import { Box, Button, IconButton, List, ListItem, SxProps, TextField, Typography } from '@mui/material';
import { Date, LibraryImportStats, Month, Year } from 'data/library';
import { MODAL_DRAWER_WIDTHS, ModalDrawer, ModalDrawerFooter } from 'ui/components';
import { MediaItemsProvider, useMediaItems } from 'web/contexts/media-items-context';
import { useEffect, useState } from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { MediaItemCarousel } from 'ui/components';
import { MediaItemRecords } from 'data/media-items';
import RefreshIcon from '@mui/icons-material/Refresh';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useModalState } from 'ui/hooks';
import { useRefreshedMediaItems } from 'web/hooks';

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  libraryId: string;
  sx?: SxProps;
}

export function MediaItemsDrawer({ children, disabled = false, libraryId, sx = {} }: Props) {
  const { isOpen, onOpen, onClose } = useModalState({ autoOpenHash: 'media-items' });

  return (
    <>
      <ModalDrawer
        aria-describedby='pick a local directory'
        aria-labelledby='pick a local directory'
        isOpen={isOpen}
        onClose={onClose}
        title='Pick a local directory to sync'
      >
        <MediaItemsProvider libraryId={libraryId}>
          <MediaItemsContent />
        </MediaItemsProvider>

        <ModalDrawerFooter>
          <Button onClick={onClose} variant='text'>
            Close
          </Button>
        </ModalDrawerFooter>
      </ModalDrawer>
      <Box onClick={onOpen} sx={{ ...sx, opacity: disabled ? 0.5 : 1, userSelect: disabled ? 'none' : 'all' }}>
        {children}
      </Box>
    </>
  );
}

function MediaItemsContent() {
  const { libraryImportStats, refresh } = useMediaItems();
  const created = libraryImportStats?.created;

  return (
    <Box sx={{ display: 'grid', gridGap: 8, padding: 2, background: 'gold', maxWidth: MODAL_DRAWER_WIDTHS }}>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', textAlign: 'right', paddingRight: 2 }}
      >
        <Typography sx={{ position: 'relative', top: -3 }} variant='body2'>
          {created && formatDistanceToNow(created)}
        </Typography>
        <IconButton onClick={() => refresh()}>
          <RefreshIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          border: '1px solid var(--color-light-gray)',
          borderWidth: '1px 1px 0 1px',
          maxWidth: 'calc(100% - 2rem)',
          outline: '1px solid red',
        }}
      >
        {libraryImportStats?.years.map((year) => {
          const yearMonths = libraryImportStats.months.filter((month) => month.year === year.year);

          return <YearRow dates={libraryImportStats.dates} key={year.id} year={year} yearMonths={yearMonths} />;
        })}
      </Box>
    </Box>
  );
}

function YearRow({ dates, year, yearMonths }: { dates: Date[]; year: Year; yearMonths: Month[] }) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '7rem 1fr' }}>
      <Box sx={{ borderBottom: '1px solid var(--color-light-gray)', paddingTop: 1 }}>
        <CountText count={year.count} text={String(year.year)} />
      </Box>

      <Box>
        {yearMonths.map((month) => {
          const monthDates = dates.filter((date) => date.month === month.month);

          return <MonthRow key={month.id} month={month} monthDates={monthDates} />;
        })}
      </Box>
    </Box>
  );
}

function MonthRow({ monthDates, month }: { monthDates: Date[]; month: Month }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '6rem 1fr',
        border: '1px solid var(--color-light-gray)',
        borderWidth: '0 0 0 1px',
      }}
    >
      <Box sx={{ borderBottom: '1px solid var(--color-light-gray)', paddingTop: 1 }}>
        <CountText count={month.count} text={String(month.month).padStart(2, '0')} />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '3.5rem 1fr',
          border: '1px solid var(--color-light-gray)',
          borderWidth: '0 0 1px 1px',
        }}
      >
        <Box sx={{ padding: 1, borderRight: '1px solid var(--color-light-gray)' }}>
          <IconButton onClick={() => setIsOpen(!isOpen)}>
            <ArrowDropDownIcon
              sx={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 300ms' }}
            />
          </IconButton>
        </Box>
        {isOpen ? (
          <Box data-top>
            {monthDates.map((date) => (
              <DateRow date={date} key={date.id} />
            ))}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

function DateRow({ date }: { date: Date }) {
  const mediaItems = useDateMediaItems(date);

  return (
    <Box
      sx={{
        display: 'grid',

        gridTemplateColumns: '6rem 1fr',
        border: '1px solid var(--color-light-gray)',
        borderWidth: '0 0 1px 0',

        '&:last-child': {
          borderWidth: '0',
        },
      }}
    >
      <Box sx={{ paddingY: 1 }}>
        <CountText count={date.count} text={String(date.date)} />
      </Box>

      <Box sx={{ paddingY: 1 }}>
        <MediaItemCarousel mediaItemProps={{ height: 100, width: 100 }} mediaItems={mediaItems} />
      </Box>
    </Box>
  );
}

function useDateMediaItems(date: Date) {
  const [mediaItems, setMediaItems] = useState<MediaItemRecords>({});
  const { getMediaItems, libraryId } = useMediaItems();
  const refreshedMediaItems = useRefreshedMediaItems(libraryId, mediaItems);

  useEffect(() => {
    getMediaItems(date.lastKey, date.count).then((mediaItems) => setMediaItems(mediaItems));
  }, [date, getMediaItems]);

  return refreshedMediaItems;
}

function CountText({ text, count }: { text: string; count: number }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        textAlign: 'center',
        alignItems: 'center',
        paddingX: 2,
        paddingY: 1,
      }}
    >
      <Typography sx={{ textAlign: 'left' }}>
        <b>{text}</b>
      </Typography>
      <Typography sx={{ color: 'var(--color-miami-blue)', textAlign: 'right' }}>{count}</Typography>
    </Box>
  );
}
