from datetime import date, timedelta
from random import choices

nDays = 21
linesLeft = nDays * 3

currentDay = date.today() - timedelta(days=nDays)

print('time, mood')

for i in range(nDays):
    for time in ['09','15','21']:
        linesLeft -= 1

        moodscore = choices( list(str(x) for x in range(5)) , [.15,.35, .25, .2, .05])
        datestring = currentDay.strftime('%a %b %d %Y ')
        datestring += time
        datestring += ':00:00 GMT-0800 (Pacific Standard Time), '
        datestring += moodscore[0]

        if linesLeft == 0:
            print(datestring, end='')
        else:
            print(datestring)
    
    currentDay = currentDay + timedelta(days=1)