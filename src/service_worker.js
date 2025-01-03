chrome.runtime.onInstalled.addListener((event) => {
  // if there are no currency for showing prices, default to USD
  chrome.storage.local.get("currency", (data) => {
    if (!data.currency) {
      chrome.storage.local.set({ currency: "USD" });
    }
  });
});

chrome.runtime.onMessage.addListener((request, sender) => {
  // store the new coin added
  if (request.add) {
    const { coin, amount } = request.add;
    Wallet.add(coin, amount);
  }

  if (request.remove) {
    Wallet.remove(request.remove);
  }

  // get the full list of cryptocurrencies every time the popup is opened
  // so the latest list is always available for adding new assets
  if (request.popup && request.popup === "open") {
    CryptoList.all()
      .then((response) => {
        // extract just the currency names
        const currencies = [];
        for (const [key, value] of Object.entries(response.Data)) {
          currencies.push({
            symbol: value.Symbol,
            name: value.FullName,
            sortOrder: value.SortOrder,
          });
        }
        chrome.runtime.sendMessage({ currencies });
      })
      .catch(() => {
        chrome.runtime.sendMessage({ error: "Error fetching currencies" });
      });
  }

  // show the asset list, this can happen on popup, or when a coin gets added/edited/removed
  if (request.show) {
    Wallet.show();
  }
});

class Wallet {
  static add(coin, amount) {
    const that = this;
    chrome.storage.local.get("assets", (data) => {
      data.assets = data.assets || {};
      data.assets[coin] = parseFloat(amount) + (data.assets[coin] || 0);
      chrome.storage.local.set({ assets: data.assets }, () => that.show());
    });
  }

  static remove(coin) {
    const that = this;
    chrome.storage.local.get("assets", (data) => {
      delete data.assets[coin];
      chrome.storage.local.set({ assets: data.assets }, () => that.show());
    });
  }

  static show() {
    chrome.storage.local.get(["assets", "currency"], (data) => {
      if (data.assets && Object.keys(data.assets).length > 0) {
        // fetch the prices for stored assets
        const assets = data.assets;
        const currency = data.currency;
        const coins = Object.keys(assets);
        let wallet = [];

        // fetch the prices and calculate the totals
        CryptoList.prices(coins, data.currency)
          .then((data) => {
            for (let coin in data) {
              wallet.push([coin, assets[coin], data[coin][currency]]);
            }
            wallet.sort((first, next) => {
              if (first[1] * first[2] > next[1] * next[2]) return -1;
              if (next[1] * next[2] > first[1] * first[2]) return 1;
              return 0;
            });
            chrome.runtime.sendMessage({ currency, wallet });
          })
          .catch(() => {
            chrome.runtime.sendMessage({ error: "Error fetching prices" });
          });
      } else {
        chrome.runtime.sendMessage({ nowallet: true });
      }
    });
  }
}

class CryptoList {
  static prices(coins = [], priceIn = "USD") {
    let fsyms = coins.join(",").toUpperCase();
    let tsyms = priceIn.toUpperCase();
    return fetch(
      `https:///min-api.cryptocompare.com/data/pricemulti?fsyms=${fsyms}&tsyms=${tsyms}`
    ).then((response) => response.json());
  }

  static price(coin = "", priceIn = []) {
    let tsyms = priceIn.join(",").toUpperCase();
    let fsym = coin.toUpperCase();
    return fetch(
      `https://min-api.cryptocompare.com/data/price?fsym=${fsym}&tsyms=${tsyms}`
    ).then((response) => response.json());
  }

  // TODO - error handling
  static all() {
    return fetch("https://min-api.cryptocompare.com/data/all/coinlist").then(
      (response) => response.json()
    );
  }
}
