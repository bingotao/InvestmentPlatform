using System;
using System.Reflection;

namespace Auroratech.DataClient
{
  public class EntityFactory
  {
    public static T CreateInstance<T>() where T : class
    {
      return Activator.CreateInstance<T>();
    }

    public static object CreateInstance(Type type, bool nonPublic)
    {
      return Activator.CreateInstance(type, nonPublic);
    }

    public static object CreateInstance(Type type, params object[] param)
    {
      return Activator.CreateInstance(type, param);
    }

    public static object GetPropertyValue(IEntity entity, string name)
    {
      PropertyInfo property = entity.GetType().GetProperty(name);
      object obj = (object) null;
      if (property != null)
        obj = property.GetValue((object) entity, (object[]) null);
      return obj;
    }

    public static T GetPropertyValue<T>(IEntity entity, string name) where T : class
    {
      object propertyValue = EntityFactory.GetPropertyValue(entity, name);
      if (propertyValue == null)
        return default (T);
      return (T) propertyValue;
    }

    public static object GetPropertyValue(object entity, string name)
    {
      PropertyInfo property = entity.GetType().GetProperty(name);
      object obj = (object) null;
      if (property != null)
        obj = property.GetValue(entity, (object[]) null);
      return obj;
    }

    public static void SetPropertyValue(IEntity entity, string name, object value)
    {
      PropertyInfo property = entity.GetType().GetProperty(name);
      if (property == null)
        return;
      property.SetValue((object) name, value, (object[]) null);
    }

    public static object ConvertValue(Type type, object value)
    {
      if (value == DBNull.Value)
        return (object) null;
      return Convert.ChangeType(value, type);
    }

    public static T ConvertValue<T>(Type type, object value)
    {
      if (value == DBNull.Value)
        return default (T);
      return (T) Convert.ChangeType(value, type);
    }
  }
}
