import streamlit as st
import yfinance as yf
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from risk_engine import calculate_as_index, calculate_fh_index

st.set_page_config(page_title="AlphaRisk Index", page_icon="🛡️")
st.title("🛡️ AlphaRisk: Objective Risk Measures")
st.markdown("""
This tool calculates the **Aumann-Serrano** and **Foster-Hart** risk indices.
Unlike the Sharpe Ratio, these measures account for fat-tail risks and bankruptcy potential.
""")

tab1, tab2 = st.tabs(["📈 Market Data", "🎲 Gamble Simulator"])

with tab1:
    st.sidebar.header("Settings")
    ticker = st.sidebar.text_input("Enter Ticker (e.g., BTC-USD, TSLA, SPY)", "BTC-USD")
    days = st.sidebar.slider("Analysis Window (Days)", 30, 730, 365)

    if st.button("Analyze Risk Profile"):
        with st.spinner(f'Fetching data for {ticker}...'):
            data = yf.download(ticker, period=f"{days}d")

            if data.empty:
                st.error("No data found! Please check the ticker symbol.")
            else:
                if isinstance(data.columns, pd.MultiIndex):
                    prices = data['Close'][ticker]
                else:
                    prices = data['Close']

                returns = prices.pct_change().dropna().values

                as_val = calculate_as_index(returns)
                fh_val = calculate_fh_index(returns)

                st.divider()
                c1, c2 = st.columns(2)
                c1.metric("Aumann-Serrano Index", f"{as_val:.4f}")
                c2.metric("Foster-Hart (Min Wealth)", f"${fh_val:,.2f}")

                st.subheader(f"Price History: {ticker}")
                st.line_chart(prices)

                st.subheader(f"Rolling 30-Day Foster-Hart Index: {ticker}")
                rolling_fh = pd.Series(returns).rolling(window=30).apply(calculate_fh_index)
                fig, ax = plt.subplots(figsize=(10, 4))
                ax.plot(rolling_fh.values, color='crimson', linewidth=1.5, label='FH Index (30d rolling)')
                ax.set_ylabel("Min. Safe Wealth per $1 invested")
                ax.set_title(f"Riskiness Over Time — {ticker}")
                ax.grid(True, alpha=0.3)
                ax.legend()
                st.pyplot(fig)
                plt.close(fig)

                st.info(f"""
                **What does this mean?**
                * **AS Index:** Measures intrinsic riskiness. Lower is safer.
                * **FH Index:** You should hold at least **${fh_val:,.2f}** in total wealth
                for every $1 invested in {ticker} to avoid eventual ruin.
                """)

with tab2:
    st.subheader("Hypothetical Gamble Simulator")
    st.markdown("""
    Design a two-outcome gamble and compute its **exact** Aumann-Serrano and Foster-Hart indices.
    Unlike the Sharpe ratio, these measures capture the full risk of the gamble — not just variance.
    """)

    c1, c2, c3 = st.columns(3)
    upside = c1.number_input("Upside ($)", value=100, step=10)
    downside = c2.number_input("Downside ($)", value=-50, step=10)
    prob = c3.slider("Probability of Upside", 0.01, 0.99, 0.50)

    ev = upside * prob + downside * (1 - prob)
    st.metric("Expected Value", f"${ev:.2f}")

    if ev <= 0:
        st.warning("Expected value must be positive for AS/FH indices to exist.")
    elif downside >= 0:
        st.warning("Downside must be negative for a meaningful gamble.")
    else:
        n = 10000
        returns = np.array(
            [upside / 100] * int(prob * n) + [downside / 100] * int((1 - prob) * n)
        )

        as_val = calculate_as_index(returns)
        fh_val = calculate_fh_index(returns)

        st.divider()
        c1, c2 = st.columns(2)
        c1.metric("Aumann-Serrano Index", f"{as_val:.4f}")
        c2.metric("Foster-Hart (Min Wealth per $1)", f"${fh_val:,.2f}")

        st.divider()

        st.subhead
