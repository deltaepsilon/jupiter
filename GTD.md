## In Progress

- [ ] Restore library import
- [ ] Debug `context.auth` problem: https://github.com/firebase/firebase-tools/issues/5210

## Next actions

- [ ] Start processing images
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
