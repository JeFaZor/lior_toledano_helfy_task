# Task Manager - Carousel Edition

Full-stack task management app with a custom endless carousel (no external carousel libs allowed per requirements).

## Stack

- React 18 (vanilla)
- Express/Node
- CSS only (no Bootstrap/Tailwind)
- In-memory storage

## Quick Start

```bash
# Start backend first (port 4000)
cd backend
npm install
npm start

# Then frontend (port 3000)
cd frontend
npm install
npm start
```

**Note:** If you get CORS errors, make sure backend is running. I spent like 20 minutes debugging that before realizing the backend wasn't even on.

## What It Does

Basic task CRUD operations:
- Create/edit/delete tasks
- Toggle completion status
- Filter by All/Completed/Pending
- Set priority levels (Low/Medium/High)
- Form validation with error messages

The main feature is the endless carousel that displays tasks. It loops infinitely in both directions without that awkward "jump back to start" effect.

## Carousel Implementation

This was the fun/challenging part. The carousel needed to:
- Loop seamlessly (no visible reset)
- Work with swipe gestures
- Be responsive (1/2/3 cards based on screen size)
- Handle edge cases (0 tasks, 1 task, 2 tasks, etc.)

### How it works

Uses a cloning strategy - duplicates the first couple cards at the end and last couple at the beginning. When you scroll past the last card, it smoothly animates to the cloned first card, then instantly jumps to the real first card after the transition ends. User never sees the jump.

```javascript
// Offset calculation (this took me a while to get right)
offset = -((currentIndex + cloneCount) * cardWidth)
```

Had to handle the transitionend event carefully to make the loop seamless. First version had a weird stutter but figured it out.

### Touch Support

Added swipe left/right for mobile. Works pretty well on iOS, haven't tested extensively on Android but should be fine.

Minimum swipe distance is 50px - anything less gets ignored.

## API Routes

**Base:** `http://localhost:4000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /tasks | Get all tasks |
| POST | /tasks | Create new task |
| PUT | /tasks/:id | Update entire task |
| PATCH | /tasks/:id/toggle | Toggle completion |
| DELETE | /tasks/:id | Delete task |

### Request/Response Examples

**Create Task (POST /tasks):**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "priority": "medium"
}
```

**Response (201):**
```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "priority": "medium",
  "createdAt": "2026-02-12T10:00:00.000Z"
}
```

Validation errors return 400 with details about what's wrong.

## Project Structure

```
task-manager/
├── backend/
│   ├── server.js
│   ├── data/store.js          # In-memory data
│   ├── routes/tasks.js
│   ├── middleware/
│   │   ├── validation.js
│   │   └── errorHandler.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── components/
│   │   │   ├── TaskCarousel.js    # Main carousel logic
│   │   │   ├── TaskItem.js
│   │   │   ├── TaskForm.js
│   │   │   ├── TaskFilter.js
│   │   │   └── LoadingSpinner.js
│   │   ├── services/api.js
│   │   └── styles/
│   │       ├── App.css
│   │       ├── Carousel.css
│   │       ├── TaskItem.css
│   │       └── Form.css
│   └── package.json
```

## Responsive Design

Breakpoints:
- Mobile (< 768px): Shows 1 card
- Tablet (768-1024px): Shows 2 cards  
- Desktop (> 1024px): Shows 3 cards

Used CSS media queries and state management to handle card width calculations.

## Known Issues / TODOs

- Sometimes carousel has a slight stutter on the very first swipe (rare, can't consistently reproduce)
- Edge case with exactly 2 tasks works but feels a bit weird with the dots
- Navigation dots don't wrap on really small screens (< 350px) - need to add horizontal scroll or something
- TODO: Add keyboard navigation (arrow keys)
- TODO: Better error messages on network failures
- Performance with 50+ tasks seems fine but haven't stress tested with hundreds

## Testing Notes

Backend:
- [x] All CRUD endpoints work
- [x] Validation catches bad input
- [x] Error handling returns proper status codes

Carousel:
- [x] Loops forward smoothly
- [x] Loops backward smoothly
- [x] Touch gestures work (iOS tested, Android probably fine)
- [x] Responsive on different screen sizes
- [x] Handles empty state (0 tasks)
- [x] Works with 1 task (no carousel, just shows the card)
- [ ] Keyboard navigation - not implemented yet

Frontend:
- [x] Create/edit/delete operations
- [x] Filter switches work
- [x] Form validation displays errors
- [x] Loading states
- [x] Delete confirmation modal

## Why No Libraries?

Assignment requirements specifically said vanilla CSS and no carousel libraries. Built the whole thing from scratch using React hooks and CSS transforms.

Initially considered using Swiper or Slick but that would've defeated the purpose. Building it manually was actually interesting once I wrapped my head around the transform calculations.

## Design Choices

**Code style:**
- Kept it clean and readable (2-space indents, consistent naming)
- No over-engineering - straightforward implementations
- Left some debug comments in places where I had to figure stuff out
- Used simple state management (useState/useEffect, no Redux needed)

**Backend:**
- In-memory storage for simplicity (resets on server restart)
- Basic validation middleware
- Simple error handling

**Frontend:**
- Component-based structure
- Separate CSS files for organization
- API service layer to keep components clean

## What's Not Included

Things I considered but didn't implement (time constraints / out of scope):
- Database persistence
- User authentication
- Search functionality
- Sorting options
- Drag-and-drop reordering
- Task due dates
- Dark mode
- Undo/redo

## Development Notes

The carousel transform logic took the longest to figure out. The key insight was that you need to:
1. Clone cards at both ends
2. Calculate offset including the clone count
3. Listen for transitionend to snap back to real cards
4. Disable transitions during the snap so it's invisible

Tried doing it without cloning first (just calculating modulo positions) but that looked janky.

Also spent some time getting the touch detection right - needed to distinguish between swipes and clicks/taps.

---

Built as a technical assessment project. Took about 4 hours total including debugging and styling.