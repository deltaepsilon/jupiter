import { Box, Button, IconButton, SxProps, Typography } from '@mui/material';
import { ItemDate, ItemMonth, ItemYear } from 'data/library';
import { MODAL_DRAWER_WIDTHS, ModalDrawer, ModalDrawerFooter } from 'ui/components';
import { MediaItemsProvider, useMediaItems } from 'web/contexts/media-items-context';
import { useEffect, useState } from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { MediaItemCarousel } from 'ui/components';
import { MediaItemRecords } from 'data/media-items';
import RefreshIcon from '@mui/icons-material/Refresh';
import format from 'date-fns/format';
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
        aria-describedby='imported media items'
        aria-labelledby='imported media items'
        isOpen={isOpen}
        onClose={onClose}
        title='Imported media items'
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
    <Box
      sx={{
        padding: 2,
        maxWidth: MODAL_DRAWER_WIDTHS,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gridGap: 8,
          textAlign: 'right',
          marginBottom: 2,
        }}
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
          display: 'grid',
          gridTemplateColumns: ['calc(7rem + 2px) calc(9rem + 1px) 1fr'],
          div: {
            border: '1px solid var(--color-light-gray)',
            borderWidth: '1px 1px 0 0',
            padding: 2,

            '&:first-of-type': {
              borderLeftWidth: '1px',
            },
          },
        }}
      >
        <Box>
          <Typography>Year</Typography>
        </Box>
        <Box>
          <Typography>Month</Typography>
        </Box>
        <Box>
          <Typography>Date</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          border: '1px solid var(--color-light-gray)',
          borderWidth: '1px 1px 0 1px',
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

function YearRow({ dates, year, yearMonths }: { dates: ItemDate[]; year: ItemYear; yearMonths: ItemMonth[] }) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '7rem 1fr' }}>
      <Box sx={{ borderBottom: '1px solid var(--color-light-gray)', paddingTop: 1 }}>
        <CountText count={year.count} sticky text={String(year.year)} />
      </Box>

      <Box>
        {yearMonths.map((month) => {
          const monthDates = dates.filter((date) => date.year === month.year && date.month === month.month);

          return <MonthRow key={month.id} month={month} monthDates={monthDates} />;
        })}
      </Box>
    </Box>
  );
}

function MonthRow({ monthDates, month }: { monthDates: ItemDate[]; month: ItemMonth }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '9rem 1fr',
        border: '1px solid var(--color-light-gray)',
        borderWidth: '0 0 0 1px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--color-light-gray)',
          paddingY: 1,
          paddingRight: 1,
        }}
      >
        <CountText count={month.count} sticky text={format(new Date().setMonth(month.month - 1), 'MMM')} />

        <IconButton onClick={() => setIsOpen(!isOpen)}>
          <ArrowDropDownIcon
            sx={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 300ms' }}
          />
        </IconButton>
      </Box>

      <Box
        sx={{
          border: '1px solid var(--color-light-gray)',
          borderWidth: '0 0 1px 1px',
        }}
      >
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

function DateRow({ date }: { date: ItemDate }) {
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
        <MediaItemCarousel
          mediaItemProps={{ height: 100, width: 100 }}
          mediaItems={mediaItems}
          sx={{
            width: [
              'calc(100vw - 25rem)',
              'calc(100vw - 35rem)',
              'calc(75vw - 25rem)',
              'calc(50vw - 25rem)',
              'calc(40vw - 25rem)',
            ],
          }}
        />
      </Box>
    </Box>
  );
}

function useDateMediaItems(date: ItemDate) {
  const [mediaItems, setMediaItems] = useState<MediaItemRecords>({});
  const { getMediaItems, libraryId } = useMediaItems();
  const refreshedMediaItems = useRefreshedMediaItems(libraryId, mediaItems);

  useEffect(() => {
    getMediaItems(date.lastKey, date.count).then((mediaItems) => setMediaItems(mediaItems));
  }, [date, getMediaItems]);

  return refreshedMediaItems;
}

function CountText({ sticky = false, text, count }: { sticky?: boolean; text: string; count: number }) {
  return (
    <Box
      sx={{
        position: sticky ? 'sticky' : 'static',
        top: '0.5rem',
        display: 'flex',
        gridGap: 4,
        textAlign: 'center',
        alignItems: 'center',
        paddingLeft: 2,
        paddingY: 1,
      }}
    >
      <Typography sx={{ textAlign: 'left' }}>
        <b>{text}</b>
      </Typography>
      <Typography sx={{ color: 'var(--color-miami-blue)', textAlign: 'right' }} variant='body2'>
        {' '}
        /{count}
      </Typography>
    </Box>
  );
}
