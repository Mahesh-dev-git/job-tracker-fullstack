using MediatR;
using JobTrackerAPI.DTOs;

public record GetJobsQuery(int UserId, string Role) : IRequest<List<JobDto>>;