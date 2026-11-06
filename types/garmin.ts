/**
 * TypeScript types extracted from the Garmin Connect Personal API OpenAPI spec.
 * Covers the following endpoints:
 *   GET /activity-service/activity/{activityId}
 *   GET /activitylist-service/activities/search/activities
 */

/**
 * Privacy settings controlling who can access the activity
 */
export interface AccessControlRuleDTO {
  /**
   * Identifier of the activity's privacy setting
   */
  typeId?: number
  /**
   * Key identifying the activity's privacy setting, such as public, private, subscribers, or groups
   */
  typeKey?: string
}

/**
 * Comment associated with an activity, including its text, author details, creation and update timestamps, likes, and the requesting user's edit and delete permissions
 */
export interface ActivityCommentDTO {
  conversationCommentUuid?: string
  conversationCommentPk?: number
  conversationUuid?: string
  activityCommentPk?: number
  authorSocProfilePk?: number
  authorDisplayName?: string
  authorFullName?: string
  authorUserProfilePk?: number
  authorImageUrl?: string
  body?: string
  activityId?: number
  activityCommentLikeCount?: number
  requestorCanEdit?: boolean
  requestorCanDelete?: boolean
  authorPro?: boolean
  /**
   * Comment creation date and time, in RFC 3339 date-time format
   */
  createDate?: string
  /**
   * Comment last update date and time, in RFC 3339 date-time format
   */
  lastUpdatedDate?: string
  activityCommentLikedByUser?: boolean
  activityCommentLikeDisplayNames?: string[]
  activityCommentLikeFullNames?: string[]
  groupPk?: number
  activityCommentLikeAuthors?: UserInfoDto[]
}

export interface ActivityImageDTO {
  url?: string
  smallUrl?: string
  mediumUrl?: string
  /**
   * Image url will not be accessible after the expiration time. Null if image url will not expire
   */
  expirationTimestamp?: number
}

/**
 * Activity type identifier, key, and reference to its parent activity type
 */
export interface ActivityTypeDTO {
  /**
   * Identifier of the activity type
   */
  typeId?: number
  /**
   * Key identifying the activity type
   */
  typeKey?: string
  /**
   * Reference to the typeId of the parent activity type. A value of 17 means the current activity type is a parent activity type.
   */
  parentTypeId?: number
}

/**
 * Source file format associated with the activity.
 */
export interface ApplicationFormatDTO {
  /**
   * Stored file-format identifier: 1 for tcx, 2 for gpx, 3 for deviceXml, 4 for hst, 5 for axm, 6 for kml, or 7 for fit
   */
  formatId?: number
  /**
   * Name corresponding to formatId, such as tcx, gpx, deviceXml, hst, axm, kml, or fit
   */
  formatKey?: string
}

/**
 * Completion target and personalized goal associated with the activity's linked calendar event. Each value is paired with a unit type indicating distance or time. For multisport events, these values may describe an individual leg or transition.
 */
export interface CalendarEventInfoDTO {
  /**
   * Completion target for the linked calendar event, in meters when completionTargetUnitType is distance or seconds when it is time.
   */
  completionTargetValue?: number
  /**
   * Type of completion target: distance indicates completionTargetValue is in meters; time indicates it is in seconds.
   */
  completionTargetUnitType?: 'distance' | 'time'
  /**
   * User entered goal for the linked calendar event, in meters when customGoalUnitType is distance or seconds when it is time.
   */
  customGoalValue?: number
  /**
   * Type of user entered goal: distance indicates customGoalValue is in meters; time indicates it is in seconds.
   */
  customGoalUnitType?: 'distance' | 'time'
}

/**
 * The device display units. Currently only populated on Fly activities
 */
export interface DeviceDisplayUnitsDTO {
  /**
   * Distance display measure from the device
   */
  distanceDisplayMeasure?: string
  /**
   * Elevation display measure from the device
   */
  elevationDisplayMeasure?: string
  /**
   * Speed display measure from the device
   */
  speedDisplayMeasure?: string
  /**
   * Vertical speed display measure from the device
   */
  verticalSpeedDisplayMeasure?: string
}

/**
 * Gas mixture and associated tank information for a dive. Includes gas composition and configuration recorded by the dive computer, plus manually entered volume, tank, pressure, and consumption details when available.
 */
export interface DiveGasDTO {
  /**
   * Helium content of the gas mixture, expressed as a percentage.
   */
  heliumContent?: number
  /**
   * Oxygen content of the gas mixture, expressed as a percentage.
   */
  oxygenContent?: number
  /**
   * Dive gas status code: 0 for disabled, 1 for enabled or 2 for backup only.
   */
  status?: number
  /**
   * Zero-based index identifying the gas in the dive gas list. Index 0 represents the bottom gas.
   */
  gasIndex?: number
  /**
   * Manually entered gas volume, expressed in the unit identified by volumeUnit.unitKey. This field is not supplied by the device's dive gas message.
   */
  volume?: number
  /**
   * Unit for volume, such as liter or cubicfoot.
   */
  volumeUnit?: UnitDTO
  /**
   * User-entered tank material or type, such as steel, aluminum, or other.
   */
  tankType?: string
  /**
   * Tank pressure at the start of the dive, expressed in the unit identified by tankStartingPressureUnit.
   */
  tankStartingPressure?: number
  /**
   * Unit for tankStartingPressure, such as bar or psi.
   */
  tankStartingPressureUnit?: UnitDTO
  /**
   * Tank pressure at the end of the dive, expressed in the unit identified by tankEndingPressureUnit.unitKey.
   */
  tankEndingPressure?: number
  /**
   * Unit for tankEndingPressure, such as bar or psi.
   */
  tankEndingPressureUnit?: UnitDTO
  /**
   * Tank size, expressed in the unit identified by tankSizeUnit.unitKey.
   */
  tankSize?: number
  /**
   * Unit for tankSize, such as liter or cubicfoot.
   */
  tankSizeUnit?: UnitDTO
  /**
   * Surface air consumption (SAC) rate associated with the gas.
   */
  sacRate?: number
  /**
   * Dive gas mode code: 0 for open circuit or 1 for closed-circuit diluent.
   */
  gasMode?: number
}

/**
 * Dive-specific information combining data recorded by the dive computer with user-entered details about equipment, conditions, and dive buddies.
 */
export interface DiveInfoDTO {
  /**
   * Weight used for the dive, expressed in the unit identified by weightUnit.unitKey.
   */
  weight?: number
  /**
   * Unit for weight, such as kilogram or pound.
   */
  weightUnit?: UnitDTO
  /**
   * User-entered type or description of the exposure suit worn during the dive.
   */
  exposureSuit?: string
  /**
   * Exposure suit thickness, in millimeters.
   */
  suitThickness?: number
  /**
   * Underwater visibility distance, expressed in the unit identified by visibilityUnit.unitKey.
   */
  visibility?: number
  /**
   * Unit for visibility, such as meter or foot.
   */
  visibilityUnit?: UnitDTO
  /**
   * User-entered description of water conditions at the surface.
   */
  surfaceCondition?: string
  /**
   * User-entered description of the water current during the dive.
   */
  current?: string
  /**
   * User-entered method or location of entry into the water.
   */
  entryType?: string
  /**
   * User-entered equipment details for the dive, returned as a single string rather than an array.
   */
  equipments?: string
  /**
   * User-entered name or description of the dive buddy or buddies.
   */
  buddy?: string
  /**
   * Dive computer settings associated with the activity, including decompression model, water properties, and closed-circuit rebreather setpoints when available.
   */
  diveSettings?: DiveSettingsDTO
  /**
   * Gas mixture and tank information associated with the dive.
   */
  diveGases?: DiveGasDTO[]
  /**
   * Total surface interval time, in seconds, accumulated from the dive summaries associated with the activity.
   */
  totalSurfaceTime?: number
}

/**
 * Dive computer settings associated with the activity. Model, water type, and setpoint switch modes use numeric codes. Closed-circuit rebreather (CCR) fields describe oxygen partial pressure (PO2) setpoints and their switching behavior.
 */
export interface DiveSettingsDTO {
  /**
   * Name of the dive settings profile.
   */
  name?: string
  /**
   * Tissue model code used for decompression calculations; 0 identifies ZHL_16C.
   */
  model?: number
  /**
   * Low gradient factor used to control decompression conservatism, expressed as a percentage.
   */
  gfLow?: number
  /**
   * High gradient factor used to control decompression conservatism, expressed as a percentage.
   */
  gfHigh?: number
  /**
   * Water type code: 0 for fresh water, 1 for salt water, 2 for the EN13319 reference or 3 for custom density
   */
  waterType?: number
  /**
   * Water density, in kilograms per cubic meter (kg/m^3). Typical values are 1000 for fresh water and 1025 for salt water; a custom water type permits a custom density.
   */
  waterDensity?: number
  /**
   * Switching mode for the CCR low oxygen partial pressure setpoint: 0 for manual or 1 for automatic.
   */
  ccrLowSetpointSwitchMode?: number
  /**
   * Target oxygen partial pressure (PO2) for the CCR low setpoint, as recorded by the dive computer.
   */
  ccrLowSetpoint?: number
  /**
   * Depth, in meters, at which the dive computer switches to the CCR low setpoint when automatic switching is enabled.
   */
  ccrLowSetpointDepth?: number
  /**
   * Switching mode for the CCR high oxygen partial pressure setpoint: 0 for manual or 1 for automatic
   */
  ccrHighSetpointSwitchMode?: number
  /**
   * Target oxygen partial pressure (PO2) for the CCR high setpoint, as recorded by the dive computer.
   */
  ccrHighSetpoint?: number
  /**
   * Depth, in meters, at which the dive computer switches to the CCR high setpoint when automatic switching is enabled.
   */
  ccrHighSetpointDepth?: number
}

/**
 * Maps an e-bike assist mode identifier to its name, as reported in an assist mode information message recorded during the activity.
 */
export interface EBikeAssistModeInfoDTO {
  /**
   * Numeric e-bike assist mode identifier. Use ebikeAssistModeName for the corresponding name.
   */
  ebikeAssistMode?: number
  /**
   * E-bike assist mode name corresponding to ebikeAssistMode. Illustrative names include Eco, Tour, Sport, and Turbo; actual names depend on the e-bike and are not a fixed set.
   */
  ebikeAssistModeName?: string
}

export interface EventTypeDTO {
  /**
   * Identifier of the event classification associated with the activity
   */
  typeId?: number
  /**
   * Key identifying the event classification associated with the activity, such as race, training, recreation, fitness, specialEvent, or uncategorized
   */
  typeKey?: string
}

export interface GradeValueDTO {
  /**
   * Key identifying the climbing grade within the specified scale. For example, _5_1 represents grade 5.1 on the YDS scale.
   */
  valueKey?: string
  scale?:
    | 'YDS'
    | 'UIAA'
    | 'FRENCH'
    | 'BRITISH_ADJECTIVAL'
    | 'BRITISH_TECHNICAL'
    | 'EWBANK'
    | 'BRAZILIAN'
    | 'SAXON'
    | 'VERMIN'
    | 'FONT'
    | 'DANKYU'
    | 'YDS_PM'
}

