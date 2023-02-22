Source: https://photos.chrisesplin.com/#desktop-app-downloads


Usage
 1. Move this folder to the location where you want to store your photos. You can actually install it wherever you like, but co-locating it with your photos helps keep things organized.
 2. Open https://photos.chrisesplin.com/photos
 3. Follow the instructions!
 
 Uninstall
 1. Delete any __downloading or __data folders that the Desktop App created.
 2. Delete this folder

The desktop application
 1. downloads each photo or video file, 
 2. writes any missing EXIF "created at" data, 
 3. writes a custom GoogleMediaItemId EXIF field for tracking purposes, and
 4. records the file's location in the local database.

Why do we need a Desktop App?
  Quiver Photos requires a local desktop application to be installed on your computer.

  The Web App controls the Desktop App.

  Web applications struggle to manage large files and they can't write EXIF data. The Desktop App communicates locally with your browser and handles all read/write to your hard drive. 

  The Desktop App first imports your library records to a local database stored under a __data folder. Once all of those records are imported, you can close the Web App and let the desktop app run in the background.

