import React, { useState, useEffect } from 'react';
import axios from '../axios-config';

const Catalog = () => {
    const [studyRooms, setStudyRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Fetching study rooms...'); // This will log when the effect is run
        const fetchStudyRooms = async () => {
            try {
                const response = await axios.get('/catalog');
                console.log('Study rooms fetched:', response.data); // This will log the fetched data
                setStudyRooms(response.data);
            } catch (error) {
                console.error('Error fetching study rooms:', error);
                setError(error);
            }
            setIsLoading(false);
        };

        fetchStudyRooms();
    }, []);

    // if (isLoading) return <div className="catalog-loading">Loading study rooms...</div>;
    // if (error) return <div className="catalog-error">Error fetching study rooms: {error.message}</div>;
    // if (studyRooms.length === 0) return <div className="catalog-empty">No study rooms available.</div>;

    return (
        <div className="catalog-container">
            <div className="catalog-title">Study Group Catalog</div>
            {studyRooms.map((room) => (
                <div key={room.studyRoomId} className="catalog-item">
                    {room.roomName}
                </div>
            ))}
        </div>
    );
};

export default Catalog;

