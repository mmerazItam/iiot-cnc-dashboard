## Prompt 0
Model: Claude Sonnet 4.6 Adaptative
Prompt: 
"Ayudame a generar el siguiente dashboard usando javascript o python"

## Prompt 1 
Model: ChatGPT GPT-5.5 Thinking   
Prompt: 
"Analiza lo que se pide en la siguiente descripción y genera un plan de acción en distintas fases"

## Prompt 2
Model: ChatGPT GPT-5.5 Thinking  
Prompt:
"¿Qué tablas necesito para un analisis completo para la fase 1?"

## Prompt 3
Model: ChatGPT GPT-5.5 Thinking  
Prompt:
"Obten los datos relevantes para generar la Fase 1 del proyecto. Quiero las siguientes tablas: 
- 
File 

MTConnect Endpoint 

Root XML Element 

creationTime 

Device Name 

UUID 

Notes 
-
Component 

Data Item ID 

Data Item Name 

Category 

Type 

Unit 

Operational Meaning 
- 
Data Item 

Value in Trace_current.xml 

Interpretation 
-
Signal 

Observed Behavior 

Interpretation 
-

Timestamp 

X Position (mm) 

Y Position (mm) 
-
Variable 

/current at 17:38:09 

/sample around 17:40:54–17:41:10 

Change 
-
Finding 

Relevance for Dashboard 
"

## Prompt 3
Model: ChatGPT GPT-5.5 Thinking  
Prompt: 
"Genera un prompt para codex que de todas las especificaciones para generar el dashboard descrito en la fase 3 y 4 con una aplicación con React JS"

## Prompt 4
Model: Codex GPT 5.5
Prompt: 
"Actúa como un desarrollador frontend senior especializado en React JS, dashboards industriales e interfaces IIoT.

Necesito que generes una aplicación React JS completa para un dashboard de monitoreo de producción CNC basado en datos MTConnect de una máquina Haas TM-1P.

Usa React con Vite. Implementa la app con componentes funcionales, hooks como useState/useMemo/useEffect cuando sea necesario, CSS modular o un archivo App.css limpio, y sin backend. La app debe poder correr localmente con:

npm install
npm run dev

El objetivo es implementar el dashboard descrito en las Fases 3 y 4 del proyecto.

============================================================
CONTEXTO DEL PROYECTO
============================================================

Proyecto:
IIoT Dashboard Development for CNC Production Monitoring

Máquina:
Haas TM-1P

Serial number:
1131432

Datos:
Se trabaja con tres archivos XML MTConnect:
1. Trace_probe.xml
2. Trace_current.xml
3. Trace_samples.xml

Para esta app React, NO se deben cargar archivos externos. Los XML deben estar embebidos directamente como constantes string dentro del código, por ejemplo en src/data/mtconnectXml.js.

La app debe simular el comportamiento requerido del proyecto:
- Botón "Load Current Snapshot"
- Botón "Load Samples"
- Parseo de XML usando DOMParser
- Actualización de widgets
- Colores dependientes del estado
- Visualización de trayectoria X/Y en canvas
- Protocolo de pruebas visible dentro de la app o documentado en código

============================================================
ESTRUCTURA ESPERADA DEL PROYECTO
============================================================

Genera esta estructura:

iiot-cnc-dashboard/
├── package.json
├── index.html
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── data/
    │   └── mtconnectXml.js
    ├── utils/
    │   ├── xmlParsers.js
    │   ├── formatters.js
    │   └── alarmLogic.js
    └── components/
        ├── Header.jsx
        ├── ControlButtons.jsx
        ├── StatusCard.jsx
        ├── MetricCard.jsx
        ├── GaugeCard.jsx
        ├── TagList.jsx
        ├── TrajectoryCanvas.jsx
        ├── AxisPanel.jsx
        └── TestPanel.jsx

Si decides simplificar, puedes generar menos archivos, pero la solución debe seguir siendo clara, modular y fácil de leer.

