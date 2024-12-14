import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import Boje from '../constants/Boje';

const { width, height } = Dimensions.get('window');

const Tipka = (props) => {
  return (
    <TouchableOpacity
      style={{...styles.button, ...props.style}}
      onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.03,
    marginBottom: height * 0.05,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Boje.Plava,
  },
  buttonText: {
    color: Boje.Bijela,
    fontFamily: 'Ruluko',
    fontSize: 25,
  },
});

export default Tipka;