export interface MetadataDTO {
  /**
   * Indicates whether the activity's recorded data has not been edited since it was uploaded. False when activity data has been modified, such as by trimming or manually adjusting recorded data.
   */
  isOriginal?: boolean
  fileFormat?: ApplicationFormatDTO
  /**
   * ISO 8601 timestamp in UTC, represented without a GMT offset or trailing 'Z'
   */
  lastUpdateDate?: string
  /**
   * ISO 8601 timestamp in UTC, represented without a GMT offset or trailing 'Z'
   */
  uploadedDate?: string
  /**
   * URL of a video uploaded by the user and associated with the activity. Null when no video is associated with the activity.
   */
  videoUrl?: string
  userInfoDto?: UserInfoDto
  /**
   * Activity identifiers of a multisport activity's child activities, ordered by when each child activity occurred
   */
  childIds?: number[]
  /**
   * Activity types of a multisport activity's child activities, ordered by when each child activity occurred
   */
  childActivityTypes?: string[]
  /**
   * Includes all sensors and accessories associated with activity.
   */
  sensors?: SensorInfoDTO[]
  /**
   * All images uploaded by the user for this activity
   */
  activityImages?: ActivityImageDTO[]
  /**
   * Manufacturer that produced the uploaded activity file
   */
  manufacturer?: string
  /**
   * Total number of laps in the activity, or total number of dives for some apnea dive activities
   */
  lapCount?: number
  /**
   * Highest e-bike assist mode observed during the activity
   */
  eBikeMaxAssistModes?: number
  /**
   * Total e-bike battery usage for the entire activity, in percentage points
   */
  eBikeBatteryUsage?: number
  /**
   * E-bike battery level at the end of the activity, as a percentage
   */
  eBikeBatteryRemaining?: number
  /**
   * E-bike assist mode identifiers and names recorded during the activity. Entries without an identifier or with a blank name are excluded.
   */
  eBikeAssistModeInfoDTOList?: EBikeAssistModeInfoDTO[]
  /**
   * Indicates whether wind data was used to determine running power for the activity; null when wind is not enabled for running power on the device.
   */
  hasRunPowerWindData?: boolean
  calendarEventInfo?: CalendarEventInfoDTO
  /**
   * Indicates whether the activity was performed in wheelchair mode or includes a wheelchair exercise workout.
   */
  isWheelchair?: boolean
  /**
   * Specialized category identifiers for the activity's associated workout. Multiple categories may be returned.
   */
  specializedWorkoutCategories?: string[]
  /**
   * Indicates whether the activity is part of an Epic.
   */
  hasMultiDayActivities?: boolean
  /**
   * Indicates whether the activity is a personal record.
   */
  personalRecord?: boolean
  /**
   * Indicates whether the activity's coordinates use the GCJ-02 coordinate system, commonly used for mapping in China.
   */
  gcj02?: boolean
  /**
   * Indicates whether the user enabled wind data for running power calculations in the device's training settings.
   */
  runPowerWindDataEnabled?: boolean
  /**
   * Indicates whether the activity has been trimmed to remove part of the original recording.
   */
  trimmed?: boolean
  /**
   * Indicates whether the activity is identified as manually entered rather than recorded by a device.
   */
  manualActivity?: boolean
  /**
   * Indicates whether corrected elevation data is used for the activity. Set during upload according to device capabilities and the upload's correction setting; users can also toggle it later.
   */
  elevationCorrected?: boolean
  /**
   * True when calories were calculated because no calorie measurement was available; the estimate uses activity type, user weight, duration, and distance when available.
   */
  autoCalcCalories?: boolean
  /**
   * Indicates whether the user marked their activity as a favorite.
   */
  favorite?: boolean
}

export interface MinimalSplitSummaryDTO {
  /**
   * Number of splits represented by this summary
   */
  noOfSplits?: number
  /**
   * Maximum grade value and its grading scale for the split
   */
  maxGradeValue?: GradeValueDTO
  /**
   * The total ascent for the split, in meters
   */
  totalAscent?: number
  /**
   * The duration for the split, in seconds
   */
  duration?: number
  /**
   * Identifies the activity feature represented by the split's data, such as an interval, climb, or dive.
   */
  splitType?:
    | 'PACE_PRO_SPLIT'
    | 'ASCENT_SPLIT'
    | 'DESCENT_SPLIT'
    | 'INTERVAL_ACTIVE'
    | 'INTERVAL_REST'
    | 'INTERVAL_WARMUP'
    | 'INTERVAL_COOLDOWN'
    | 'INTERVAL_RECOVERY'
    | 'INTERVAL_OTHER'
    | 'CLIMB_ACTIVE'
    | 'CLIMB_REST'
    | 'SURF_ACTIVE'
    | 'RUN_ACTIVE'
    | 'RUN_REST'
    | 'WORKOUT_ROUND'
    | 'LIVE_EVENT_SPLIT'
    | 'POWER_GUIDANCE_SPLIT'
    | 'RWD_RUN'
    | 'RWD_WALK'
    | 'CLIMB_PRO_CYCLING_CLIMB'
    | 'CLIMB_PRO_CYCLING_CLIMB_SECTION'
    | 'WINDSURF_ACTIVE'
    | 'RWD_STAND'
    | 'TRANSITION'
    | 'SWIM_STRAIGHTNESS'
    | 'ROUND_ACTIVE'
    | 'ROUND_REST'
    | 'SKI_LIFT_SPLIT'
    | 'SKI_RUN_SPLIT'
    | 'OBSTACLE'
    | 'CYCLING_GROUP_RIDE'
    | 'DIVE'
    | 'DIVE_SECTION'
    | 'SURFACE_TYPE_UNPAVED'
    | 'DYNAMIC_APNEA_DIVE'
    | 'DYNAMIC_APNEA_STA'
    | 'DYNAMIC_APNEA_REST'
    | 'MARKER_MILE'
    | 'MARKER_KILOMETER'
    | 'MARKER_HALF_MARATHON'
    | 'MARKER_MANUAL'
    | 'SURFACE_TYPE_PAVED'
    | 'TIMING_GATE'
    | 'TIMING_RUN'
    | 'VIRTUAL_ACTIVITY_SECTION'
    | 'DOWNHILL_RUN'
    | 'DOWNHILL_LIFT'
    | 'SKI_RUN_SPLIT_SECTION'
    | 'PROVISIONAL_END'
    | 'TRAIL_DIFFICULTY_SECTION'
    | 'SHOT_TIMER_SET'
    | 'SHOT_TIMER_SHOT'
    | 'DYNAMIC_APNEA_BREATHEUP'
    | 'DYNAMIC_APNEA_SURFACE'
    | 'MARKER_5K'
    | 'PACK_WEIGHT'
    | 'INTERVAL_WALK'
    | 'DANCE_ACTIVE'
    | 'DANCE_REST'
  /**
   * Number of climbing routes completed in the split
   */
  numClimbSends?: number
  /**
   * The maximum elevation gain for the split, in meters
   */
  maxElevationGain?: number
  /**
   * The average elevation gain for the split, in meters
   */
  averageElevationGain?: number
  /**
   * The maximum distance for the split, in meters
   */
  maxDistance?: number
  /**
   * Same as maxDistance, but without precision loss, in meters
   */
  maxDistanceWithPrecision?: number
  /**
   * The distance for the split, in meters
   */
  distance?: number
  /**
   * The average speed for the split, in meters per second
   */
  averageSpeed?: number
  /**
   * The maximum speed for the split, in meters per second
   */
  maxSpeed?: number
  /**
   * Activity mode associated with the split
   */
  mode?: 'ADVANCED' | 'SIMPLE'
  /**
   * Number of falls recorded in the split
   */
  numFalls?: number
  /**
   * The average stress across all active rounds
   */
  avgStress?: number
  /**
   * The average stress for winning rounds only
   */
  avgStressWin?: number
  /**
   * The average stress for losing rounds only
   */
  avgStressLoss?: number
  /**
   * The average stress for draw rounds only
   */
  avgStressDraw?: number
  /**
   * The number of games won
   */
  gamesWon?: number
  /**
   * The number of games not won
   */
  gamesNotWon?: number
  /**
   * The average games won
   */
  gamesAverageWon?: number
  /**
   * The elevation loss for the split, in meters
   */
  elevationLoss?: number
  /**
   * The maximum pack weight for the split, in grams
   */
  maxPackWeight?: number
  /**
   * The average pack weight for the split, in grams
   */
  avgPackWeight?: number
  /**
   * The maximum duration for the split, in seconds
   */
  maxDuration?: number
  /**
   * Average reaction time for the split, in seconds
   */
  avgReactionTime?: number
  /**
   * Minimum reaction time for the split, in seconds
   */
  minReactionTime?: number
  /**
   * Average distance required to reach maximum speed in the split, in meters
   */
  avgDistanceToMaxSpeed?: number
  /**
   * Average step frequency during the split, in steps per minute
   */
  avgStepFrequency?: number
  /**
   * Maximum step frequency value for the split
   */
  maxStepFrequency?: number
  /**
   * Average step length for the split, in meters
   */
  avgStepLength?: number
  /**
   * The vertical ratio for the split
   */
  verticalRatio?: number
  /**
   * The vertical oscillation for the split, in centimeters
   */
  verticalOscillation?: number
  /**
   * The average ground contact balance left for the split
   */
  avgGroundContactBalanceLeft?: number
  /**
   * The average ground contact time for the split, in milliseconds
   */
  avgGroundContactTime?: number
  /**
   * Average stance-time percentage for the split
   */
  avgStanceTimePercent?: number
}

/**
 * Information about a sensor or accessory associated with the activity ignoring built-in sensors and the device that recorded the activity.
 */
export interface SensorInfoDTO {
  /**
   * Sensor or accessory manufacturer
   */
  manufacturer?: string
  /**
   * Serial number identifying the sensor or accessory.
   */
  serialNumber?: number
  /**
   * Product SKU or part number for the accessory, when available, such as a Garmin part number or a Tacx product code.
   */
  sku?: string
  /**
   * Numeric product identifier from the device information.
   */
  fitProductNumber?: number
  /**
   * Communication source, such as ANT, ANTPLUS or BLUETOOTH_LOW_ENERGY
   */
  sourceType?: string
  /**
   * ANT+ device type name, such as HEART_RATE or BIKE_POWER. Applicable to sensors whose sourceType is ANTPLUS.
   */
  antplusDeviceType?: string
  /**
   * Built-in device type name, such as WHR for a wrist heart rate sensor. Applicable when sourceType is LOCAL
   */
  localDeviceType?: string
  /**
   * Location of the sensor on the user's body, expressed as a body location name, when known.
   */
  bodyLocation?: string
  /**
   * Version of the sensor's internal software, when known.
   */
  softwareVersion?: number
  /**
   * Qualitative battery condition, such as GOOD, OK, or LOW. Distinct from the numeric batteryLevel percentage.
   */
  batteryStatus?: string
  /**
   * Bluetooth Low Energy device type name, such as HEART_RATE or BIKE_TRAINER. Applicable to sensors whose sourceType is BLUETOOTH_LOW_ENERGY.
   */
  bleDeviceType?: string
  /**
   * Name of the sensor or accessory product, when available.
   */
  productName?: string
  /**
   * Remaining sensor battery charge as a percentage, when available.
   */
  batteryLevel?: number
}

