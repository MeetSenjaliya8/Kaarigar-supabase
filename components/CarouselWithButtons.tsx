'use client';

import { useEffect } from 'react';

export default function CarouselWithButtons() {
  useEffect(() => {
    // Dynamically load Bootstrap JS on client
   
  }, []);

  return (
    <div className="container mt-5">
      {/* Carousel */}
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner rounded-3 shadow">
          
          <div className="carousel-item active">
            <img src="/one.png" className="d-block w-100" alt="Slide 3" />
          </div>
        </div>

        {/* Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Buttons */}
      <div className="text-center mt-4">
        <button className="btn btn-primary mx-2">Login</button>
        <button className="btn btn-outline-primary mx-2">Sign Up</button>
      </div>
    </div>
  );
}
