export function calculateTotalCost(
  startTime: string,
  endTime: string,
  pricePerHour: number
) {
  const startHour = parseInt(startTime.split(':')[0], 10)
  const endHour = parseInt(endTime.split(':')[0], 10)

  const durationHours = endHour - startHour

  if (durationHours < 0) {
    throw new Error('End time cannot be earlier than start time')
  }

  const totalCost = durationHours * pricePerHour

  return totalCost
}
