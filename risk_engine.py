import numpy as np
from scipy.optimize import brentq

def calculate_fh_index(returns):
    """Calculates the Foster-Hart Risk Index with safety guards."""
    # 1. Handle empty or null input
    if returns is None or len(returns) < 2:
        return np.nan
    
    # 2. Ensure data is a flat numpy array
    returns = np.array(returns).flatten()
    
    mu = np.mean(returns)
    max_loss = -np.min(returns)
    
    # 3. Handle edge cases based on FH theory
    if mu <= 0:
        return np.inf
    if max_loss <= 0:
        return 0.0 

    def objective(R):
        return np.mean(np.log(1 + returns / R))
    
    try:
        # We search between max_loss and a very large number
        return brentq(objective, max_loss + 1e-8, max_loss * 100000)
    except (ValueError, RuntimeError):
        return np.nan

def calculate_fh_index(returns):
    """Calculates the Foster-Hart Risk Index."""
    mu = np.mean(returns)
    max_loss = -np.min(returns)
    
    if mu <= 0:
        return np.inf
    if max_loss <= 0:
        return 0.0 # No risk of bankruptcy if there are no losses

    # We solve E[log(1 + X/R)] = 0
    def objective(R):
        return np.mean(np.log(1 + returns / R))
    
    try:
        # R must be strictly greater than the maximum loss
        r_star = brentq(objective, max_loss + 1e-8, max_loss * 10000)
        return r_star
    except ValueError:
        return np.nan
