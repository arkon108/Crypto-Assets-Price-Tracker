# Crypto Assets Price Tracker

#### Video Demo: [TODO](url)

## Description 

A Google Chrome browser extension for keeping track of personal crypto assets. The extension offers at-a-glance view of the cryptocurrency holdings with prices displayed in a chosen currency. This is not a wallet and doesn't contain any actual crypto coins, the purpose of this extension is to have an easy way of checking the prices without having to open an actual wallet or an exchange.

The extension uses [cryptocompare](https://min-api.cryptocompare.com/) API to fetch the latest prices of the crypto assets saved. 

The code was written with vanilla JS/ES6, and styled with SASS. No external libraries loaded, no external dependencies required. Code is not obfuscated or minified, and it should be easily readable.

Please note that this extension doesn't collect or send data, beyond fetching the crypto prices from publicly available [cryptocompare](https://min-api.cryptocompare.com/) API, it doesn't perform any other HTTP requests. Everything is stored locally in your browser. The extension uses minimal set of permissions needed to operate, it doesn't access or modify any pages you browse. The single browser permission that the extension uses is `storage` to save the assets you enter to browser storage. 

TODO: describe structure and operation, 

 - on opening fetches the list of crypto tokens and saves to localstorage 

## How to install

  1. download the repository (as zip, or clone)
  2. open chrome and in the URL bar enter [chrome://extensions](chrome://extensions)
  3. enable developer mode, and click to load unpacked
  4. when prompted for containing folder, point to "src" subfolder
  5. you're done!

## How to use 

### First run 
- click plus to add 
- add more by clicking on plus
- next time you open you'll see the dashboard 
- change the options 

### Dashboard 

- lists the entered crypto and values
- displays the total above the table
- entries can be updated or deleted
- to add new 

## Options  

- select the currency in which to display the prices


## Features to add 