namespace Hospital.Shared.Responses;

public record ApiResponse<T>(bool Success, string Message, T? Data = default);



