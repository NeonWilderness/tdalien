# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.9.0] - 2020-06-16
### Added
- Added new feature to validate/update the user's individual Alien options during a release upgrade. This will automatically remove obsolete settings and make sure that new settings will be available in the Site.implant skin
- Added "delayBetweenUpdates" as a setting to Site.implant
- Added "redirectToNewSite" to force URL redirection to new blog site for all non-admins
- Added functionality to limit usage of this script to existing users (new users must register) 

### Changed
- Increased standard delay between server updates to 400 milliseconds
- Upgrade dev dependencies/modules to newest versions

## [1.8.2] - 2019-03-10
### Added
- Added delay between multiple story inserts/updates to avoid server stress/denials

## [1.8.1] - 2019-03-06
### Added
- Added promise/polyfill for older browsers without native promise support
- Added fallback for post-id extraction
- Added some internal tools for release management (initialize skins & download layout zip file)

### Changed
- Use BODY's alienStatus to directly find the appropriate external story link (save http call to story)
- Change IFRAME url only instead of entirely leaving the platform (window.location) if a single story is requested
- Fixed story matching problem in Firefox (due to date conversion differences)

## [1.8.0] - 2019-02-28
### Added
- Added script version to debug log
- Added removal of wordpress.com marketing text being randomly issued as part of the RSS feed (contentSnippet)
- Added more debug logging to the story matching process

### Changed
- Avoid error when skin site.stories is entirely empty (JSON parse error)
- Use article creation date/time as sole source of truth for matching external stories to Twoday stories
- Use proper date/time conversion while considering timezone differences
- Simplify and harmonize the createStory/updateStory functions

### Removed
- Removed temporary cleanup of duplicate stories

## [1.7.0] - 2019-02-25
### Added
- Added display of tool version (release number) at the end of the embedded tool menu
- Added cleanup function for duplicate identical stories
- Added option "delayNewRelease" (milliseconds). Specifies the time, the update process for a new release should be delayed, before the script asks again, if the user wants to upgrade. Example:
``` 
  ...
  delayNewRelease: 1000*60*60*24*2, // ask user again in 2 days
  ...
```
### Changed
- Use publish date instead of title text to match up stories from RSS
- Shortened HTML code of Skin Story.mgrlistitem

### Removed
- Remove slugify NPM module (not used anymore)

## [1.6.0] - 2019-02-21
### Added
- Added this changelog file
- Added options "titlePrefix" and "titlePostfix" (both strings). These can be utilized to change/enhance the story title with unicode icons, text or a comments variable. Example:
``` 
  ...
  titlePrefix: '> ',
  titlePostfix: ' - \u2709 $comments',
  ...
```
Based on a story title "New release out", which has 5 comments on the external blog, this would result in the following string being displayed on the Twoday blogroll:

<b>> New Release out - ✉ 5</b>

With this solution, the number of comments are now being displayed on the blogroll and will be changed everytime the comment counter changes.

The prefix- and postfix- option strings can hold all characters / Unicode chars. The only available variable is "$comments" (comment counter of this article).

## [1.5.0] - 2019-02-21
### Added
- Added option "targetStory" (boolean). If true, the Alien-Tool now jumps directly to the target article on the external blog once the related Twoday-story-link was clicked in the blogroll view.

## [1.4.0] - 2019-02-19
### Added
- Replace Yahoo's YQL service with a serverless script at [Webtask](https://webtask.io/).
- Add PostId Identification/Extraction per RSS provider

### Changed
- Changed resource links from "rawgit.com" (service terminated) to "cdn.jsdelivr.net".
- Bumped/upgraded dev dependencies
- Changed "@master" to "@latest" in resource links to enable cache bursting

### Removed
- Removed "forceHttp"-Option since Twoday does not allow switching to http anymore. This requires an external blog website to be embedded with the Alien-Inside-Twoday Tool to be strictly HTTPS or it will not work.
