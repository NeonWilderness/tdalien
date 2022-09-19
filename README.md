# Alien inside Twoday
Alien Inside Twoday ("AIT") is a special layout (zip file), that allows Twoday blogger to embed their new (external) blog within their old/former Twoday blog site.

AIT embeds the new blog via `<iframe>` and provides a user menu to access AIT parameters and major Twoday URLs such as login/logout, home, abos etc. by overlaying the blog iframe with a small hamburger icon and a related side menu.

AIT is able to synchronize the new blog's content (and changes) with the Twoday site, hence enabling a continued presence in Twoday's blogroll (main page). AIT utilizes the new blog's RSS feed to identify any changes (e.g. new articles, new comments), creates related Twoday stories (if new) or updates stories (if title, number of comments or the text snippet have changed). The cross-domain access to the RSS feed is handled by a "serverless" [Netlify function](https://github.com/NeonWilderness/tdalienfn).

## Installation

* Download the /dist/alien-layout.zip and import it into your Twoday's layout portfolio.
* Activate the AlienInsideTwoday layout once imported successfully.
* Click on the menu icon and access the Params menu entry to change/adapt the settings to your needs.

## Synchronization Process

* Synchronization starts when the Owner/Admin of an AIT Twoday blog visits his/her blog site.
* AIT reads the RSS feed of the new blog (e.g. Wordpress, Blogspot, Tumblr, or any other blog that provides a RSS feed XML file), identifies any changes compared to the last run, and creates/updates Twoday stories respectively.

For a detailed documentation of AIT parameter settings, please refer to the related blog articles (German language):

- [Version 1.10](https://neonwilderness.twoday.net/stories/alien-inside-twoday-release-110/)
- [Version 1.9](https://neonwilderness.twoday.net/stories/alien-inside-twoday-new-release-v19/)
- [Initial Release](https://neonwilderness.twoday.net/stories/1022653371)
