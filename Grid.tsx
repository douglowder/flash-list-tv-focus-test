import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const generateRandomStrings = (length: number) => {
  const randomStrings = [];
  for (let i = 0; i < length; i++) {
    randomStrings.push({
      id: `${i}-${Math.random().toString(36).substring(7)}`,
      content: Math.random().toString(36).substring(7),
    });
  }

  return randomStrings;
};

const initialContent = generateRandomStrings(300);

const Grid = () => {
  const flashListRef = useRef<FlashList<any>>(null);
  const [state, setState] = useState(initialContent);

  const updateStrings = useCallback(() => {
    setState((currentState) => {
      return currentState.map((item) => ({
        id: item.id,
        content: Math.random().toString(36).substring(7),
      }));
    });
  }, []);

  const handleFocus = useCallback((index: number) => {
    console.log(`Grid: scrollToIndex: ${index}`);

    flashListRef?.current?.scrollToIndex({
      index,
      viewPosition: 0.5,
      animated: true,
    });
  }, []);

  const keyExtractor = useCallback((item) => item.id, []);
  // const keyExtractor = useCallback((item, index) => index, []);

  const handleRenderRow = useCallback(
    ({ item, index }: { item; index: number }) => {
      return (
        <TouchableOpacityWrapped
          index={index}
          onFocus={handleFocus}
          onPress={updateStrings}
          key={item.id}
        >
          <View
            style={{
              height: 50,
              borderWidth: 2,
              margin: 2,
            }}
          >
            <Text>{item.content}</Text>
          </View>
        </TouchableOpacityWrapped>
      );
    },
    [handleFocus, updateStrings],
  );

  return (
    <FlashList
      ref={flashListRef}
      data={state}
      drawDistance={200}
      estimatedItemSize={50}
      renderItem={handleRenderRow}
      scrollEnabled={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={{
        width: 600,
        height: 400,
      }}
    />
  );
};

export default Grid;

const TouchableOpacityWrapped = ({ index, onFocus, ...props }) => {
  const handleFocus = useCallback(() => {
    onFocus(index);
  }, [index, onFocus]);

  return <TouchableOpacity {...props} onFocus={handleFocus} />;
};
