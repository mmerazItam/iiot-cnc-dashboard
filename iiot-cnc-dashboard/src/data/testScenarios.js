const BASE_TIMESTAMPS = [
  "2023-05-10T17:50:00.000Z",
  "2023-05-10T17:50:01.000Z",
  "2023-05-10T17:50:02.000Z",
  "2023-05-10T17:50:03.000Z",
  "2023-05-10T17:50:04.000Z",
  "2023-05-10T17:50:05.000Z",
  "2023-05-10T17:50:06.000Z",
  "2023-05-10T17:50:07.000Z",
  "2023-05-10T17:50:08.000Z",
  "2023-05-10T17:50:09.000Z",
  "2023-05-10T17:50:10.000Z",
  "2023-05-10T17:50:11.000Z",
  "2023-05-10T17:50:12.000Z",
  "2023-05-10T17:50:13.000Z",
  "2023-05-10T17:50:14.000Z",
  "2023-05-10T17:50:15.000Z",
];

function ovalTrajectory(centerX = -400, centerY = -125, radiusX = 48, radiusY = 38) {
  return BASE_TIMESTAMPS.map((timestamp, index) => {
    const angle = (index / BASE_TIMESTAMPS.length) * Math.PI * 2;
    return {
      timestamp,
      x: centerX + Math.cos(angle) * radiusX,
      y: centerY + Math.sin(angle) * radiusY,
    };
  });
}

function fixedTrajectory(x, y, count = 4) {
  return BASE_TIMESTAMPS.slice(0, count).map((timestamp) => ({ timestamp, x, y }));
}

const MOVING_ALARM_SERVO_OVERLOAD_TRAJECTORY = [
  {
    timestamp: "2023-05-10T17:40:54.240Z",
    x: -404.4854174874717,
    y: -77.65658375378014,
    spindleSpeed: 1999.8,
    feedrateOverride: 100,
    runStatus: "ACTIVE",
    machineCondition: "Normal",
    activeAlarms: "NO ACTIVE ALARMS",
    emergencyStop: "ARMED",
    gcode: "G03",
  },
  {
    timestamp: "2023-05-10T17:40:55.240Z",
    x: -435.2871183230719,
    y: -90.92195330019393,
    spindleSpeed: 1999.6,
    feedrateOverride: 100,
    runStatus: "ACTIVE",
    machineCondition: "Normal",
    activeAlarms: "NO ACTIVE ALARMS",
    emergencyStop: "ARMED",
    gcode: "G03",
  },
  {
    timestamp: "2023-05-10T17:40:56.241Z",
    x: -450.7776610008905,
    y: -120.66684320433791,
    spindleSpeed: 1999.5,
    feedrateOverride: 100,
    runStatus: "ACTIVE",
    machineCondition: "Normal",
    activeAlarms: "NO ACTIVE ALARMS",
    emergencyStop: "ARMED",
    gcode: "G03",
  },
  {
    timestamp: "2023-05-10T17:40:57.245Z",
    x: -443.5137453018194,
    y: -154.27405999653655,
    spindleSpeed: 1999.7,
    feedrateOverride: 100,
    runStatus: "ACTIVE",
    machineCondition: "Normal",
    activeAlarms: "NO ACTIVE ALARMS",
    emergencyStop: "ARMED",
    gcode: "G03",
  },
  {
    timestamp: "2023-05-10T17:40:58.245Z",
    x: -417.1216316119471,
    y: -174.96636805098746,
    spindleSpeed: 1999.8,
    feedrateOverride: 100,
    runStatus: "ACTIVE",
    machineCondition: "Normal",
    activeAlarms: "NO ACTIVE ALARMS",
    emergencyStop: "ARMED",
    gcode: "G01",
  },
  {
    timestamp: "2023-05-10T17:40:59.245Z",
    x: -384.3609571853078,
    y: -174.61041604946604,
    spindleSpeed: 1999.6,
    feedrateOverride: 100,
    runStatus: "ACTIVE",
    machineCondition: "Normal",
    activeAlarms: "NO ACTIVE ALARMS",
    emergencyStop: "ARMED",
    gcode: "G01",
  },
  {
    timestamp: "2023-05-10T17:41:00.245Z",
    x: -358.42467635119795,
    y: -153.34954384790066,
    spindleSpeed: 1999.5,
    feedrateOverride: 100,
    runStatus: "ACTIVE",
    machineCondition: "Normal",
    activeAlarms: "NO ACTIVE ALARMS",
    emergencyStop: "ARMED",
    gcode: "G03",
  },
  {
    timestamp: "2023-05-10T17:41:01.246Z",
    x: -351.8926944952184,
    y: -119.5924287326652,
    spindleSpeed: 1999.4,
    feedrateOverride: 100,
    runStatus: "ACTIVE",
    machineCondition: "Normal",
    activeAlarms: "NO ACTIVE ALARMS",
    emergencyStop: "ARMED",
    gcode: "G03",
  },
  {
    timestamp: "2023-05-10T17:41:02.246Z",
    x: -367.35880861432776,
    y: -90.79527635938997,
    spindleSpeed: 1999.6,
    feedrateOverride: 90,
    runStatus: "ACTIVE",
    machineCondition: "Warning",
    activeAlarms: "NO ACTIVE ALARMS",
    emergencyStop: "ARMED",
    gcode: "G03",
    warning: "X-axis following error increasing",
  },
  {
    timestamp: "2023-05-10T17:41:03.246Z",
    x: -399.1085442045309,
    y: -77.59816195478504,
    spindleSpeed: 1998.9,
    feedrateOverride: 75,
    runStatus: "ACTIVE",
    machineCondition: "Warning",
    activeAlarms: "NO ACTIVE ALARMS",
    emergencyStop: "ARMED",
    gcode: "G01",
    warning: "Servo load near limit",
  },
  {
    timestamp: "2023-05-10T17:41:04.247Z",
    x: -401.2545370398237,
    y: -103.28442417651289,
    spindleSpeed: 0,
    feedrateOverride: 0,
    runStatus: "INTERRUPTED",
    machineCondition: "Fault",
    activeAlarms: "102 SERVO OVERLOAD - X AXIS",
    emergencyStop: "ARMED",
    gcode: "G01",
    alarm: true,
  },
  {
    timestamp: "2023-05-10T17:41:05.246Z",
    x: -401.2545370398237,
    y: -103.28442417651289,
    spindleSpeed: 0,
    feedrateOverride: 0,
    runStatus: "INTERRUPTED",
    machineCondition: "Fault",
    activeAlarms: "102 SERVO OVERLOAD - X AXIS",
    emergencyStop: "ARMED",
    gcode: "G01",
    alarm: true,
  },
  {
    timestamp: "2023-05-10T17:41:06.246Z",
    x: -401.2545370398237,
    y: -103.28442417651289,
    spindleSpeed: 0,
    feedrateOverride: 0,
    runStatus: "INTERRUPTED",
    machineCondition: "Fault",
    activeAlarms: "102 SERVO OVERLOAD - X AXIS",
    emergencyStop: "ARMED",
    gcode: "G01",
    alarm: true,
  },
];