============================================================
REQUISITOS FUNCIONALES PRINCIPALES
============================================================

La app debe mostrar un dashboard para monitorear:

1. Machine Status
   - RunStatus
   - MachineCondition
   - ActiveAlarms
   - EmergencyStop
   - Availability

2. Cycle Status
   - ThisCycle
   - LastCycle
   - Cycle progress bar o porcentaje comparando ThisCycle / LastCycle

3. Production
   - M30Counter1
   - Opcional: parts/hour estimate usando LastCycle si está disponible

4. Process Parameters
   - SpindleSpeed
   - FeedrateOverride
   - SpindleSpeedOverride
   - Active Gcodes

5. Axis Values
   - X Position
   - Y Position
   - Z Position
   - Si Z no aparece en samples, mostrar "UNAVAILABLE in sample window" o "Last known from current"

6. Motion / Trajectory
   - Canvas HTML5 con trayectoria X/Y
   - Dibujar línea gris con todos los puntos
   - Dibujar punto cian en la última posición
   - Mostrar ejes y etiquetas en mm
   - Mostrar mensaje si no hay datos válidos

============================================================
DATOS REALES QUE DEBEN USARSE
============================================================

Incluye estos datos dentro de las constantes XML o como fallback si quieres simplificar el XML.

Valores desde Trace_current.xml:

creationTime:
2023-05-10T17:38:09.035Z

Machine:
TM-1P

uuid:
000

Availability:
AVAILABLE

MachineCondition:
Normal

ActiveAlarms:
NO ACTIVE ALARMS

Mode:
MANUAL_DATA_INPUT

RunStatus:
ACTIVE

Program:
Place holder file.nc

LoopsRemaining:
0

M30Counter1:
5522

M30Counter2:
5522

EmergencyStop:
ARMED

RapidOverride:
100 %

FeedrateOverride:
100 %

ThisCycle:
212 s

LastCycle:
42 s

CycleRemainingTime:
0 s

SpindleSpeed:
1999.51171875 rpm

SpindleSpeedOverride:
100 %

MachineRunTime:
764930 s

Active_Axes:
X_AXIS,Y_AXIS,Z_AXIS

X_Axis_Actual_Position:
-446.754922917424 mm

Y_Axis_Actual_Position:
-106.82340040120287 mm

Z_Axis_Actual_Position:
-178.62446457093424 mm

SpindleEnabled:
true

SpindleMaxPower:
7.0

SpindleTime:
85476 s

G54:
-448.69,-43.541,0.0,0.0,0.0,0.0

Gcodes:
G03,G17,G90,G94,G21,G40,G43,G80,G98,G50,G59,G269,G64,G69,G170,G255

Coolant states:
TscEnabled = false
HpcEnabled = false
CoolantSpigotEnabled = false
ShowerCoolantEnabled = false
PulseJet = false
MistEnabled = false
TabEnabled = false

Valores desde Trace_samples.xml:

creationTime:
2023-05-10T17:41:46.625Z

Sample time window:
2023-05-10T17:40:54.240Z to 2023-05-10T17:41:10.246Z approximately

SpindleSpeed range:
1999.365234375 to 1999.8046875 rpm

ThisCycle range:
379 to 394 s

M30Counter1:
5536

M30Counter2:
5536

MachineRunTime:
765097 to 765112 s approximately

SpindleTime:
85643 to 85658 s approximately

Active Gcodes in sample:
G01, G03, G17, G90, G94, G21, G43

X positions in mm:
[
  -404.4854174874717,
  -435.2871183230719,
  -450.7776610008905,
  -443.5137453018194,
  -417.1216316119471,
  -384.3609571853078,
  -358.42467635119795,
  -351.8926944952184,
  -367.35880861432776,
  -399.1085442045309,
  -401.2545370398237,
  -399.19756201879005,
  -396.10741504422543,
  -420.0475502060887,
  -445.097922192882,
  -450.61953104237574
]

