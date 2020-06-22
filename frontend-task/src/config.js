
// API endpoints
export const JOURNEYS_URL = 'http://localhost:3000/journeys'

// universal speed (pixels per minute)
export const PX_PER_MIN = 5

// speed of time (milliseconds per minute)
// recommended speed <= 500
export const MS_PER_MIN = 100

// starting time of the schedule
// not recommended changing this
export const START_TIME = '09:00'

// uses a random wait time at the bus stations
// to make things more realistic and fun use true
export const USE_RAND_WAIT_TIME = false

// uses a random rather than uniform train speed
// to make things more realistic and fun use true
export const USE_RAND_TRAIN_SPEED = false