export interface SplitSummaryDTO {
  /**
   * ISO 8601 timestamp in the local time of the activity's time zone, represented without a GMT offset or trailing 'Z'
   */
  startTimeLocal?: string
  /**
   * ISO 8601 timestamp in UTC, represented without a GMT offset or trailing 'Z'
   */
  startTimeGMT?: string
  /**
   * The start latitude for the split, in decimal degrees
   */
  startLatitude?: number
  /**
   * The start longitude for the split, in decimal degrees
   */
  startLongitude?: number
  /**
   * The distance for the split, in meters
   */
  distance?: number
  /**
   * The duration for the split, in seconds
   */
  duration?: number
  /**
   * The moving duration for the split, in seconds
   */
  movingDuration?: number
  /**
   * The elapsed duration for the split, in seconds
   */
  elapsedDuration?: number
  /**
   * The elevation gain for the split, in meters
   */
  elevationGain?: number
  /**
   * The elevation loss for the split, in meters
   */
  elevationLoss?: number
  /**
   * The maximum elevation for the split, in meters
   */
  maxElevation?: number
  /**
   * The minimum elevation for the split, in meters
   */
  minElevation?: number
  /**
   * Average elevation of the activity in meters
   */
  avgElevation?: number
  /**
   * The average speed for the split, in meters per second
   */
  averageSpeed?: number
  /**
   * The average moving speed for the split, in meters per second
   */
  averageMovingSpeed?: number
  /**
   * The maximum speed for the split, in meters per second
   */
  maxSpeed?: number
  /**
   * The calories for the split, in kilocalories
   */
  calories?: number
  /**
   * The BMR calories for the split, in kilocalories
   */
  bmrCalories?: number
  /**
   * The average heart rate for the split, in beats per minute
   */
  averageHR?: number
  /**
   * The maximum heart rate for the split, in beats per minute
   */
  maxHR?: number
  /**
   * The minimum heart rate for the split, in beats per minute
   */
  minHR?: number
  /**
   * The average run cadence for the split, in steps per minute
   */
  averageRunCadence?: number
  /**
   * The maximum run cadence for the split, in steps per minute
   */
  maxRunCadence?: number
  /**
   * The maximum lap average run cadence for the split, in steps per minute
   */
  maxLapAvgRunCadence?: number
  /**
   * The average bike cadence for the split, in revolutions per minute
   */
  averageBikeCadence?: number
  /**
   * The maximum bike cadence for the split, in revolutions per minute
   */
  maxBikeCadence?: number
  /**
   * The average swim cadence for the split, in strokes per minute
   */
  averageSwimCadence?: number
  /**
   * The maximum swim cadence for the split, in strokes per minute
   */
  maxSwimCadence?: number
  /**
   * The average temperature for the split, in degrees Celsius
   */
  averageTemperature?: number
  /**
   * The maximum temperature for the split, in degrees Celsius
   */
  maxTemperature?: number
  /**
   * The minimum temperature for the split, in degrees Celsius
   */
  minTemperature?: number
  /**
   * The average power for the split, in watts
   */
  averagePower?: number
  /**
   * The maximum power for the split, in watts
   */
  maxPower?: number
  /**
   * The maximum power twenty minutes for the split, in watts
   */
  maxPowerTwentyMinutes?: number
  /**
   * The minimum power for the split, in watts
   */
  minPower?: number
  /**
   * The normalized power for the split, in watts
   */
  normalizedPower?: number
  /**
   * The functional threshold power for the split, in watts
   */
  functionalThresholdPower?: number
  /**
   * The total work for the split, in kilocalories
   */
  totalWork?: number
  /**
   * The left balance for the split
   */
  leftBalance?: number
  /**
   * The right balance for the split
   */
  rightBalance?: number
  /**
   * The left torque effectiveness for the split
   */
  leftTorqueEffectiveness?: number
  /**
   * The right torque effectiveness for the split
   */
  rightTorqueEffectiveness?: number
  /**
   * The left pedal smoothness for the split
   */
  leftPedalSmoothness?: number
  /**
   * The right pedal smoothness for the split
   */
  rightPedalSmoothness?: number
  /**
   * The ground contact time for the split, in milliseconds
   */
  groundContactTime?: number
  /**
   * The ground contact balance left for the split
   */
  groundContactBalanceLeft?: number
  /**
   * Stride length for the split, in centimeters
   */
  strideLength?: number
  /**
   * The vertical oscillation for the split, in centimeters
   */
  verticalOscillation?: number
  /**
   * The training effect for the split
   */
  trainingEffect?: number
  /**
   * The anaerobic training effect for the split
   */
  anaerobicTrainingEffect?: number
  /**
   * Aerobic training-effect classification for the activity
   */
  aerobicTrainingEffectMessage?:
    | 'MINOR_AEROBIC_BENEFIT_0'
    | 'MAINTAINING_AEROBIC_FITNESS_1'
    | 'IMPROVING_AEROBIC_FITNESS_2'
    | 'HIGHLY_IMPROVING_AEROBIC_FITNESS_3'
    | 'OVERREACHING_4'
    | 'RECOVERY_5'
    | 'MINOR_AEROBIC_BENEFIT_6'
    | 'MAINTAINING_AEROBIC_BASE_7'
    | 'IMPROVING_AEROBIC_BASE_8'
    | 'IMPROVING_AEROBIC_ENDURANCE_9'
    | 'HIGHLY_IMPROVING_AEROBIC_ENDURANCE_10'
    | 'OVERREACHING_11'
    | 'IMPROVING_LACTATE_THRESHOLD_12'
    | 'HIGHLY_IMPROVING_LACTATE_THRESHOLD_13'
    | 'OVERREACHING_14'
    | 'IMPROVING_VO2_MAX_15'
    | 'HIGHLY_IMPROVING_VO2_MAX_16'
    | 'OVERREACHING_17'
    | 'NO_AEROBIC_BENEFIT_18'
    | 'MAINTAINING_LACTATE_THRESHOLD_19'
    | 'MAINTAINING_VO2_MAX_20'
    | 'MAINTAINING_TEMPO_21'
    | 'IMPACTING_TEMPO_22'
    | 'HIGHLY_IMPACTING_TEMPO_23'
    | 'OVERREACHING_TEMPO_24'
  /**
   * Anaerobic training-effect classification for the activity
   */
  anaerobicTrainingEffectMessage?:
    | 'NO_ANAEROBIC_BENEFIT_0'
    | 'MAINTAINING_ANAEROBIC_BASE_1'
    | 'IMPROVING_ANAEROBIC_BASE_2'
    | 'HIGHLY_IMPROVING_ANAEROBIC_CAPACITY_AND_POWER_3'
    | 'OVERREACHING_4'
    | 'MINOR_FAST_FORCE_BENEFIT_5'
    | 'MAINTAINING_FAST_FORCE_PRODUCTION_6'
    | 'MAINTAINING_ANAEROBIC_POWER_7'
    | 'IMPROVING_ANAEROBIC_CAPACITY_AND_POWER_8'
    | 'MINOR_FAST_FORCE_BENEFIT_9'
    | 'MAINTAINING_ECONOMY_AND_ANAEROBIC_BASE_10'
    | 'IMPROVING_ECONOMY_AND_ANAEROBIC_BASE_11'
    | 'IMPROVING_ANAEROBIC_CAPACITY_AND_SPEED_12'
    | 'HIGHLY_IMPROVING_ANAEROBIC_CAPACITY_AND_SPEED_13'
    | 'HIGHLY_IMPROVING_ECONOMY_AND_ANAEROBIC_BASE_14'
    | 'MINOR_ANAEROBIC_BENEFIT_15'
    | 'OVERREACHING_SPEED_16'
  /**
   * The training stress score for the split
   */
  trainingStressScore?: number
  /**
   * The intensity factor for the split, in percent
   */
  intensityFactor?: number
  /**
   * Pool length; its unit is provided by unitOfPoolLength.
   */
  poolLength?: number
  /**
   * Number of active lengths recorded for the split
   */
  numberOfActiveLengths?: number
  /**
   * Unit used for the pool length value
   */
  unitOfPoolLength?: UnitDTO
  /**
   * Total number of strokes recorded for the split
   */
  totalNumberOfStrokes?: number
  /**
   * Average number of strokes per active length for the split
   */
  averageStrokes?: number
  /**
   * Minimum number of strokes recorded for a length in the split
   */
  minimumStrokes?: number
  /**
   * The average SWOLF for the split
   */
  averageSWOLF?: number
  /**
   * The minimum SWOLF for the split
   */
  minSWOLF?: number
  /**
   * The stroke distance for the split, in meters
   */
  strokeDistance?: number
  /**
   * Number of standing periods recorded for the split
   */
  standingCount?: number
  /**
   * The seated time for the split, in seconds
   */
  seatedTime?: number
  /**
   * The standing time for the split, in seconds
   */
  standingTime?: number
  /**
   * The maximum seated power for the split, in watts
   */
  maxSeatedPower?: number
  /**
   * The maximum standing power for the split, in watts
   */
  maxStandingPower?: number
  /**
   * The average seated power for the split, in watts
   */
  averageSeatedPower?: number
  /**
   * The average standing power for the split, in watts
   */
  averageStandingPower?: number
  /**
   * The maximum seated cadence for the split, in revolutions per minute
   */
  maxSeatedCadence?: number
  /**
   * The maximum standing cadence for the split, in revolutions per minute
   */
  maxStandingCadence?: number
  /**
   * The average seated cadence for the split, in revolutions per minute
   */
  averageSeatedCadence?: number
  /**
   * The average standing cadence for the split, in revolutions per minute
   */
  averageStandingCadence?: number
  /**
   * The left power phase start for the split
   */
  leftPowerPhaseStart?: number
  /**
   * The left power phase end for the split
   */
  leftPowerPhaseEnd?: number
  /**
   * The left power phase arc length for the split
   */
  leftPowerPhaseArcLength?: number
  /**
   * The left power phase arc center for the split
   */
  leftPowerPhaseArcCenter?: number
  /**
   * The left power phase peak start for the split
   */
  leftPowerPhasePeakStart?: number
  /**
   * The left power phase peak end for the split
   */
  leftPowerPhasePeakEnd?: number
  /**
   * The left power phase peak arc length for the split
   */
  leftPowerPhasePeakArcLength?: number
  /**
   * The left power phase peak arc center for the split
   */
  leftPowerPhasePeakArcCenter?: number
  /**
   * The left platform center offset for the split, in millimeters
   */
  leftPlatformCenterOffset?: number
  /**
   * The right power phase start for the split
   */
  rightPowerPhaseStart?: number
  /**
   * The right power phase end for the split
   */
  rightPowerPhaseEnd?: number
  /**
   * The right power phase arc length for the split
   */
  rightPowerPhaseArcLength?: number
  /**
   * The right power phase arc center for the split
   */
  rightPowerPhaseArcCenter?: number
  /**
   * The right power phase peak start for the split
   */
  rightPowerPhasePeakStart?: number
  /**
   * The right power phase peak end for the split
   */
  rightPowerPhasePeakEnd?: number
  /**
   * The right power phase peak arc length for the split
   */
  rightPowerPhasePeakArcLength?: number
  /**
   * The right power phase peak arc center for the split
   */
  rightPowerPhasePeakArcCenter?: number
  /**
   * The right platform center offset for the split, in millimeters
   */
  rightPlatformCenterOffset?: number
  /**
   * The lactate threshold heart rate for the split, in beats per minute
   */
  lactateThresholdHeartRate?: number
  /**
   * The average G-force for the split, in g
   */
  averageGforce?: number
  /**
   * The maximum G-force for the split, in g
   */
  maxGforce?: number
  /**
   * The vertical ratio for the split
   */
  verticalRatio?: number
  /**
   * The lactate threshold speed for the split, in meters per second
   */
  lactateThresholdSpeed?: number
  /**
   * The direct functional threshold power for the split, in watts
   */
  directFunctionalThresholdPower?: number
  /**
   * Distance traveled per stroke for the split, in meters
   */
  distancePerStroke?: number
  /**
   * The stroke cadence for the split, in strokes per minute
   */
  strokeCadence?: number
  /**
   * The average stroke distance for the split, in meters
   */
  averageStrokeDistance?: number
  /**
   * The average stroke cadence for the split, in strokes per minute
   */
  averageStrokeCadence?: number
  /**
   * The maximum stroke cadence for the split, in strokes per minute
   */
  maxStrokeCadence?: number
  /**
   * The rider position for the split
   */
  riderPosition?: number
  /**
   * Numeric representation of the activity start time in GMT
   */
  startTimeGMTDoubleValue?: number
  /**
   * Total number of exercise repetitions recorded for the split
   */
  totalExerciseReps?: number
  /**
   * Total number of repetitions recorded for the split
   */
  totalReps?: number
  /**
   * Total number of exercise sets recorded for the split
   */
  totalSets?: number
  /**
   * Number of active exercise sets recorded for the split
   */
  activeSets?: number
  /**
   * Maximum repetition count recorded for a lap in the split
   */
  maxLapRepCount?: number
  /**
   * The maximum depth for the split, in meters
   */
  maxDepth?: number
  /**
   * The average depth for the split, in meters
   */
  averageDepth?: number
  /**
   * The surface interval for the split, in seconds
   */
  surfaceInterval?: number
  /**
   * The start CNS for the split
   */
  startCns?: number
  /**
   * The end CNS for the split
   */
  endCns?: number
  /**
   * The start N2 for the split
   */
  startN2?: number
  /**
   * The end N2 for the split
   */
  endN2?: number
  /**
   * The bottom time for the split, in seconds
   */
  bottomTime?: number
  /**
   * The maximum bottom time for the split, in seconds
   */
  maxBottomTime?: number
  /**
   * The dive alert associated with the split
   */
  diveAlert?: string
  /**
   * The end latitude for the split, in decimal degrees
   */
  endLatitude?: number
  /**
   * The end longitude for the split, in decimal degrees
   */
  endLongitude?: number
  /**
   * Indicates whether the dive was a decompression dive.
   */
  isDecoDive?: boolean
  /**
   * Number of floors climbed during the split
   */
  floorsClimbed?: number
  /**
   * Number of floors descended during the split
   */
  floorsDescended?: number
  /**
   * The average vertical speed for the split, in meters per second
   */
  avgVerticalSpeed?: number
  /**
   * The maximum vertical speed for the split, in meters per second
   */
  maxVerticalSpeed?: number
  /**
   * The perceived workout effort for the split
   */
  perceivedWorkoutEffort?: number
  /**
   * The flow for the split
   */
  flow?: number
  /**
   * The grit for the split
   */
  grit?: number
  /**
   * Number of jumps recorded for the split
   */
  jumpCount?: number
  /**
   * The calories estimated for the split, in kilocalories
   */
  caloriesEstimated?: number
  /**
   * The calories consumed for the split, in kilocalories
   */
  caloriesConsumed?: number
  /**
   * The water estimated for the split, in milliliters
   */
  waterEstimated?: number
  /**
   * The water consumed for the split, in milliliters
   */
  waterConsumed?: number
  /**
   * The minimum respiration rate for the split, in breaths per minute
   */
  minRespirationRate?: number
  /**
   * The maximum respiration rate for the split, in breaths per minute
   */
  maxRespirationRate?: number
  /**
   * The average respiration rate for the split, in breaths per minute
   */
  avgRespirationRate?: number
  /**
   * Training-effect label for the activity
   */
  trainingEffectLabel?: string
  /**
   * The activity training load for the split
   */
  activityTrainingLoad?: number
  /**
   * The average flow for the split
   */
  avgFlow?: number
  /**
   * The average grit for the split
   */
  avgGrit?: number
  /**
   * The minimum activity lap duration for the split, in seconds
   */
  minActivityLapDuration?: number
  /**
   * The start stress for the split
   */
  startStress?: number
  /**
   * The end stress for the split
   */
  endStress?: number
  /**
   * The difference stress for the split
   */
  differenceStress?: number
  /**
   * The direct workout feel for the split
   */
  directWorkoutFeel?: number
  /**
   * The direct workout RPE for the split
   */
  directWorkoutRpe?: number
  /**
   * The direct workout compliance score for the split
   */
  directWorkoutComplianceScore?: number
  /**
   * The target duration for the split, in seconds
   */
  targetDuration?: number
  /**
   * The target distance for the split, in meters
   */
  targetDistance?: number
  /**
   * The target average speed for the split, in meters per second
   */
  targetAverageSpeed?: number
  /**
   * Total moderate-intensity activity time for the split, in minutes.
   */
  moderateIntensityMinutes?: number
  /**
   * Total vigorous-intensity activity time for the split, in minutes.
   */
  vigorousIntensityMinutes?: number
  /**
   * Total number of steps recorded for the split
   */
  steps?: number
  /**
   * The average stress for the split
   */
  avgStress?: number
  /**
   * The maximum stress for the split
   */
  maxStress?: number
  /**
   * The recovery heart rate for the split, in beats per minute
   */
  recoveryHeartRate?: number
  /**
   * The begin potential stamina for the split
   */
  beginPotentialStamina?: number
  /**
   * The end potential stamina for the split
   */
  endPotentialStamina?: number
  /**
   * The minimum available stamina for the split
   */
  minAvailableStamina?: number
  /**
   * The gain solar activity time for the split, in seconds
   */
  gainSolarActivityTime?: number
  /**
   * The average solar charge percent for the split
   */
  avgSolarChargePercent?: number
  /**
   * The average ebike assist level percent for the split
   */
  avgEbikeAssistLevelPercent?: number
  /**
   * The average grade adjusted speed for the split, in meters per second
   */
  avgGradeAdjustedSpeed?: number
  /**
   * The average wheelchair cadence for the split, in strokes per minute
   */
  avgWheelchairCadence?: number
  /**
   * The maximum wheelchair cadence for the split, in strokes per minute
   */
  maxWheelchairCadence?: number
  /**
   * The average jump rope cadence for the split, in repetitions per minute
   */
  avgJumpRopeCadence?: number
  /**
   * The maximum jump rope cadence for the split, in repetitions per minute
   */
  maxJumpRopeCadence?: number
  /**
   * The average elapsed duration vertical speed for the split, in meters per second
   */
  avgElapsedDurationVerticalSpeed?: number
  /**
   * The surface type unpaved percentage for the split
   */
  surfaceTypeUnpavedPercentage?: number
  /**
   * The body battery difference between the start and end of the activity
   */
  differenceBodyBattery?: number
  /**
   * Pack weight (in grams) carried by the user at the start of the activity
   */
  beginPackWeight?: number
  /**
   * Mechanical impact on the body post activity(equivalent distance in meters)
   */
  impactLoad?: number
  /**
   * Step Speed Loss metric for a running activity (distance in meters)
   */
  stepSpeedLoss?: number
  /**
   * Step Speed Loss Percentage metric for a running activity (in percentage)
   */
  stepSpeedLossPercent?: number
  /**
   * Number of dives recorded in the split
   */
  diveCount?: number
  /**
   * The duration of the longest pool apnea interval, in seconds
   */
  longestPoolApneaInterval?: number
  /**
   * Average force applied in the cycling activity (in Newton)
   */
  avgForce?: number
  /**
   * Max force applied in the cycling activity (in Newton)
   */
  maxForce?: number
  /**
   * Normalized force applied in the cycling activity (in Newton)
   */
  normalizedForce?: number
  /**
   * The total pool apnea breath hold time duration, in seconds
   */
  poolApneaBreathHoldDuration?: number
  /**
   * The average saturated pulse Ox value, in percentage
   */
  avgSpo2?: number
  /**
   * The minimum saturated pulse Ox value, in percentage
   */
  minSpo2?: number
  /**
   * The maximum saturated pulse Ox value, in percentage
   */
  maxSpo2?: number
  /**
   * The carbon offset of the activity expressed in grams of CO2
   */
  carbonOffset?: number
  /**
   * Calories burned due to pack weight during the split, in kilocalories
   */
  packWeightCalories?: number
  /**
   * Message index for the split
   */
  messageIndex?: number
  /**
   * Identifies the activity feature represented by the split's data, such as an interval, climb, or dive.
   */
  splitType?:
    | 'PACE_PRO_SPLIT'
    | 'ASCENT_SPLIT'
    | 'DESCENT_SPLIT'
    | 'INTERVAL_ACTIVE'
    | 'INTERVAL_REST'
    | 'INTERVAL_WARMUP'
    | 'INTERVAL_COOLDOWN'
    | 'INTERVAL_RECOVERY'
    | 'INTERVAL_OTHER'
    | 'CLIMB_ACTIVE'
    | 'CLIMB_REST'
    | 'SURF_ACTIVE'
    | 'RUN_ACTIVE'
    | 'RUN_REST'
    | 'WORKOUT_ROUND'
    | 'LIVE_EVENT_SPLIT'
    | 'POWER_GUIDANCE_SPLIT'
    | 'RWD_RUN'
    | 'RWD_WALK'
    | 'CLIMB_PRO_CYCLING_CLIMB'
    | 'CLIMB_PRO_CYCLING_CLIMB_SECTION'
    | 'WINDSURF_ACTIVE'
    | 'RWD_STAND'
    | 'TRANSITION'
    | 'SWIM_STRAIGHTNESS'
    | 'ROUND_ACTIVE'
    | 'ROUND_REST'
    | 'SKI_LIFT_SPLIT'
    | 'SKI_RUN_SPLIT'
    | 'OBSTACLE'
    | 'CYCLING_GROUP_RIDE'
    | 'DIVE'
    | 'DIVE_SECTION'
    | 'SURFACE_TYPE_UNPAVED'
    | 'DYNAMIC_APNEA_DIVE'
    | 'DYNAMIC_APNEA_STA'
    | 'DYNAMIC_APNEA_REST'
    | 'MARKER_MILE'
    | 'MARKER_KILOMETER'
    | 'MARKER_HALF_MARATHON'
    | 'MARKER_MANUAL'
    | 'SURFACE_TYPE_PAVED'
    | 'TIMING_GATE'
    | 'TIMING_RUN'
    | 'VIRTUAL_ACTIVITY_SECTION'
    | 'DOWNHILL_RUN'
    | 'DOWNHILL_LIFT'
    | 'SKI_RUN_SPLIT_SECTION'
    | 'PROVISIONAL_END'
    | 'TRAIL_DIFFICULTY_SECTION'
    | 'SHOT_TIMER_SET'
    | 'SHOT_TIMER_SHOT'
    | 'DYNAMIC_APNEA_BREATHEUP'
    | 'DYNAMIC_APNEA_SURFACE'
    | 'MARKER_5K'
    | 'PACK_WEIGHT'
    | 'INTERVAL_WALK'
    | 'DANCE_ACTIVE'
    | 'DANCE_REST'
  /**
   * Number of splits represented by this summary
   */
  noOfSplits?: number
  /**
   * The average power target for the split, in watts
   */
  averagePowerTarget?: number
  /**
   * Number of falls recorded in the split
   */
  numFalls?: number
  /**
   * Number of climbing routes completed in the split
   */
  numClimbSends?: number
  /**
   * Number of climbing attempts in the split
   */
  numClimbsAttempted?: number
  /**
   * Number of climbs completed in the split
   */
  numClimbsCompleted?: number
  /**
   * The maximum elevation gain for the split, in meters
   */
  maxElevationGain?: number
  /**
   * The average elevation gain for the split, in meters
   */
  averageElevationGain?: number
  /**
   * The maximum distance for the split, in meters
   */
  maxDistance?: number
  /**
   * Same as maxDistance, but without precision loss, in meters
   */
  maxDistanceWithPrecision?: number
  /**
   * Maximum grade value and its grading scale for the split
   */
  maxGradeValue?: GradeValueDTO
  /**
   * Activity mode associated with the split
   */
  mode?: 'ADVANCED' | 'SIMPLE'
  /**
   * The number of games won for the session
   */
  gamesWon?: number
  /**
   * Swim straightness score for the split
   */
  swimStraightnessScore?: number
  /**
   * Additional distance caused by deviations from a straight swim path, in meters
   */
  swimStraightnessExtraDistance?: number
  /**
   * The weighted mean best five maximum speed over ten seconds for the split, in meters per second
   */
  weightedMeanBestFiveMaxSpeedOverTenSeconds?: number
  /**
   * Maximum piste difficulty rating recorded in the split
   */
  maxPisteDifficulty?: 'GREEN' | 'BLUE' | 'RED' | 'BLACK' | 'DOUBLE_BLACK'
  /**
   * Average reaction time for the split, in seconds
   */
  avgReactionTime?: number
  /**
   * The minimum reaction time for starting a rep, in seconds
   */
  minReactionTime?: number
  /**
   * Average step frequency during the split, in steps per minute
   */
  avgStepFrequency?: number
  /**
   * The maximum frequency of steps during the activity, in steps per minute
   */
  maxStepFrequency?: number
  /**
   * The ratio of ground contact time to air time, as a percent
   */
  gctAirTimeRatio?: number
  /**
   * The maximum acceleration during the activity, in meters per second squared
   */
  maxAcceleration?: number
  /**
   * The average of the maximum accelerations during the activity, in meters per second squared
   */
  avgMaxAcceleration?: number
  /**
   * The average of the maximum speeds during the activity, in meters per second
   */
  avgMaxSpeed?: number
  /**
   * Minimum stance (ground-contact) time for the split, in milliseconds
   */
  minStanceTime?: number
  /**
   * Average stance (ground-contact) time for the split, in milliseconds
   */
  avgStanceTime?: number
  /**
   * The average stance time (ground contact time) percent
   */
  avgStanceTimePercent?: number
  /**
   * Average step length for the split, in meters
   */
  avgStepLength?: number
  /**
   * Maximum step length for the split, in meters
   */
  maxStepLength?: number
  /**
   * The average distance to reach the max speed of a split, in meters
   */
  avgDistanceToMaxSpeed?: number
  /**
   * The average pack weight for the split, in grams
   */
  avgPackWeight?: number
  /**
   * The maximum pack weight for the split, in grams
   */
  maxPackWeight?: number
  /**
   * The maximum duration in seconds
   */
  maxDuration?: number
  /**
   * Indicates whether the activity was a decompression dive.
   */
  decoDive?: boolean
}

