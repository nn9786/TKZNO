namespace Takazono.Ojt.WebApi.Common;

/// <summary>Entity looked up by Sid does not exist (or is not visible to the caller).</summary>
public class NotFoundAppException(string message) : Exception(message);

/// <summary>Request conflicts with current state (duplicate code, FK still referenced, etc.). Maps to 409 with errorCode "CONFLICT".</summary>
public class ConflictAppException(string message) : Exception(message);

/// <summary>
/// Optimistic-concurrency conflict detected on save (another user updated/deleted the row first).
/// Kept distinct from <see cref="ConflictAppException"/> so the frontend can show a dedicated
/// "reload and retry" dialog instead of a generic error toast. Maps to 409 with errorCode "CONCURRENCY_CONFLICT".
/// </summary>
public class ConcurrencyConflictAppException(string message) : Exception(message);

/// <summary>Request is well-formed but violates a domain business rule (e.g. a protected master record). Maps to 400 with errorCode "BUSINESS_RULE".</summary>
public class BusinessRuleAppException(string message) : Exception(message);
