using Hospital.Application.Interfaces.Services;
using Hospital.Application.DTOs.Patient;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Hospital.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PatientsController : ControllerBase
    {
        private readonly IPatientService _patientService;

        public PatientsController(IPatientService patientService)
        {
            _patientService = patientService;
        }

        // GET: api/Patients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PatientResponseDto>>> GetPatients(CancellationToken cancellationToken)
        {
            try
            {
                var patients = await _patientService.GetAllAsync(cancellationToken);
                return Ok(patients);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error retrieving patients: {ex.Message}");
            }
        }

        // GET: api/Patients/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PatientResponseDto>> GetPatient(int id, CancellationToken cancellationToken)
        {
            try
            {
                var patient = await _patientService.GetByIdAsync(id, cancellationToken);

                if (patient == null)
                {
                    return NotFound($"Patient with ID {id} not found.");
                }

                return patient;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error retrieving patient: {ex.Message}");
            }
        }

        // PUT: api/Patients/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPatient(int id, UpdatePatientDto patient, CancellationToken cancellationToken)
        {
            if (id != patient.PatientId)
            {
                return BadRequest("Patient ID mismatch.");
            }

            try
            {
                var updated = await _patientService.UpdateAsync(id, patient, cancellationToken);
                if (!updated)
                {
                    return NotFound($"Patient with ID {id} not found.");
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error updating patient: {ex.Message}");
            }
        }

        // POST: api/Patients
        [HttpPost]
        public async Task<ActionResult<PatientResponseDto>> PostPatient(CreatePatientDto patient, CancellationToken cancellationToken)
        {
            try
            {
                var created = await _patientService.CreateAsync(patient, cancellationToken);

                return CreatedAtAction("GetPatient", new { id = created.PatientId }, created);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error creating patient: {ex.Message}");
            }
        }

        // DELETE: api/Patients/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(int id, CancellationToken cancellationToken)
        {
            try
            {
                var deleted = await _patientService.DeleteAsync(id, cancellationToken);
                if (!deleted)
                {
                    return NotFound($"Patient with ID {id} not found.");
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error deleting patient: {ex.Message}");
            }
        }

    }
}