export interface SummarizedDiveGasDTO {
  /**
   * Helium content of the gas mixture, as a percentage
   */
  heliumContent?: number
  /**
   * Oxygen content of the gas mixture, as a percentage
   */
  oxygenContent?: number
  /**
   * Index of the gas mixture in the dive configuration
   */
  gasIndex?: number
  /**
   * Gas mode code for the dive configuration
   */
  gasMode?: number
}

export interface SummarizedDiveInfoDTO {
  /**
   * Diver weight; its unit is provided by weightUnit.
   */
  weight?: number
  /**
   * Additional Unit details for the dive
   */
  weightUnit?: UnitDTO
  /**
   * Dive visibility; its unit is provided by visibilityUnit.
   */
  visibility?: number
  /**
   * Additional Unit details for the dive
   */
  visibilityUnit?: UnitDTO
  /**
   * The surface condition associated with the dive
   */
  surfaceCondition?: string
  /**
   * The current associated with the dive
   */
  current?: string
  /**
   * Water type code used for the dive settings
   */
  waterType?: number
  /**
   * Water density in kilograms per cubic meter
   */
  waterDensity?: number
  /**
   * Gas mixtures recorded for the dive
   */
  summarizedDiveGases?: SummarizedDiveGasDTO[]
  /**
   * Total time spent at the surface, in seconds
   */
  totalSurfaceTime?: number
}

export interface SummarizedExerciseSet {
  /**
   * The category associated with the exercise set
   */
  category?: string
  /**
   * The sub category associated with the exercise set
   */
  subCategory?: string
  /**
   * The number of reps for the exercise set
   */
  reps?: number
  /**
   * Exercise volume, calculated as weight in grams multiplied by repetitions and summed across the exercise sets
   */
  volume?: number
  /**
   * The duration for the exercise set, in milliseconds
   */
  duration?: number
  /**
   * The number of sets for the exercise set
   */
  sets?: number
  /**
   * Maximum weight lifted in the exercise set, in grams
   */
  maxWeight?: number
  /**
   * Peak power recorded for the exercise set, in watts
   */
  peakPower?: number
  /**
   * Mean concentric movement velocity, in centimeters per millisecond
   */
  concentricMeanVelocity?: number
}

