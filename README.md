# Objective Risk Measures: AS and FH Indices

This project implements two performance-independent risk measures:
1. **Aumann-Serrano (AS) Index**: Based on the level of risk aversion required to accept a gamble.
2. **Foster-Hart (FH) Index**: A bankruptcy-avoidance measure showing the minimum wealth needed to accept a gamble safely.

## Why use these?
Unlike the **Sharpe Ratio**, these indices:
- Do not assume a Normal Distribution.
- Are "Objective" (independent of an individual's utility function).
- Penalize "fat-tail" risks much more effectively.

## Installation
```bash
pip install -r requirements.txt
python main.py