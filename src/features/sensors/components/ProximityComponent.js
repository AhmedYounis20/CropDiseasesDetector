import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Accelerometer, SensorTypes } from 'expo-sensors';
import { SafeArea } from '../../../components/SafeArea/SafeArea.Component';

export const ProximityComponent=()=>{
    const [isClose, setIsClose] = useState(false);
    useEffect(() => {
        const proximitySubscription = Accelerometer.addListener(({ proximity }) => {
          setIsClose(proximity === 0);
        });
      
        return () => {
          proximitySubscription.remove();
        };
      }, []);
      return (
        <SafeArea>
        <View>
          <Text>{isClose ? 'Close' : 'Far'}</Text>
        </View>
        </SafeArea>
      );
}