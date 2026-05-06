// These XML strings intentionally keep the MTConnect shape and the real
// dataItemId values. That makes the demo small, while still allowing full
// Trace_current.xml or Trace_samples.xml content to be pasted here later.

export const TRACE_CURRENT_XML = `<?xml version="1.0" encoding="UTF-8"?>
<MTConnectStreams>
  <Header creationTime="2023-05-10T17:38:09.035Z" sender="NGC" instanceId="1683737829" version="1.2.0.1.2" bufferSize="333" firstSequence="3745" lastSequence="4077" nextSequence="4078"/>
  <Streams>
    <DeviceStream name="TM-1P" uuid="000">
      <ComponentStream component="Device" componentId="dev1" name="TM-1P" uuid="000">
        <Events>
          <Availability dataItemId="avail" timestamp="2023-05-10T16:57:13.138Z" sequence="1" name="Availability">AVAILABLE</Availability>
        </Events>
      </ComponentStream>
      <ComponentStream component="Controller" componentId="controller" name="Controller">
        <Events>
          <ControllerMode dataItemId="mode" timestamp="2023-05-10T17:34:33.991Z" sequence="2669" name="Mode">MANUAL_DATA_INPUT</ControllerMode>
          <Execution dataItemId="rstat" timestamp="2023-05-10T17:34:35.997Z" sequence="2682" name="RunStatus">ACTIVE</Execution>
          <EmergencyStop dataItemId="estop" timestamp="2023-05-10T17:08:12.402Z" sequence="1062" name="EmergencyStop">ARMED</EmergencyStop>
          <Message dataItemId="aalarms" timestamp="2023-05-10T17:08:12.402Z" sequence="1060" name="ActiveAlarms">NO ACTIVE ALARMS</Message>
          <Message dataItemId="lpremain" timestamp="2023-05-10T16:57:15.216Z" sequence="125" name="LoopsRemaining">0</Message>
          <Message dataItemId="m30c1" timestamp="2023-05-10T17:38:03.188Z" sequence="4031" name="M30Counter1">5522</Message>
          <Message dataItemId="m30c2" timestamp="2023-05-10T17:38:03.188Z" sequence="4032" name="M30Counter2">5522</Message>
          <Program dataItemId="ncprog" timestamp="2023-05-10T16:57:15.252Z" sequence="196" name="Program">Place holder file.nc</Program>
        </Events>
        <Condition>
          <Normal dataItemId="mcond" timestamp="2023-05-10T17:08:12.401Z" sequence="1059" type="SYSTEM" name="MachineCondition"/>
        </Condition>
      </ComponentStream>
      <ComponentStream component="Path" componentId="path" name="Path">
        <Samples>
          <AccumulatedTime dataItemId="lcycle" timestamp="2023-05-10T16:57:15.266Z" sequence="233" name="LastCycle">42</AccumulatedTime>
          <AccumulatedTime dataItemId="tcycle" timestamp="2023-05-10T17:38:08.188Z" sequence="4072" name="ThisCycle">212</AccumulatedTime>
          <AccumulatedTime dataItemId="cyremtim" timestamp="2023-05-10T17:35:16.996Z" sequence="2961" name="CycleRemainingTime">0</AccumulatedTime>
          <AxisFeedrate dataItemId="rovrd" timestamp="2023-05-10T16:57:15.204Z" sequence="77" name="RapidOverride" subType="OVERRIDE">100</AxisFeedrate>
          <PathFeedrate dataItemId="fdovrd" timestamp="2023-05-10T16:57:15.209Z" sequence="97" name="FeedrateOverride" subType="OVERRIDE">100</PathFeedrate>
          <SpindleSpeed dataItemId="ssovrd" timestamp="2023-05-10T16:57:15.211Z" sequence="105" name="SpindleSpeedOverride" subType="OVERRIDE">100</SpindleSpeed>
          <SpindleSpeed dataItemId="sspeed" timestamp="2023-05-10T17:38:08.189Z" sequence="4074" name="SpindleSpeed" subType="ACTUAL">1999.51171875</SpindleSpeed>
        </Samples>
        <Events>
          <ActiveAxes dataItemId="xyzabc" timestamp="2023-05-10T16:57:15.184Z" sequence="23" name="Active_Axes">X_AXIS,Y_AXIS,Z_AXIS</ActiveAxes>
          <Message dataItemId="machineruntime" timestamp="2023-05-10T17:38:08.189Z" sequence="4075" name="MachineRunTime">764930</Message>
          <Message dataItemId="spindletime" timestamp="2023-05-10T17:38:08.188Z" sequence="4073" name="SpindleTime">85476</Message>
          <Message dataItemId="gcodes" timestamp="2023-05-10T17:38:05.188Z" sequence="4058" name="Gcodes">G03,G17,G90,G94,G21,G40,G43,G80,G98,G50,G59,G269,G64,G69,G170,G255</Message>
        </Events>
      </ComponentStream>
      <ComponentStream component="Axes" componentId="axes" name="Axes">
        <Samples>
          <PathPosition dataItemId="x_axis_actual_position" timestamp="2023-05-10T17:38:08.189Z" sequence="4076" name="X_Axis_Actual_Position" subType="ACTUAL">-446.754922917424</PathPosition>
          <PathPosition dataItemId="y_axis_actual_position" timestamp="2023-05-10T17:38:08.189Z" sequence="4077" name="Y_Axis_Actual_Position" subType="ACTUAL">-106.82340040120287</PathPosition>
          <PathPosition dataItemId="z_axis_actual_position" timestamp="2023-05-10T17:34:51.994Z" sequence="2772" name="Z_Axis_Actual_Position" subType="ACTUAL">-178.62446457093424</PathPosition>
        </Samples>
      </ComponentStream>
      <ComponentStream component="Spindle" componentId="spindle" name="MainSpindle">
        <Events>
          <Message dataItemId="sp1enabled" timestamp="2023-05-10T16:57:15.202Z" sequence="70" name="SpindleEnabled">true</Message>
          <Message dataItemId="sp1maxpwr" timestamp="2023-05-10T16:57:15.241Z" sequence="170" name="SpindleMaxPower">7.0</Message>
        </Events>
      </ComponentStream>
      <ComponentStream component="WorkOffsets" componentId="workoffsets" name="WorkOffsets">
        <Events>
          <WorkOffset dataItemId="g54" timestamp="2023-05-10T16:57:15.215Z" sequence="117" name="G54">-448.69,-43.541,0.0,0.0,0.0,0.0</WorkOffset>
        </Events>
      </ComponentStream>
      <ComponentStream component="Coolant" componentId="coolant" name="Coolant">
        <Events>
          <Message dataItemId="tsc" name="TscEnabled">false</Message>
          <Message dataItemId="hpc" name="HpcEnabled">false</Message>
          <Message dataItemId="clntspigot" name="CoolantSpigotEnabled">false</Message>
          <Message dataItemId="showerclnt" name="ShowerCoolantEnabled">false</Message>
          <Message dataItemId="pulsejet" name="PulseJet">false</Message>
          <Message dataItemId="mist" name="MistEnabled">false</Message>
          <Message dataItemId="tab" name="TabEnabled">false</Message>
        </Events>
      </ComponentStream>
    </DeviceStream>
  </Streams>
</MTConnectStreams>`;

