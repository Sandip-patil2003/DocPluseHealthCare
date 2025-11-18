using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalApi.Models;
using Microsoft.AspNetCore.Authorization;

namespace HospitalApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   
    public class PrescriptionsController : ControllerBase
    {
        private readonly HospitalDbContext _context;

        public PrescriptionsController(HospitalDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetPrescriptions()
        {
            try
            {
                var prescriptions = await _context.Prescriptions
                    .Include(p => p.Patient)
                    .Include(p => p.Doctor)
                    .Select(p => new
                    {
                        p.PrescriptionId,
                        p.Medication,
                        p.Dosage,
                        p.DatePrescribed,
                        PatientName = p.Patient != null ? p.Patient.FirstName + " " + p.Patient.LastName : null,
                        DoctorName = p.Doctor != null ? p.Doctor.FirstName + " " + p.Doctor.LastName : null
                    })
                    .ToListAsync();

                return Ok(prescriptions);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error retrieving prescriptions: {ex.Message}");
            }
        }


        // GET: api/Prescriptions/patient/5
        [HttpGet("patient/{patientId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetPrescriptionsByPatientId(int patientId)
        {
            try
            {
                var prescriptions = await _context.Prescriptions
                    .Where(p => p.PatientId == patientId)
                    .Include(p => p.Doctor)
                    .Select(p => new
                    {
                        p.PrescriptionId,
                        p.Medication,
                        p.Dosage,
                        p.DatePrescribed,
                        DoctorName = p.Doctor != null ? p.Doctor.FirstName + " " + p.Doctor.LastName : null
                    })
                    .ToListAsync();

                if (prescriptions == null || prescriptions.Count == 0)
                {
                    return NotFound($"No prescriptions found for patient with ID {patientId}.");
                }

                return Ok(prescriptions);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error retrieving prescriptions: {ex.Message}");
            }
        }



        // GET: api/Prescriptions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Prescription>> GetPrescription(int id)
        {
            try
            {
                var prescription = await _context.Prescriptions.FindAsync(id);

                if (prescription == null)
                {
                    return NotFound($"Prescription with ID {id} not found.");
                }

                return prescription;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error retrieving prescription: {ex.Message}");
            }
        }

        // PUT: api/Prescriptions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPrescription(int id, Prescription prescription)
        {
            if (id != prescription.PrescriptionId)
            {
                return BadRequest("Prescription ID mismatch.");
            }

            _context.Entry(prescription).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PrescriptionExists(id))
                {
                    return NotFound($"Prescription with ID {id} not found.");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError,
                        "A concurrency error occurred while updating the prescription.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error updating prescription: {ex.Message}");
            }
        }

        // POST: api/Prescriptions
        [HttpPost]
        public async Task<ActionResult<Prescription>> PostPrescription(Prescription prescription)
        {
            try
            {
                _context.Prescriptions.Add(prescription);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetPrescription", new { id = prescription.PrescriptionId }, prescription);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error creating prescription: {ex.Message}");
            }
        }

        // DELETE: api/Prescriptions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePrescription(int id)
        {
            try
            {
                var prescription = await _context.Prescriptions.FindAsync(id);
                if (prescription == null)
                {
                    return NotFound($"Prescription with ID {id} not found.");
                }
                

                _context.Prescriptions.Remove(prescription);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error deleting prescription: {ex.Message}");
            }
        }

        private bool PrescriptionExists(int id)
        {
            return _context.Prescriptions.Any(e => e.PrescriptionId == id);
        }
    }
}
