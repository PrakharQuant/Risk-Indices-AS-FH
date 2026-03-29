import yfinance as yf
from risk_engine import calculate_as_index, calculate_fh_index

def run_comparison(tickers):
    for ticker in tickers:
        print(f"\n--- Analyzing {ticker} ---")
        data = yf.download(ticker, period="2y", interval="1d")
        # Calculate daily simple returns
        returns = data['Adj Close'].pct_change().dropna().values
        
        as_risk = calculate_as_index(returns)
        fh_risk = calculate_fh_index(returns)
        
        print(f"Aumann-Serrano Index: {as_risk:.6f}")
        print(f"Foster-Hart Index (Reserve required): {fh_risk:.6f}")

if __name__ == "__main__":
    assets = ["SPY", "BTC-USD", "TSLA"]
    run_comparison(assets)