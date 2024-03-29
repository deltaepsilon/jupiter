## In Progress


## Next actions

- [ ] AdWords campaign

## Waiting for


## Someday

- [ ] Sign Mac binaries
- [ ] Sign Windows binaries
- [ ] Restore **geo** metadata from Google Takeout
- [ ] Download on a cron job

## Archive

- [x] quiver-photos-guide.mdx
- [x] Content: Reddit Links
- [x] Reddit Alpha Launch
- [x] Handle Live Photos from an iPhone. Save the HEIC to the month folder.
- [x] Alternate the daemon between 127.0.0.1 and localhost
- [x] Shoot a grandma-friendly YT walkthrough
- [x] Update sitemap.txt with new content pages
- [x] Content: Export service comparison (Metadata Fixer / Takeout / Quiver Photos)
- [x] Favicon
- [x] Conversion tracking in GTM
- [x] Google Search Console
- [x] Lighthouse
- [x] Sitemap
- [x] Once logged in, the Web App CTA should shake to call attention to itself
- [x] Number the steps in the Library Detail page
- [x] Landing page links, big and bold, to walkthrough video and "Web App ->"
- [x] Stripe Billing + Firebase Extension
- [x] Debug that darned multiplexer. It's running wild on MacOS.
- [x] Add Mac NFS instructions to guide. See screenshots in /apps/web/public/images/content/mount-synology-nfs
- [x] Get Mac daemon to copy files to the correct folders
- [x] Sign Windows binaries
- [x] Update Google Login button. Complete verification.
- [x] win-test is throwing a rename error
- [x] Repair handleFolderMessage
- [x] Debug `setToken` call. It doesn't appear to be working in prod. `refreshToken` is empty.
- [x] Convert to LevelDb
- [x] `manifest.json`
- [x] Robots.txt
- [x] Debug `context.auth` problem: https://github.com/firebase/firebase-tools/issues/5210
- [x] Privacy policy
- [x] Debug import hang
- [x] Track user logins
- [x] Content: How to use Google Takeout
- [x] Logo
- [x] Carefully test import completion. It appears that the last page is getting downloaded in a loop. Load a few hundred images into the chris@christopheresplin.com library and see if you can download all of them cleanly.
- [x] The import drawer starts to machine-gun `batchGetMediaItems` as soon as you open a month folder
- [x] Landing page
- [x] Debug file-level progress that's not being displayed correctly on the front end
- [x] Send a final progress event when the image is complete. Don't rely on axios's progress callback
- [x] Remove `repair-filename.ts` logging
- [x] Skip corrupted files when re-evaluating folders for download
- [x] Add a % sign to the logs on `download-media-items.ts:107`
- [x] Daemon should keep itself alive
- [x] Enable library deletion
- [x] Invite alpha testers from Reddit
- [x] Clean up dist.json issue
- [x] Design https://photos.chrisesplin.com/downloads
- [x] Daemon version check or launcher
- [x] Get daemon-win.exe working
- [x] Exponential back-off
- [x] Deploy to Firebase + Firebase Hosting
- [x] Github Actions
- [x] Sort out Cloud Run deploy
- [x] Don't delete `lastKey` when restarting import from "completed" state (library-import-on-write)
- [x] Move corrupt files to `corrupt-files`, add mediaItem to corrupt-files.json db file
- [x] Debug pausing mid-download
- [x] Collapse progress to year bars
- [x] Write tests for db.ts
- [x] Streamline ingestion and indexing - Speed up the daemon first - Filesystem db access is a likely culprit. Consider keeping DBs in memory and writing async - Consider converting create-queue to a multiplex of 1, or switching to multiplex
- [x] Handle files with identical filenames: https://photos.google.com/u/1/search/DSC01845.JPG
- [x] File progress is getting hung for some files.
- [x] Display file-level progress
- [x] Folder analysis drawer.
- [x] Make sure that completed folders get marked `complete`
- [x] IMG_1965.HEIC is getting renamed to IMG_1965.jpg and it's not getting found and throwing
- [x] Double-check download counts
- [x] Multiplex `index-filesystem.ts`
- [x] Skip download if file with correct `Google Media Item Id` EXIF already exists
- [x] Tag downloaded files with Google's image id. Consider xmp tags from adobe. - Google Photos EXIF chat: https://exiftool.org/forum/index.php?topic=9004.0 - User-defined XMP: https://exiftool.org/forum/index.php?topic=7312.0 - .cfg file: https://exiftool.org/config.html
- [x] Drawer table cleanup - [x] Add headers - [x] Make date-triangle navigation more intuitive - [x] Link images to Google Photos detail pages - [x] Handle 403s. Click through a bunch of months to find a 403.
- [x] Imported drawer - Update count, display data table with month/day counts, drill down - Enable the drawer button when the import is paused
- [x] Read from start of media-items collection before continuing with lastKey
- [x] Track ids in the multiplex queue so that they don't get duplicated
- [x] Parallelize downloads
- [x] Debug download restart. It's getting confused after the pause.
- [x] Make sure the new MediaItems ingest starts with newer items if over a day since last request
- [x] Why does the WS keep disconnecting???
- [x] Check to see if the file already exists before downloading it
- [x] Organize images by year/month folder structure
- [ ] Build a drawer to track progress
- [x] Kick off download
- [x] Confirm that download succeeds
- [x] Overwrite original `-overwrite_original`
- [x] Move file from `__downloading`
- [x] Update filesystem index
- [x] Create FilesystemDb queue to handle media items
- [x] Complete indexing of directory
- [x] Move `useDirectory` to a shared context to prevent out-of-sync errors
- [x] Stream in media items
- [x] Wire up Download actions
- [x] Restore library import
- [x] Debug failure of `--import` and `--export-on-exit`: https://github.com/firebase/firebase-tools/issues/2228
- [x] The redirect on `oAuth2` isn't working quite right. I'm ending up back at `/` after adding a Library
- [x] Move `/apps/web/pages/api` to `/apps/functions/api`
- [x] Repair bulk error requeue process. It doesn't recurse to the second page.
- [x] Requeue single items
- [x] Log all errors to a separate data structure
- [x] Repair requeue
- [x] Track errors and completes
- [x] Create queue management example page.
- [x] Track `previousPageToken`
