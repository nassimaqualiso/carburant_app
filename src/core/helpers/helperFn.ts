/* eslint-disable prettier/prettier */
import _ from "lodash";
/**
 * 
 * @param objectData Object
 * @param keyColumn string
 * @param valueColumn string
 * @returns
 * example input [
                    { id: 1, name: 'John Doe', age: 30 },
                    { id: 2, name: 'Jane Doe', age: 25 },
                    { id: 3, name: 'Bob Smith', age: 40 },
                ];
 * Output: {1: "John Doe", 2: "Jane Doe", 3: "Bob Smith"} 
 */
export function hlpFn_pluck(objectData: Object, keyColumn: string, valueColumn: string): Object {
    return _.reduce(
        objectData,
        (result, obj) => {
            result[obj[keyColumn]] = obj[valueColumn];
            return result;
        },
        {}
    );
}
