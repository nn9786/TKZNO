using Takazono.Ojt.WebApi.Common;

namespace Takazono.Ojt.WebApi.Entities;

/// <summary>単位マスタ（個/箱/ケース等）— roadmap master #1, the simplest lookup master.</summary>
public class Unit : BaseEntity
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public bool UseFlag { get; set; } = true;
    public int DisplayOrderNumber { get; set; }

    /// <summary>
    /// Marks a small set of seeded base units (e.g. "個") as protected: they may not be deactivated
    /// (<see cref="UseFlag"/> forced to true) or deleted, because other future masters may reference them
    /// by a fixed Sid. Never settable via Create/Update requests — only DevSeeder assigns it.
    /// </summary>
    public bool UnDeleteFlag { get; set; }
}
