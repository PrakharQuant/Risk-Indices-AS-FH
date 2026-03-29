import streamlit as st
import yfinance as yf
from risk_engine import calculate_as_index, calculate_fh_index

st.title("🛡️ AlphaRisk: AS & FH Index Dashboard")

ticker = st.text_input("Enter Ticker (e.g., TSLA, BTC-USD, SPY)", "BTC-USD")
days = st.slider("Analysis Period (Days)", 30, 730, 365)

if st.button("Analyze Risk"):
    data = yf.download(ticker, period=f"{days}d")
    returns = data['Adj Close'].pct_change().dropna().values
    
    as_val = calculate_as_index(returns)
    fh_val = calculate_fh_index(returns)
    
    col1, col2 = st.columns(2)
    col1.metric("Aumann-Serrano Index", f"{as_val:.4f}")
    col2.metric("Foster-Hart (Min Wealth)", f"${fh_val:,.2f}")
    
    st.line_chart(data['Adj Close'])
    st.success(f"To safely trade {ticker}, you need at least ${fh_val:,.2f} in reserves.")