function valueOr(overrides, key, fallback) {
  return Object.prototype.hasOwnProperty.call(overrides, key) ? overrides[key] : fallback;
}

function makeScenarioData(overrides) {
  const trajectory = overrides.trajectory ?? [];
  const latestPoint = trajectory.at(-1);

  return {
    source: valueOr(overrides, "source", "scenario"),
    parseOk: true,
    creationTime: valueOr(overrides, "creationTime", "2023-05-10T17:50:00.000Z"),
    machineName: "TM-1P",
    uuid: "000",
    availability: valueOr(overrides, "availability", "AVAILABLE"),
    machineCondition: valueOr(overrides, "machineCondition", "Normal"),
    activeAlarms: valueOr(overrides, "activeAlarms", "NO ACTIVE ALARMS"),
    mode: valueOr(overrides, "mode", "AUTOMATIC"),
    runStatus: valueOr(overrides, "runStatus", "ACTIVE"),
    program: valueOr(overrides, "program", "Synthetic validation.nc"),
    loopsRemaining: valueOr(overrides, "loopsRemaining", 0),
    m30Counter1: valueOr(overrides, "m30Counter1", 5536),
    m30Counter2: valueOr(overrides, "m30Counter2", 5536),
    latestM30Counter1: valueOr(overrides, "latestM30Counter1", valueOr(overrides, "m30Counter1", 5536)),
    latestM30Counter2: valueOr(overrides, "latestM30Counter2", valueOr(overrides, "m30Counter2", 5536)),
    emergencyStop: valueOr(overrides, "emergencyStop", "ARMED"),
    rapidOverride: valueOr(overrides, "rapidOverride", 100),
    feedrateOverride: valueOr(overrides, "feedrateOverride", 100),
    thisCycle: valueOr(overrides, "thisCycle", 390),
    lastCycle: valueOr(overrides, "lastCycle", 395),
    cycleRemainingTime: valueOr(overrides, "cycleRemainingTime", 0),
    spindleSpeed: valueOr(overrides, "spindleSpeed", 2000),
    latestSpindleSpeed: valueOr(overrides, "latestSpindleSpeed", valueOr(overrides, "spindleSpeed", 2000)),
    spindleSpeedOverride: valueOr(overrides, "spindleSpeedOverride", 100),
    machineRunTime: valueOr(overrides, "machineRunTime", 765200),
    latestMachineRunTime: valueOr(overrides, "latestMachineRunTime", valueOr(overrides, "machineRunTime", 765200)),
    activeAxes: valueOr(overrides, "activeAxes", "X_AXIS,Y_AXIS,Z_AXIS"),
    xPosition: valueOr(overrides, "xPosition", latestPoint?.x ?? -400),
    yPosition: valueOr(overrides, "yPosition", latestPoint?.y ?? -125),
    zPosition: valueOr(overrides, "zPosition", -178.624),
    latestX: valueOr(overrides, "latestX", valueOr(overrides, "xPosition", latestPoint?.x ?? -400)),
    latestY: valueOr(overrides, "latestY", valueOr(overrides, "yPosition", latestPoint?.y ?? -125)),
    latestZ: valueOr(overrides, "latestZ", valueOr(overrides, "zPosition", -178.624)),
    spindleEnabled: valueOr(overrides, "spindleEnabled", "true"),
    spindleMaxPower: valueOr(overrides, "spindleMaxPower", 7.0),
    spindleTime: valueOr(overrides, "spindleTime", 85680),
    latestSpindleTime: valueOr(overrides, "latestSpindleTime", valueOr(overrides, "spindleTime", 85680)),
    g54: valueOr(overrides, "g54", "-448.69,-43.541,0.0,0.0,0.0,0.0"),
    gcodes: valueOr(overrides, "gcodes", "G01,G17,G90,G94,G21,G43"),
    coolantStates: valueOr(overrides, "coolantStates", {
      TscEnabled: "false",
      HpcEnabled: "false",
      CoolantSpigotEnabled: "false",
      ShowerCoolantEnabled: "false",
      PulseJet: "false",
      MistEnabled: "false",
      TabEnabled: "false",
    }),
    trajectory,
    latestThisCycle: valueOr(overrides, "latestThisCycle", valueOr(overrides, "thisCycle", 390)),
    alarmTriggeredAtIndex: valueOr(overrides, "alarmTriggeredAtIndex", null),
    currentWarning: valueOr(overrides, "currentWarning", null),
    currentAlarm: valueOr(overrides, "currentAlarm", false),
    missingZInSampleWindow: valueOr(overrides, "missingZInSampleWindow", false),
  };
}

