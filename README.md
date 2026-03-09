## 1. Difference between var, let, const

- **var** → Function scoped, can be redeclared and reassigned.
- **let** → Block scoped, can be reassigned but not redeclared.
- **const** → Block scoped, cannot be reassigned or redeclared.

---

## 2. Spread Operator (...)

The spread operator (`...`) is used to **expand or copy elements** from arrays or objects.

Example:
```javascript
const arr1 = [1,2];
const arr2 = [...arr1,3,4];
3. Difference between map(), filter(), forEach()

map() → Creates a new array after modifying each element.

filter() → Creates a new array with elements that match a condition.

forEach() → Runs a function for each element but does not return a new array.

4. Arrow Function

A short syntax for writing functions using =>.

Example:

const add = (a,b) => a + b;
5. Template Literals

Strings written using backticks ( ) that allow variables inside ${}.

Example:

const name = "Ali";
console.log(`Hello ${name}`);
