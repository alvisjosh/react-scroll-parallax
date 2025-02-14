# Usage

## First Step

### Wrap with a ParallaxProvider

The [`<ParallaxProvider/>`](/docs/usage/components/parallax-provider) must wrap the component root that contains all [components](/docs/usage/components/) or [hooks](/docs/usage/hooks/) that use the parallax context. This should be a top level component like `<App>` and will provide necessary access through the React context API to the [Parallax Controller](https://parallax-controller.vercel.app/docs/intro). For example:

```jsx
import { ParallaxProvider } from 'react-scroll-parallax';

function App() {
  render() {
    return (
      <ParallaxProvider>
        <AppRoutes />
      </ParallaxProvider>
    );
  }
}
```

ParallaxProvider component [documentation](/docs/usage/components/parallax-provider).

## Next: Create effects

After wrapping the app with a provider you can start adding parallax effects.

### With useParallax()

Then import the [`useParallax`](/docs/usage/hooks/use-parallax) hook and use it anywhere within the provider. Here's an example that uses the [`speed`](/docs/usage/parallax-props#configuration-props) prop so simply speed up (or slowdown) the rate of scroll.

```jsx
import { useParallax } from 'react-scroll-parallax';

const Component = () => {
  const { ref } = useParallax({ speed: 10 });
  return <div ref={ref} className="my-thing" />;
};
```

:::info

The hook will apply the effect styles directly to the element that the `ref` is attached.

:::

Any of the [documented effects and configurations](/docs/usage/parallax-props) can be passed as params to the hook.

### Or with <Parallax\>

You can also use the [`<Parallax>`](/docs/usage/components/parallax-component) component. Here's an example that will transform the element on the [`translateY`](/docs/usage/parallax-props#css-effect-props) axis starting at `-20%` and ending at `20%` (`[-20, 20]` \*percent is assumed with no provided unit).

```jsx
import { Parallax } from 'react-scroll-parallax';

const Component = () => (
  <Parallax translateY={[-20, 20]}>
    <div className="my-thing" />
  </Parallax>
);
```

:::info

The component will apply the effect styles to a `div` managed by the component and **not** the children.

:::

Any of the [documented effects and configurations](/docs/usage/parallax-props) can be passed as props to the component.

This example uses the [`translateX`](/docs/usage/parallax-props#css-effect-props) transform starting at `-100px` and ending at `200px`.

```jsx
import { Parallax } from 'react-scroll-parallax';

const Component = () => (
  <Parallax translateX={['-100px', '200px']}>
    <div className="my-thing" />
  </Parallax>
);
```

Parallax component [documentation](/docs/usage/components/parallax-component).

## Finally

### Updating the Cache

Performance relies on caching values that cause layout, but this cache needs to be updated if the page layout changes from an event other than a `load`, `resize`, `focus` or `blur`.

### Route Changes

Depending on your app setup, you may need to update the [Parallax Controller](https://parallax-controller.vercel.app/docs/intro) cache when the route changes since scroll and page height change. Here's a component and hook written for Gatsby that will update the controller via context whenever the location changes.

```tsx
import { useEffect } from 'react';
import { useLocation } from '@reach/router';
import { useParallaxController } from 'react-scroll-parallax';

function useUpdateControllerOnRouteChange() {
  const location = useLocation();
  const parallaxController = useParallaxController();

  useEffect(() => {
    parallaxController.update();
  }, [location.pathname]);
}

const ParallaxRouteUpdate = () => {
  useUpdateControllerOnRouteChange();
  return null;
};
```

### Images Loading

Often times images impact the position of content on the page. This is another common scenario that will require updating the cache which can be done using an `onLoad` event.

```tsx
import { useParallaxController } from 'react-scroll-parallax';

const Image = () => {
  const parallaxController = useParallaxController();
  return <img src="image.jpg" onLoad={() => parallaxController.update()} />;
};
```
