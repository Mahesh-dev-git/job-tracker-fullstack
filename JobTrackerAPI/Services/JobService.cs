using JobTrackerAPI.Data;
using JobTrackerAPI.DTOs;
using JobTrackerAPI.Models;
using JobTrackerAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace JobTrackerAPI.Services
{
    public class JobService : IJobService
    {
        private readonly AppDbContext _context;

        public JobService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Job> CreateJob(Job job)
        {
            _context.Jobs.Add(job);
            await _context.SaveChangesAsync();
            return job;
        }

        public async Task<Job> DeleteJob(int id)
        {
            var deleteJob = await _context.Jobs.FindAsync(id);

            if (deleteJob == null)
                return null;

            _context.Jobs.Remove(deleteJob);
            await _context.SaveChangesAsync();
            return deleteJob;
        }
        

        public async Task<List<JobDto>> GetAllJobs()
        {
            var jobs = await _context.Jobs.ToListAsync();
            return jobs.Select(j => new JobDto
            {
                Id = j.Id,
                Company = j.Company,
                Position = j.Position,
                Status = j.Status
            }).ToList();
        }

        public async Task<Job> UpdateJob(int id, Job job)
        {
            var existingJob = await _context.Jobs.FindAsync(id);

            if (existingJob == null)
                return null;

            existingJob.Company = job.Company;
            existingJob.Position = job.Position;
            existingJob.Status = job.Status;

            await _context.SaveChangesAsync();
            return existingJob;
        }

        public async Task<List<JobDto>> GetJobsByUser(int userId)
        {
            var jobs = await _context.Jobs
                .Where(j => j.UserId == userId)
                .ToListAsync();

            return jobs.Select(j => new JobDto
            {
                Id = j.Id,
                Company = j.Company,
                Position = j.Position,
                Status = j.Status
            }).ToList();
        }

    }
}