Y positions in mm:
[
  -77.65658375378014,
  -90.92195330019393,
  -120.66684320433791,
  -154.27405999653655,
  -174.96636805098746,
  -174.61041604946604,
  -153.34954384790066,
  -119.5924287326652,
  -90.79527635938997,
  -77.59816195478504,
  -103.28442417651289,
  -123.58874856278914,
  -90.1946421133429,
  -81.21831932489378,
  -103.51617119143029,
  -119.611996479481
]

Corresponding timestamps:
[
  "2023-05-10T17:40:54.240Z",
  "2023-05-10T17:40:55.240Z",
  "2023-05-10T17:40:56.241Z",
  "2023-05-10T17:40:57.245Z",
  "2023-05-10T17:40:58.245Z",
  "2023-05-10T17:40:59.245Z",
  "2023-05-10T17:41:00.245Z",
  "2023-05-10T17:41:01.246Z",
  "2023-05-10T17:41:02.246Z",
  "2023-05-10T17:41:03.246Z",
  "2023-05-10T17:41:04.247Z",
  "2023-05-10T17:41:05.246Z",
  "2023-05-10T17:41:06.246Z",
  "2023-05-10T17:41:07.247Z",
  "2023-05-10T17:41:08.246Z",
  "2023-05-10T17:41:09.246Z"
]

============================================================
PARSER XML
============================================================

Implementa funciones de parseo en xmlParsers.js.

Debe existir una función:

parseCurrentXml(xmlString)

Debe regresar un objeto con esta forma aproximada:

{
  source: "current",
  creationTime,
  machineName,
  uuid,
  availability,
  machineCondition,
  activeAlarms,
  mode,
  runStatus,
  program,
  loopsRemaining,
  m30Counter1,
  m30Counter2,
  emergencyStop,
  rapidOverride,
  feedrateOverride,
  thisCycle,
  lastCycle,
  cycleRemainingTime,
  spindleSpeed,
  spindleSpeedOverride,
  machineRunTime,
  activeAxes,
  xPosition,
  yPosition,
  zPosition,
  spindleEnabled,
  spindleMaxPower,
  spindleTime,
  g54,
  gcodes,
  coolantStates
}

Debe existir una función:

parseSamplesXml(xmlString)

Debe regresar un objeto con esta forma aproximada:

{
  source: "samples",
  creationTime,
  machineName,
  uuid,
  latestSpindleSpeed,
  spindleSpeedSeries,
  thisCycleSeries,
  latestThisCycle,
  latestM30Counter1,
  latestM30Counter2,
  latestMachineRunTime,
  latestSpindleTime,
  latestGcodes,
  trajectory,
  latestX,
  latestY,
  latestZ
}

La propiedad trajectory debe ser un arreglo de objetos:

[
  { timestamp: "...", x: -404.485, y: -77.656 },
  ...
]

Usa DOMParser y querySelectorAll por dataItemId:

doc.querySelectorAll('[dataItemId="sspeed"]')
doc.querySelectorAll('[dataItemId="tcycle"]')
doc.querySelectorAll('[dataItemId="m30c1"]')
doc.querySelectorAll('[dataItemId="x_axis_actual_position"]')
doc.querySelectorAll('[dataItemId="y_axis_actual_position"]')
doc.querySelectorAll('[dataItemId="z_axis_actual_position"]')
doc.querySelectorAll('[dataItemId="gcodes"]')

Incluye helpers:
- getTextByDataItemId(doc, id)
- getLatestTextByDataItemId(doc, id)
- getSeriesByDataItemId(doc, id)
- toNumber(value)
- safeValue(value, fallback = "UNAVAILABLE")

Si un valor no existe, no debe romper la app. Debe regresar null o "UNAVAILABLE".

============================================================
LÓGICA DE ALARMAS Y COLORES
============================================================

Implementa un archivo alarmLogic.js con funciones:

getMachineState(data)
getStatusColor(status)
getCycleStatus(thisCycle, lastCycle)
getSpindleStatus(spindleSpeed, runStatus)
getAvailabilityStatus(availability)

Reglas:

1. Si Availability = UNAVAILABLE:
   - Estado general: unavailable
   - Color: dark gray

2. Si EmergencyStop = TRIGGERED:
   - Estado general: fault
   - Color: red

3. Si ActiveAlarms es distinto de "NO ACTIVE ALARMS":
   - Estado general: alarm
   - Color: red

4. Si MachineCondition no es "Normal":
   - Estado general: warning o fault
   - Color: orange/red

5. Si RunStatus = ACTIVE y SpindleSpeed > 0:
   - Estado general: active
   - Color: green

6. Si RunStatus = FEED_HOLD:
   - Estado general: hold
   - Color: yellow

7. Si SpindleSpeed = 0 y no hay alarmas:
   - Estado general: idle
   - Color: gray

8. Si ThisCycle > LastCycle * 1.1:
   - Ciclo atrasado
   - Color: yellow/orange

9. Si un dato falta:
   - Mostrar "UNAVAILABLE"
   - Color: dark gray

============================================================
DISEÑO VISUAL
============================================================

Implementa un diseño moderno, oscuro, industrial y limpio.

Requisitos visuales:

- Fondo general: tono oscuro.
- Tarjetas con bordes suaves y sombras ligeras.
- Tipografía clara.
- Números grandes para los indicadores principales.
- Unidades siempre visibles: rpm, mm, s, %, parts.
- Badges de estado con colores.
- Layout responsive.
- Debe verse bien en desktop y aceptable en mobile.

Jerarquía del dashboard:

HEADER:
- Título: "Haas TM-1P Production Dashboard"
- Subtítulo: "Machine: TM-1P | SN: 1131432 | MTConnect IIoT Monitoring"
- Última fuente cargada: current o samples
- creationTime del XML cargado

TOP GRID:
1. Machine Status
   - RunStatus
   - MachineCondition
   - ActiveAlarms
   - EmergencyStop
   - Availability

2. Cycle Status
   - ThisCycle
   - LastCycle
   - Cycle progress
   - Cycle status label

3. Production
   - M30Counter1
   - M30Counter2
   - Estimated parts/hour

MIDDLE GRID:
4. Process Parameters
   - SpindleSpeed gauge or numeric card
   - FeedrateOverride
   - SpindleSpeedOverride
   - Gcodes as colored tags

BOTTOM GRID:
5. Trajectory Canvas
   - 400x300 or responsive canvas
   - X/Y path
   - Latest point

6. Axis Values
   - X Position
   - Y Position
   - Z Position
   - If Z missing in samples, show "UNAVAILABLE in sample window"
   - If current value exists, show "Last known from current"

DETAIL SECTION:
- MachineRunTime
- SpindleTime
- G54 offset
- Program
- Coolant states

BUTTONS:
- Load Current Snapshot
- Load Samples
- Optional: Reset Dashboard
- Optional: Replay Trajectory

============================================================
TRAJECTORY CANVAS
============================================================

Implementa TrajectoryCanvas.jsx.

Props:
- trajectory
- width
- height

Requirements:
- Use useRef and useEffect.
- Clear canvas before drawing.
- Use X range approximately -500 to -300 mm.
- Use Y range approximately -200 to -50 mm.
- Add 10 or 20 px margin.
- Draw axes or bounding box.
- Draw historical path with light gray stroke.
- Draw small points for samples.
- Draw latest point in cyan.
- Add labels:
  - X Position (mm)
  - Y Position (mm)
  - Start
  - Latest
- Invert Y mapping correctly so that larger Y values appear higher visually if appropriate.
- If trajectory is empty, draw "No trajectory data available".

Optional:
- Add animated replay with a button.
- Add hover tooltip only if simple.

============================================================
TEST PANEL
============================================================

Crea un componente TestPanel.jsx que muestre el protocolo de pruebas como una tabla.

Debe incluir estos tests:

T-01:
Description: Load current — SpindleTime
Input: Click Load Current Snapshot
Expected Result: SpindleTime widget shows 85476 s
Actual Result: Calculated dynamically from parsed state
Pass/Fail: Pass if value matches 85476