export const TRACE_SAMPLES_XML = `<?xml version="1.0" encoding="UTF-8"?>
<MTConnectStreams>
  <Header creationTime="2023-05-10T17:41:46.625Z" sender="NGC" instanceId="1683737829" version="1.2.0.1.2" bufferSize="333" firstSequence="5160" lastSequence="5259" nextSequence="5260"/>
  <Streams>
    <DeviceStream name="TM-1P" uuid="000">
      <ComponentStream component="Axes" componentId="axes" name="Axes">
        <Samples>
          <PathPosition dataItemId="x_axis_actual_position" timestamp="2023-05-10T17:40:54.240Z" sequence="5160" name="X_Axis_Actual_Position" subType="ACTUAL">-404.4854174874717</PathPosition>
          <PathPosition dataItemId="x_axis_actual_position" timestamp="2023-05-10T17:40:55.240Z" sequence="5166" name="X_Axis_Actual_Position" subType="ACTUAL">-435.2871183230719</PathPosition>
          <PathPosition dataItemId="x_axis_actual_position" timestamp="2023-05-10T17:40:56.241Z" sequence="5172" name="X_Axis_Actual_Position" subType="ACTUAL">-450.7776610008905</PathPosition>
          <PathPosition dataItemId="x_axis_actual_position" timestamp="2023-05-10T17:40:57.245Z" sequence="5177" name="X_Axis_Actual_Position" subType="ACTUAL">-443.5137453018194</PathPosition>
          <PathPosition dataItemId="x_axis_actual_position" timestamp="2023-05-10T17:40:58.245Z" sequence="5182" name="X_Axis_Actual_Position" subType="ACTUAL">-417.1216316119471</PathPosition>
          <PathPosition dataItemId="x_axis_actual_position" timestamp="2023-05-10T17:40:59.245Z" sequence="5189" name="X_Axis_Actual_Position" subType="ACTUAL">-384.3609571853078</PathPosition>
          <PathPosition dataItemId="x_axis_actual_position" timestamp="2023-05-10T17:41:00.245Z" sequence="5195" name="X_Axis_Actual_Position" subType="ACTUAL">-358.42467635119795</PathPosition>
          <PathPosition dataItemId="x_axis_actual_position" timestamp="2023-05-10T17:41:01.246Z" sequence="5201" name="X_Axis_Actual_Position" subType="ACTUAL">-351.8926944952184</PathPosition>
          <PathPosition dataItemId="x_axis_actual_position" timestamp="2023-05-10T17:41:02.246Z" sequence="5207" name="X_Axis_Actual_Position" subType="ACTUAL">-367.35880861432776</PathPosition>
          <PathPosition dataItemId="x_axis_actual_position" timestamp="2023-05-10T17:41:03.246Z" sequence="5213" name="X_Axis_Actual_Position" subType="ACTUAL">-399.1085442045309</PathPosition>
          <PathPosition dataItemId="x_axis_actual_position" timestamp="2023-05-10T17:41:04.247Z" sequence="5223" name="X_Axis_Actual_Position" subType="ACTUAL">-401.2545370398237</PathPosition>
          <PathPosition dataItemId="x_axis_actual_position" timestamp="2023-05-10T17:41:05.246Z" sequence="5232" name="X_Axis_Actual_Position" subType="ACTUAL">-399.19756201879005</PathPosition>
          <PathPosition dataItemId="x_axis_actual_position" timestamp="2023-05-10T17:41:06.246Z" sequence="5238" name="X_Axis_Actual_Position" subType="ACTUAL">-396.10741504422543</PathPosition>
          <PathPosition dataItemId="x_axis_actual_position" timestamp="2023-05-10T17:41:07.247Z" sequence="5245" name="X_Axis_Actual_Position" subType="ACTUAL">-420.0475502060887</PathPosition>
          <PathPosition dataItemId="x_axis_actual_position" timestamp="2023-05-10T17:41:08.246Z" sequence="5251" name="X_Axis_Actual_Position" subType="ACTUAL">-445.097922192882</PathPosition>
          <PathPosition dataItemId="x_axis_actual_position" timestamp="2023-05-10T17:41:09.246Z" sequence="5255" name="X_Axis_Actual_Position" subType="ACTUAL">-450.61953104237574</PathPosition>
          <PathPosition dataItemId="y_axis_actual_position" timestamp="2023-05-10T17:40:54.240Z" sequence="5161" name="Y_Axis_Actual_Position" subType="ACTUAL">-77.65658375378014</PathPosition>
          <PathPosition dataItemId="y_axis_actual_position" timestamp="2023-05-10T17:40:55.240Z" sequence="5167" name="Y_Axis_Actual_Position" subType="ACTUAL">-90.92195330019393</PathPosition>
          <PathPosition dataItemId="y_axis_actual_position" timestamp="2023-05-10T17:40:56.241Z" sequence="5173" name="Y_Axis_Actual_Position" subType="ACTUAL">-120.66684320433791</PathPosition>
          <PathPosition dataItemId="y_axis_actual_position" timestamp="2023-05-10T17:40:57.245Z" sequence="5178" name="Y_Axis_Actual_Position" subType="ACTUAL">-154.27405999653655</PathPosition>
          <PathPosition dataItemId="y_axis_actual_position" timestamp="2023-05-10T17:40:58.245Z" sequence="5183" name="Y_Axis_Actual_Position" subType="ACTUAL">-174.96636805098746</PathPosition>
          <PathPosition dataItemId="y_axis_actual_position" timestamp="2023-05-10T17:40:59.245Z" sequence="5190" name="Y_Axis_Actual_Position" subType="ACTUAL">-174.61041604946604</PathPosition>
          <PathPosition dataItemId="y_axis_actual_position" timestamp="2023-05-10T17:41:00.246Z" sequence="5196" name="Y_Axis_Actual_Position" subType="ACTUAL">-153.34954384790066</PathPosition>
          <PathPosition dataItemId="y_axis_actual_position" timestamp="2023-05-10T17:41:01.246Z" sequence="5202" name="Y_Axis_Actual_Position" subType="ACTUAL">-119.5924287326652</PathPosition>
          <PathPosition dataItemId="y_axis_actual_position" timestamp="2023-05-10T17:41:02.246Z" sequence="5208" name="Y_Axis_Actual_Position" subType="ACTUAL">-90.79527635938997</PathPosition>
          <PathPosition dataItemId="y_axis_actual_position" timestamp="2023-05-10T17:41:03.246Z" sequence="5214" name="Y_Axis_Actual_Position" subType="ACTUAL">-77.59816195478504</PathPosition>
          <PathPosition dataItemId="y_axis_actual_position" timestamp="2023-05-10T17:41:04.247Z" sequence="5224" name="Y_Axis_Actual_Position" subType="ACTUAL">-103.28442417651289</PathPosition>
          <PathPosition dataItemId="y_axis_actual_position" timestamp="2023-05-10T17:41:05.246Z" sequence="5233" name="Y_Axis_Actual_Position" subType="ACTUAL">-123.58874856278914</PathPosition>
          <PathPosition dataItemId="y_axis_actual_position" timestamp="2023-05-10T17:41:06.246Z" sequence="5239" name="Y_Axis_Actual_Position" subType="ACTUAL">-90.1946421133429</PathPosition>
          <PathPosition dataItemId="y_axis_actual_position" timestamp="2023-05-10T17:41:07.247Z" sequence="5246" name="Y_Axis_Actual_Position" subType="ACTUAL">-81.21831932489378</PathPosition>
          <PathPosition dataItemId="y_axis_actual_position" timestamp="2023-05-10T17:41:08.246Z" sequence="5252" name="Y_Axis_Actual_Position" subType="ACTUAL">-103.51617119143029</PathPosition>
          <PathPosition dataItemId="y_axis_actual_position" timestamp="2023-05-10T17:41:09.246Z" sequence="5256" name="Y_Axis_Actual_Position" subType="ACTUAL">-119.611996479481</PathPosition>
        </Samples>
      </ComponentStream>
      <ComponentStream component="Path" componentId="path" name="Path">
        <Samples>
          <AccumulatedTime dataItemId="tcycle" timestamp="2023-05-10T17:40:55.240Z" sequence="5162" name="ThisCycle">379</AccumulatedTime>
          <AccumulatedTime dataItemId="tcycle" timestamp="2023-05-10T17:40:56.241Z" sequence="5168" name="ThisCycle">380</AccumulatedTime>
          <AccumulatedTime dataItemId="tcycle" timestamp="2023-05-10T17:40:57.244Z" sequence="5174" name="ThisCycle">381</AccumulatedTime>
          <AccumulatedTime dataItemId="tcycle" timestamp="2023-05-10T17:40:58.244Z" sequence="5179" name="ThisCycle">382</AccumulatedTime>
          <AccumulatedTime dataItemId="tcycle" timestamp="2023-05-10T17:40:59.244Z" sequence="5184" name="ThisCycle">383</AccumulatedTime>
          <AccumulatedTime dataItemId="tcycle" timestamp="2023-05-10T17:41:00.245Z" sequence="5191" name="ThisCycle">384</AccumulatedTime>
          <AccumulatedTime dataItemId="tcycle" timestamp="2023-05-10T17:41:01.245Z" sequence="5197" name="ThisCycle">385</AccumulatedTime>
          <AccumulatedTime dataItemId="tcycle" timestamp="2023-05-10T17:41:02.246Z" sequence="5203" name="ThisCycle">386</AccumulatedTime>
          <AccumulatedTime dataItemId="tcycle" timestamp="2023-05-10T17:41:03.246Z" sequence="5209" name="ThisCycle">387</AccumulatedTime>
          <AccumulatedTime dataItemId="tcycle" timestamp="2023-05-10T17:41:04.246Z" sequence="5217" name="ThisCycle">388</AccumulatedTime>
          <AccumulatedTime dataItemId="tcycle" timestamp="2023-05-10T17:41:05.245Z" sequence="5226" name="ThisCycle">389</AccumulatedTime>
          <AccumulatedTime dataItemId="tcycle" timestamp="2023-05-10T17:41:06.246Z" sequence="5235" name="ThisCycle">390</AccumulatedTime>
          <AccumulatedTime dataItemId="tcycle" timestamp="2023-05-10T17:41:07.246Z" sequence="5240" name="ThisCycle">392</AccumulatedTime>
          <AccumulatedTime dataItemId="tcycle" timestamp="2023-05-10T17:41:08.245Z" sequence="5247" name="ThisCycle">393</AccumulatedTime>
          <AccumulatedTime dataItemId="tcycle" timestamp="2023-05-10T17:41:10.246Z" sequence="5257" name="ThisCycle">394</AccumulatedTime>
          <SpindleSpeed dataItemId="sspeed" timestamp="2023-05-10T17:40:55.240Z" sequence="5164" name="SpindleSpeed" subType="ACTUAL">1999.8046875</SpindleSpeed>
          <SpindleSpeed dataItemId="sspeed" timestamp="2023-05-10T17:40:56.241Z" sequence="5170" name="SpindleSpeed" subType="ACTUAL">1999.51171875</SpindleSpeed>
          <SpindleSpeed dataItemId="sspeed" timestamp="2023-05-10T17:40:59.245Z" sequence="5186" name="SpindleSpeed" subType="ACTUAL">1999.8046875</SpindleSpeed>
          <SpindleSpeed dataItemId="sspeed" timestamp="2023-05-10T17:41:00.245Z" sequence="5193" name="SpindleSpeed" subType="ACTUAL">1999.658203125</SpindleSpeed>
          <SpindleSpeed dataItemId="sspeed" timestamp="2023-05-10T17:41:01.246Z" sequence="5199" name="SpindleSpeed" subType="ACTUAL">1999.365234375</SpindleSpeed>
          <SpindleSpeed dataItemId="sspeed" timestamp="2023-05-10T17:41:02.246Z" sequence="5205" name="SpindleSpeed" subType="ACTUAL">1999.658203125</SpindleSpeed>
          <SpindleSpeed dataItemId="sspeed" timestamp="2023-05-10T17:41:03.246Z" sequence="5211" name="SpindleSpeed" subType="ACTUAL">1999.51171875</SpindleSpeed>
          <SpindleSpeed dataItemId="sspeed" timestamp="2023-05-10T17:41:04.246Z" sequence="5219" name="SpindleSpeed" subType="ACTUAL">1999.8046875</SpindleSpeed>
          <SpindleSpeed dataItemId="sspeed" timestamp="2023-05-10T17:41:05.246Z" sequence="5228" name="SpindleSpeed" subType="ACTUAL">1999.51171875</SpindleSpeed>
          <SpindleSpeed dataItemId="sspeed" timestamp="2023-05-10T17:41:07.246Z" sequence="5242" name="SpindleSpeed" subType="ACTUAL">1999.658203125</SpindleSpeed>
          <SpindleSpeed dataItemId="sspeed" timestamp="2023-05-10T17:41:08.245Z" sequence="5249" name="SpindleSpeed" subType="ACTUAL">1999.51171875</SpindleSpeed>
        </Samples>
        <Events>
          <Message dataItemId="m30c1" timestamp="2023-05-10T17:41:04.246Z" sequence="5215" name="M30Counter1">5536</Message>
          <Message dataItemId="m30c2" timestamp="2023-05-10T17:41:04.246Z" sequence="5216" name="M30Counter2">5536</Message>
          <Message dataItemId="machineruntime" timestamp="2023-05-10T17:41:10.246Z" sequence="5259" name="MachineRunTime">765112</Message>
          <Message dataItemId="spindletime" timestamp="2023-05-10T17:41:10.246Z" sequence="5258" name="SpindleTime">85658</Message>
          <Message dataItemId="gcodes" timestamp="2023-05-10T17:41:04.247Z" sequence="5225" name="Gcodes">G01,G17,G90,G94,G21,G40,G43,G80,G98,G50,G59,G269,G64,G69,G170,G255</Message>
          <Message dataItemId="gcodes" timestamp="2023-05-10T17:41:05.246Z" sequence="5234" name="Gcodes">G03,G17,G90,G94,G21,G40,G43,G80,G98,G50,G59,G269,G64,G69,G170,G255</Message>
        </Events>
      </ComponentStream>
    </DeviceStream>
  </Streams>
</MTConnectStreams>`;

// Malformed on purpose: T-09 verifies that parser failures are surfaced in the
// UI without breaking the dashboard render tree.
export const INVALID_XML = `<MTConnectStreams><Header creationTime="invalid"><Streams>`;
