using System.Collections.Generic;

namespace Auroratech.DataClient
{
  public class ConditionComponent
  {
    private static ConditionComponent mInstance = (ConditionComponent) null;
    private static readonly object lockAssistant = new object();
    private IDictionary<string, SearchComponent> _dicComponent = (IDictionary<string, SearchComponent>) new Dictionary<string, SearchComponent>();

    public static ConditionComponent Instance
    {
      get
      {
        if (ConditionComponent.mInstance == null)
        {
          lock (ConditionComponent.lockAssistant)
          {
            if (ConditionComponent.mInstance == null)
              ConditionComponent.mInstance = new ConditionComponent();
          }
        }
        return ConditionComponent.mInstance;
      }
    }

    public IDictionary<string, SearchComponent> DicComponent
    {
      get
      {
        return this._dicComponent;
      }
      set
      {
        this._dicComponent = value;
      }
    }

    private ConditionComponent()
    {
    }

    public ConditionComponent Add(params SearchComponent[] param)
    {
      return ConditionComponent.Instance;
    }

    public ConditionComponent AddComponent(string propertyName, SearchComponent component)
    {
      if (!this._dicComponent.Keys.Contains(propertyName))
        this._dicComponent.Add(propertyName, component);
      return ConditionComponent.Instance;
    }

    public void ClearComponent()
    {
      this._dicComponent.Clear();
    }
  }
}
