import json
from datetime import datetime, timedelta
import random
import time

entries = []
start = datetime(2025, 12, 10, 12, 0, 0)
num_entries = 100  # 100 timestamps, each has 2 poles => 200 entries


# Linear trend increments
pole1_step = random.uniform(0.1, 0.3)
pole2_step = random.uniform(0.1, 0.3)

json_entries = []
entry_id = 1
p1 = 0
p2 = 2

while True:
    t = datetime.now()

    # Base trend

    if((p1 >= 9.9 and pole1_step > 0) or (p1 <= 0.1 and pole1_step < 0)):
        pole1_step *= -1
    if((p2 >= 9.9 and pole2_step > 0) or (p2 <= 0.1 and pole2_step < 0)):
        pole2_step *= -1
    
    p1 += pole1_step
    p2 += pole2_step

    # Random noise
    p1 += random.uniform(-0.05, 0.05)
    p2 += random.uniform(-0.05, 0.05)

    # Ensure non-negative water levels
    p1 = max(p1, 0)
    p2 = max(p2, 0)

    # Append Pole 1
    json_entries.append({
        "id": entry_id,
        "PoleID": 1,
        "waterlevel": round(p1, 1),
        "created_at": t.strftime('%Y-%m-%d %H:%M:%S')
    })
    entry_id += 1

    # Append Pole 2
    json_entries.append({
        "id": entry_id,
        "PoleID": 2,
        "waterlevel": round(p2, 1),
        "created_at": t.strftime('%Y-%m-%d %H:%M:%S')
    })
    entry_id += 1
    json_output = json.dumps(json_entries, indent=2)
    path = 'GUI/data.json'
    with open(path, 'w') as f:
        f.write(json_output)
    time.sleep(1)  # Simulate delay between data generations