T-02:
Description: Load samples — spindle speed
Input: Click Load Samples
Expected Result: SpindleSpeed shows approximately 2000 rpm
Actual Result: latestSpindleSpeed
Pass/Fail: Pass if between 1999 and 2001

T-03:
Description: Load samples — last X position
Input: Click Load Samples
Expected Result: X position shows approximately -450.6 mm
Actual Result: latestX
Pass/Fail: Pass if rounded value matches -450.6

T-04:
Description: Load samples — part counter
Input: Click Load Samples
Expected Result: M30Counter1 shows 5536
Actual Result: latestM30Counter1
Pass/Fail: Pass if 5536

T-05:
Description: Trajectory plot
Input: Click Load Samples
Expected Result: 16 X/Y points plotted as a curved loop
Actual Result: trajectory.length
Pass/Fail: Pass if trajectory.length === 16

T-06:
Description: Units on all widgets
Input: Both buttons
Expected Result: rpm, mm, s, % visible
Actual Result: Manual visual verification or simple checklist
Pass/Fail: Show "Manual"

T-07:
Description: State color
Input: Either load
Expected Result: Status widget renders with correct color
Actual Result: getMachineState result
Pass/Fail: Pass if ACTIVE + spindle > 0 maps to green/active

T-08:
Description: Missing Z sample handling
Input: Click Load Samples
Expected Result: Z position shows UNAVAILABLE in sample window
Actual Result: latestZ
Pass/Fail: Pass if latestZ is null or unavailable

T-09:
Description: XML parse error handling
Input: Invalid XML string
Expected Result: App does not crash and shows error message
Actual Result: Simulated parser result
Pass/Fail: Pass if parser catches error

The TestPanel can compute pass/fail based on current loaded data. If a test requires a specific source, show "Load Samples required" or "Load Current required".

============================================================
CODE QUALITY REQUIREMENTS
============================================================

- Use clean component structure.
- Include inline comments explaining:
  - XML parsing logic
  - dataItemId selectors
  - dashboard update logic
  - alarm logic
  - trajectory scaling from machine mm to canvas pixels
- At least 20% of relevant code lines should be explanatory comments, because the original project requires code documentation.
- Avoid overengineering.
- Do not use backend.
- Do not use external charting libraries unless absolutely necessary.
- Canvas must be implemented manually.
- Do not assume missing values are zero.
- Always show units.
- Use robust parsing.
- Use accessible labels where reasonable.
- Keep UI text in English, because the original dashboard deliverable uses English labels.

============================================================
README REQUIREMENTS
============================================================

Generate README.md with:

1. Project title
2. Description
3. Machine and data source
4. How to install
5. How to run
6. How to use:
   - Click Load Current Snapshot
   - Click Load Samples
   - Interpret status colors
   - Interpret trajectory plot
7. Implementation notes
8. Testing notes
9. Known limitations:
   - Data is embedded, not live
   - No server polling
   - Z may be unavailable in samples
   - AddressCodes are not parsed into individual widgets

============================================================
EXPECTED OUTPUT
============================================================

Generate the complete code for the React project.

Return:
1. File tree
2. Full contents of each file
3. Explanation of how to run it
4. Notes on where to paste the full XML strings if the generated example uses shortened XML

Important:
The app must work even if the XML constants only contain the relevant snippets needed for the dashboard. However, structure the parser so it would also work with the full original MTConnect XML files pasted into the constants.

Build a polished, functional dashboard that satisfies the Phase 3 dashboard specification and Phase 4 implementation/testing requirements."

## Prompt 5
Modelo: Codex
Prompt: 
"Actúa como desarrollador frontend senior especializado en React JS, testing de dashboards industriales e integración de datos MTConnect.

Estoy trabajando en una aplicación React JS para un dashboard IIoT de una máquina CNC Haas TM-1P. La app ya parsea XML MTConnect usando DOMParser y actualiza widgets como:

