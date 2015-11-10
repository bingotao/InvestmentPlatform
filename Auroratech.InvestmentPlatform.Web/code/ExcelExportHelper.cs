using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;


namespace Auroratech.InvestmentPlatform.Web.code
{
    public class ExcelExportHelper
    {
        public FileInfo DataTableToExcel(DataTable dt, string sSheetName, string sFilePath)
        {
            IWorkbook pWorkbook = new HSSFWorkbook();
            ISheet pSheet = pWorkbook.CreateSheet(sSheetName);
            IRow pRow = pSheet.CreateRow(0);
            int iColCount = dt.Columns.Count;
            int iRowCount = dt.Rows.Count;

            for (int i = 0; i < iColCount; i++)
            {
                ICell pCell = pRow.CreateCell(i);
                pCell.SetCellValue(dt.Columns[i].Caption);
            }

            for (int i = 0; i < iRowCount; i++)
            {
                DataRow dr = dt.Rows[i];
                pRow = pSheet.CreateRow(i + 1);
                for (int j = 0; j < iColCount; j++)
                {
                    object oValue = dr[j];
                    string sValue = string.Empty;
                    if (oValue != DBNull.Value)
                    {
                        sValue = oValue.ToString();
                    }
                    ICell pCell = pRow.CreateCell(j);
                    pCell.SetCellValue(sValue);
                }
            }

            using (FileStream fs = new FileStream(sFilePath, FileMode.Create))
            {
                pWorkbook.Write(fs);
                fs.Flush();
            }
            return new FileInfo(sFilePath);
        }
    }
}