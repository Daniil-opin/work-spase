export function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

export function isSlotMatchesTimeRange(
  slot: string,
  startTime: string,
  endTime: string,
) {
  const [slotStart, slotEnd] = slot.split("—").map((value) => value.trim());

  const filterStartMinutes = timeToMinutes(startTime);
  const filterEndMinutes = timeToMinutes(endTime);

  const slotStartMinutes = timeToMinutes(slotStart);
  const slotEndMinutes = timeToMinutes(slotEnd);

  return (
    slotStartMinutes < filterEndMinutes && slotEndMinutes > filterStartMinutes
  );
}