export interface SummaryDTO {
  /**
   * ISO 8601 timestamp in the local time of the activity's time zone, represented without a GMT offset or trailing 'Z'
   */
  startTimeLocal?: string
  /**
   * ISO 8601 timestamp in UTC, represented without a GMT offset or trailing 'Z'
   */
  startTimeGMT?: string
  /**
   * The start latitude for the activity, in decimal degrees
   */
  startLatitude?: number
  /**
   * The start longitude for the activity, in decimal degrees
   */
  startLongitude?: number
  /**
   * The distance for the activity, in meters
   */
  distance?: number
  /**
   * The duration for the activity, in seconds
   */
  duration?: number
  /**
   * The moving duration for the activity, in seconds
   */
  movingDuration?: number
  /**
   * The elapsed duration for the activity, in seconds
   */
  elapsedDuration?: number
  /**
   * The elevation gain for the activity, in meters
   */
  elevationGain?: number
  /**
   * The elevation loss for the activity, in meters
   */
  elevationLoss?: number
  /**
   * The maximum elevation for the activity, in meters
   */
  maxElevation?: number
  /**
   * The minimum elevation for the activity, in meters
   */
  minElevation?: number
  /**
   * Average elevation of the activity in meters
   */
  avgElevation?: number
  /**
   * The average speed for the activity, in meters per second
   */
  averageSpeed?: number
  /**
   * The average moving speed for the activity, in meters per second
   */
  averageMovingSpeed?: number
  /**
   * The maximum speed for the activity, in meters per second
   */
  maxSpeed?: number
  /**
   * The calories for the activity, in kilocalories
   */
  calories?: number
  /**
   * The BMR calories for the activity, in kilocalories
   */
  bmrCalories?: number
  /**
   * The average heart rate for the activity, in beats per minute
   */
  averageHR?: number
  /**
   * The maximum heart rate for the activity, in beats per minute
   */
  maxHR?: number
  /**
   * The minimum heart rate for the activity, in beats per minute
   */
  minHR?: number
  /**
   * The average run cadence for the activity, in steps per minute
   */
  averageRunCadence?: number
  /**
   * The maximum run cadence for the activity, in steps per minute
   */
  maxRunCadence?: number
  /**
   * The maximum lap average run cadence for the activity, in steps per minute
   */
  maxLapAvgRunCadence?: number
  /**
   * The average bike cadence for the activity, in revolutions per minute
   */
  averageBikeCadence?: number
  /**
   * The maximum bike cadence for the activity, in revolutions per minute
   */
  maxBikeCadence?: number
  /**
   * The average swim cadence for the activity, in strokes per minute
   */
  averageSwimCadence?: number
  /**
   * The maximum swim cadence for the activity, in strokes per minute
   */
  maxSwimCadence?: number
  /**
   * The average temperature for the activity, in degrees Celsius
   */
  averageTemperature?: number
  /**
   * The maximum temperature for the activity, in degrees Celsius
   */
  maxTemperature?: number
  /**
   * The minimum temperature for the activity, in degrees Celsius
   */
  minTemperature?: number
  /**
   * The average power for the activity, in watts
   */
  averagePower?: number
  /**
   * The maximum power for the activity, in watts
   */
  maxPower?: number
  /**
   * The maximum power twenty minutes for the activity, in watts
   */
  maxPowerTwentyMinutes?: number
  /**
   * The minimum power for the activity, in watts
   */
  minPower?: number
  /**
   * The normalized power for the activity, in watts
   */
  normalizedPower?: number
  /**
   * The functional threshold power for the activity, in watts
   */
  functionalThresholdPower?: number
  /**
   * The total work for the activity, in kilocalories
   */
  totalWork?: number
  /**
   * The left balance for the activity
   */
  leftBalance?: number
  /**
   * The right balance for the activity
   */
  rightBalance?: number
  /**
   * The left torque effectiveness for the activity
   */
  leftTorqueEffectiveness?: number
  /**
   * The right torque effectiveness for the activity
   */
  rightTorqueEffectiveness?: number
  /**
   * The left pedal smoothness for the activity
   */
  leftPedalSmoothness?: number
  /**
   * The right pedal smoothness for the activity
   */
  rightPedalSmoothness?: number
  /**
   * The ground contact time for the activity, in milliseconds
   */
  groundContactTime?: number
  /**
   * The ground contact balance left for the activity
   */
  groundContactBalanceLeft?: number
  /**
   * Stride length for the activity, in centimeters
   */
  strideLength?: number
  /**
   * The vertical oscillation for the activity, in centimeters
   */
  verticalOscillation?: number
  /**
   * The training effect for the activity
   */
  trainingEffect?: number
  /**
   * The anaerobic training effect for the activity
   */
  anaerobicTrainingEffect?: number
  /**
   * Aerobic training-effect classification for the activity
   */
  aerobicTrainingEffectMessage?:
    | 'MINOR_AEROBIC_BENEFIT_0'
    | 'MAINTAINING_AEROBIC_FITNESS_1'
    | 'IMPROVING_AEROBIC_FITNESS_2'
    | 'HIGHLY_IMPROVING_AEROBIC_FITNESS_3'
    | 'OVERREACHING_4'
    | 'RECOVERY_5'
    | 'MINOR_AEROBIC_BENEFIT_6'
    | 'MAINTAINING_AEROBIC_BASE_7'
    | 'IMPROVING_AEROBIC_BASE_8'
    | 'IMPROVING_AEROBIC_ENDURANCE_9'
    | 'HIGHLY_IMPROVING_AEROBIC_ENDURANCE_10'
    | 'OVERREACHING_11'
    | 'IMPROVING_LACTATE_THRESHOLD_12'
    | 'HIGHLY_IMPROVING_LACTATE_THRESHOLD_13'
    | 'OVERREACHING_14'
    | 'IMPROVING_VO2_MAX_15'
    | 'HIGHLY_IMPROVING_VO2_MAX_16'
    | 'OVERREACHING_17'
    | 'NO_AEROBIC_BENEFIT_18'
    | 'MAINTAINING_LACTATE_THRESHOLD_19'
    | 'MAINTAINING_VO2_MAX_20'
    | 'MAINTAINING_TEMPO_21'
    | 'IMPACTING_TEMPO_22'
    | 'HIGHLY_IMPACTING_TEMPO_23'
    | 'OVERREACHING_TEMPO_24'
  /**
   * Anaerobic training-effect classification for the activity
   */
  anaerobicTrainingEffectMessage?:
    | 'NO_ANAEROBIC_BENEFIT_0'
    | 'MAINTAINING_ANAEROBIC_BASE_1'
    | 'IMPROVING_ANAEROBIC_BASE_2'
    | 'HIGHLY_IMPROVING_ANAEROBIC_CAPACITY_AND_POWER_3'
    | 'OVERREACHING_4'
    | 'MINOR_FAST_FORCE_BENEFIT_5'
    | 'MAINTAINING_FAST_FORCE_PRODUCTION_6'
    | 'MAINTAINING_ANAEROBIC_POWER_7'
    | 'IMPROVING_ANAEROBIC_CAPACITY_AND_POWER_8'
    | 'MINOR_FAST_FORCE_BENEFIT_9'
    | 'MAINTAINING_ECONOMY_AND_ANAEROBIC_BASE_10'
    | 'IMPROVING_ECONOMY_AND_ANAEROBIC_BASE_11'
    | 'IMPROVING_ANAEROBIC_CAPACITY_AND_SPEED_12'
    | 'HIGHLY_IMPROVING_ANAEROBIC_CAPACITY_AND_SPEED_13'
    | 'HIGHLY_IMPROVING_ECONOMY_AND_ANAEROBIC_BASE_14'
    | 'MINOR_ANAEROBIC_BENEFIT_15'
    | 'OVERREACHING_SPEED_16'
  /**
   * The training stress score for the activity
   */
  trainingStressScore?: number
  /**
   * The intensity factor for the activity, in percent
   */
  intensityFactor?: number
  /**
   * Pool length; its unit is provided by unitOfPoolLength.
   */
  poolLength?: number
  /**
   * Number of active lengths recorded for the activity
   */
  numberOfActiveLengths?: number
  /**
   * Unit used for the pool length value
   */
  unitOfPoolLength?: UnitDTO
  /**
   * Total number of strokes recorded for the activity
   */
  totalNumberOfStrokes?: number
  /**
   * Average number of strokes per active length for the activity
   */
  averageStrokes?: number
  /**
   * Minimum number of strokes recorded for a length in the activity
   */
  minimumStrokes?: number
  /**
   * The average SWOLF for the activity
   */
  averageSWOLF?: number
  /**
   * The minimum SWOLF for the activity
   */
  minSWOLF?: number
  /**
   * The stroke distance for the activity, in meters
   */
  strokeDistance?: number
  /**
   * Number of standing periods recorded for the activity
   */
  standingCount?: number
  /**
   * The seated time for the activity, in seconds
   */
  seatedTime?: number
  /**
   * The standing time for the activity, in seconds
   */
  standingTime?: number
  /**
   * The maximum seated power for the activity, in watts
   */
  maxSeatedPower?: number
  /**
   * The maximum standing power for the activity, in watts
   */
  maxStandingPower?: number
  /**
   * The average seated power for the activity, in watts
   */
  averageSeatedPower?: number
  /**
   * The average standing power for the activity, in watts
   */
  averageStandingPower?: number
  /**
   * The maximum seated cadence for the activity, in revolutions per minute
   */
  maxSeatedCadence?: number
  /**
   * The maximum standing cadence for the activity, in revolutions per minute
   */
  maxStandingCadence?: number
  /**
   * The average seated cadence for the activity, in revolutions per minute
   */
  averageSeatedCadence?: number
  /**
   * The average standing cadence for the activity, in revolutions per minute
   */
  averageStandingCadence?: number
  /**
   * The left power phase start for the activity
   */
  leftPowerPhaseStart?: number
  /**
   * The left power phase end for the activity
   */
  leftPowerPhaseEnd?: number
  /**
   * The left power phase arc length for the activity
   */
  leftPowerPhaseArcLength?: number
  /**
   * The left power phase arc center for the activity
   */
  leftPowerPhaseArcCenter?: number
  /**
   * The left power phase peak start for the activity
   */
  leftPowerPhasePeakStart?: number
  /**
   * The left power phase peak end for the activity
   */
  leftPowerPhasePeakEnd?: number
  /**
   * The left power phase peak arc length for the activity
   */
  leftPowerPhasePeakArcLength?: number
  /**
   * The left power phase peak arc center for the activity
   */
  leftPowerPhasePeakArcCenter?: number
  /**
   * The left platform center offset for the activity, in millimeters
   */
  leftPlatformCenterOffset?: number
  /**
   * The right power phase start for the activity
   */
  rightPowerPhaseStart?: number
  /**
   * The right power phase end for the activity
   */
  rightPowerPhaseEnd?: number
  /**
   * The right power phase arc length for the activity
   */
  rightPowerPhaseArcLength?: number
  /**
   * The right power phase arc center for the activity
   */
  rightPowerPhaseArcCenter?: number
  /**
   * The right power phase peak start for the activity
   */
  rightPowerPhasePeakStart?: number
  /**
   * The right power phase peak end for the activity
   */
  rightPowerPhasePeakEnd?: number
  /**
   * The right power phase peak arc length for the activity
   */
  rightPowerPhasePeakArcLength?: number
  /**
   * The right power phase peak arc center for the activity
   */
  rightPowerPhasePeakArcCenter?: number
  /**
   * The right platform center offset for the activity, in millimeters
   */
  rightPlatformCenterOffset?: number
  /**
   * The lactate threshold heart rate for the activity, in beats per minute
   */
  lactateThresholdHeartRate?: number
  /**
   * The average G-force for the activity, in g
   */
  averageGforce?: number
  /**
   * The maximum G-force for the activity, in g
   */
  maxGforce?: number
  /**
   * The vertical ratio for the activity
   */
  verticalRatio?: number
  /**
   * The lactate threshold speed for the activity, in meters per second
   */
  lactateThresholdSpeed?: number
  /**
   * The direct functional threshold power for the activity, in watts
   */
  directFunctionalThresholdPower?: number
  /**
   * Distance traveled per stroke for the activity, in meters
   */
  distancePerStroke?: number
  /**
   * The stroke cadence for the activity, in strokes per minute
   */
  strokeCadence?: number
  /**
   * The average stroke distance for the activity, in meters
   */
  averageStrokeDistance?: number
  /**
   * The average stroke cadence for the activity, in strokes per minute
   */
  averageStrokeCadence?: number
  /**
   * The maximum stroke cadence for the activity, in strokes per minute
   */
  maxStrokeCadence?: number
  /**
   * The rider position for the activity
   */
  riderPosition?: number
  /**
   * Numeric representation of the activity start time in GMT
   */
  startTimeGMTDoubleValue?: number
  /**
   * Total number of exercise repetitions recorded for the activity
   */
  totalExerciseReps?: number
  /**
   * Total number of repetitions recorded for the activity
   */
  totalReps?: number
  /**
   * Total number of exercise sets recorded for the activity
   */
  totalSets?: number
  /**
   * Number of active exercise sets recorded for the activity
   */
  activeSets?: number
  /**
   * Maximum repetition count recorded for a lap in the activity
   */
  maxLapRepCount?: number
  /**
   * The maximum depth for the activity, in meters
   */
  maxDepth?: number
  /**
   * The average depth for the activity, in meters
   */
  averageDepth?: number
  /**
   * The surface interval for the activity, in seconds
   */
  surfaceInterval?: number
  /**
   * The start CNS for the activity
   */
  startCns?: number
  /**
   * The end CNS for the activity
   */
  endCns?: number
  /**
   * The start N2 for the activity
   */
  startN2?: number
  /**
   * The end N2 for the activity
   */
  endN2?: number
  /**
   * The bottom time for the activity, in seconds
   */
  bottomTime?: number
  /**
   * The maximum bottom time for the activity, in seconds
   */
  maxBottomTime?: number
  /**
   * The dive alert associated with the activity
   */
  diveAlert?: string
  /**
   * The end latitude for the activity, in decimal degrees
   */
  endLatitude?: number
  /**
   * The end longitude for the activity, in decimal degrees
   */
  endLongitude?: number
  /**
   * Indicates whether the dive was a decompression dive.
   */
  isDecoDive?: boolean
  /**
   * Number of floors climbed during the activity
   */
  floorsClimbed?: number
  /**
   * Number of floors descended during the activity
   */
  floorsDescended?: number
  /**
   * The average vertical speed for the activity, in meters per second
   */
  avgVerticalSpeed?: number
  /**
   * The maximum vertical speed for the activity, in meters per second
   */
  maxVerticalSpeed?: number
  /**
   * The perceived workout effort for the activity
   */
  perceivedWorkoutEffort?: number
  /**
   * The flow for the activity
   */
  flow?: number
  /**
   * The grit for the activity
   */
  grit?: number
  /**
   * Number of jumps recorded for the activity
   */
  jumpCount?: number
  /**
   * The calories estimated for the activity, in kilocalories
   */
  caloriesEstimated?: number
  /**
   * The calories consumed for the activity, in kilocalories
   */
  caloriesConsumed?: number
  /**
   * The water estimated for the activity, in milliliters
   */
  waterEstimated?: number
  /**
   * The water consumed for the activity, in milliliters
   */
  waterConsumed?: number
  /**
   * The minimum respiration rate for the activity, in breaths per minute
   */
  minRespirationRate?: number
  /**
   * The maximum respiration rate for the activity, in breaths per minute
   */
  maxRespirationRate?: number
  /**
   * The average respiration rate for the activity, in breaths per minute
   */
  avgRespirationRate?: number
  /**
   * Training-effect label for the activity
   */
  trainingEffectLabel?: string
  /**
   * The activity training load for the activity
   */
  activityTrainingLoad?: number
  /**
   * The average flow for the activity
   */
  avgFlow?: number
  /**
   * The average grit for the activity
   */
  avgGrit?: number
  /**
   * The minimum activity lap duration for the activity, in seconds
   */
  minActivityLapDuration?: number
  /**
   * The start stress for the activity
   */
  startStress?: number
  /**
   * The end stress for the activity
   */
  endStress?: number
  /**
   * The difference stress for the activity
   */
  differenceStress?: number
  /**
   * The direct workout feel for the activity
   */
  directWorkoutFeel?: number
  /**
   * The direct workout RPE for the activity
   */
  directWorkoutRpe?: number
  /**
   * The direct workout compliance score for the activity
   */
  directWorkoutComplianceScore?: number
  /**
   * The target duration for the activity, in seconds
   */
  targetDuration?: number
  /**
   * The target distance for the activity, in meters
   */
  targetDistance?: number
  /**
   * The target average speed for the activity, in meters per second
   */
  targetAverageSpeed?: number
  /**
   * Total moderate intensity activity time, in minutes.
   */
  moderateIntensityMinutes?: number
  /**
   * Total vigorous intensity activity time, in minutes.
   */
  vigorousIntensityMinutes?: number
  /**
   * Total number of steps recorded for the activity
   */
  steps?: number
  /**
   * The average stress for the activity
   */
  avgStress?: number
  /**
   * The maximum stress for the activity
   */
  maxStress?: number
  /**
   * The recovery heart rate for the activity, in beats per minute
   */
  recoveryHeartRate?: number
  /**
   * The begin potential stamina for the activity
   */
  beginPotentialStamina?: number
  /**
   * The end potential stamina for the activity
   */
  endPotentialStamina?: number
  /**
   * The minimum available stamina for the activity
   */
  minAvailableStamina?: number
  /**
   * The gain solar activity time for the activity, in seconds
   */
  gainSolarActivityTime?: number
  /**
   * The average solar charge percent for the activity
   */
  avgSolarChargePercent?: number
  /**
   * The average ebike assist level percent for the activity
   */
  avgEbikeAssistLevelPercent?: number
  /**
   * The average grade adjusted speed for the activity, in meters per second
   */
  avgGradeAdjustedSpeed?: number
  /**
   * The average wheelchair cadence for the activity, in strokes per minute
   */
  avgWheelchairCadence?: number
  /**
   * The maximum wheelchair cadence for the activity, in strokes per minute
   */
  maxWheelchairCadence?: number
  /**
   * The average jump rope cadence for the activity, in repetitions per minute
   */
  avgJumpRopeCadence?: number
  /**
   * The maximum jump rope cadence for the activity, in repetitions per minute
   */
  maxJumpRopeCadence?: number
  /**
   * The average elapsed duration vertical speed for the activity, in meters per second
   */
  avgElapsedDurationVerticalSpeed?: number
  /**
   * The surface type unpaved percentage for the activity
   */
  surfaceTypeUnpavedPercentage?: number
  /**
   * The body battery difference between the start and end of the activity
   */
  differenceBodyBattery?: number
  /**
   * Pack weight (in grams) carried by the user at the start of the activity
   */
  beginPackWeight?: number
  /**
   * Mechanical impact on the body post activity(equivalent distance in meters)
   */
  impactLoad?: number
  /**
   * Step Speed Loss metric for a running activity (distance in meters)
   */
  stepSpeedLoss?: number
  /**
   * Step Speed Loss Percentage metric for a running activity (in percentage)
   */
  stepSpeedLossPercent?: number
  /**
   * Number of dives recorded in the activity
   */
  diveCount?: number
  /**
   * The duration of the longest pool apnea interval, in seconds
   */
  longestPoolApneaInterval?: number
  /**
   * Average force applied in the cycling activity (in Newton)
   */
  avgForce?: number
  /**
   * Max force applied in the cycling activity (in Newton)
   */
  maxForce?: number
  /**
   * Normalized force applied in the cycling activity (in Newton)
   */
  normalizedForce?: number
  /**
   * The total pool apnea breath hold time duration, in seconds
   */
  poolApneaBreathHoldDuration?: number
  /**
   * The average saturated pulse Ox value, in percentage
   */
  avgSpo2?: number
  /**
   * The minimum saturated pulse Ox value, in percentage
   */
  minSpo2?: number
  /**
   * The maximum saturated pulse Ox value, in percentage
   */
  maxSpo2?: number
  /**
   * The carbon offset of the activity expressed in grams of CO2
   */
  carbonOffset?: number
  /**
   * Calories burned due to pack weight during the activity, in kilocalories
   */
  packWeightCalories?: number
  /**
   * Indicates whether the activity was a decompression dive.
   */
  decoDive?: boolean
}

