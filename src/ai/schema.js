export const MARKET_REGIMES = [
  "EARLY_ACCUMULATION",
  "PRE_BREAKOUT",
  "BREAKOUT",
  "BREAKOUT_RETEST",
  "MOMENTUM_CONTINUATION",
  "PARABOLIC_EXHAUSTION",
  "DISTRIBUTION",
  "COLLAPSE",
  "UNCLEAR",
];

export const MOVE_QUALITIES = [
  "ORGANIC",
  "PROBABLY_ORGANIC",
  "MIXED",
  "PROBABLY_MANIPULATED",
  "MANIPULATED_OR_UNSAFE",
  "INSUFFICIENT_DATA",
];

export const FINAL_ACTIONS = ["BUY", "WATCH", "AVOID", "REDUCE", "EXIT"];

export const RISK_LEVELS = ["LOW", "MEDIUM", "HIGH", "EXTREME"];

export const ENTRY_STYLES = [
  "IMMEDIATE",
  "PULLBACK",
  "RETEST",
  "BREAKOUT_CONFIRMATION",
  "NO_ENTRY",
];

export const PRIMARY_DRIVERS = [
  "VOLUME",
  "LIQUIDITY",
  "SOCIAL_HYPE",
  "WALLET_ACCUMULATION",
  "BREAKOUT_STRUCTURE",
  "SHORT_COVERING",
  "UNKNOWN",
];

export const STAGE_ASSESSMENTS = ["EARLY", "MID", "LATE", "POST_SPIKE", "UNCLEAR"];

const isString = (value) => typeof value === "string";
const isNonEmptyString = (value) => isString(value) && value.trim().length > 0;
const isFiniteNumber = (value) => typeof value === "number" && Number.isFinite(value);
const isStringArray = (value) =>
  Array.isArray(value) && value.every((item) => isString(item));
const isEnum = (value, allowed) => isString(value) && allowed.includes(value);
const isUnitScore = (value) => isFiniteNumber(value) && value >= 0 && value <= 1;

/**
 * Validates a candidate object against the strict analysis output schema.
 * Never throws — always returns a { valid, errors } result so callers
 * (real or heuristic "AI" producers alike) can be handled without crashing.
 */
export const validateAnalysisResult = (candidate) => {
  const errors = [];
  const fail = (path, message) => errors.push({ path, message });

  if (candidate === null || typeof candidate !== "object" || Array.isArray(candidate)) {
    return { valid: false, errors: [{ path: "$", message: "Result is not an object" }] };
  }

  if (!isNonEmptyString(candidate.token)) fail("token", "token must be a non-empty string");
  if (!isNonEmptyString(candidate.timestamp_utc))
    fail("timestamp_utc", "timestamp_utc must be a non-empty string");

  if (!isEnum(candidate.market_regime, MARKET_REGIMES))
    fail("market_regime", `market_regime must be one of ${MARKET_REGIMES.join(", ")}`);
  if (!isEnum(candidate.move_quality, MOVE_QUALITIES))
    fail("move_quality", `move_quality must be one of ${MOVE_QUALITIES.join(", ")}`);
  if (!isEnum(candidate.final_action, FINAL_ACTIONS))
    fail("final_action", `final_action must be one of ${FINAL_ACTIONS.join(", ")}`);
  if (!isEnum(candidate.risk_level, RISK_LEVELS))
    fail("risk_level", `risk_level must be one of ${RISK_LEVELS.join(", ")}`);

  if (!isUnitScore(candidate.confidence)) fail("confidence", "confidence must be a number between 0 and 1");
  ["tradability_score", "timing_score", "liquidity_score", "structure_score", "safety_score"].forEach(
    (key) => {
      if (!isUnitScore(candidate[key])) fail(key, `${key} must be a number between 0 and 1`);
    }
  );

  if (!isStringArray(candidate.reasons_for)) fail("reasons_for", "reasons_for must be an array of strings");
  if (!isStringArray(candidate.reasons_against))
    fail("reasons_against", "reasons_against must be an array of strings");
  if (!isStringArray(candidate.data_gaps)) fail("data_gaps", "data_gaps must be an array of strings");

  const entryPlan = candidate.entry_plan;
  if (entryPlan === null || typeof entryPlan !== "object") {
    fail("entry_plan", "entry_plan must be an object");
  } else {
    if (!isEnum(entryPlan.entry_style, ENTRY_STYLES))
      fail("entry_plan.entry_style", `entry_style must be one of ${ENTRY_STYLES.join(", ")}`);
    if (!isFiniteNumber(entryPlan.entry_zone_low))
      fail("entry_plan.entry_zone_low", "entry_zone_low must be a number");
    if (!isFiniteNumber(entryPlan.entry_zone_high))
      fail("entry_plan.entry_zone_high", "entry_zone_high must be a number");
    if (!isNonEmptyString(entryPlan.entry_rationale))
      fail("entry_plan.entry_rationale", "entry_rationale must be a non-empty string");
  }

  const riskPlan = candidate.risk_plan;
  if (riskPlan === null || typeof riskPlan !== "object") {
    fail("risk_plan", "risk_plan must be an object");
  } else {
    if (!isFiniteNumber(riskPlan.max_position_pct))
      fail("risk_plan.max_position_pct", "max_position_pct must be a number");
    if (!isFiniteNumber(riskPlan.stop_loss)) fail("risk_plan.stop_loss", "stop_loss must be a number");
    if (!isStringArray(riskPlan.invalidation_conditions))
      fail("risk_plan.invalidation_conditions", "invalidation_conditions must be an array of strings");
  }

  const profitPlan = candidate.profit_plan;
  if (profitPlan === null || typeof profitPlan !== "object") {
    fail("profit_plan", "profit_plan must be an object");
  } else {
    if (!isFiniteNumber(profitPlan.take_profit_1))
      fail("profit_plan.take_profit_1", "take_profit_1 must be a number");
    if (!isFiniteNumber(profitPlan.take_profit_2))
      fail("profit_plan.take_profit_2", "take_profit_2 must be a number");
    if (!isStringArray(profitPlan.scale_out_logic))
      fail("profit_plan.scale_out_logic", "scale_out_logic must be an array of strings");
  }

  const interpretation = candidate.market_interpretation;
  if (interpretation === null || typeof interpretation !== "object") {
    fail("market_interpretation", "market_interpretation must be an object");
  } else {
    if (!isNonEmptyString(interpretation.summary))
      fail("market_interpretation.summary", "summary must be a non-empty string");
    if (!isEnum(interpretation.primary_driver, PRIMARY_DRIVERS))
      fail(
        "market_interpretation.primary_driver",
        `primary_driver must be one of ${PRIMARY_DRIVERS.join(", ")}`
      );
    if (!isEnum(interpretation.stage_assessment, STAGE_ASSESSMENTS))
      fail(
        "market_interpretation.stage_assessment",
        `stage_assessment must be one of ${STAGE_ASSESSMENTS.join(", ")}`
      );
  }

  return { valid: errors.length === 0, errors };
};
