import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import * as Font from 'expo-font';
import { useDispatch, useSelector } from 'react-redux';
import { setKnjige } from '../actions';
import data from '../data/books.json';
import Boje from '../constants/Boje';
import Tipka from '../components/Tipka';

const { width, height } = Dimensions.get('window');

const PocetniEkran = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setKnjige(data));
  }, [dispatch]);
  return (
    <View style={stil.ekran2}>
      <Text style={stil.headerText}>BookClub</Text>
      <View style={stil.ekran}>
        <View style={stil.slika}>
          <Image
            source={require('../assets/home_image.png')}
            style={stil.slika}
          />
        </View>
        <View style={stil.desniContainer}>
          <Tipka
            onPress={() => navigation.navigate('Istraži')}
            title="Istraži"
          />
        </View>
      </View>
    </View>
  );
};

const stil = StyleSheet.create({
  ekran: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Boje.Pozadina,
    height: height * 0.8,
  },
  ekran2: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Boje.Pozadina,
  },
  headerText: {
    color: Boje.Bijela,
    fontSize: width * 0.1,
    fontFamily: 'Pacifico',
  },
  desniContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: width * 0.05,
  },
  slika: {
    height: '95%',
    resizeMode: 'contain',
  },
});

export default PocetniEkran;