/**
 * Time zone associated with the activity
 */
export interface TimeZoneUnitDTO {
  /**
   * Identifier of the time zone unit
   */
  unitId?: number
  /**
   * Key identifying the time zone unit, such as America/Chicago
   */
  unitKey?: string
  /**
   * The IANA time zone identifier from the activity's local time, such as America/Chicago
   */
  timeZone?: string
}

/**
 * Universally unique identifier
 */
export interface UUID {
  uuid?: string
}

export interface UnitDTO {
  /**
   * Case-sensitive identifier for the unit of the associated measurement, such as kilogram or pound for weight, or meter or foot for distance.
   */
  unitKey?: string
}

export interface UserInfoDto {
  userProfilePk?: number
  displayname?: string
  fullname?: string
  profileImageUrlLarge?: string
  profileImageUrlMedium?: string
  profileImageUrlSmall?: string
}

/**
 * The video game info for eSport activities
 */
export interface VideoGameInfoDTO {
  /**
   * The freeform name of the game
   */
  name?: string
  /**
   * The type of game played
   */
  type?: 'GENERIC_WIN_LOSS_RESULT' | 'GENERIC_PLACEMENT_RESULT' | 'SANDBOX' | 'MATCH_PLAY' | 'BATTLE_ROYALE'
}

export interface ActivitySummaryDTO {
  /**
   * Unique identifier of the activity
   */
  activityId?: number
  /**
   * UUID of the activity
   */
  activityUUID?: UUID
  /**
   * Name of the activity
   */
  activityName?: string
  /**
   * User provided description of the activity
   */
  description?: string
  /**
   * Identifier of the user who owns the activity
   */
  userProfileId?: number
  /**
   * Identifier of the parent activity
   */
  parentId?: number
  /**
   * The parent name associated with the activity
   */
  parentName?: string
  /**
   * Indicates whether this activity is the parent of a multisport activity.
   */
  isMultiSportParent?: boolean
  /**
   * Activity type for the activity, such as running, cycling, or swimming
   */
  activityTypeDTO?: ActivityTypeDTO
  /**
   * Event classification associated with the activity
   */
  eventTypeDTO?: EventTypeDTO
  /**
   * Privacy settings for the activity
   */
  accessControlRuleDTO?: AccessControlRuleDTO
  /**
   * Time zone information used for the activity
   */
  timeZoneUnitDTO?: TimeZoneUnitDTO
  /**
   * Activity metadata, including availability flags and related identifiers
   */
  metadataDTO?: MetadataDTO
  /**
   * Summary measurements and statistics for the activity
   */
  summaryDTO?: SummaryDTO
  /**
   * Location name associated with the activity
   */
  locationName?: string
  /**
   * Dive-specific details recorded for the activity
   */
  diveInfo?: DiveInfoDTO
  /**
   * Summary measurements for the activity splits
   */
  splitSummaries?: SplitSummaryDTO[]
  /**
   * Video game information associated with the activity
   */
  videoGameInfo?: VideoGameInfoDTO
  /**
   * Display unit preferences reported by the device
   */
  deviceDisplayUnitsDTO?: DeviceDisplayUnitsDTO
}

