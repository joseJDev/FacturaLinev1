""" Funcioon para formatear fechas """

from datetime import datetime

def format_dates(first_date, last_date = None):
    first_date = datetime.strptime(first_date, '%Y-%m-%d')
    
    if last_date:
        last_date = datetime.strptime(last_date, '%Y-%m-%d')
    
    return first_date, last_date
