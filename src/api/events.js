// API for the Post track event ==============================================
export const postTrackEvent = (event) =>
  fetch(`${import.meta.env.VITE_BACKEND_URL}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event),
  }).then((res) => res.json())

// API method to get total views of the post ========================================
export const getTotalViews = (postId) =>
  fetch(`${import.meta.env.VITE_BACKEND_URL}/events/totalViews/${postId}`).then(
    (res) => res.json(),
  )

// API methods to get total daily view of the post =============================
export const getDailyViews = (postId) =>
  fetch(`${import.meta.env.VITE_BACKEND_URL}/events/dailyViews/${postId}`).then(
    (res) => res.json(),
  )

// API method to the daily duration of the view event =========================
export const getDailyDurations = (postId) =>
  fetch(
    `${import.meta.env.VITE_BACKEND_URL}/events/dailyDurations/${postId}`,
  ).then((res) => res.json())
