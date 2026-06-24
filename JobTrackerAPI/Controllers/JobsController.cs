using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JobTrackerAPI.Data;
using JobTrackerAPI.Models;
using JobTrackerAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

[Authorize]
[ApiController]
[Route("api/[controller]")]

public class JobsController : ControllerBase
{
    private readonly IJobService _jobService;

    public JobsController(IJobService jobService)
    {
        _jobService = jobService;
    }


    [HttpGet]
    public async Task<IActionResult> GetJobs(
        string? search,
    string? status,
     int page = 1,
    int pageSize = 5)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        var jobs = await _jobService.GetAllJobs(userId,search, status ,page,pageSize);
        return Ok(jobs);
    }

    [HttpPost]

    public async Task<IActionResult> CreateJob(Job job)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

        job.UserId = userId;
        var result = await _jobService.CreateJob(job);
        return Ok(result);
    }

    [HttpPut("{id}")]

    public async Task<IActionResult> UpdateJob(int id,Job job)
    {
        var updated = await _jobService.UpdateJob(id, job);

        if (updated == null)
            return NotFound();

        return Ok(updated); 
        
    }

    [HttpDelete("{id}")]

    public async Task<IActionResult> DeleteJob(int id)
    {
        var deleted = await _jobService.DeleteJob(id);

        if (deleted == null)
            return NotFound();

        return Ok("Deleted Succesfully");
    }

}