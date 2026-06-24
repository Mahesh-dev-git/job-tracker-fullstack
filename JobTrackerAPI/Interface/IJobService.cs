using JobTrackerAPI.DTOs;
using JobTrackerAPI.Models;

namespace JobTrackerAPI.Services.Interfaces
{
    public interface IJobService
    {
        Task<List<JobDto>> GetAllJobs(
     int userId,
     string? search,
     string? status,
        int page,
    int pageSize);
        Task<Job> CreateJob(Job job);
        Task<Job> UpdateJob(int id, Job job);
        Task<Job> DeleteJob(int id);

        Task<List<JobDto>> GetJobsByUser(int userId);

    }
}
