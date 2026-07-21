namespace TakazonoOjt.Api.Common;

/// <summary>Entity looked up by Sid does not exist (or is not visible to the caller).</summary>
public class NotFoundAppException(string message) : Exception(message);

/// <summary>Request conflicts with current state (duplicate code, concurrency conflict, FK still referenced, etc.).</summary>
public class ConflictAppException(string message) : Exception(message);
