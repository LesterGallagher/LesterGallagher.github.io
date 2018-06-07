---
title: obj2csv.js
date: 2018-06-07 13:45:00 +02:00
tags:
- csv
- json
- web
- javascript
- programming
image: "/uploads/icon-sm-7efc02.png"
---

Checkout the website: [JSON2CSV](http://esstudio.site/json2csv) or the [full example](#full-example).

While searching for a good csv2obj library I couldn't find a good solution so I decided to write a very minimal csv2obj converter. Let's start with creating the parser (csv2obj). Because of browser support i will try not to use a lot of es5/es6 specific syntax. The following function will do the job. There are some important caveats. The function will, in some cases, try to convert boolean, number and null values to their correct type. This only works if it matches the exact value. For example
"null" will be parsed as a null value/object, but " null" (with a leading space) will not.

```javascript
    function csv2obj(csv, opt) {
        opt = opt || {};
        var delimeter = opt.delimeter || ',';
        var i, row, rownum, collumNum, lines = csv.split(/\s*\n\s*/);
        var headers = lines[0].split(delimeter);
        for(i = 0; i < headers.length; i++) {
            headers[i] = headers[i].replace(/(^[\s"]+|[\s"]+$)/g, '');
        }
        var ret = [];
        for (rownum = 1; rownum < lines.length; rownum++) {
            row = lines[rownum].split(delimeter);
            ret[rownum - 1] = {};
            for (collumNum = 0; collumNum < headers.length; collumNum++) {
                if (row[collumNum].length > 0 && (!isNaN(row[collumNum]) || row[collumNum] === 'true' 
                    || row[collumNum] === 'false' || row[collumNum] === 'null')) 
                    ret[rownum - 1][headers[collumNum]] = JSON.parse(row[collumNum]);
                else 
                    ret[rownum - 1][headers[collumNum]] = row[collumNum].replace(/(^\s*"*|"*\s*$)/g, '');
            }
        }
        return ret;
    }
```

The difficult part is writing to serialization function. Objects with grandchildren will be flattened and their names squashed together like this: "child.grandchild" -> "child/grandchild". It will recursively find all of the children and at them to a queue. So the function itself is not recursive! Which is important in terms of performance. We will use JSON.stringify as a trick to automatically put double quotes around strings. At last we loop through all the rows to join all the columns/rows and join them together.

```javascript
    function obj2csv(obj, opt) {
        if (typeof obj !== 'object') return null;
        opt = opt || {};
        var scopechar = opt.scopechar || '/';
        var delimeter = opt.delimeter || ',';
        if (Array.isArray(obj) === false) obj = [obj];
        var curs, name, rownum, key, queue, values = [], rows = [], headers = {}, headersArr = [];
        for (rownum = 0; rownum < obj.length; rownum++) {
            queue = [obj[rownum], ''];
            rows[rownum] = {};
            while (queue.length > 0) {
                name = queue.pop();
                curs = queue.pop();
                if (curs !== null && typeof curs === 'object') {
                    for (key in curs) {
                        if (curs.hasOwnProperty(key)) {
                            queue.push(curs[key]);
                            queue.push(name + (name ? scopechar : '') + key);
                        }
                    }
                } else {
                    if (headers[name] === undefined) headers[name] = true;
                    rows[rownum][name] = curs;
                }
            }
            values[rownum] = [];
        }
        // create csv text
        for (key in headers) {
            if (headers.hasOwnProperty(key)) {
                headersArr.push(key);
                for (rownum = 0; rownum < obj.length; rownum++) {
                    values[rownum].push(rows[rownum][key] === undefined
                        ? ''
                        : JSON.stringify(rows[rownum][key]));
                }
            }
        }
        for (rownum = 0; rownum < obj.length; rownum++) {
            values[rownum] = values[rownum].join(delimeter);
        }
        return '"' + headersArr.join('"' + delimeter + '"') + '"\n' + values.join('\n');
    }
```
(Array.isArray is es5 syntax, be sure to polyfill when necessary)

I used the code in this example to build a json2csv/csv2json converter which can be found [here](https://esstudio.site/json2csv).

<div id="full-example">
<iframe src="https://esstudio.site/json2csv"></iframe>
## Full Example:

{% gist a5197d8c1c6fba1349f074d2f4ca2e31 %}
</div>