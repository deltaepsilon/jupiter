import { Box, SxProps, Typography } from '@mui/material';
import { Image, Link, LogInOrContinue, PhoneBorder, Video } from 'ui/components';
import { WEB } from 'data/web';

import PhotoIcon from '@mui/icons-material/Photo';

export function LandingPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gridGap: [32, 64],
        paddingY: 4,
        maxWidth: '50rem',

        h3: { paddingBottom: 0 },
        img: {
          borderRadius: 'var(--border-radius)',
        },
        hr: {
          border: 'none',
          marginY: 4,
        },
        br: {
          content: '""',
          margin: '1rem',
          display: 'block',
          fontSize: '24%',
        },
      }}
    >
      <Box sx={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr', gridGap: 16, width: '100%' }}>
        <Typography
          sx={{
            gridColumn: '1/-1',
            textAlign: 'center',
            color: 'var(--color-gentian-blue-metallic)',
            padding: 1,
          }}
          variant='h3'
        >
          Greetings!
        </Typography>

        <Typography>We&apos;ve been expecting you.</Typography>

        <Typography>You likely searched</Typography>

        <Box component='ul' sx={{ marginTop: -1, marginBottom: 0, paddingLeft: [3, 8] }}>
          <Typography component='li'>&quot;how to download google photos&quot;,</Typography>
          <Typography component='li'>&quot;why is google photos metadata garbage&quot;,</Typography>
          <Typography component='li'>or &quot;how to export google photos&quot;.</Typography>
        </Box>

        <Typography>
          The results pointed to{' '}
          <Link blank href='https://takeout.google.com/settings/takeout'>
            Google Takeout
          </Link>
          . You tried it. It was slow, unfriendly, and it stripped out EXIF metadata. You kept digging and found this
          website.
        </Typography>
      </Box>

      <Box
        sx={{
          position: 'relative',
          height: '25vh',
          width: '100%',
          borderRadius: 'var(--border-radius)',
          overflow: 'hidden',
        }}
      >
        <Image
          alt='markus winkler unsplash film canisters'
          height={328}
          src='/images/unsplash/markus-winkler-CiA0uLEKeUI-unsplash.jpg'
          style={{ objectFit: 'cover', maxWidth: 'calc(100vw - 1rem)' }}
          width={800}
        />
        <Typography
          sx={{
            position: 'absolute',
            top: 'calc(50% - 2rem)',
            left: 0,
            right: 0,
            textAlign: 'center',
            background: 'var(--color-white)',
            color: 'var(--color-gentian-blue-metallic)',
            padding: 1,
          }}
          variant='h2'
        >
          Export your Google Photos
        </Typography>
      </Box>

      <TwoColumn>
        <Typography>
          By all means, keep using Google Photos. It&apos;s a fantastic service.
          <br />
          We love the AI-powered image search and face recognition.
          <br />
          But there comes a time in every young Android or adventurous iOS user&apos;s life when she tries to download
          her first Google Photos library.
          <br />
          Surprise!
        </Typography>
        <Typography>
          Google doesn&apos;t want you to leave.
          <br />
          Granted, they&apos;ve provided an export mechanism via Google Takeout that works &quot;ok&quot;, but it has a
          bad habit of stripping date metadata, so the next time you try to sort your images by date....
          <br />
          ...all of your &quot;image creation dates&quot; are <b>today!</b>
        </Typography>
      </TwoColumn>

      <PhoneAnimation />

      <Typography sx={{ gridColumn: '1/-1', paddingBottom: 2 }} variant='h3'>
        Archival Storage
      </Typography>

      <TwoColumn>
        <Image
          alt='denny muller unsplash hard drive'
          fill
          ratio={3 / 2}
          src='/images/unsplash/denny-muller-1qL31aacAPA-unsplash.jpg'
          sx={{ position: 'relative', height: '25vh', objectFit: 'cover' }}
        />

        <Typography sx={{ maxWidth: '400px' }} variant='body1'>
          Don&apos;t rent your history.
          <br />
          We have to store our own files, no matter how annoying and expensive.
          <br />
          Our baby photos live in a{' '}
          <Link blank href='https://amzn.to/3J20oty'>
            Synology NAS
          </Link>{' '}
          that&apos;s spinning two 6TB{' '}
          <Link blank href='https://amzn.to/3YHLbUk'>
            WD Red
          </Link>{' '}
          hard drives.
          <br />
          We use{' '}
          <Link blank href='https://en.wikipedia.org/wiki/Standard_RAID_levels'>
            RAID 1
          </Link>{' '}
          for full mirroring. If one drive fails, we can swap it out and the NAS will rebuild the other drive.
        </Typography>
      </TwoColumn>

      <Typography sx={{ gridColumn: '1/-1', paddingBottom: 2 }} variant='h3'>
        How does it work?
      </Typography>

      <TwoColumn>
        <Box>
          <Typography sx={{ maxWidth: '400px' }} variant='body1'>
            First, you&apos;ll use this Web App to download your Google Photos library.
          </Typography>
          <Box sx={{ paddingTop: 2, textAlign: 'right' }}>
            <LogInOrContinue />
          </Box>
        </Box>

        <Video
          autoPlay
          loop
          muted
          src='https://firebasestorage.googleapis.com/v0/b/photos-tools-2022.appspot.com/o/public%2Fweb-downloader.mp4?alt=media&token=3cb0152f-fb0b-4a54-9cc6-2b9e3cfea3ec'
          sx={{ maxWidth: ['calc(100vw - 1rem)', 'calc(100vw - 2rem)'] }}
        />
      </TwoColumn>

      <TwoColumn>
        <Typography sx={{ maxWidth: '400px' }} variant='body1'>
          Next, you&apos;ll download a Desktop App that will enable the Web App to access a folder on your hard drive.
        </Typography>

        <Video
          autoPlay
          loop
          muted
          src='https://firebasestorage.googleapis.com/v0/b/photos-tools-2022.appspot.com/o/public%2Fdaemon.mp4?alt=media&token=f3930859-dbc2-4d1c-bf59-bcb8e5853c5b'
          sx={{ maxWidth: ['calc(100vw - 1rem)', 'calc(100vw - 2rem)'] }}
          width={486}
        />
      </TwoColumn>

      <Typography sx={{ gridColumn: '1/-1', paddingBottom: 2 }} variant='h3'>
        And then you wait!
      </Typography>

      <TwoColumn>
        <Typography sx={{ maxWidth: '400px' }} variant='body1'>
          Some folks have massive Google Photos libraries. Those lucky folks will have to leave the Desktop App (often
          referred to as a &quot;daemon&quot;) running for a few days.
          <br />
          The <b>Web App</b> works in two steps.
          <br />
          <b>1.</b> The Web App downloads each and every media item record out of Google Photos. That process usually
          takes less than 30 minutes.
          <br />
          <b>2.</b> Next, the Web App transfers those records to the Desktop App. This process can take a bit longer,
          depending on the size of your library; however, the Desktop App can start downloading immediately. It will
          download whatever records it has and keep looking for more until it runs dry.
          <br />
          We recommend logging back into the Web App every few weeks to download new records.
        </Typography>
        <Typography sx={{ maxWidth: '400px' }} variant='body1'>
          The <b>Desktop App</b> (aka &quot;The Daemon&quot;) has three functions.
          <br />
          <b>1.</b> The Desktop App ingests your photo and video (aka &quot;media item&quot;) records from the Web App.
          <br />
          <b>2.</b> Next, the Desktop App starts downloading your &quot;media items&quot;. It tags the files with their
          Google Photos ID. This ID prevents the Desktop App from downloading the same file twice.
          <br />
          <b>3.</b> When the Desktop App restarts, it quickly indexes existing files on your hard drive to see what has
          already been downloaded. It maintains local records on your filesystem of every file that has been downloaded.
          If it finds an new file, it first checks to see if it has a Google Photos ID. If so, it can safely skip
          downloading that file. This process enables you to start and stop the Desktop App as needed. It won&apos;t
          download files twice.
        </Typography>
      </TwoColumn>

      <Typography sx={{ gridColumn: '1/-1', paddingBottom: 2 }} variant='h3'>
        Satisfaction Guaranteed
      </Typography>

      <Typography>
        We&apos;ll happily issue a full refund if you&apos;re not satisfied with Quiver Photos. We learned long ago that
        nobody likes being an unhappy customer! We hate being unhappy customers. You hate being unhappy customers.
        EVERYONE HATES IT!!!! ARG!!!
        <br />
        Shoot us an email at{' '}
        <Link
          blank
          href={`mailto:${WEB.EMAIL}?subject=Quiver%20Photos&body=Chris!%0D%0A%0D%0AI%20have%20questions%20%3A)`}
        >
          {WEB.EMAIL}
        </Link>{' '}
        . We&apos;ll take care of it ASAP.
      </Typography>

      <TwoColumn>
        <Image
          alt='denny muller unsplash hard drive'
          fill
          ratio={1}
          src='/images/boombox-moustache-square.jpg'
          sx={{ position: 'relative', objectFit: 'cover' }}
        />

        <Box>
          <Typography sx={{ marginBottom: 2 }} variant='h3'>
            My name&apos;s Chris.
          </Typography>

          <Typography variant='body1'>
            I built this web application because I got fed up with missing EXIF data when using Google Takeout.
            <br />
            It&apos;s been a labor of love and frustration.
            <br />
            It took 3x longer to build than I expected. I hope you appreciate it. Let me know if you do—or don&apos;t—
            over on Twitter:{' '}
            <Link blank href='https://twitter.com/chrisesplin'>
              @ChrisEsplin
            </Link>
            , or by email:{' '}
            <Link
              blank
              href={`mailto:${WEB.EMAIL}?subject=Quiver%20Photos&body=Chris!%0D%0A%0D%0AI%20have%20questions%20%3A)`}
            >
              {WEB.EMAIL}
            </Link>
            <br />
            Check out my other projects at{' '}
            <Link blank href='https://www.chrisesplin.com'>
              ChrisEsplin.com
            </Link>
          </Typography>
        </Box>
      </TwoColumn>
    </Box>
  );
}

