# Questions

## 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

<b>Component</b> - Re-renders whenever parent component re-renders. Also re-renders when the props or state changes, not having in mind if it actually affects the rendering output. This is "worse" in terms of performance - because a component re-renders even if there is no need. 

<b>PureComponent</b> - Performs a shallow comparison between previous and next props & state, and only re-renders if there is a change. 
Using PureComponent may break an app if props or state are complex/nested mutable objects, and shallow comparison is not enough. In that case, component will not re-render, and data rendered will not be latest/correct. 

## 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

<b>shouldComponentUpdate</b> is a component lifecycle method which compares previous & next props and state to determine if they are changed in order for the component to update (or not update).
<b>Context</b> bypasses this method, as the props are "drilled" into the component without the hierarchy, so shouldComponentUpdate usually does not check these values. This might be dangerous as it may lead to unnecessary/unwanted component re-renders, and difficulcy in debugging/maintaining the code. 


## 3. Describe 3 ways to pass information from a component to its PARENT.

Using <b>callback</b> function - Parent defines a method which is sent through props to Child. The child invokes the method with some data. 
```
const ParentComponent = () = > {
    const dummyMethod = (dataFromChild) => {
        setDataFromChild(dataFromChild);
    };

    return (<ChildComponent setParentData={dummyMethod} />);
}
```

Using <b>Context</b> - We use context when we have some data that needs to be accessed by multiple component at different levels of component hierarchy. If the child component updates Context - any component that consumes the Context will be aware of the change. 

Using <b>Redux, or other State Management Libraries</b> - there is a centralized source of truth (the store) which contains all the data accessible by all parts of the application (all components). Child component can dispatch an action that will update the store, and parent component can be aware of the change if it observes the store.


## 4. Give 2 ways to prevent components from re-rendering.

Using <b>useMemo(() => {}, [])</b> hook (in Functional components only) which performs a shallow comparison of the dependencies to determine if re-rendering is needed.

Custom implementation of <b>shouldComponentUpdate</b> (in Class components) to prevent Component from unnecessary re-renders. 

## 5. What is a fragment and why do we need it? Give an example where it might break my app.

Fragment is basically a wrapper which groups multiple React elements without creating extra nodes in DOM, used mostly to avoid returing unnecessary container elements from component's render method.
Fragments could potentially break an app if they are nested incorrectly, or if arrays are not mapped correctly (if we don't have keys for items of an array and re-rendering keeps happening), or if we are not aware of their nesting - for example if we have CSS that is not aware that items in fragment are not in a separate node.


## 6. Give 3 examples of the HOC pattern.

Higher Order Components "enrich" the wrapped component with some additional data/props/behaviour.
It is needed mostly for reusability.

Examples:

1. Providing certain data, which is widely needed/used
```
const withDataHOC = (WrappedComponent: Function) => {
    return function WithDataHOC (props) {
        const [data, setData] = useState([]);
        // handles data fetching
        useEffect(() => {
            // fetch and set data
        }, []);

        return (<WrappedComponent data={data} {...props} />);
    }
}
```
2. Providing certain logic/UI, for example to load a spinner when data is not fetched
```
const withSpinnerHOC = (WrappedComponent: Function) => {
    return function withSpinnerHOC(props) {    
        return (<div><Spinner loading={!props.loaded}/><WrappedComponent {...props} /></div>);
    }
}
```
3. Providing pre-checks of authentication 
```
const withAuth = (WrappedComponent: Function) => {
    return function withAuth(props) {    
        const [isLoggedIn, setLoggedIn] = useState(false);

        const logIn = () => {
            setLoggedIn(true);
        }

        return (isLoggedIn ? <WrappedComponent {...props} /> : <LoginButton onLoggedIn={logIn} />);
    }
}
```

## 7. What's the difference in handling exceptions in promises, callbacks and async...await?


## 8. How many arguments does setState take and why is it async.

setState can be called with an object - one argument, example: setState({ obj: value });
or with a function which receives the previous state as an argument: setState((prevState) => ({ obj: prevState.obj + 1 }))

setState is async as React batches multiple setState updates into one - to make as least as possible re-renders/updates of the DOM, which improves performance, avoids race conditions with component state, making the components predictable and consistent.


## 9. List the steps needed to migrate a Class to Function Component.


## 10. List a few ways styles can be used with components. 

## 11. How to render an HTML string coming from the server.
