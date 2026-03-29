import streamlit as st
import yfinance as yf
import pandas as pd
from riskengine import calculate_as_index, calculate_fh_index

# --- STREAMLIT UI ---

st.set_page_config(page_title="AlphaRisk Index", page_icon="🛡️")

st.title("🛡️ AlphaRisk: Objective Risk Measures")
st.markdown("""
This tool calculates the **Aumann-Serrano** and **Foster-Hart** risk indices. 
Unlike the Sharpe Ratio, these measures account for 'fat-tail' risks and bankruptcy potential.
""")

# Sidebar inputs
st.sidebar.header("Settings")
ticker = st.sidebar.text_input("Enter Ticker (e.g., BTC-USD, TSLA, SPY)", "BTC-USD")
days = st.sidebar.slider("Analysis Window (Days)", 30, 730, 365)

if st.button("Analyze Risk Profile"):
    with st.spinner(f'Fetching data for {ticker}...'):
        data = yf.download(ticker, period=f"{days}d")
        
        if data.empty:
            st.error("No data found! Please check the ticker symbol.")
        else:
            # Handle MultiIndex columns (common in newer yfinance)
            if isinstance(data.columns, pd.MultiIndex):
                # Check if 'Adj Close' exists as a level
                if 'Adj Close' in data.columns.levels[0]:
                    prices = data['Adj Close'][ticker]
                else:
                    prices = data['Close'][ticker]
            else:
                prices = data['Adj Close'] if 'Adj Close' in data.columns else data['Close']
                
            returns = prices.pct_change().dropna().values
            
            as_val = calculate_as_index(returns)
            fh_val = calculate_fh_index(returns)
            
            # Display Results
            st.divider()
            c1, c2 = st.columns(2)
            c1.metric("Aumann-Serrano Index", f"{as_val:.4f}")
            c2.metric("Foster-Hart (Min Wealth)", f"${fh_val:,.2f}")
            
            st.subheader(f"Price History: {ticker}")
            st.line_chart(prices)
            
            st.info(f"""
            **What does this mean?**
            * **AS Index:** Measures 'intrinsic riskiness'. Lower values are safer.
            * **FH Index:** Suggests you should have at least **${fh_val:,.2f}** in total wealth for every $1 invested in {ticker} to avoid the mathematical certainty of eventual ruin.
            """)
