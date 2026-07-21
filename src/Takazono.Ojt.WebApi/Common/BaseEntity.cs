namespace TakazonoOjt.Api.Common;

public abstract class BaseEntity
{
    public long Sid { get; set; }

    [System.ComponentModel.DataAnnotations.Timestamp]
    public byte[] Version { get; set; } = [];

    public DateTime CreatedDateTime { get; set; }
    public long? CreatedSid { get; set; }
    public string CreatedName { get; set; } = string.Empty;

    public DateTime ModifiedDateTime { get; set; }
    public long? ModifiedSid { get; set; }
    public string ModifiedName { get; set; } = string.Empty;
}
