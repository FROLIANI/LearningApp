import React from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function EmojiSticker({ imageSize, stickerSource }) {
    const scaleImage = useSharedValue(imageSize);

    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onEnd(() => {
            scaleImage.value = scaleImage.value === imageSize ? imageSize * 2 : imageSize;
        });

    const imageStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value),
        };
    });

    return (
        <View style={{ top: -350 }}>
            <GestureDetector gesture={doubleTap}>
                <Animated.Image
                    source={stickerSource}
                    resizeMode="contain"
                    style={[imageStyle]}
                />
            </GestureDetector>
        </View>
    );
}