function dataItem(tag, id, name, value, timestamp = "2023-05-10T17:50:00.000Z") {
  if (value === null || value === undefined) return "";
  return `<${tag} dataItemId="${id}" timestamp="${timestamp}" name="${name}">${value}</${tag}>`;
}

function makeScenarioXml(id, data) {
  const trajectoryXml = data.trajectory
    .map((point, index) => {
      const sequence = 9000 + index * 2;
      return [
        dataItem("PathPosition", "x_axis_actual_position", "X_Axis_Actual_Position", point.x, point.timestamp).replace(">", ` sequence="${sequence}" subType="ACTUAL">`),
        dataItem("PathPosition", "y_axis_actual_position", "Y_Axis_Actual_Position", point.y, point.timestamp).replace(">", ` sequence="${sequence + 1}" subType="ACTUAL">`),
      ].join("\n");
    })
    .join("\n");

  const zXml = data.missingZInSampleWindow
    ? ""
    : dataItem("PathPosition", "z_axis_actual_position", "Z_Axis_Actual_Position", data.zPosition).replace(">", ' subType="ACTUAL">');

  return `<MTConnectStreams>
  <Header creationTime="${data.creationTime}" sender="SYNTHETIC" instanceId="${id}" version="1.2.0.1.2"/>
  <Streams>
    <DeviceStream name="${data.machineName}" uuid="${data.uuid}">
      <ComponentStream component="Device" componentId="dev1" name="${data.machineName}">
        <Events>
          ${dataItem("Availability", "avail", "Availability", data.availability)}
        </Events>
      </ComponentStream>
      <ComponentStream component="Controller" componentId="controller" name="Controller">
        <Events>
          ${dataItem("Execution", "rstat", "RunStatus", data.runStatus)}
          ${dataItem("EmergencyStop", "estop", "EmergencyStop", data.emergencyStop)}
          ${dataItem("Message", "aalarms", "ActiveAlarms", data.activeAlarms)}
        </Events>
        <Condition>
          <${data.machineCondition === "Normal" ? "Normal" : "Fault"} dataItemId="mcond" name="MachineCondition">${data.machineCondition === "Normal" ? "" : data.machineCondition}</${data.machineCondition === "Normal" ? "Normal" : "Fault"}>
        </Condition>
      </ComponentStream>
      <ComponentStream component="Path" componentId="path" name="Path">
        <Samples>
          ${dataItem("SpindleSpeed", "sspeed", "SpindleSpeed", data.spindleSpeed)}
          ${dataItem("PathFeedrate", "fdovrd", "FeedrateOverride", data.feedrateOverride)}
          ${dataItem("SpindleSpeed", "ssovrd", "SpindleSpeedOverride", data.spindleSpeedOverride)}
          ${dataItem("AccumulatedTime", "tcycle", "ThisCycle", data.thisCycle)}
          ${dataItem("AccumulatedTime", "lcycle", "LastCycle", data.lastCycle)}
        </Samples>
        <Events>
          ${dataItem("Message", "m30c1", "M30Counter1", data.m30Counter1)}
          ${dataItem("Message", "m30c2", "M30Counter2", data.m30Counter2)}
          ${dataItem("Message", "spindletime", "SpindleTime", data.spindleTime)}
          ${dataItem("Message", "machineruntime", "MachineRunTime", data.machineRunTime)}
          ${dataItem("Message", "gcodes", "Gcodes", data.gcodes)}
        </Events>
      </ComponentStream>
      <ComponentStream component="Axes" componentId="axes" name="Axes">
        <Samples>
          ${trajectoryXml}
          ${zXml}
        </Samples>
      </ComponentStream>
    </DeviceStream>
  </Streams>
</MTConnectStreams>`;
}

