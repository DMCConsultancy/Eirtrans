import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import cloneDeep from 'lodash.clonedeep';

const CarDamageMarking = ({children, markText, afterMarkExec}) => {
  const [markData, setMarkData] = useState([]);
  return (
    <Pressable
      onPress={evt => {
        console.log({
          X: evt.nativeEvent.locationX,
          Y: evt.nativeEvent.locationY,
        });

        if (!markText) {
          console.warn('First select a damage type');
          return;
        }

        const touchCoords = {
          X: evt.nativeEvent.locationX,
          Y: evt.nativeEvent.locationY,
        };

        let clonedMarkData = cloneDeep(markData);

        clonedMarkData.push({
          touchCoords,
          text: markText,
        });

        setMarkData(clonedMarkData);

        setTimeout(() => {
          afterMarkExec();
        }, 200);
      }}
      style={{
        position: 'relative',
        backgroundColor: 'red',
        marginHorizontal: 20,
      }}>
      {children}
      {markData.length ? (
        markData.map(markEle => (
          <Text
            style={{
              color: 'red',
              position: 'absolute',
              left: markEle.touchCoords.X,
              top: markEle.touchCoords.Y,
            }}>
            {markEle.text}
          </Text>
        ))
      ) : (
        <View />
      )}
    </Pressable>
  );
};

export default CarDamageMarking;

const styles = StyleSheet.create({});
