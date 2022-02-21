import React from 'react';
import {View, TouchableOpacity, Image, ScrollView} from 'react-native';
import {Left, Right} from 'native-base';

import CustomStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import Text from '../../components/Text';

import {colors, images} from '../../global/globalStyle';

import {styles} from './styles';
import {PrettyPrintJSON} from '../../utils/helperFunctions';

const ViewCrashPhotos = ({navigation}) => {
  const photos = navigation.getParam('photos', null);

  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header>
        <Left>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={images.arrow}
              style={styles.arrow}
              tintColor={colors.textDark}
            />
          </TouchableOpacity>
        </Left>

        <Right>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={styles.rightbox}>
            <Text style={styles.text}>HOME</Text>
          </TouchableOpacity>
        </Right>
      </Header>
      {photos.length ? (
        <ScrollView>
          {photos.map(item => {
            PrettyPrintJSON(item.type.label);

            return (
              <View style={styles.itemCont}>
                <Image
                  source={{uri: item.source.assets[0].uri}}
                  style={styles.imgsty}
                />
                <View style={styles.labelCont}>
                  <Text style={styles.label}>{item.type.label}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <View style={styles.nullCont}>
          <Text style={styles.nullContText}>
            Nothing to show, please upload photos of crash
          </Text>
        </View>
      )}
    </View>
  );
};

export default ViewCrashPhotos;
