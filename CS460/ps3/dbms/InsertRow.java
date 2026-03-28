/*
 * InsertRow.java
 *
 * DBMS Implementation
 */

import java.io.*;
import java.util.Arrays;

/**
 * A class that represents a row that will be inserted in a table in a
 * relational database.
 *
 * This class contains the code used to marshall the values of the
 * individual columns to a single key-value pair.
 */
public class InsertRow {
    private Table table;           // the table in which the row will be inserted
    private Object[] columnVals;   // the column values to be inserted
    private RowOutput keyBuffer;   // buffer for the marshalled row's key
    private RowOutput valueBuffer; // buffer for the marshalled row's value
    private int[] offsets;         // offsets for header of marshalled row's value
    
    /** Constants for special offsets **/
    /** The field with this offset has a null value. */
    public static final int IS_NULL = -1;
    
    /** The field with this offset is a primary key. */
    public static final int IS_PKEY = -2;
    
    /**
     * Constructs an InsertRow object for a row containing the specified
     * values that is to be inserted in the specified table.
     *
     * @param  t  the table
     * @param  values  the column values for the row to be inserted
     */
    public InsertRow(Table table, Object[] values){
        this.table = table;
        this.columnVals = values;
        this.keyBuffer = new RowOutput();
        this.valueBuffer = new RowOutput();
        
        // Note that we need one more offset than value,
        // so that we can store the offset of the end of the record.
        this.offsets = new int[values.length + 1];
        
    }
    
    /**
     * Takes the collection of values for this InsertRow
     * and marshalls them into a key/value pair.
     * 
     * (Note: We include a throws clause because this method will use 
     * methods like writeInt() that the RowOutput class inherits from 
     * DataOutputStream, and those methods could in theory throw that 
     * exception. In reality, an IOException should *not* occur in the
     * context of our RowOutput class.)
     */
    public void marshall() throws IOException {
        int columnCount = columnVals.length;
        Column[] columns = new Column[columnCount];
    
        for (int i = 0; i < columnCount; i++) {
            columns[i] = table.getColumn(i);
        }
    
        // Find primary key index and value
        int primaryKeyIndex = getPrimaryKeyIndex(columns);
        Object primaryKeyValue = columnVals[primaryKeyIndex];
    
 
        computeOffsets(columns, primaryKeyIndex);
    

        writeKey(keyBuffer, primaryKeyValue);
        
    
        writeValue(valueBuffer, columns, primaryKeyIndex);
      
    }

   private int getPrimaryKeyIndex(Column[] columns) {
    for (int i = 0; i < columns.length; i++) {
        if (columns[i].isPrimaryKey()) {
            return i;
        }
    }
    throw new IllegalStateException("No primary key found");
}
    private void computeOffsets(Column[] columns, int primaryKeyIndex) {
        int columnCount = table.numColumns();
        int offset = (columnCount + 1) * 2;
        int offsetIndex = 0;
    
        for (int i = 0; i < columns.length; i++) {
            Column column = table.getColumn(i);
            if (columnVals[i] == null) {
                offsets[offsetIndex++] = IS_NULL;
            } else if (column.isPrimaryKey()) {
                offsets[offsetIndex++] = IS_PKEY;
            }else {
                offsets[offsetIndex++] = offset;
                if (columns[i].getType() == Column.VARCHAR) {
                    offset += ((String) columnVals[i]).length();
                } else {
                    offset += columns[i].getLength();
                }
            }
        }
        offsets[offsetIndex] = offset;
    
    }
    
    private void writeKey(RowOutput keyBuffer, Object primaryKeyValue) throws IOException {
        if (primaryKeyValue instanceof Integer) {
            keyBuffer.writeInt(((Integer) primaryKeyValue).intValue());
        } else if (primaryKeyValue instanceof Double) {
            keyBuffer.writeDouble(((Double) primaryKeyValue).doubleValue());
        } else if (primaryKeyValue instanceof String) {
            keyBuffer.writeBytes((String) primaryKeyValue);
        } else {
            throw new IOException("Unsupported primary key type");
        }
    
    }
    
    private void writeValue(RowOutput valueBuffer, Column[] columns, int primaryKeyIndex) throws IOException {
        for (int i = 0; i < offsets.length; i++) {
            valueBuffer.writeShort(offsets[i]);
        }
    
        for (int i = 0; i < columns.length; i++) {
            if (i == primaryKeyIndex || columnVals[i] == null) {
                continue;
            }
    
            if (columns[i].getType() == Column.INTEGER) 
            {
                valueBuffer.writeInt(((Integer) columnVals[i]).intValue());
            }  
            
            if (columns[i].getType() == Column.REAL) 
            {
                valueBuffer.writeDouble(((Integer) columnVals[i]).doubleValue());
            }  

            else if (columns[i].getType() == Column.VARCHAR || columns[i].getType() == Column.CHAR) 
            {
                String str = (String) columnVals[i];
                valueBuffer.write(str.getBytes());
            } 
            else {
                throw new IOException("Unsupported column type");
            }
        }
    
    }
    
       
        
    /**
     * Returns the RowOutput used for the key portion of the marshalled row.
     *
     * @return  the key's RowOutput
     */
    public RowOutput getKeyBuffer() {
        return this.keyBuffer;
    }
    
    /**
     * Returns the RowOutput used for the value portion of the marshalled row.
     *
     * @return  the value's RowOutput
     */
    public RowOutput getValueBuffer() {
        return this.valueBuffer;
    }
    
    /**
     * Returns a String representation of this InsertRow object. 
     *
     * @return  a String for this InsertRow
     */
    public String toString() {
        return "offsets: " + Arrays.toString(this.offsets)
             + "\nkey buffer: " + this.keyBuffer
             + "\nvalue buffer: " + this.valueBuffer;
    }
}
