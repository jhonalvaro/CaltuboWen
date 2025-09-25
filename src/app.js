import { computeRadius, computeTheta, computeArcLength, computePieces } from './utils/geometry.js';

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const flechaInput = document.getElementById('flecha');
  const cuerdaInput = document.getElementById('cuerda');
  const tamTuboInput = document.getElementById('tam-tubo');
  const despedicoInput = document.getElementById('despedico');
  const numArcosInput = document.getElementById('num-arcos');
  const tamReglaInput = document.getElementById('tam-regla');
  const calculateBtn = document.getElementById('calculate-btn');

  // Result Elements
  const radioResult = document.getElementById('resultado-radio');
  const anguloResult = document.getElementById('resultado-angulo');
  const desarrolloResult = document.getElementById('resultado-desarrollo');
  const piezasResult = document.getElementById('resultado-piezas');

  // All input fields for validation
  const inputs = [flechaInput, cuerdaInput, tamTuboInput, despedicoInput, numArcosInput, tamReglaInput];

  // --- VALIDATION ---
  function validateInputs() {
    let isValid = true;
    inputs.forEach(input => {
      // Clear previous errors
      input.classList.remove('input-error');
      const errorMsg = input.parentElement.querySelector('.error-message');
      if (errorMsg) {
        errorMsg.remove();
      }

      // Validate
      const value = input.value.trim();
      if (value === '' || isNaN(parseFloat(value))) {
        isValid = false;
        input.classList.add('input-error');
        const error = document.createElement('span');
        error.className = 'error-message';
        error.textContent = 'Valor requerido';
        input.parentElement.appendChild(error);
      } else if (parseFloat(value) < 0) {
        isValid = false;
        input.classList.add('input-error');
        const error = document.createElement('span');
        error.className = 'error-message';
        error.textContent = 'Debe ser positivo';
        input.parentElement.appendChild(error);
      }
    });
    return isValid;
  }

  // --- CALCULATION ---
  function performCalculations() {
    if (!validateInputs()) {
      radioResult.textContent = '......';
      anguloResult.textContent = '......';
      desarrolloResult.textContent = '......';
      piezasResult.textContent = '......';
      return;
    }

    // Get values
    const f = parseFloat(flechaInput.value);
    const c = parseFloat(cuerdaInput.value);
    const tamRegla = parseFloat(tamReglaInput.value);
    const despedico = parseFloat(despedicoInput.value);
    const numArcos = parseFloat(numArcosInput.value);

    // Perform calculations
    const R = computeRadius(f, c);
    const theta = computeTheta(R, c);
    const s = computeArcLength(R, theta);
    const pieces = computePieces(s, tamRegla, despedico, numArcos);

    // --- DISPLAY RESULTS ---
    radioResult.textContent = isFinite(R) ? R.toFixed(2) : 'Infinito';

    const thetaDegrees = theta * (180 / Math.PI);
    anguloResult.textContent = !isNaN(thetaDegrees) ? `${thetaDegrees.toFixed(2)}°` : 'Inválido';

    desarrolloResult.textContent = !isNaN(s) ? s.toFixed(2) : 'Inválido';

    piezasResult.textContent = isFinite(pieces) ? pieces.toString() : 'Inválido';
  }

  // --- EVENT LISTENER ---
  calculateBtn.addEventListener('click', performCalculations);
});