- RunStatus
- MachineCondition
- ActiveAlarms
- EmergencyStop
- Availability
- SpindleSpeed
- FeedrateOverride
- SpindleSpeedOverride
- ThisCycle
- LastCycle
- M30Counter1
- M30Counter2
- X/Y/Z Position
- Gcodes
- Trajectory Canvas

Necesito que generes datos sample sintéticos para probar diferentes estados del dashboard. Estos datos pertenecen a una fase de validación/testing del proyecto.

Objetivo:
Crear un archivo llamado:

src/data/testScenarios.js

que exporte varios escenarios de prueba como objetos JavaScript y, si es útil, también como XML strings MTConnect simplificados.

Cada escenario debe representar un estado diferente de la máquina y debe servir para probar la lógica de colores, alarmas, widgets y manejo de datos faltantes.

Genera al menos estos escenarios:

1. ACTIVE_NORMAL
   - Availability = AVAILABLE
   - RunStatus = ACTIVE
   - MachineCondition = Normal
   - ActiveAlarms = NO ACTIVE ALARMS
   - EmergencyStop = ARMED
   - SpindleSpeed ≈ 2000 rpm
   - FeedrateOverride = 100 %
   - SpindleSpeedOverride = 100 %
   - ThisCycle = 390 s
   - LastCycle = 395 s
   - M30Counter1 = 5536
   - M30Counter2 = 5536
   - X/Y trajectory with 16 points forming a smooth oval or contour
   - Expected dashboard state: green / active

2. IDLE_READY
   - Availability = AVAILABLE
   - RunStatus = READY
   - MachineCondition = Normal
   - ActiveAlarms = NO ACTIVE ALARMS
   - EmergencyStop = ARMED
   - SpindleSpeed = 0 rpm
   - FeedrateOverride = 100 %
   - ThisCycle = 0 s
   - LastCycle = 395 s
   - M30Counter1 = 5536
   - No axis movement
   - Expected dashboard state: gray / idle

3. FEED_HOLD
   - Availability = AVAILABLE
   - RunStatus = FEED_HOLD
   - MachineCondition = Normal or Warning
   - ActiveAlarms = NO ACTIVE ALARMS
   - EmergencyStop = ARMED
   - SpindleSpeed ≈ 2000 rpm or reduced
   - FeedrateOverride = 0 %
   - ThisCycle = 420 s
   - LastCycle = 395 s
   - X/Y positions fixed or minimally changing
   - Expected dashboard state: yellow / hold

4. ALARM_ACTIVE
   - Availability = AVAILABLE
   - RunStatus = STOPPED or INTERRUPTED
   - MachineCondition = Fault
   - ActiveAlarms = "102 SERVO OVERLOAD" or another CNC-style alarm
   - EmergencyStop = ARMED
   - SpindleSpeed = 0 rpm
   - FeedrateOverride = 0 %
   - ThisCycle = 128 s
   - LastCycle = 395 s
   - Expected dashboard state: red / alarm

5. EMERGENCY_STOP
   - Availability = AVAILABLE
   - RunStatus = STOPPED
   - MachineCondition = Fault
   - ActiveAlarms = "EMERGENCY STOP ACTIVE"
   - EmergencyStop = TRIGGERED
   - SpindleSpeed = 0 rpm
   - FeedrateOverride = 0 %
   - Axis positions frozen
   - Expected dashboard state: red / emergency stop

6. UNAVAILABLE_STREAM
   - Availability = UNAVAILABLE
   - RunStatus = UNAVAILABLE
   - MachineCondition = UNAVAILABLE
   - ActiveAlarms = UNAVAILABLE
   - EmergencyStop = UNAVAILABLE
   - SpindleSpeed = null
   - No trajectory
   - Expected dashboard state: dark gray / unavailable

