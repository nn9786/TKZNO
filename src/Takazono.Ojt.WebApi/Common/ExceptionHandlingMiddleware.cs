using Microsoft.AspNetCore.Mvc;

namespace Takazono.Ojt.WebApi.Common;

/// <summary>
/// Converts exceptions to ProblemDetails responses. Unhandled exceptions are logged with full
/// detail server-side but never echoed back to the client (unlike Takazono.Core's raw 500 body).
/// </summary>
public class ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (NotFoundAppException ex)
        {
            await WriteProblem(context, StatusCodes.Status404NotFound, "Not Found", ex.Message, "NOT_FOUND");
        }
        catch (ConcurrencyConflictAppException ex)
        {
            await WriteProblem(context, StatusCodes.Status409Conflict, "Conflict", ex.Message, "CONCURRENCY_CONFLICT");
        }
        catch (ConflictAppException ex)
        {
            await WriteProblem(context, StatusCodes.Status409Conflict, "Conflict", ex.Message, "CONFLICT");
        }
        catch (BusinessRuleAppException ex)
        {
            await WriteProblem(context, StatusCodes.Status400BadRequest, "Business Rule Violation", ex.Message, "BUSINESS_RULE");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Unhandled exception while processing {Method} {Path}", context.Request.Method, context.Request.Path);
            await WriteProblem(context, StatusCodes.Status500InternalServerError, "Internal Server Error", "予期しないエラーが発生しました。", "UNEXPECTED");
        }
    }

    /// <summary>`errorCode` is a teaching-project-specific extension (not part of the ProblemDetails RFC) that lets the
    /// frontend distinguish conflict variants (e.g. show a dedicated concurrency-reload dialog) without parsing `Detail` text.</summary>
    private static async Task WriteProblem(HttpContext context, int statusCode, string title, string detail, string errorCode)
    {
        var problem = new ProblemDetails
        {
            Status = statusCode,
            Title = title,
            Detail = detail,
            Instance = context.Request.Path,
        };
        problem.Extensions["errorCode"] = errorCode;
        context.Response.ContentType = "application/problem+json";
        context.Response.StatusCode = statusCode;
        await context.Response.WriteAsJsonAsync(problem);
    }
}
