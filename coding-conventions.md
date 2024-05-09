# App Coding Conventions

## 1. Naming Components and Variables

**Use camelCase when naming objects, functions, and instances. Use PascalCase for class names and components.**

#### :x: BAD

    const comp = () => {
      const var1 = "Hello";
      const PhoneNumber = 0913333111
      return <div>{var1} - {PhoneNumber}</div>;
    };

#### :white_check_mark: GOOD

    const MyComponent = () => {
      const greeting = "Hello";
      const phoneNumber = 0913333111
      return <div>{greeting} - {phoneNumber}</div>;
    };

## 2. JSX Formatting:

#### :x: BAD

    const MyComponent = () => {
      return <div><span>Text</span></div>;
    };

#### :white_check_mark: GOOD

    const MyComponent = () => {
      return (
        <div>
          <span>Text</span>
        </div>
      );
    };

## 3. Component Composition:

#### :x: BAD

    const App = () => {
      return (
        <div>
          <header>
            <h1>Welcome</h1>
          </header>
          <main>
            <h2>Content</h2>
            <p>Lorem ipsum dolor sit amet.</p>
          </main>
          <footer>
            <p>&copy; 2023 My App</p>
          </footer>
        </div>
      );
    };

#### :white_check_mark: GOOD

    const Header = () => {
      return (
        <header>
          <h1>Welcome</h1>
        </header>
      );
    };

    const Content = () => {
      return (
        <main>
          <h2>Content</h2>
          <p>Lorem ipsum dolor sit amet.</p>
        </main>
      );
    };

    const Footer = () => {
      return (
        <footer>
          <p>&copy; 2023 My App</p>
        </footer>
      );
    };

    const App = () => {
      return (
        <div>
          <Header />
          <Content />
          <Footer />
        </div>
      );
    };

## 4. Declarative programming is better:

#### :x: BAD

    const toLowerCase = input => {
    	const output = []
    	for (let i = 0; i < input.length; i++) {
    		output.push(input[i].toLowerCase())
    	}
    	return output
    }

#### :white_check_mark: GOOD

    const toLowerCase = input => input.map(
    	value => value.toLowerCase()
    )

## 5. Key:

#### :x: BAD

    const MyList = ({ items }) => {
      return (
        <ul>
          {items.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      );
    };

#### :white_check_mark: GOOD

    const MyList = ({ items }) => {
      return (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    };

## 2. Multi-line:

#### :x: BAD

    <div><Header /><div><Main content={...} /></div></div>

#### :white_check_mark: GOOD

    <div>
    	<Header />
    	<div>
    		<Main content={...} />
    	</div>
    </div>

## 3. Multi-properties:

#### :x: BAD

    <button foo="bar" veryLongPropertyName="baz" onSomething={this.handleSomething}	/>

#### :white_check_mark: GOOD

    <button
    	foo="bar"
    	veryLongPropertyName="baz"
    	onSomething={this.handleSomething}
    />

## 4. Conditionals:

#### 4.1 If

#### :x: BAD

    let button
    if (isLoggedIn) {
    	button = <LogoutButton />
    }
    return <div>{button}</div>

#### :white_check_mark: GOOD

    <div>
    	{isLoggedIn && <LoginButton />}
    </div>

---

#### 4.2 If else

#### :x: BAD

    let button
    if (isLoggedIn) {
    	button = <LogoutButton />
    } else {
    	button = <LoginButton />
    }
    return <div>{button}</div>

#### :white_check_mark: GOOD

    <div>
    	{isLoggedIn && <LoginButton />}
    </div>

---

#### 4.3 Multi conditions

#### :x: BAD

    <div>
    	{dataIsReady && (isAdmin || userHasPermissions) &&
    		<SecretData />
    	}
    </div>

#### :white_check_mark: GOOD

    const canShowSecretData = () => {
    	const { dataIsReady, isAdmin, userHasPermissions } = props
    	return dataIsReady && (isAdmin || userHasPermissions)
    }

    <div>
    	{canShowSecretData() && <SecretData />}
    </div>

## 5. Sub-rendering:

Split components into smaller functions in a way that lets us keep all the logic in the same component.

#### :white_check_mark: GOOD

    const renderUserMenu = () => {
    	// JSX for user menu
    }
    const renderAdminMenu = () => {
    	// JSX for admin menu
    }
    return (
    	<div>
    		<h1>Welcome back!</h1>
    		{userExists && renderUserMenu()}
    		{userIsAdmin && renderAdminMenu()}
    	</div>
    )

## 6. Higher-order Functions (HoF):

Functions are first-class objects, which means that they can be assigned to variables and passed as parameters to other functions

#### :white_check_mark: GOOD

    const add = (x, y) => x + y

    const log = func => (...args) => {
    	console.log(...args)
    	return func(...args)
    }

    const logAdd = log(add)

    logAdd(1, 9)  // return 10

## 7. Purity:

#### :x: BAD

    let x = 0
    const add = y => (x = x + y)

#### :white_check_mark: GOOD

    const add = (x, y) => x + y

## 8. Immutability:

In FP, a function, instead of changing the value of a variable, creates a new variable with a new value and returns it

#### :x: BAD

    const add3 = arr => arr.push(3)
    const myArr = [1, 2]
    add3(myArr) // [1, 2, 3]
    add3(myArr) // [1, 2, 3, 3]

#### :white_check_mark: GOOD

    const add3 = arr => arr.concat(3)
    const myArr = [1, 2]
    const result1 = add3(myArr) // [1, 2, 3]
    const result2 = add3(myArr) // [1, 2, 3]

## 9. Currying:

Currying is the process of converting a function thattakes multiple arguments into a function that takes one argument at a time, returning another function.

#### :heavy_exclamation_mark: Instead of writing

    const add = (x, y) => x + y

#### :white_check_mark: GOOD

    const add = x => y => x + y
    const add1 = add(1)
    add1(2) // 3
    add1(3) // 4

## 10. Composition:

Functions (and components) can be combined to produce new functions with more advanced features
and properties.

#### :white_check_mark: GOOD

    const add = (x, y) => x + y
    const square = x => x * x

    const addAndSquare = (x, y) => square(add(x, y))
