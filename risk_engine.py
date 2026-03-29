import numpy as np
from scipy.optimize import brentq

def calculate_as_index(returns):
    """Calculates the Aumann-Serrano Risk Index."""
    mu = np.mean(returns)
    if mu <= 0:
        return np.inf  # If expected return is negative, risk is infinite
    
    # We solve E[exp(-alpha * X)] - 1 = 0
    def objective(alpha):
        return np.mean(np.exp(-alpha * returns)) - 1
    
    try:
        # We look for a root between a tiny number and a reasonable upper bound
        alpha_star = brentq(objective, 1e-10, 100)
        return 1 / alpha_star
    except ValueError:
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