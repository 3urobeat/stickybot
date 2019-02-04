<strong>This project is not finished and currently not working!</strong>

<div align="center">
	<h1 align="center">~ stickybot ~</h1>
	<strong>If someone wants to leave that sticky channel the bot will move him right back in. </strong><br />See how to set the bot up below.<br /><br />
</div>

## Requirements

- `node` [Version 8.4.0 or higher](https://nodejs.org)

Only necessary if you want to download via command prompt:
- `git` command line ([Windows](https://git-scm.com/download/win)|[Linux](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)|[MacOS](https://git-scm.com/download/mac)) installed

## Downloading

Just hit the `Clone or download` button or use git in a command prompt:

`git clone https://github.com/HerrEurobeat/beepSelfBot`


## Getting your login token

1. From either the web application, or the installed Discord app, use the **CTRL+SHIFT+I** keyboard shortcut.
2. This brings up the **Developer Tools**. Go to the **Application** tab
3. On the left, expand **Local Storage**, then click on the discordapp.com entry (it should be the only one).
4. Locate the entry called `token`, and copy it.

> **KEEP YOUR TOKEN SECRET, AND NEVER SHARE IT WITH ANYONE**

Rename 'token.json.example' to 'token.json'. Open the file and place your token inside it. Save and exit the file.

## Starting the bot

To start the bot, open a command prompt or power shell, navigate to the bot folder and type:
`node index.js`

The bot will now start and you should see him online!
