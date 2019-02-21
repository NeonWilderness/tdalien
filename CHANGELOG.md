# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

<b>> New Release out - ✉ 5 **</b>

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
