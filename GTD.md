## In Progress

- [ ] Parallelize downloads

## Next actions

- [ ] Handle files with identical filenames. - Upload a few files with identical filenames to Google Photos and see how it goes.
- [ ] Tag downloaded files with Google's image id. Consider xmp tags from adobe. - Google Photos EXIF chat: https://exiftool.org/forum/index.php?topic=9004.0 - User-defined XMP: https://exiftool.org/forum/index.php?topic=7312.0 - .cfg file: https://exiftool.org/config.html
- [ ] Sync up metadata
- [ ] Restore metadata to images already on disk
- [ ] Debug `context.auth` problem: https://github.com/firebase/firebase-tools/issues/5210
- [ ] Create logo
- [ ] Clean up `manifest.json`

## Waiting for

- [ ] Download on a cron job

## Someday

- Copy
  You searched "how to download Google Photos"
  "Why is my Google Photos metadata garbage"
  or something like "how to export all Google Photos"
  Surprise! Google has provided a lousy process via Google Takeout,
  but it wrecks image metadata and messes up all of your dates,
  leading to a scrambled feed of images with untold duplicates.

## Archive

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
