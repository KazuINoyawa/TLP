import React from 'react';

const ItineraryBox = ({ itineraries }) => (
  <div className="itinerary-box">
    <h3>Gợi ý lịch trình</h3>
    {itineraries.length === 0 ? <div>Chưa có lịch trình.</div> :
      itineraries.map(i => (
        <div key={i._id}>
          <b>{i.title}</b>
          <ul>
            {i.details.map((d, idx) => <li key={idx}>{d}</li>)}
          </ul>
        </div>
      ))}
  </div>
);

export default ItineraryBox;
