import React, { useState, useEffect, useRef } from 'react';
import TaskItem from './TaskItem';
import '../styles/Carousel.css';

function TaskCarousel({ tasks, onEdit, onDelete, onToggle }) {
  const cloneCount = 3; 
  const [currentIndex, setCurrentIndex] = useState(cloneCount);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);

  const trackRef = useRef(null);

  // handle screen size changes
  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 768) {
        setCardsToShow(1);
      } else if (width < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // go back to start when tasks update
  useEffect(() => {
    setCurrentIndex(cloneCount);
  }, [tasks.length]);

  // check if empty
  if (tasks.length === 0) {
    return (
      <div className="carousel-empty">
        <p>No tasks yet. Create one to get started!</p>
      </div>
    );
  }

  if (tasks.length === 1) {
    return (
      <div className="carousel-single">
        <TaskItem
          task={tasks[0]}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      </div>
    );
  }

  // Build array of cards
  const buildCards = () => {
    const cards = [];

    // Clone the last 3 items at beginning (cars 0-2)
    for (let i = tasks.length - cloneCount; i < tasks.length; i++) {
      cards.push({ ...tasks[i], _cloneId: `start-${i}` });
    }


    tasks.forEach(task => cards.push({ ...task, _cloneId: null }));

    // Clone first 3 items at end 
    for (let i = 0; i < cloneCount; i++) {
      cards.push({ ...tasks[i], _cloneId: `end-${i}` });
    }

    return cards;
  };

  const allCards = buildCards();
  const endCloneStart = cloneCount + tasks.length; 

  // Navigation
  const goToNext = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const goToPrev = () => {
    setCurrentIndex(prev => prev - 1);
  };

  const goToIndex = (taskIndex) => {
    // offset by clones at the start
    setCurrentIndex(cloneCount + taskIndex);
  };

  // wrap around to real items after transition
  const handleTransitionEnd = () => {
    const track = trackRef.current;
    if (!track) return;

    // hit the end clones, loop back
    if (currentIndex >= endCloneStart) {
      const cloneIndex = currentIndex - endCloneStart;
      const newIndex = cloneCount + cloneIndex;

      track.style.transition = 'none';
      const cardWidth = 100 / cardsToShow;
      track.style.transform = `translateX(-${newIndex * cardWidth}%)`;
      void track.offsetWidth;
      track.style.transition = '';
      setCurrentIndex(newIndex);
    }

    // hit the start clones, loop forward
    else if (currentIndex < cloneCount) {
      const newIndex = tasks.length + currentIndex;

      track.style.transition = 'none';
      const cardWidth = 100 / cardsToShow;
      track.style.transform = `translateX(-${newIndex * cardWidth}%)`;
      void track.offsetWidth;
      track.style.transition = '';
      setCurrentIndex(newIndex);
    }
  };

  // Touch gestures
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrev();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Calculate transform offset
  const getTransformOffset = () => {
    const cardWidth = 100 / cardsToShow;
    return -(currentIndex * cardWidth);
  };

  // figure out which dot should be active
  const getCurrentTaskIndex = () => {
    if (currentIndex >= endCloneStart) {
      return currentIndex - endCloneStart;
    }
    else if (currentIndex < cloneCount) {
      return tasks.length - cloneCount + currentIndex;
    }
    else {
      return currentIndex - cloneCount;
    }
  };

  const offset = getTransformOffset();
  const currentTaskIndex = getCurrentTaskIndex();

  return (
    <div
      className="carousel-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel-wrapper">
        <div
          ref={trackRef}
          className="carousel-track"
          style={{ transform: `translateX(${offset}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {allCards.map((task, idx) => (
            <div
              key={`task-${task.id}-${idx}`}
              className="carousel-card"
            >
              <TaskItem
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggle={onToggle}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation - always enabled */}
      <button
        className="carousel-btn prev"
        onClick={goToPrev}
        aria-label="Previous task"
      >
        ‹
      </button>
      <button
        className="carousel-btn next"
        onClick={goToNext}
        aria-label="Next task"
      >
        ›
      </button>

      {/* Dot indicators */}
      <div className="carousel-dots">
        {tasks.map((_, idx) => (
          <button
            key={idx}
            className={`dot ${idx === currentTaskIndex ? 'active' : ''}`}
            onClick={() => goToIndex(idx)}
            aria-label={`Go to task ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskCarousel;