function TwoColumn({ children, sx = {} }: { children: React.ReactNode; sx?: SxProps }) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: ['1fr', '1fr', '1fr 1fr'], gridGap: 16, ...sx }}>{children}</Box>
  );
}

function PhoneAnimation() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 4,
        width: ['calc(100vw - 2rem)', 'inherit'],
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: ['1fr', '150px 100px 250px', '200px 100px 350px'],
          alignItems: 'center',
          overflow: 'hidden',
          maxWidth: 'calc(100vw - 2rem)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', maxWidth: '50vw' }}>
            <PhoneBorder>
              <Image
                alt='transfer google photos'
                ratio={419 / 698}
                src='/images/google-photos-gallery.png'
                sx={{ img: { borderRadius: 1 } }}
              />
            </PhoneBorder>
          </Box>
        </Box>

        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: ['column', 'row'],
              alignItems: 'center',
              justifyContent: 'space-between',
              gridGap: 8,
              maxHeight: 100,

              animation: ['scroll-down 5s linear infinite', 'scroll-right 5s linear infinite'],
              '@keyframes scroll-right': {
                '0%': {
                  transform: 'translateX(-150%)',
                },
                '100%': {
                  transform: 'translateX(105%)',
                },
              },
              '@keyframes scroll-down': {
                '0%': {
                  transform: 'translateY(-150%)',
                },
                '100%': {
                  transform: 'translateY(105%)',
                },
              },
            }}
          >
            <PhotoIcon fontSize='large' sx={{ color: 'var(--color-acid-green)' }} />
            <PhotoIcon fontSize='large' sx={{ color: 'var(--color-acid-lava-orange)' }} />
            <PhotoIcon fontSize='large' sx={{ color: 'var(--color-miami-blue)' }} />
            <PhotoIcon fontSize='large' sx={{ color: 'var(--color-rubystone-red)' }} />
            <PhotoIcon fontSize='large' sx={{ color: 'var(--color-acid-green)' }} />
            <PhotoIcon fontSize='large' sx={{ color: 'var(--color-acid-lava-orange)' }} />
            <PhotoIcon fontSize='large' sx={{ color: 'var(--color-miami-blue)' }} />
            <PhotoIcon fontSize='large' sx={{ color: 'var(--color-rubystone-red)' }} />
          </Box>
        </Box>

        <Image alt='windows explorer' ratio={835 / 559} src='/images/windows-explorer.png' />
      </Box>
    </Box>
  );
}
