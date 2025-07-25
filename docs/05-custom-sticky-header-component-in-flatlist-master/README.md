## Về tác giả
Mọi thông tin về Tác giả Hỏi Dân IT, các bạn có thể tìm kiếm tại đây:

Website chính thức: https://hoidanit.vn/

Youtube “Hỏi Dân IT” : https://www.youtube.com/@hoidanit

Tiktok “Hỏi Dân IT” :  https://www.tiktok.com/@hoidanit

Fanpage “Hỏi Dân IT” : https://www.facebook.com/askITwithERIC/

Udemy Hỏi Dân IT: https://www.udemy.com/user/eric-7039/

===

### Custom Sticky Header Component in Flatlist (React Native)
##### Author: https://medium.com/@shusachenko/custom-sticky-header-component-in-flatlist-react-native-31e734c5750b


Custom Sticky Component in FlatList — React Native
==================================================


![Usage example](https://miro.medium.com/v2/resize:fit:632/format:webp/1*ab7AQg68YrkWfzXehQ98Bw.gif)

I want to show in this article a way when the usual [stickyHeaderIndices](https://reactnative.dev/docs/scrollview#stickyheaderindices) is not enough for your purposes.

For example, if you go so that not all elements from the header are sticky.

Dependencies
------------

The list itself is made using only [**react native**](https://reactnative.dev/).
[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) was used to animate the remaining elements.

What does this list consist of?
-------------------------------

The component itself consists of the following parts:

*   **Header Component** — an element that is located at the very top and hides when scrolling.
*   **Sticky Component** — an element that is located below the **Header Component** and when scrolled is “glued” to the top edge of the screen.
*   **Top of List Component** — an element that is located below **Sticky Component** and hides when scrolling.
*   **List of Items** — a list with any items.

![Parts in the list](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*vNzEb0wfF1hCwtw91Y6vUQ.png)

List mechanism
--------------

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*9r0ACfVpW9FtcopU)

First you need to understand the mechanism of this list. In short, we can track scroll positions and lift elements, we do this thanks to [Animated](https://reactnative.dev/docs/animated), but now let’s take a closer look.

**Scroll Handling** — to track the scroll position, the [**onScroll**](https://reactnative.dev/docs/scrollview#onscroll) method is used.

```
...  
const scrollY = useRef(new Animated.Value(0)).current;
  ...
onScroll={Animated.event(
  [{ nativeEvent: { contentOffset: { y: scrollY } } }],
  {
    useNativeDriver: true
  }
)}
...
```

**Header Component** — will be passed to the list itself as “ListHeaderComponent” and will work like a regular.

```
...    
ListHeaderComponent={
  <Animated.View onLayout={onLayoutHeaderElement}>
    {props.HeaderComponent}
  </Animated.View>
}
ListHeaderComponentStyle={[  props.ListHeaderComponentStyle,
  styles.header
]}
...
```

But there will also be indentation at the bottom so that the **List of Items** is below other elements.

```
... 
header: {
  marginBottom: heights.sticky + heights.topList
},
....
```

**Sticky Component —** will also be a separate component that we raise in accordance with the interpolated scroll value, but there will be a limitation from above so that the effect **sticky** will be created

```
...  
<Animated.View
  style={styles.stickyElement}
  onLayout={onLayoutStickyElement}
>
  {props.StickyElementComponent}
</Animated.View>;
...
```

Here we add `marginTop` since this is a separate element and we need it to be below **Header Component.**
We also make it `position:"absolute"`and with the help of `scrollY.interpolate(…` we control its position.

```
...
stickyElement: {
  left: 0,
  marginTop: heights.header,
  position: "absolute",
  right: 0,
  transform: [    {
      translateY: scrollY.interpolate({
        // <-- To move an element according to the scroll position
        extrapolate: "clamp",
        inputRange: [-window.height, heights.header],
        outputRange: [window.height, -heights.header]
      })
    }
  ],
  zIndex: 2
},
...
```

**Top of List Component** — will also be a separate component that we raise in accordance with the interpolated scroll value.

```
...
<Animated.View // <-- Top of List Component
  style={styles.topElement}
  onLayout={onLayoutTopListElement}
>
  {props.TopListElementComponent}
</Animated.View>;
...
```

Here we add `marginTop` since this is a separate element and we need it to be below **Header Component** and **Sticky Component.**
We also make it `position:"absolute"`and with the help of `scrollY.interpolate(…` we control its position.

```
...
topElement: {
  left: 0,
  marginTop: heights.header + heights.sticky, // <-- In order for the list to be under other elements
  position: "absolute",
  right: 0,
  transform: [    {
      translateY: scrollY.interpolate({
        // <-- To move an element according to the scroll position
        extrapolate: "clamp",
        inputRange: [          -window.height,
          heights.header + heights.sticky + heights.topList
        ],
        outputRange: [          window.height,
          -(heights.header + heights.sticky + heights.topList)
        ]
      })
    }
  ],
  zIndex: 1
}
...
```

**List of Items** — it will work the same as in [FlatList](https://reactnative.dev/docs/flatlist#required-renderitem). We’ll just throw it into FlatList.

```
...
<Animated.FlatList<any>
 {...props}
...
```

We also need to know the size of elements such as **Header Component, Top of List Component** and **Sticky Component.** For this we will use [onLayout.](https://reactnative.dev/docs/view#onlayout)

```
...
const [heights, setHeights] = useState({
  header: 0,
  sticky: 0,
  topList: 0
});
...
const onLayoutHeaderElement = (event: LayoutChangeEvent): void => {
  setHeights({ ...heights, header: event.nativeEvent.layout.height });
};
const onLayoutTopListElement = (event: LayoutChangeEvent): void => {
  setHeights({ ...heights, topList: event.nativeEvent.layout.height });
};
const onLayoutTopStickyElement = (event: LayoutChangeEvent): void => {
  setHeights({ ...heights, sticky: event.nativeEvent.layout.height });
};
...
```

Now let’s put it all together and see what it will look like together.

Implementation
--------------

Now we need to create the component itself and a custom hook.

Let’s start to the component, it will extend [FlatList](https://reactnative.dev/docs/flatlist#required-renderitem).

```
// ./CustomFlatList.tsx
import { useCustomFlatListHook } from "./hooks/useRestaurantListHook";
import React, { useRef } from "react";
import { Animated, FlatListProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
type CustomFlatListProps<T> = Omit<FlatListProps<T>, "ListHeaderComponent"> & {
  /**
   * An element that is above all
   *
   * Hides when scrolling
   */
  HeaderComponent: JSX.Element;
  /**
   * An element that is above the list but lower than {@link Props.HeaderComponent HeaderComponent} and has the property sticky
   *
   * When scrolling is fixed on top
   */
  StickyElementComponent: JSX.Element;
  /**
   * An element that is higher than the list but lower than {@link Props.HeaderComponent HeaderComponent} and {@link Props.StickyElementComponent StickyElementComponent}
   *
   * Hides when scrolling
   */
  TopListElementComponent: JSX.Element;
};
function CustomFlatList<T>({
  style,
  ...props
}: CustomFlatListProps<T>): React.ReactNode {
  const listRef = useRef<Animated.FlatList<T> | null>(null);
  const [    scrollY,
    styles,
    onLayoutHeaderElement,
    onLayoutTopListElement,
    onLayoutStickyElement
  ] = useCustomFlatListHook();
  return (
    <SafeAreaView edges={["bottom"]} style={style}>
      <Animated.View  // <-- Sticky Component
        style={styles.stickyElement}
        onLayout={onLayoutStickyElement}
      >
        {props.StickyElementComponent}
      </Animated.View>
      <Animated.View  // <-- Top of List Component
        style={styles.topElement}
        onLayout={onLayoutTopListElement}
      >
        {props.TopListElementComponent}
      </Animated.View>
      <Animated.FlatList<any>
        ref={listRef}
        {...props}
        ListHeaderComponent={ // <-- Header Component
          <Animated.View onLayout={onLayoutHeaderElement}>
            {props.HeaderComponent}
          </Animated.View>
        }
        ListHeaderComponentStyle={[          props.ListHeaderComponentStyle,
          styles.header
        ]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true
          }
        )}
      />
    </SafeAreaView>
  );
}
export default CustomFlatList;
```

Now let’s make a custom hook that will control the elements.

```
// ./hooks/useRestaurantListHook.ts
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle
} from "react-native";
type ICustomFlatListStyles = {
  header: StyleProp<ViewStyle>;
  stickyElement: StyleProp<ViewStyle>;
  topElement?: StyleProp<ViewStyle>;
};
type TUseCustomFlatListHook=[  Animated.Value,
  ICustomFlatListStyles,
  (event: LayoutChangeEvent) => void,
  (event: LayoutChangeEvent) => void,
  (event: LayoutChangeEvent) => void
]
const window = Dimensions.get("window");
export const useCustomFlatListHook = (): TUseCustomFlatListHook => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [heights, setHeights] = useState({
    header: 0,
    sticky: 0,
    topList: 0
  });
  const styles: ICustomFlatListStyles = {
    header: {
      marginBottom: heights.sticky + heights.topList // <-- In order for the list to be under other elements
    },
    stickyElement: {
      marginTop: heights.header, // <-- In order for the list to be under Header
      position: "absolute",
      transform: [        {
          translateY: scrollY.interpolate({
            // <-- To move an element according to the scroll position
            extrapolate: "clamp",
            inputRange: [-window.height, heights.header],
            outputRange: [window.height, -heights.header]
          })
        }
      ],
      zIndex: 2
    },
    topElement: {
      marginTop: heights.header + heights.sticky, // <-- In order for the list to be under other elements
      position: "absolute",
      transform: [        {
          translateY: scrollY.interpolate({
            // <-- To move an element according to the scroll position
            extrapolate: "clamp",
            inputRange: [              -window.height,
              heights.header + heights.sticky + heights.topList
            ],
            outputRange: [              window.height,
              -(heights.header + heights.sticky + heights.topList)
            ]
          })
        }
      ],
      zIndex: 1
    }
  };
  const onLayoutHeaderElement = (event: LayoutChangeEvent): void => {
    setHeights({ ...heights, header: event.nativeEvent.layout.height });
  };
  const onLayoutTopListElement = (event: LayoutChangeEvent): void => {
    setHeights({ ...heights, topList: event.nativeEvent.layout.height });
  };
  const onLayoutTopStickyElement = (event: LayoutChangeEvent): void => {
    setHeights({ ...heights, sticky: event.nativeEvent.layout.height });
  };
  return [    scrollY,
    styles,
    onLayoutHeaderElement,
    onLayoutTopListElement,
    onLayoutTopStickyElement
  ];
};
```

and now let’s try to use this component.

```
// ./App.js
import CustomFlatList from "./components/CustomFlatList/CustomFlatList";
import { SafeAreaView, View } from "react-native";
import styles from "./styles"
const data = Array(10).fill(1);
/**
 *
 */
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <CustomFlatList
        data={data}
        style={styles.list}
        renderItem={() => <View style={styles.item} />}
        HeaderComponent={<View style={styles.header} />}
        StickyElementComponent={<View style={styles.sticky} />}
        TopListElementComponent={<View style={styles.topList} />}
      />
    </SafeAreaView>
  );
}
```

And add some styles.

```
// ./styles.ts
import {StyleSheet} from "react-native";
export default StyleSheet.create({
  container: {
    backgroundColor: "#ecf0f1",
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
    padding: 8
  },
  header: {
    borderColor: "red",
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: "100%"
  },
  item: {
    borderColor: "green",
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: "100%"
  },
  list: {
    overflow: "hidden"
  },
  sticky: {
    backgroundColor: "#2555FF50",
    borderColor: "blue",
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: "100%"
  },
  topList: {
    borderColor: "orange",
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: "100%"
  }
});
```

And as a result we have this.

![Example](https://miro.medium.com/v2/resize:fit:800/format:webp/1*SjL3x_r6xJcn-GS3-4JwYA.gif)

And based on this, you can already fill this component with other content.

![Usage Example](https://miro.medium.com/v2/resize:fit:640/format:webp/1*kmIPEEcQ4tGxyGTPvLbG-A.gif)

Code example on Expo:
[https://snack.expo.dev/@fero_sima/custom-sticky-header-component-in-flatlist](https://snack.expo.dev/@fero_sima/custom-sticky-header-component-in-flatlist?platform=ios) (better to run on iOS or Android)