export interface SummarizedActivityDTO {
  /**
   * Unique identifier of the activity
   */
  activityId?: number
  /**
   * Name of the activity
   */
  activityName?: string
  /**
   * User provided description of the activity
   */
  description?: string
  /**
   * Activity start date and time in the local time zone, in yyyy-MM-dd HH:mm:ss format without a UTC offset
   */
  startTimeLocal?: string
  /**
   * Activity start date and time in GMT (UTC), in yyyy-MM-dd HH:mm:ss format without a UTC offset suffix
   */
  startTimeGMT?: string
  /**
   * Activity type for the activity, such as running, cycling, or swimming
   */
  activityType?: ActivityTypeDTO
  /**
   * Event classification associated with the activity
   */
  eventType?: EventTypeDTO
  /**
   * Comment associated with an activity, including its text, author details, creation and update timestamps, likes, and the requesting user's edit and delete permissions
   */
  comments?: ActivityCommentDTO[]
  /**
   * Indicates whether the user marked the activity as a favorite.
   */
  isFavorite?: boolean
  /**
   * Indicates whether the activity is a personal record.
   */
  isPR?: boolean
  /**
   * Indicates whether calories were automatically calculated for the activity.
   */
  isAutoCalcCalories?: boolean
  /**
   * Indicates whether the activity is a parent activity.
   */
  isParent?: boolean
  /**
   * Identifier of the parent activity
   */
  parentId?: number
  /**
   * The distance for the activity, in meters
   */
  distance?: number
  /**
   * The duration for the activity, in seconds
   */
  duration?: number
  /**
   * The elapsed duration for the activity, in seconds
   */
  elapsedDuration?: number
  /**
   * The moving duration for the activity, in seconds
   */
  movingDuration?: number
  /**
   * The elevation gain for the activity, in meters
   */
  elevationGain?: number
  /**
   * The elevation loss for the activity, in meters
   */
  elevationLoss?: number
  /**
   * The average speed for the activity, in meters per second
   */
  averageSpeed?: number
  /**
   * The maximum speed for the activity, in meters per second
   */
  maxSpeed?: number
  /**
   * The start latitude for the activity, in decimal degrees
   */
  startLatitude?: number
  /**
   * The start longitude for the activity, in decimal degrees
   */
  startLongitude?: number
  /**
   * Indicates whether the activity has a polyline.
   */
  hasPolyline?: boolean
  /**
   * Indicates whether the activity has images.
   */
  hasImages?: boolean
  /**
   * Identifier of the activity owner
   */
  ownerId?: number
  /**
   * The owner display name associated with the activity
   */
  ownerDisplayName?: string
  /**
   * The owner full name associated with the activity
   */
  ownerFullName?: string
  /**
   * The owner profile image url small associated with the activity
   */
  ownerProfileImageUrlSmall?: string
  /**
   * The owner profile image url medium associated with the activity
   */
  ownerProfileImageUrlMedium?: string
  /**
   * The owner profile image url large associated with the activity
   */
  ownerProfileImageUrlLarge?: string
  /**
   * The calories for the activity, in kilocalories
   */
  calories?: number
  /**
   * The BMR calories for the activity, in kilocalories
   */
  bmrCalories?: number
  /**
   * The average heart rate for the activity, in beats per minute
   */
  averageHR?: number
  /**
   * The maximum heart rate for the activity, in beats per minute
   */
  maxHR?: number
  /**
   * The average running cadence for the activity, in steps per minute
   */
  averageRunningCadenceInStepsPerMinute?: number
  /**
   * The maximum running cadence for the activity, in steps per minute
   */
  maxRunningCadenceInStepsPerMinute?: number
  /**
   * The maximum lap average run cadence for the activity, in steps per minute
   */
  maxLapAvgRunCadence?: number
  /**
   * The average biking cadence in rev per minute for the activity, in revolutions per minute
   */
  averageBikingCadenceInRevPerMinute?: number
  /**
   * The maximum biking cadence in rev per minute for the activity, in revolutions per minute
   */
  maxBikingCadenceInRevPerMinute?: number
  /**
   * The average swim cadence in strokes per minute for the activity, in strokes per minute
   */
  averageSwimCadenceInStrokesPerMinute?: number
  /**
   * The maximum swim cadence in strokes per minute for the activity, in strokes per minute
   */
  maxSwimCadenceInStrokesPerMinute?: number
  /**
   * The average SWOLF for the activity
   */
  averageSwolf?: number
  /**
   * Number of active lengths recorded for the activity
   */
  activeLengths?: number
  /**
   * Total number of steps recorded for the activity
   */
  steps?: number
  /**
   * Number of likes associated with the activity
   */
  numberOfActivityLikes?: number
  /**
   * Number of comments associated with the activity
   */
  numberOfActivityComments?: number
  /**
   * Indicates whether the current user has liked the activity.
   */
  likedByUser?: boolean
  /**
   * Indicates whether the current user has commented on the activity.
   */
  commentedByUser?: boolean
  /**
   * List of activity like display names values associated with the activity
   */
  activityLikeDisplayNames?: string[]
  /**
   * List of activity like full names values associated with the activity
   */
  activityLikeFullNames?: string[]
  /**
   * List of activity like profile image urls values associated with the activity
   */
  activityLikeProfileImageUrls?: string[]
  /**
   * The requestor relationship associated with the activity
   */
  requestorRelationship?: string
  /**
   * Additional AccessControlRule details for the activity
   */
  privacy?: AccessControlRuleDTO
  /**
   * Pool length, in centimeters. The current implementation returns the normalized value without conversion, even when unitOfPoolLength indicates meters or yards.
   */
  poolLength?: number
  /**
   * Unit used for the pool length value
   */
  unitOfPoolLength?: UnitDTO
  /**
   * Indicates whether the activity has a video.
   */
  hasVideo?: boolean
  /**
   * The video url associated with the activity
   */
  videoUrl?: string
  /**
   * Activity start timestamp, in milliseconds since the Unix epoch (1970-01-01T00:00:00Z)
   */
  beginTimestamp?: number
  /**
   * Identifier of the sport type
   */
  sportTypeId?: number
  /**
   * The average power for the activity, in watts
   */
  avgPower?: number
  /**
   * The maximum power for the activity, in watts
   */
  maxPower?: number
  /**
   * The aerobic training effect for the activity
   */
  aerobicTrainingEffect?: number
  /**
   * The anaerobic training effect for the activity
   */
  anaerobicTrainingEffect?: number
  /**
   * Total number of strokes recorded for the activity
   */
  strokes?: number
  /**
   * The norm power for the activity, in watts
   */
  normPower?: number
  /**
   * The left balance for the activity
   */
  leftBalance?: number
  /**
   * The right balance for the activity
   */
  rightBalance?: number
  /**
   * The average left balance for the activity
   */
  avgLeftBalance?: number
  /**
   * Maximum average power over a 20-minute interval for the activity, in watts
   */
  max20MinPower?: number
  /**
   * The average vertical oscillation for the activity, in centimeters
   */
  avgVerticalOscillation?: number
  /**
   * The average ground contact time for the activity, in milliseconds
   */
  avgGroundContactTime?: number
  /**
   * Average stride length for the activity, in centimeters
   */
  avgStrideLength?: number
  /**
   * The average fractional cadence for the activity, in steps per minute
   */
  avgFractionalCadence?: number
  /**
   * The maximum fractional cadence for the activity, in steps per minute
   */
  maxFractionalCadence?: number
  /**
   * The training stress score for the activity
   */
  trainingStressScore?: number
  /**
   * The intensity factor for the activity, expressed as a percentage in decimal form (for example, 0.80 represents 80%)
   */
  intensityFactor?: number
  /**
   * The vo2max value for the activity
   */
  vO2MaxValue?: number
  /**
   * The average vertical ratio for the activity
   */
  avgVerticalRatio?: number
  /**
   * The average ground contact balance for the activity
   */
  avgGroundContactBalance?: number
  /**
   * Lactate-threshold heart rate for the activity, in beats per minute
   */
  lactateThresholdBpm?: number
  /**
   * The lactate threshold speed for the activity, in centimeters per millisecond
   */
  getlactateThresholdSpeed?: number
  /**
   * The maximum FTP for the activity, in watts
   */
  maxFtp?: number
  /**
   * The average stroke distance for the activity, in centimeters
   */
  avgStrokeDistance?: number
  /**
   * The average stroke cadence for the activity, in strokes per minute
   */
  avgStrokeCadence?: number
  /**
   * The maximum stroke cadence for the activity, in strokes per minute
   */
  maxStrokeCadence?: number
  /**
   * Average number of strokes per active length for the activity
   */
  avgStrokes?: number
  /**
   * Minimum number of strokes recorded for a length in the activity
   */
  minStrokes?: number
  /**
   * The minimum temperature for the activity, in degrees Celsius
   */
  minTemperature?: number
  /**
   * The maximum temperature for the activity, in degrees Celsius
   */
  maxTemperature?: number
  /**
   * The minimum elevation for the activity, in meters
   */
  minElevation?: number
  /**
   * The maximum elevation for the activity, in meters
   */
  maxElevation?: number
  /**
   * The average elevation of the activity in meters
   */
  avgElevation?: number
  /**
   * The average double cadence for the activity, in steps per minute
   */
  avgDoubleCadence?: number
  /**
   * The maximum double cadence for the activity, in steps per minute
   */
  maxDoubleCadence?: number
  /**
   * Indicates whether elevation data for the activity has been corrected.
   */
  isElevationCorrected?: boolean
  /**
   * List of SummarizedExerciseSet values associated with the activity
   */
  summarizedExerciseSets?: SummarizedExerciseSet[]
  /**
   * The maximum depth for the activity, in centimeters
   */
  maxDepth?: number
  /**
   * The average depth for the activity, in centimeters
   */
  avgDepth?: number
  /**
   * The surface interval for the activity, in milliseconds
   */
  surfaceInterval?: number
  /**
   * The start N2 for the activity
   */
  startN2?: number
  /**
   * The end N2 for the activity
   */
  endN2?: number
  /**
   * The start CNS for the activity
   */
  startCns?: number
  /**
   * The end CNS for the activity
   */
  endCns?: number
  /**
   * Indicates whether the dive was a decompression dive.
   */
  isDecoDive?: boolean
  /**
   * Additional SummarizedDiveInfo details for the activity
   */
  summarizedDiveInfo?: SummarizedDiveInfoDTO
  /**
   * Number of dives recorded in the activity
   */
  diveCount?: number
  /**
   * List of UserInfoDto values associated with the activity
   */
  activityLikeAuthors?: UserInfoDto[]
  /**
   * The average vertical speed for the activity, in meters per second
   */
  avgVerticalSpeed?: number
  /**
   * The maximum vertical speed for the activity, in meters per second
   */
  maxVerticalSpeed?: number
  /**
   * Number of floors climbed during the activity
   */
  floorsClimbed?: number
  /**
   * Number of floors descended during the activity
   */
  floorsDescended?: number
  /**
   * The manufacturer associated with the activity
   */
  manufacturer?: string
  /**
   * Sequential dive number for the activity
   */
  diveNumber?: number
  /**
   * Location name associated with the activity
   */
  locationName?: string
  /**
   * The bottom time for the activity, in seconds
   */
  bottomTime?: number
  /**
   * Number of laps recorded for the activity
   */
  lapCount?: number
  /**
   * The end latitude for the activity, in decimal degrees
   */
  endLatitude?: number
  /**
   * The end longitude for the activity, in decimal degrees
   */
  endLongitude?: number
  /**
   * The flow for the activity
   */
  flow?: number
  /**
   * The grit for the activity
   */
  grit?: number
  /**
   * Number of jumps recorded for the activity
   */
  jumpCount?: number
  /**
   * The energy expenditure estimated for the activity, in kilojoules
   */
  caloriesEstimated?: number
  /**
   * The energy consumed for the activity, in kilojoules
   */
  caloriesConsumed?: number
  /**
   * The water estimated for the activity, in milliliters
   */
  waterEstimated?: number
  /**
   * The water consumed for the activity, in milliliters
   */
  waterConsumed?: number
  /**
   * Maximum average power over a 1-second interval for the activity, in watts
   */
  maxAvgPower_1?: number
  /**
   * Maximum average power over a 2-second interval for the activity, in watts
   */
  maxAvgPower_2?: number
  /**
   * Maximum average power over a 5-second interval for the activity, in watts
   */
  maxAvgPower_5?: number
  /**
   * Maximum average power over a 10-second interval for the activity, in watts
   */
  maxAvgPower_10?: number
  /**
   * Maximum average power over a 20-second interval for the activity, in watts
   */
  maxAvgPower_20?: number
  /**
   * Maximum average power over a 30-second interval for the activity, in watts
   */
  maxAvgPower_30?: number
  /**
   * Maximum average power over a 60-second interval for the activity, in watts
   */
  maxAvgPower_60?: number
  /**
   * Maximum average power over a 120-second interval for the activity, in watts
   */
  maxAvgPower_120?: number
  /**
   * Maximum average power over a 300-second interval for the activity, in watts
   */
  maxAvgPower_300?: number
  /**
   * Maximum average power over a 600-second interval for the activity, in watts
   */
  maxAvgPower_600?: number
  /**
   * Maximum average power over a 1200-second interval for the activity, in watts
   */
  maxAvgPower_1200?: number
  /**
   * Maximum average power over a 1800-second interval for the activity, in watts
   */
  maxAvgPower_1800?: number
  /**
   * Maximum average power over a 3600-second interval for the activity, in watts
   */
  maxAvgPower_3600?: number
  /**
   * Maximum average power over a 7200-second interval for the activity, in watts
   */
  maxAvgPower_7200?: number
  /**
   * Maximum average power over a 18000-second interval for the activity, in watts
   */
  maxAvgPower_18000?: number
  /**
   * Indicates whether the activity is excluded from power curve reports.
   */
  excludeFromPowerCurveReports?: boolean
  /**
   * Total number of exercise sets recorded for the activity
   */
  totalSets?: number
  /**
   * Number of active exercise sets recorded for the activity
   */
  activeSets?: number
  /**
   * Total number of repetitions recorded for the activity
   */
  totalReps?: number
  /**
   * The minimum respiration rate for the activity, in breaths per minute
   */
  minRespirationRate?: number
  /**
   * The maximum respiration rate for the activity, in breaths per minute
   */
  maxRespirationRate?: number
  /**
   * The average respiration rate for the activity, in breaths per minute
   */
  avgRespirationRate?: number
  /**
   * Training-effect label for the activity
   */
  trainingEffectLabel?: string
  /**
   * The activity training load for the activity
   */
  activityTrainingLoad?: number
  /**
   * The average flow for the activity
   */
  avgFlow?: number
  /**
   * The average grit for the activity
   */
  avgGrit?: number
  /**
   * The minimum activity lap duration for the activity, in seconds
   */
  minActivityLapDuration?: number
  /**
   * The average stress for the activity
   */
  avgStress?: number
  /**
   * The start stress for the activity
   */
  startStress?: number
  /**
   * The end stress for the activity
   */
  endStress?: number
  /**
   * The difference stress for the activity
   */
  differenceStress?: number
  /**
   * The maximum stress for the activity
   */
  maxStress?: number
  /**
   * Aerobic training-effect classification for the activity
   */
  aerobicTrainingEffectMessage?: string
  /**
   * Anaerobic training-effect classification for the activity
   */
  anaerobicTrainingEffectMessage?: string
  /**
   * Summary measurements for the activity splits
   */
  splitSummaries?: MinimalSplitSummaryDTO[]
  /**
   * Indicates whether the activity was recorded manually.
   */
  isManualActivity?: boolean
  /**
   * The moderate intensity duration for the activity, in minutes
   */
  moderateIntensityMinutes?: number
  /**
   * The vigorous intensity duration for the activity, in minutes
   */
  vigorousIntensityMinutes?: number
  /**
   * The maximum bottom time for the activity, in seconds
   */
  maxBottomTime?: number
  /**
   * Indicates whether the activity has a Seed Firstbeat profile.
   */
  hasSeedFirstbeatProfile?: boolean
  /**
   * The average grade adjusted speed for the activity, in meters per second
   */
  avgGradeAdjustedSpeed?: number
  /**
   * The average wheelchair cadence for the activity, in strokes per minute
   */
  avgWheelchairCadence?: number
  /**
   * The maximum wheelchair cadence for the activity, in strokes per minute
   */
  maxWheelchairCadence?: number
  /**
   * The average jump rope cadence for the activity, in repetitions per minute
   */
  avgJumpRopeCadence?: number
  /**
   * The maximum jump rope cadence for the activity, in repetitions per minute
   */
  maxJumpRopeCadence?: number
  /**
   * The name of the game being played
   */
  gameName?: string
  /**
   * The difference body battery for the activity
   */
  differenceBodyBattery?: number
  /**
   * The type of game the activity was recorded
   */
  gameType?: 'GENERIC_WIN_LOSS_RESULT' | 'GENERIC_PLACEMENT_RESULT' | 'SANDBOX' | 'MATCH_PLAY' | 'BATTLE_ROYALE'
  /**
   * Pack weight carried by the user at the start of the activity, in grams
   */
  beginPackWeight?: number
  /**
   * the time, in seconds, for the fastest 1000 meter split in the activity
   */
  fastestSplit_1000?: number
  /**
   * the time, in seconds, for the fastest mile split in the activity
   */
  fastestSplit_1609?: number
  /**
   * the time, in seconds, for the fastest 5k meter split in the activity
   */
  fastestSplit_5000?: number
  /**
   * the time, in seconds, for the fastest 10k meter split in the activity
   */
  fastestSplit_10000?: number
  /**
   * the time, in seconds, for the fastest half marathon split in the activity
   */
  fastestSplit_21098?: number
  /**
   * the time, in seconds, for the fastest marathon split in the activity
   */
  fastestSplit_42195?: number
  /**
   * the time, in seconds, for the fastest 40k split in the activity
   */
  fastestSplit_40000?: number
  /**
   * the time, in seconds, for the fastest 100 meter split in the activity
   */
  fastestSplit_100?: number
  /**
   * the time, in seconds, for the fastest 400 meter split in the activity
   */
  fastestSplit_400?: number
  /**
   * the time, in seconds, for the fastest 750 meter split in the activity
   */
  fastestSplit_750?: number
  /**
   * the time, in seconds, for the fastest 1500 meter split in the activity
   */
  fastestSplit_1500?: number
  /**
   * the time, in seconds, for the fastest 100 yard (actually 91.44 meter) split in the activity
   */
  fastestSplit_91?: number
  /**
   * the time, in seconds, for the fastest 500 yard (actually 457.2 meter) split in the activity
   */
  fastestSplit_457?: number
  /**
   * the time, in seconds, for the fastest 1000 yard (actually 914.4 meter) split in the activity
   */
  fastestSplit_914?: number
  /**
   * the time, in seconds, for the fastest 1650 yard (actually 1508.76 meter) split in the activity
   */
  fastestSplit_1508?: number
  /**
   * Impact on the body post activity(equivalent distance in meters)
   */
  impactLoad?: number
  /**
   * Step Speed Loss metric for a running activity, expressed as a distance in centimeters
   */
  avgStepSpeedLoss?: number
  /**
   * Step Speed Loss Percentage metric for a running activity, expressed as a percentage
   */
  avgStepSpeedLossPercent?: number
  /**
   * The number of seconds that the user's heart rate was in zone 1
   */
  hrTimeInZone_1?: number
  /**
   * The number of seconds that the user's heart rate was in zone 2
   */
  hrTimeInZone_2?: number
  /**
   * The number of seconds that the user's heart rate was in zone 3
   */
  hrTimeInZone_3?: number
  /**
   * The number of seconds that the user's heart rate was in zone 4
   */
  hrTimeInZone_4?: number
  /**
   * The number of seconds that the user's heart rate was in zone 5
   */
  hrTimeInZone_5?: number
  /**
   * The number of seconds that the user's power was in zone 1
   */
  powerTimeInZone_1?: number
  /**
   * The number of seconds that the user's power was in zone 2
   */
  powerTimeInZone_2?: number
  /**
   * The number of seconds that the user's power was in zone 3
   */
  powerTimeInZone_3?: number
  /**
   * The number of seconds that the user's power was in zone 4
   */
  powerTimeInZone_4?: number
  /**
   * The number of seconds that the user's power was in zone 5
   */
  powerTimeInZone_5?: number
  /**
   * The number of seconds that the user's power was in zone 6
   */
  powerTimeInZone_6?: number
  /**
   * The number of seconds that the user's power was in zone 7
   */
  powerTimeInZone_7?: number
  /**
   * The duration of the longest pool apnea interval, in seconds
   */
  longestPoolApneaInterval?: number
  /**
   * Average force applied in the cycling activity (in Newton)
   */
  avgForce?: number
  /**
   * Max force applied in the cycling activity (in Newton)
   */
  maxForce?: number
  /**
   * Normalized force applied in the cycling activity (in Newton)
   */
  normalizedForce?: number
  /**
   * The total pool apnea breath hold time duration, in seconds
   */
  poolApneaBreathHoldDuration?: number
  /**
   * Display unit preferences reported by the device
   */
  deviceDisplayUnitsDTO?: DeviceDisplayUnitsDTO
  /**
   * Activity end date and time in GMT (UTC), in yyyy-MM-dd HH:mm:ss format without a UTC offset suffix
   */
  endTimeGMT?: string
  /**
   * Indicates whether the dive meets the qualifying criteria.
   */
  qualifyingDive?: boolean
  /**
   * UUIDs of multiDayActivities, the activity is part of
   */
  multiDayActivityUUIDs?: string[]
  /**
   * UUID of the activity
   */
  activityUUID?: string
  /**
   * The carbon offset achieved with this activity expressed in grams
   */
  carbonOffset?: number
  /**
   * Calories burned due to pack weight during the activity, in kilocalories
   */
  packWeightCalories?: number
  /**
   * The time spent in the standing position during a cycling activity, in seconds
   */
  standingTime?: number
  /**
   * The time spent in the seated position during a cycling activity, in seconds
   */
  seatedTime?: number
  /**
   * The max power while in the standing position during a cycling activity, in watts
   */
  maxStandingPower?: number
  /**
   * The max power while in the seated position during a cycling activity, in watts
   */
  maxSeatedPower?: number
  /**
   * The average power while in the standing position during a cycling activity, in watts
   */
  avgStandingPower?: number
  /**
   * The average power while in the seated position during a cycling activity, in watts
   */
  avgSeatedPower?: number
  /**
   * Indicates whether the activity is a parent activity.
   */
  parent?: boolean
  /**
   * Indicates whether the activity was a decompression dive.
   */
  decoDive?: boolean
  /**
   * Indicates whether elevation data for the activity has been corrected.
   */
  elevationCorrected?: boolean
  /**
   * Indicates whether the activity is a personal record.
   */
  pr?: boolean
  /**
   * Indicates whether the activity was recorded manually.
   */
  manualActivity?: boolean
  /**
   * Indicates whether the user marked the activity as a favorite.
   */
  favorite?: boolean
  /**
   * Indicates whether calories were automatically calculated for the activity.
   */
  autoCalcCalories?: boolean
}

