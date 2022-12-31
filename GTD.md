## In Progress

- [ ] Download media items while updating filesystem index
- [ ] Create FilesystemDb queue to handle media items

## Next actions

- [ ] Kick off download
- [ ] Tag downloaded files with Google's image id.
- [ ] Sync up metadata
- [ ] Start processing images
- [ ] Debug `context.auth` problem: https://github.com/firebase/firebase-tools/issues/5210
- [ ] Build a drawer to track progress
- [ ] Create logo
- [ ] Clean up `manifest.json`

## Waiting for

- [ ] Restore metadata to images already on disk
- [ ] Organize images by year/month folder structure
- [ ] Rename images to match timestamps
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
