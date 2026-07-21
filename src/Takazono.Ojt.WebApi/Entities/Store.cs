using TakazonoOjt.Api.Common;

namespace TakazonoOjt.Api.Entities;

/// <summary>店舗マスタ — roadmap master #3, the "手本"（reference implementation）master.</summary>
public class Store : BaseEntity
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? PostalCode { get; set; }
    public string? Address { get; set; }
    public string? PhoneNumber { get; set; }
    public bool UseFlag { get; set; } = true;
    public int DisplayOrderNumber { get; set; }
}
