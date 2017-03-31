# Object Path Builder
Simple module for generating object path. Module supports all the form for JS object accessing method.

### Usage

You can decode the object path string to array of keys which can be then reduced to value by your logic or using the module [Javascript easy object](https://github.com/indix/javascript-easy-object).

Snippet:
```
import objectPathBuilder from 'object-path-builder';

const objectBinding = {
  a: {
    b: 'B',
  },
}

const pathArray = objectPathBuilder('x.y[a.b].z', objectBinding);
console.log('path array : ', pathArray)
```

Output: 
```
path array: ['x', 'y', 'B', 'z']
```

Aruguments:

objectPathBuilder takes two argument. First one is the string that you want to decode and the second argument is the binding which is associated the path specified inside the square bracket. Second argument is optional.
