import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import { MessageType, encodeMessage } from 'data/daemon';
import { useEffect, useRef } from 'react';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { HiddenScroll } from 'ui/components';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import SyncProblemIcon from '@mui/icons-material/SyncProblem';
import format from 'date-fns/format';
import { useDaemon } from 'web/contexts/daemon-context';

const PING_PAYLOAD = { type: MessageType.ping, payload: { data: 'ping' } };

export function DaemonPanel() {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const { connect, emptyMessages, isConnected, messages, send } = useDaemon();

  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  }, [messages.length]);

  return (
    <Paper elevation={1}>
      <Box sx={{ display: 'flex', alignItems: 'center', gridTemplateColumns: '1fr 5rem', paddingBottom: 1 }}>
        <Typography sx={{ flex: 1 }} variant='h6'>
          Daemon {isConnected ? 'connected' : 'disconnected'}
        </Typography>
        <Box sx={{ svg: { position: 'relative', top: 5 } }}>
          {isConnected ? <CheckCircleOutlineIcon /> : <SyncProblemIcon sx={{ color: 'var(--color-rubystone-red)' }} />}
        </Box>
      </Box>

      <HiddenScroll ref={scrollableRef} sx={{ height: 200, scrollBehavior: 'smooth' }}>
        {messages.map((message) => {
          return (
            <Box
              key={message.uuid}
              sx={{
                display: 'flex',
                gridGap: 8,
                paddingY: '1px',
                p: { color: message.isClient ? 'var(--color-miami-blue)' : null },
              }}
            >
              <Typography variant='body2'>{format(new Date(message.created), 'K:mm:ss')}:</Typography>
              <Typography key={message.uuid} variant='body2'>
                {message.payload.data}
              </Typography>
            </Box>
          );
        })}
      </HiddenScroll>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'flex-start', gridGap: 16 }}>
        {!isConnected ? (
          <Button onClick={connect} variant='contained'>
            Connect
          </Button>
        ) : (
          <Button onClick={() => send(PING_PAYLOAD)}>Ping</Button>
        )}

        <Button onClick={() => emptyMessages()}>Clear messages</Button>
      </Box>
    </Paper>
  );
}
