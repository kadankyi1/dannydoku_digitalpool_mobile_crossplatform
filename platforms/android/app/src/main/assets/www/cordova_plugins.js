cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "com.wmjalak.cordova.fileopener.FileOpener",
    "file": "plugins/com.wmjalak.cordova.fileopener/www/fileopener.js",
    "pluginId": "com.wmjalak.cordova.fileopener",
    "clobbers": [
      "fileOpener"
    ]
  },
  {
    "id": "cordova-plugin-fileopener.FileOpener",
    "file": "plugins/cordova-plugin-fileopener/www/FileOpener.js",
    "pluginId": "cordova-plugin-fileopener",
    "clobbers": [
      "cordova.plugins.FileOpener"
    ]
  },
  {
    "id": "cordova-plugin-downloader2.Downloader",
    "file": "plugins/cordova-plugin-downloader2/www/Downloader.js",
    "pluginId": "cordova-plugin-downloader2",
    "clobbers": [
      "Downloader"
    ]
  },
  {
    "id": "org.apache.cordova.file.DirectoryEntry",
    "file": "plugins/org.apache.cordova.file/www/DirectoryEntry.js",
    "pluginId": "org.apache.cordova.file",
    "clobbers": [
      "window.DirectoryEntry"
    ]
  },
  {
    "id": "org.apache.cordova.file.DirectoryReader",
    "file": "plugins/org.apache.cordova.file/www/DirectoryReader.js",
    "pluginId": "org.apache.cordova.file",
    "clobbers": [
      "window.DirectoryReader"
    ]
  },
  {
    "id": "org.apache.cordova.file.Entry",
    "file": "plugins/org.apache.cordova.file/www/Entry.js",
    "pluginId": "org.apache.cordova.file",
    "clobbers": [
      "window.Entry"
    ]
  },
  {
    "id": "org.apache.cordova.file.File",
    "file": "plugins/org.apache.cordova.file/www/File.js",
    "pluginId": "org.apache.cordova.file",
    "clobbers": [
      "window.File"
    ]
  },
  {
    "id": "org.apache.cordova.file.FileEntry",
    "file": "plugins/org.apache.cordova.file/www/FileEntry.js",
    "pluginId": "org.apache.cordova.file",
    "clobbers": [
      "window.FileEntry"
    ]
  },
  {
    "id": "org.apache.cordova.file.FileError",
    "file": "plugins/org.apache.cordova.file/www/FileError.js",
    "pluginId": "org.apache.cordova.file",
    "clobbers": [
      "window.FileError"
    ]
  },
  {
    "id": "org.apache.cordova.file.FileReader",
    "file": "plugins/org.apache.cordova.file/www/FileReader.js",
    "pluginId": "org.apache.cordova.file",
    "clobbers": [
      "window.FileReader"
    ]
  },
  {
    "id": "org.apache.cordova.file.FileSystem",
    "file": "plugins/org.apache.cordova.file/www/FileSystem.js",
    "pluginId": "org.apache.cordova.file",
    "clobbers": [
      "window.FileSystem"
    ]
  },
  {
    "id": "org.apache.cordova.file.FileUploadOptions",
    "file": "plugins/org.apache.cordova.file/www/FileUploadOptions.js",
    "pluginId": "org.apache.cordova.file",
    "clobbers": [
      "window.FileUploadOptions"
    ]
  },
  {
    "id": "org.apache.cordova.file.FileUploadResult",
    "file": "plugins/org.apache.cordova.file/www/FileUploadResult.js",
    "pluginId": "org.apache.cordova.file",
    "clobbers": [
      "window.FileUploadResult"
    ]
  },
  {
    "id": "org.apache.cordova.file.FileWriter",
    "file": "plugins/org.apache.cordova.file/www/FileWriter.js",
    "pluginId": "org.apache.cordova.file",
    "clobbers": [
      "window.FileWriter"
    ]
  },
  {
    "id": "org.apache.cordova.file.Flags",
    "file": "plugins/org.apache.cordova.file/www/Flags.js",
    "pluginId": "org.apache.cordova.file",
    "clobbers": [
      "window.Flags"
    ]
  },
  {
    "id": "org.apache.cordova.file.LocalFileSystem",
    "file": "plugins/org.apache.cordova.file/www/LocalFileSystem.js",
    "pluginId": "org.apache.cordova.file",
    "clobbers": [
      "window.LocalFileSystem"
    ],
    "merges": [
      "window"
    ]
  },
  {
    "id": "org.apache.cordova.file.Metadata",
    "file": "plugins/org.apache.cordova.file/www/Metadata.js",
    "pluginId": "org.apache.cordova.file",
    "clobbers": [
      "window.Metadata"
    ]
  },
  {
    "id": "org.apache.cordova.file.ProgressEvent",
    "file": "plugins/org.apache.cordova.file/www/ProgressEvent.js",
    "pluginId": "org.apache.cordova.file",
    "clobbers": [
      "window.ProgressEvent"
    ]
  },
  {
    "id": "org.apache.cordova.file.fileSystems",
    "file": "plugins/org.apache.cordova.file/www/fileSystems.js",
    "pluginId": "org.apache.cordova.file"
  },
  {
    "id": "org.apache.cordova.file.requestFileSystem",
    "file": "plugins/org.apache.cordova.file/www/requestFileSystem.js",
    "pluginId": "org.apache.cordova.file",
    "clobbers": [
      "window.requestFileSystem"
    ]
  },
  {
    "id": "org.apache.cordova.file.resolveLocalFileSystemURI",
    "file": "plugins/org.apache.cordova.file/www/resolveLocalFileSystemURI.js",
    "pluginId": "org.apache.cordova.file",
    "merges": [
      "window"
    ]
  },
  {
    "id": "org.apache.cordova.file.androidFileSystem",
    "file": "plugins/org.apache.cordova.file/www/android/FileSystem.js",
    "pluginId": "org.apache.cordova.file",
    "merges": [
      "FileSystem"
    ]
  },
  {
    "id": "org.apache.cordova.file.fileSystems-roots",
    "file": "plugins/org.apache.cordova.file/www/fileSystems-roots.js",
    "pluginId": "org.apache.cordova.file",
    "runs": true
  },
  {
    "id": "org.apache.cordova.file.fileSystemPaths",
    "file": "plugins/org.apache.cordova.file/www/fileSystemPaths.js",
    "pluginId": "org.apache.cordova.file",
    "merges": [
      "cordova"
    ],
    "runs": true
  },
  {
    "id": "cordova-plugin-music-controls.MusicControls",
    "file": "plugins/cordova-plugin-music-controls/www/MusicControls.js",
    "pluginId": "cordova-plugin-music-controls",
    "clobbers": [
      "MusicControls"
    ]
  },
  {
    "id": "cordova-plugin-file-opener2.FileOpener2",
    "file": "plugins/cordova-plugin-file-opener2/www/plugins.FileOpener2.js",
    "pluginId": "cordova-plugin-file-opener2",
    "clobbers": [
      "cordova.plugins.fileOpener2"
    ]
  },
  {
    "id": "cordova-plugin-media.MediaError",
    "file": "plugins/cordova-plugin-media/www/MediaError.js",
    "pluginId": "cordova-plugin-media",
    "clobbers": [
      "window.MediaError"
    ]
  },
  {
    "id": "cordova-plugin-media.Media",
    "file": "plugins/cordova-plugin-media/www/Media.js",
    "pluginId": "cordova-plugin-media",
    "clobbers": [
      "window.Media"
    ]
  },
  {
    "id": "cordova-plugin-zip.Zip",
    "file": "plugins/cordova-plugin-zip/zip.js",
    "pluginId": "cordova-plugin-zip",
    "clobbers": [
      "zip"
    ]
  },
  {
    "id": "cordova-plugin-downloader.download",
    "file": "plugins/cordova-plugin-downloader/www/download.js",
    "pluginId": "cordova-plugin-downloader",
    "clobbers": [
      "download"
    ]
  },
  {
    "id": "cordova-plugin-splashscreen.SplashScreen",
    "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
    "pluginId": "cordova-plugin-splashscreen",
    "clobbers": [
      "navigator.splashscreen"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "com.wmjalak.cordova.fileopener": "1.0.0",
  "cordova-plugin-fileopener": "1.0.5",
  "cordova-plugin-downloader2": "0.0.1",
  "org.apache.cordova.file": "1.3.3",
  "cordova-plugin-music-controls": "2.1.4",
  "cordova-plugin-file-opener2": "2.0.19",
  "cordova-plugin-media": "5.0.2",
  "cordova-plugin-zip": "3.1.0",
  "cordova-plugin-downloader": "0.0.3",
  "cordova-plugin-splashscreen": "5.0.2",
  "nl.x-services.plugins.backgroundaudio": "1.0.1"
};
// BOTTOM OF METADATA
});