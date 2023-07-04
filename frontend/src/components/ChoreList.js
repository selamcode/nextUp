// ChoreList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChoreList() {
    const [chores, setChores] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/chores/')
            .then(res => {
                setChores(res.data);
            });
    }, []);

    return (
        <div>
            {chores.map(chore => (
                <div key={chore.id}>
                    <h2>{chore.title}</h2>
                    <p>{chore.description}</p>
                    <p>{chore.due_date}</p>
                    <p>{chore.priority}</p>
                    <p>{chore.status}</p>
                </div>
            ))}
        </div>
    );
}

export default ChoreList;