7. SLOW_CYCLE_WARNING
   - Availability = AVAILABLE
   - RunStatus = ACTIVE
   - MachineCondition = Normal
   - ActiveAlarms = NO ACTIVE ALARMS
   - EmergencyStop = ARMED
   - SpindleSpeed ≈ 2000 rpm
   - ThisCycle = 455 s
   - LastCycle = 395 s
   - ThisCycle > LastCycle * 1.1
   - Expected dashboard state: active but cycle warning orange/yellow

8. MISSING_Z_SAMPLE
   - Availability = AVAILABLE
   - RunStatus = ACTIVE
   - MachineCondition = Normal
   - ActiveAlarms = NO ACTIVE ALARMS
   - SpindleSpeed ≈ 2000 rpm
   - Include X/Y samples
   - Do not include Z sample
   - Expected behavior: Z Position displays "UNAVAILABLE in sample window", not 0

For each scenario, include:

- id
- title
- description
- expectedState
- expectedColor
- expectedWarnings
- data object ready to feed the dashboard state directly
- optional xml string that mimics MTConnectStreams with relevant dataItemId attributes

Use dataItemId names compatible with my parser:
- avail
- mcond
- aalarms
- rstat
- estop
- fdovrd
- ssovrd
- sspeed
- tcycle
- lcycle
- m30c1
- m30c2
- x_axis_actual_position
- y_axis_actual_position
- z_axis_actual_position
- gcodes
- spindletime
- machineruntime

Also create a helper function:

export function getScenarioById(id)

Also create:

export const scenarioOptions = testScenarios.map(...)

Also create an optional component:

ScenarioSelector.jsx

Requirements for ScenarioSelector:
- Dropdown with scenario names
- Button "Load Test Scenario"
- Calls onLoadScenario(selectedScenario)
- Works with the dashboard state object

Update TestPanel.jsx if needed to include a section called "Synthetic Scenario Tests" that lists:
- Scenario name
- Expected state
- Expected color
- Critical expected behavior
- Pass/Fail based on alarmLogic result

Do not break the existing Load Current Snapshot and Load Samples buttons. Synthetic scenarios should be additional test inputs, not replacements.

Generate complete code for:
1. src/data/testScenarios.js
2. src/components/ScenarioSelector.jsx
3. Any minimal changes needed in App.jsx
4. Any minimal changes needed in TestPanel.jsx
5. Any minimal CSS needed

Important:
- Missing numeric values should be null, not 0.
- Missing string values should be "UNAVAILABLE".
- Do not assume missing Z is 0.
- Keep all units visible in the dashboard.
- Keep the UI text in English."

## Prompt 6
Model: Codex GPT 5.5
Prompt:
"Actúa como desarrollador frontend senior especializado en React JS, HTML5 Canvas y visualización de trayectorias CNC.

Estoy trabajando en una aplicación React JS para un dashboard IIoT de una máquina CNC Haas TM-1P. La app ya tiene:

- Parser de XML MTConnect
- Dashboard con widgets de estado
- SpindleSpeed
- ThisCycle
- M30Counter
- X/Y/Z positions
- Gcodes
- TrajectoryCanvas
- Botón Load Samples

Necesito agregar una función para visualizar el avance paso a paso de la máquina sobre la trayectoria X/Y. Esta función pertenece a la fase de testing/validación del dashboard.

Objetivo:
Agregar una simulación tipo "replay" para ver cómo avanza la herramienta CNC punto por punto en el canvas.

La app ya cuenta con una trayectoria real de 16 puntos:

