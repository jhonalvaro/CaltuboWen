/**
 * Computes the radius of the circle that defines the arc.
 * @param {number} f - The sagitta (flecha) of the arc.
 * @param {number} c - The chord length of the arc.
 * @returns {number} The radius (R) of the circle.
 */
export function computeRadius(f, c) {
  if (f === 0) return Infinity; // A straight line has infinite radius
  return (f / 2) + (c ** 2 / (8 * f));
}

/**
 * Computes the central angle (theta) of the arc in radians.
 * @param {number} R - The radius of the circle.
 * @param {number} c - The chord length of the arc.
 * @returns {number} The central angle (theta) in radians.
 */
export function computeTheta(R, c) {
  if (R === Infinity) return 0;
  // Ensure the argument for asin is within the valid range [-1, 1]
  const sinArg = c / (2 * R);
  if (sinArg > 1 || sinArg < -1) {
    // This case can happen with invalid inputs, return NaN or handle as an error
    return NaN;
  }
  return 2 * Math.asin(sinArg);
}

/**
 * Computes the arc length (S).
 * @param {number} R - The radius of the circle.
 * @param {number} theta - The central angle in radians.
 * @returns {number} The arc length (S).
 */
export function computeArcLength(R, theta) {
  return R * theta;
}

/**
 * Calculates the number of pieces required to form the total arc length.
 * @param {number} s - The total arc length.
 * @param {number} tam_regla - The length of the ruler (or each piece).
 * @param {number} despedico - The waste per piece.
 * @param {number} num_arcos - The number of arcs.
 * @returns {number} The total number of pieces required.
 */
export function computePieces(s, tam_regla, despedico, num_arcos) {
  if (tam_regla <= 0) return Infinity;
  const totalLength = (s + despedico) * num_arcos;
  return Math.ceil(totalLength / tam_regla);
}