function makeScenario(config) {
  const data = makeScenarioData(config.data);
  return {
    ...config,
    data,
    xml: makeScenarioXml(config.id, data),
  };
}

export const testScenarios = [
  makeScenario({
    id: "ACTIVE_NORMAL",
    title: "Active Normal",
    description: "Nominal production state with spindle running and no active alarms.",
    expectedState: "active",
    expectedColor: "green",
    expectedWarnings: ["Machine state should be active/green."],
    data: {
      trajectory: ovalTrajectory(),
      spindleSpeed: 1999.7,
      thisCycle: 390,
      lastCycle: 395,
    },
  }),
  makeScenario({
    id: "IDLE_READY",
    title: "Idle Ready",
    description: "Machine is available and ready, but spindle is stopped and axes are static.",
    expectedState: "idle",
    expectedColor: "gray",
    expectedWarnings: ["No axis movement should be shown as fixed position."],
    data: {
      runStatus: "READY",
      spindleSpeed: 0,
      thisCycle: 0,
      trajectory: fixedTrajectory(-410, -120),
      xPosition: -410,
      yPosition: -120,
    },
  }),
  makeScenario({
    id: "FEED_HOLD",
    title: "Feed Hold",
    description: "Feed is held with spindle still running and no active alarm.",
    expectedState: "hold",
    expectedColor: "yellow",
    expectedWarnings: ["FeedrateOverride should be 0%.", "Machine state should be hold/yellow."],
    data: {
      runStatus: "FEED_HOLD",
      spindleSpeed: 1500,
      feedrateOverride: 0,
      thisCycle: 420,
      trajectory: fixedTrajectory(-395, -118, 6),
      xPosition: -395,
      yPosition: -118,
    },
  }),
  makeScenario({
    id: "ALARM_ACTIVE",
    title: "Alarm Active",
    description: "Servo overload style CNC alarm with stopped/interrupted execution.",
    expectedState: "alarm",
    expectedColor: "red",
    expectedWarnings: ["ActiveAlarms should drive red alarm state."],
    data: {
      runStatus: "INTERRUPTED",
      machineCondition: "Fault",
      activeAlarms: "102 SERVO OVERLOAD",
      spindleSpeed: 0,
      feedrateOverride: 0,
      thisCycle: 128,
      trajectory: fixedTrajectory(-430, -142, 3),
      xPosition: -430,
      yPosition: -142,
    },
  }),
  makeScenario({
    id: "EMERGENCY_STOP",
    title: "Emergency Stop",
    description: "Emergency stop is triggered and all motion is frozen.",
    expectedState: "fault",
    expectedColor: "red",
    expectedWarnings: ["EmergencyStop TRIGGERED should override other states."],
    data: {
      runStatus: "STOPPED",
      machineCondition: "Fault",
      activeAlarms: "EMERGENCY STOP ACTIVE",
      emergencyStop: "TRIGGERED",
      spindleSpeed: 0,
      feedrateOverride: 0,
      trajectory: fixedTrajectory(-445, -150, 3),
      xPosition: -445,
      yPosition: -150,
    },
  }),
  makeScenario({
    id: "Nan_STREAM",
    title: "Nan Stream",
    description: "MTConnect stream is Nan and no telemetry should be assumed.",
    expectedState: "Nan",
    expectedColor: "dark gray",
    expectedWarnings: ["Missing numeric values must stay null.", "Trajectory should be empty."],
    data: {
      availability: "Nan",
      runStatus: "Nan",
      machineCondition: "Nan",
      activeAlarms: "Nan",
      emergencyStop: "Nan",
      spindleSpeed: null,
      feedrateOverride: null,
      spindleSpeedOverride: null,
      thisCycle: null,
      lastCycle: null,
      m30Counter1: null,
      m30Counter2: null,
      xPosition: null,
      yPosition: null,
      zPosition: null,
      trajectory: [],
      gcodes: "Nan",
      activeAxes: "Nan",
      g54: "Nan",
    },
  }),
  makeScenario({
    id: "SLOW_CYCLE_WARNING",
    title: "Slow Cycle Warning",
    description: "Machine remains active, but the current cycle exceeds 110% of last cycle.",
    expectedState: "active",
    expectedColor: "green",
    expectedWarnings: ["Cycle status should be delayed/orange."],
    data: {
      trajectory: ovalTrajectory(-405, -126, 44, 32),
      spindleSpeed: 2001,
      thisCycle: 455,
      lastCycle: 395,
    },
  }),
  makeScenario({
    id: "MISSING_Z_SAMPLE",
    title: "Missing Z Sample",
    description: "X/Y samples exist, but Z is absent in the sample window.",
    expectedState: "active",
    expectedColor: "green",
    expectedWarnings: ["Z Position must show Nan in sample window, not 0."],
    data: {
      trajectory: ovalTrajectory(-398, -121, 36, 30),
      spindleSpeed: 1998.9,
      zPosition: null,
      missingZInSampleWindow: true,
    },
  }),
  makeScenario({
    id: "MOVING_ALARM_SERVO_OVERLOAD",
    title: "Moving Alarm - Servo Overload During Contouring",
    description:
      "Machine contours normally, enters warning on X-axis following error, then freezes at an X-axis servo overload alarm.",
    expectedState: "alarm",
    expectedColor: "red",
    expectedWarnings: [
      "Steps 1-8 should be active/green.",
      "Steps 9-10 should be warning/yellow-orange.",
      "Step 11 onward should be alarm/red with frozen X/Y position.",
    ],
    data: {
      source: "synthetic-moving-alarm",
      creationTime: "2023-05-10T17:42:30.000Z",
      mode: "MEMORY",
      program: "DieMoldMachining_setup_mm.nc",
      runStatus: "INTERRUPTED",
      machineCondition: "Fault",
      activeAlarms: "102 SERVO OVERLOAD - X AXIS",
      emergencyStop: "ARMED",
      spindleSpeed: 0,
      latestSpindleSpeed: 0,
      feedrateOverride: 0,
      spindleSpeedOverride: 100,
      thisCycle: 407,
      latestThisCycle: 407,
      lastCycle: 395,
      m30Counter1: 5536,
      m30Counter2: 5536,
      latestM30Counter1: 5536,
      latestM30Counter2: 5536,
      machineRunTime: 765125,
      latestMachineRunTime: 765125,
      spindleTime: 85670,
      latestSpindleTime: 85670,
      activeAxes: "X_AXIS,Y_AXIS,Z_AXIS",
      gcodes: ["G01", "G03", "G17", "G90", "G94", "G21", "G43"],
      xPosition: -401.2545370398237,
      yPosition: -103.28442417651289,
      zPosition: -178.62446457093424,
      latestX: -401.2545370398237,
      latestY: -103.28442417651289,
      latestZ: -178.62446457093424,
      alarmTriggeredAtIndex: 10,
      trajectory: MOVING_ALARM_SERVO_OVERLOAD_TRAJECTORY,
    },
  }),
];

export function getScenarioById(id) {
  return testScenarios.find((scenario) => scenario.id === id) ?? null;
}

export const scenarioOptions = testScenarios.map((scenario) => ({
  value: scenario.id,
  label: scenario.title,
  description: scenario.description,
}));
