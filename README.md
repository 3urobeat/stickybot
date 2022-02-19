<div align="center" markdown=1>
	<p align="center"><img width=45% src="https://3urobeat.com/stickybot/logo.png"></p>
	<strong>Bring sticky channels to Discord! Someone wants to leave? Move him right back in.</strong>
	<br>See how to set up the bot below.<br>
	<p></p>
</div>

&nbsp;  

## **Download:**
Click here: [Download](https://github.com/HerrEurobeat/stickybot/archive/master.zip)  
Extract the zip and open the `stickybot` folder.  
  
You need to have at least node.js version 14.15.0 installed: [Download](https://nodejs.org)  
To get your version number (if you already have node installed) type `node --version` in your console or terminal.  

&nbsp; 

## **Setup:**
Open a console window or terminal in the current folder.  
Run the command `npm install` and wait for it to complete. This will install al necessary packages for the bot.  
> If you don't know how to open a console window on Windows, take a look at the bottom of this README.
  
Head over to the [Discord Developer Portal](https://discord.com/developers/applications) and create a new application.  
Once created, click on `Bot` in the menu on the left and create a new bot for your application.  
Copy your token, open the `config.json` file in the stickybot folder, and paste your token into the brackets.  
  
**Don't share the token with anyone else!**

&nbsp; 

## **Invite:**
Head back over to the `General Information` tab of your Application on the left in the Discord Developer Portal.  
Copy the `Application ID` and replace `your_app_id` in this URL with it:  
`https://discord.com/api/oauth2/authorize?client_id=your_app_id8&permissions=16777216&scope=applications.commands%20bot`  
  
Then open the link in your browser and add the bot you just created to your Discord Server.  

&nbsp; 

## **Starting:**
Head back over to the console/terminal window we opened earlier to install the dependencies.
Type `node index.js` to start the bot.  
If you've done everything correctly it should start without issues and appear online on your server!  

Take a look at the slash commands it created and try them out!  
> The slash commands may take a moment to register! Don't worry if you don't see them instantly.  

&nbsp; 

# **Commands:**
<pre>
- /stickuser       -  Sticks a user to a voice channel
- /stickchannel    -  Prevents any user joining this channel from leaving (honeypot)
- /unstickuser     -  Unsticks a user from a channel
- /unstickchannel  -  Unsticks a channel (and every user who was stickied to it)
- /stickylist      -  Lists all users that are sticky
</pre>

&nbsp; 
&nbsp; 

## Help: Opening a console window on Windows:
If you are on Windows and don't know how to open a console window in the current folder:  
- Open the folder of the bot with your Explorer  
- Click on the blue `File` button in in the top left  
- Click on the `Open PowerShell` or `Open CMD` entry and a console window should appear