/**
 * GET /activity-service/activity/{activityId}
 * Activity summary, metadata, measurements, and split summary for one activity.
 */
export type GetActivitySummaryResponse = ActivitySummaryDTO

/**
 * GET /activitylist-service/activities/search/activities
 * Filters and pagination for searching activities.
 */
export interface ActivitySearchParams {
  /**
   * Zero-based offset of the first activity to return. Defaults to 0.
   */
  start?: number
  /**
   * Maximum number of activities to return. Defaults to 99.
   */
  limit?: number
  /**
   * Filter by favorite status: 1 returns favorites, 0 returns non-favorites, and -1 applies no favorite filter. Defaults to -1.
   */
  favorite?: number
  /**
   * Sort direction: asc for ascending or desc for descending, case-insensitive. Defaults to desc.
   */
  sortOrder?: string
  /**
   * Whether to exclude child activities that have a parent activity, such as individual legs of a multisport activity. Defaults to true.
   */
  excludeChildren?: boolean
  /**
   * Activity field to sort by, such as name, distance, or duration. Defaults to startLocal, the activity's local start date and time.
   */
  sortBy?: string
  /**
   * Text to search for in activity names and descriptions.
   */
  search?: string
  /**
   * Parent activity type key to include, such as running or cycling. Must identify a parent type, not a subtype.
   */
  activityType?: string
  /**
   * Activity subtype key to include. Must identify a child type and, if activityType is also provided, belong to that parent type. For example, use activitySubType=trail_running with activityType=running, or activitySubType=road_cycling with activityType=cycling.
   */
  activitySubType?: string
  /**
   * Event classification key to include, such as race, training, recreation, fitness, specialEvent, or uncategorized.
   */
  eventType?: string
  /**
   * Inclusive minimum activity distance, in meters.
   */
  minDistance?: number
  /**
   * Inclusive maximum activity distance, in meters.
   */
  maxDistance?: number
  /**
   * Inclusive minimum activity timer duration, in seconds.
   */
  minDuration?: number
  /**
   * Inclusive maximum activity timer duration, in seconds.
   */
  maxDuration?: number
  /**
   * Inclusive minimum total elevation gain for the activity, in meters.
   */
  minElevation?: number
  /**
   * Inclusive maximum total elevation gain for the activity, in meters.
   */
  maxElevation?: number
  /**
   * Inclusive earliest activity start date, based on the activity's local start time, in YYYY-MM-DD format.
   */
  startDate?: string
  /**
   * Inclusive latest activity start date, based on the activity's local start time, in YYYY-MM-DD format.
   */
  endDate?: string
  /**
   * Northern latitude boundary of the bounding box for activity start locations, in decimal degrees. Provide all four latitude and longitude boundaries to apply this filter.
   */
  upperLatitude?: number
  /**
   * Eastern longitude boundary of the bounding box for activity start locations, in decimal degrees. Provide all four latitude and longitude boundaries to apply this filter.
   */
  rightLongitude?: number
  /**
   * Southern latitude boundary of the bounding box for activity start locations, in decimal degrees. Provide all four latitude and longitude boundaries to apply this filter.
   */
  lowerLatitude?: number
  /**
   * Western longitude boundary of the bounding box for activity start locations, in decimal degrees. Provide all four latitude and longitude boundaries to apply this filter.
   */
  leftLongitude?: number
  /**
   * Inclusive lower bound on the dive activity's maximum depth, in centimeters.
   */
  lowerMaxDepth?: number
  /**
   * Inclusive upper bound on the dive activity's maximum depth, in centimeters.
   */
  upperMaxDepth?: number
  /**
   * Filter by decompression dive status: true returns decompression dives and false returns activities marked as non-decompression dives. Omit to apply no decompression dive filter.
   */
  decoDive?: boolean
  /**
   * Inclusive minimum total elapsed activity duration, including paused time, in seconds.
   */
  minElapsedDuration?: number
  /**
   * Inclusive maximum total elapsed activity duration, including paused time, in seconds.
   */
  maxElapsedDuration?: number
  /**
   * Inclusive minimum dive bottom time, in seconds.
   */
  minBottomTime?: number
  /**
   * Inclusive maximum dive bottom time, in seconds.
   */
  maxBottomTime?: number
  /**
   * Inclusive minimum average activity power, in watts.
   */
  minAvgPower?: number
  /**
   * Activity subtype keys to exclude. Repeat this query parameter to exclude multiple subtypes.
   */
  excludedActivitySubType?: string[]
  /**
   * Activity fields that must have a non-null value for an activity to be included. Repeat this query parameter to require multiple fields; all specified fields must be present.
   */
  requiredField?: string[]
}

/** Response of GET /activitylist-service/activities/search/activities. */
export type SearchActivitiesResponse = SummarizedActivityDTO[]

/** Path parameters for GET /activity-service/activity/{activityId}. */
export interface GetActivitySummaryPathParams {
  /** The ID of the activity to retrieve the summary */
  activityId: number
}
