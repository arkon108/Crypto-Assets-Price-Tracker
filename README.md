# Crypto Assets Price Tracker

#### Video Demo: [TODO](url)

## Description 

A Google Chrome browser extension for keeping track of personal crypto assets. The extension offers at-a-glance view of the cryptocurrency holdings with prices displayed in a chosen currency. This is not a wallet and doesn't contain any actual crypto coins, the purpose of this extension is to have an easy way of checking the prices without having to open an actual wallet or an exchange.

The extension uses [cryptocompare](https://min-api.cryptocompare.com/) API to fetch the latest prices of the crypto assets saved. 

The code was written with vanilla JS/ES6, and styled with SASS. No external libraries loaded, no external dependencies required. Code is not obfuscated or minified, and it should be easily readable.

Please note that this extension doesn't collect or send data, beyond fetching the crypto prices from publicly available [cryptocompare](https://min-api.cryptocompare.com/) API, it doesn't perform any other HTTP requests. Everything is stored locally in your browser. The extension uses minimal set of permissions needed to operate, it doesn't access or modify any pages you browse. The single browser permission that the extension uses is `storage` to save the assets you enter to browser storage. 

The extension allows user to enter amounts of different crypto tokens they hold, and display real-time prices for their holdings. The total sum is displayed for all tokens held, and updating the amount of existing tokens is easy to do. 

Every time the extension window is opened, an API call is made to the [cryptocompare](https://min-api.cryptocompare.com/) API to fetch the latest list of tokens, so that the updated list is available when adding tokens to the list of assets held. 

The prices are fetched every time the extension window is opened as well, so the latest information gets displayed.

The core of the extension uses two main classes - `Wallet` and `CryptoList`. The `Wallet` class is responsible to storing the assets and their values, and provides the API to `add`, `remove` and `show` the assets - where the `show` method prepares the values to be displayed in the Dashboard table. 

The `CryptoList` class, on the other hand, is the API layer over [cryptocompare](https://min-api.cryptocompare.com/) which fetches the list of available tokens, and gets the prices for assets held. This thin layer over the remote API makes it easier to switch to a different API provider if needed. 

The entire UI is created in `browser_action.html` where different views are shown or hidden, based on the app state. The `browser_action.js` reacts to the messages sent from itself, or from `service_worker.js` which contains the core functionality of the extension.

## How to install

  1. Download the repository as a zip file and extract on local machine
  2. Open chrome and in the URL bar enter [chrome://extensions](chrome://extensions)
  3. Make sure that developer mode is enabled, by flipping the "Developer mode" to On 
  4. Click the button labeled "Load Unpacked"
  5. When prompted with file selection window, navigate to extension directory and select the "src" subfolder
  6. You're done!

## How to use 

### Adding new tokens 
 - Click the Extension icon in the toolbar
 - When the window opens, you can click the [ + ] button to add a Crypto token you own
 - In the next page, you'll see the form with input fields for Amount and Cryptocurrency 
 - Enter the amount of tokens you own
 - Type in the ticker symbol or name of the crypto token, and autocomplete dropdown should show up
 - Scroll to find your token if necessary
 - Click the selected token 
 - The token and the amount is saved in the extension
 - If you want to add more tokens, click the [ + ] button again

The dashboard with the table listing all the assets you entered should be shown now, and every other time you open the extension window. 

### Dashboard 

The Dashboard is the default view shown once at least one token asset has been entered. 
It lists all entered crypto assets with their values. The sum of all assets is displayed at the top. 
At the bottom, there's a [ + ] button with which it's possible to add more token assets.

The table showing the tokens with their amount and worth can be updated, as each row allows the token amount to be updated, or entire row deleted. 

### Options  

The options page allows for the configuration of the extension. At the moment, a single option available for configuration is the currency used to display the values of crypto assets. 

The default currency used, after the extension is installed is USD. It's possible to switch to EUR or BTC.
The currency selected on the option screen will be used in API calls fetching the token prices, and will be displayed on the main Dashboard view of the extension.


## Features to add in v1.1

Some of the features not added in the version 1.0 and considered to be added to version 1.1

 - Create English and Croatian translations / locales; maybe more, as I'm Croatian and use English daily, these seem like natural first options; if there would be active users from different locales, I might add translations
 - Besides EUR and USD, use CAD, AUD and YEN? Not really needed, but would be a nice addition
 - Use dark/light theme - this seems pretty good update. There would be an option to select Dark/Light/System themes; would need to create three themes and switch
 - Make useable on Firefox - create Add-On, or a cross-browser style plugin which works on Firefox and Opera
 - Improve styling to make prettier, maybe add icon for "options" link, etc.
 - Highlight tokens which got de-listed 
 - Store the last price used and highlight price changes (with e.g. up/down arrows or red/green styling)