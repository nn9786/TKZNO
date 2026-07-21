using Takazono.Ojt.WebApi.Common;

namespace Takazono.Ojt.WebApi.Entities;

/// <summary>単位マスタ（個/箱/ケース等）— roadmap master #1, the simplest lookup master.</summary>
public class Unit : BaseEntity
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public bool UseFlag { get; set; } = true;
    public int DisplayOrderNumber { get; set; }
}
