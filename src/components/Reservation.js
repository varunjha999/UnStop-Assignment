import React, { useState } from 'react';
import '../App.css';

const Reservation = () => {
  const totalSeats = 80;
  const seatsInRow = 7;
  const lastRowSeats = 3;

  // State for the seat map
  const [seatMap, setSeatMap] = useState(Array(totalSeats).fill(false));

  // Function to reserve seats
  const reserveSeats = (numSeats) => {
    // Find the first available seats in the seat map
    let startIndex = -1;
    for (let i = 0; i < totalSeats; i++) {
      if (seatMap[i] === false) {
        if (i % seatsInRow <= seatsInRow - numSeats) {
          startIndex = i;
          break;
        }
      }
    }

    if (startIndex === -1) {
      // If no seats are available in the first pass, try to find seats in the last row
      // This is done to avoid leaving single seats in the last row
      for (let i = 0; i < totalSeats; i++) {
        if (seatMap[i] === false) {
          let j = i;
          let count = 0;
          while (j < totalSeats && seatMap[j] === false && count < numSeats) {
            count++;
            j++;
          }
          if (count === numSeats) {
            startIndex = i;
            break;
          }
        }
      }
    }

    if (startIndex !== -1) {
      // If seats are available, reserve them
      const updatedSeatMap = [...seatMap];
      for (let i = startIndex; i < startIndex + numSeats; i++) {
        updatedSeatMap[i] = true;
      }
      setSeatMap(updatedSeatMap);
      console.log(`Seats ${startIndex + 1} to ${startIndex + numSeats} reserved successfully.`);
    } else {
      console.log('No seats available.');
    }
  };

  // State for the number of seats input
  const [numSeatsInput, setNumSeatsInput] = useState('');

  const handleNumSeatsChange = (event) => {
    const value = event.target.value;
    if (value <= 7) {
      setNumSeatsInput(value);
    }
  };

  // Function to handle reserving seats
  const handleReserveSeats = () => {
    const numSeats = parseInt(numSeatsInput, 10);
    if (Number.isNaN(numSeats) || numSeats <= 0) {
      console.log('Please enter a valid number of seats.');
      return;
    }
    reserveSeats(numSeats);
    setNumSeatsInput('');
  };

  // Function to render the seat map
  const renderSeatMap = () => {
    const seatRows = Math.ceil(totalSeats / seatsInRow);
    const rows = [];
    let seatNumber = 1;
    for (let i = 0; i < seatRows; i++) {
      const rowSeats = i === seatRows - 1 ? lastRowSeats : seatsInRow;
      const row = [];
      for (let j = 0; j < rowSeats; j++) {
        const seatIndex = i * seatsInRow + j;
        const seatClass = seatMap[seatIndex] ? 'reserved' : 'available';
        row.push(
          <div key={seatIndex} className={`seat ${seatClass}`}>
            {seatNumber}
          </div>
        );
        seatNumber++;
      }
      rows.push(
        <div key={i} className="seat-row">
          {row}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="seat-container">
      <h1>Train-Ticket-Booking-App</h1>
      <div className="seat-container">{renderSeatMap()}</div>
      <button onClick={() => reserveSeats(1)}>Reserve 1 Seat</button>
      <button onClick={() => reserveSeats(2)}>Reserve 2 Seats</button>
      <button onClick={() => reserveSeats(3)}>Reserve 3 Seats</button>
      <div>
        <input
          type="number"
          value={numSeatsInput}
          onChange={handleNumSeatsChange}
          placeholder="Enter number of seats "
        />
        <button onClick={handleReserveSeats}>Reserve Seats</button>
      </div>
    </div>
  );
};

export default Reservation;
