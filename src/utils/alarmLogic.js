function isMissing(value) {
  return value === null || value === undefined || value === "" || value === "UNAVAILABLE";
}

export function getStatusColor(status) {
  const colors = {
    active: "#22c55e",
    ok: "#22c55e",
    alarm: "#ef4444",
    fault: "#ef4444",
    warning: "#f59e0b",
    delayed: "#f59e0b",
    hold: "#eab308",
    idle: "#94a3b8",
    unavailable: "#475569",
  };

  return colors[status] || colors.unavailable;
}

export function getAvailabilityStatus(availability) {
  if (isMissing(availability) || availability === "UNAVAILABLE") {
    return { status: "unavailable", label: "UNAVAILABLE" };
  }

  return availability === "AVAILABLE"
    ? { status: "ok", label: "AVAILABLE" }
    : { status: "unavailable", label: availability };
}

export function getSpindleStatus(spindleSpeed, runStatus) {
  if (!Number.isFinite(spindleSpeed)) return { status: "unavailable", label: "UNAVAILABLE" };
  if (runStatus === "FEED_HOLD") return { status: "hold", label: "FEED HOLD" };
  if (spindleSpeed > 0) return { status: "active", label: "SPINDLE RUNNING" };
  return { status: "idle", label: "SPINDLE IDLE" };
}

export function getCycleStatus(thisCycle, lastCycle) {
  if (!Number.isFinite(thisCycle) || !Number.isFinite(lastCycle) || lastCycle <= 0) {
    return { status: "unavailable", label: "UNAVAILABLE", progress: 0 };
  }

  const ratio = thisCycle / lastCycle;
  const progress = Math.min(ratio * 100, 100);

  if (ratio > 1.1) {
    return { status: "delayed", label: "CYCLE DELAYED", progress };
  }

  return { status: "ok", label: "ON TARGET", progress };
}

export function getMachineState(data) {
  if (!data) return { status: "unavailable", label: "NO DATA" };

  const availability = data.availability;
  const activeAlarms = data.activeAlarms;
  const condition = data.machineCondition;
  const runStatus = data.runStatus;
  const spindleSpeed = data.spindleSpeed ?? data.latestSpindleSpeed;

  // Alarm priority is intentionally explicit so operators see the most severe
  // machine state first, even if other process values still look normal.
  if (isMissing(availability) || availability === "UNAVAILABLE") {
    return { status: "unavailable", label: "UNAVAILABLE" };
  }

  if (data.emergencyStop === "TRIGGERED") {
    return { status: "fault", label: "E-STOP TRIGGERED" };
  }

  if (!isMissing(activeAlarms) && activeAlarms !== "NO ACTIVE ALARMS") {
    return { status: "alarm", label: "ACTIVE ALARM" };
  }

  if (!isMissing(condition) && condition !== "Normal") {
    return { status: "warning", label: "CONDITION WARNING" };
  }

  if (runStatus === "FEED_HOLD") {
    return { status: "hold", label: "FEED HOLD" };
  }

  if (runStatus === "ACTIVE" && Number.isFinite(spindleSpeed) && spindleSpeed > 0) {
    return { status: "active", label: "ACTIVE" };
  }

  if (Number.isFinite(spindleSpeed) && spindleSpeed === 0) {
    return { status: "idle", label: "IDLE" };
  }

  return { status: "unavailable", label: "UNAVAILABLE" };
}
