namespace Auroratech.DataClient
{
  public interface IDALDBOperator
  {
    bool AddObject(object newObject);

    bool ModifyObject(object ModifiedObject);

    bool DeleteObjectByKeyID(string KeyID);

    bool DeleteObject(object DeleteObject);
  }
}