trajectory = [
  { timestamp: "2023-05-10T17:40:54.240Z", x: -404.4854174874717, y: -77.65658375378014 },
  { timestamp: "2023-05-10T17:40:55.240Z", x: -435.2871183230719, y: -90.92195330019393 },
  { timestamp: "2023-05-10T17:40:56.241Z", x: -450.7776610008905, y: -120.66684320433791 },
  { timestamp: "2023-05-10T17:40:57.245Z", x: -443.5137453018194, y: -154.27405999653655 },
  { timestamp: "2023-05-10T17:40:58.245Z", x: -417.1216316119471, y: -174.96636805098746 },
  { timestamp: "2023-05-10T17:40:59.245Z", x: -384.3609571853078, y: -174.61041604946604 },
  { timestamp: "2023-05-10T17:41:00.245Z", x: -358.42467635119795, y: -153.34954384790066 },
  { timestamp: "2023-05-10T17:41:01.246Z", x: -351.8926944952184, y: -119.5924287326652 },
  { timestamp: "2023-05-10T17:41:02.246Z", x: -367.35880861432776, y: -90.79527635938997 },
  { timestamp: "2023-05-10T17:41:03.246Z", x: -399.1085442045309, y: -77.59816195478504 },
  { timestamp: "2023-05-10T17:41:04.247Z", x: -401.2545370398237, y: -103.28442417651289 },
  { timestamp: "2023-05-10T17:41:05.246Z", x: -399.19756201879005, y: -123.58874856278914 },
  { timestamp: "2023-05-10T17:41:06.246Z", x: -396.10741504422543, y: -90.1946421133429 },
  { timestamp: "2023-05-10T17:41:07.247Z", x: -420.0475502060887, y: -81.21831932489378 },
  { timestamp: "2023-05-10T17:41:08.246Z", x: -445.097922192882, y: -103.51617119143029 },
  { timestamp: "2023-05-10T17:41:09.246Z", x: -450.61953104237574, y: -119.611996479481 }
]

Requirements:

1. Create or update a component:
   src/components/TrajectoryReplay.jsx

2. The component should receive:
   - trajectory
   - onStepChange(optional)
   - speedMs default 700

3. The component must include controls:
   - Play
   - Pause
   - Reset
   - Step Forward
   - Step Backward
   - Speed selector: 250 ms, 500 ms, 700 ms, 1000 ms

4. It must display:
   - Current step number, e.g. "Step 5 / 16"
   - Current timestamp
   - Current X position in mm
   - Current Y position in mm
   - Optional current G-code if available
   - A small progress bar

5. Update TrajectoryCanvas.jsx so it can receive:
   - trajectory
   - currentIndex
   - showFullPath = true

Canvas behavior:
- Draw the full historical trajectory in light gray if showFullPath is true
- Draw the completed path up to currentIndex in stronger stroke
- Draw small points for all samples
- Draw current tool position as a cyan dot
- Draw start point and final point with labels
- Draw axis labels in mm
- If no trajectory is available, show "No trajectory data available"

6. The replay must not mutate the original trajectory array.

7. Use useState, useEffect, useRef or useMemo as needed.

8. Clean up intervals correctly in useEffect to avoid memory leaks.

9. Integrate into App.jsx:
   - When Load Samples is clicked, load the trajectory and set currentIndex to the last point or 0 depending on design.
   - Add a "Replay Motion" section below or beside the trajectory canvas.
   - TrajectoryReplay controls should update the currentIndex used by TrajectoryCanvas.
   - Axis values panel should optionally show the current replay point instead of always showing the latest point while replay is active.

10. Add a "Simulated Motion Test" section to TestPanel.jsx:
   - T-10: Replay starts at step 1
   - T-11: Step Forward increments currentIndex
   - T-12: Step Backward decrements currentIndex
   - T-13: Reset returns to index 0
   - T-14: Play reaches final point without exceeding array bounds

11. Add comments explaining:
   - how the replay index works
   - how the interval is cleaned up
   - how mm coordinates are mapped to canvas pixels
   - how the current point is highlighted

12. Keep UI text in English.

13. Do not use animation libraries. Use React state and setInterval.

14. Do not add backend code.

15. Do not break existing parser, dashboard widgets, or Load Current / Load Samples buttons.

Output:
Generate complete code changes for:
- TrajectoryReplay.jsx
- TrajectoryCanvas.jsx
- App.jsx integration
- TestPanel.jsx additions
- CSS additions

Also explain briefly how to test the replay:
1. Click Load Samples
2. Click Reset
3. Click Play
4. Observe the cyan dot advancing point by point
5. Use Step Forward and Step Backward"