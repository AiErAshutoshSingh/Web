from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_files():
    group_file = request.files['groupFile']
    hostel_file = request.files['hostelFile']

    groups_df = pd.read_csv(group_file)
    hostels_df = pd.read_csv(hostel_file)

    allocation = allocate_rooms(groups_df, hostels_df)
    return jsonify(allocation)

def allocate_rooms(groups_df, hostels_df):
    allocation = []
    # Allocation logic here
    # Example pseudo-code:
    # 1. Sort groups by size (descending)
    # 2. Iterate through each group and find suitable room
    # 3. Ensure same ID groups are together and respect gender and capacity
    
    for index, group in groups_df.iterrows():
        group_id = group['Group ID']
        members = group['Members']
        gender = group['Gender']
        # Find suitable room logic...
        # Add the allocation to the result
        allocation.append({
            'groupId': group_id,
            'hostelName': 'Some Hostel',
            'roomNumber': 101,
            'membersAllocated': members
        })

    return allocation

if __name__ == '__main__':
    app.run(debug=True)
