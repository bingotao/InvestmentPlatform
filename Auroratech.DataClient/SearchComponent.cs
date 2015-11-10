namespace Auroratech.DataClient
{
  public class SearchComponent
  {
    private string _fieldName;
    private SM _searchmode;
    private object _value;
    private CM _conditionMode;

    public string FieldName
    {
      get
      {
        return this._fieldName;
      }
      set
      {
        this._fieldName = value;
      }
    }

    public SM SearchMode
    {
      get
      {
        return this._searchmode;
      }
      set
      {
        this._searchmode = value;
      }
    }

    public object Value
    {
      get
      {
        return this._value;
      }
      set
      {
        this._value = value;
      }
    }

    public CM ConditionMode
    {
      get
      {
        return this._conditionMode;
      }
      set
      {
        this._conditionMode = value;
      }
    }

    public SearchComponent(SM searchMode, object value, CM conditionMode)
    {
      this._searchmode = searchMode;
      this._value = value;
      this._conditionMode = conditionMode;
    }

    public SearchComponent(string fieldName, SM searchMode, object value, CM conditionMode)
    {
      this._fieldName = fieldName;
      this._searchmode = searchMode;
      this._value = value;
      this._conditionMode = conditionMode;
    }
  }
}
