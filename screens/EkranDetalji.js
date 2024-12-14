import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button, Image, ScrollView, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { oznaciProcitanu, dodajTrenutnoCitam, dodajZelimProcitati, dodajRecenziju } from '../actions';
import { Picker } from '@react-native-picker/picker';
const { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import Boje from '../constants/Boje';
import Tipka from '../components/Tipka';


const EkranDetalji = ({ route }) => {
  const { bookId } = route.params;
  const knjiga = useSelector((state) => state.statusKnjiga[bookId]);
  const korisnikoveRecenzije = useSelector((state) => state.recenzije[bookId] || []);
  const dispatch = useDispatch();
  const [status, setStatus] = useState('');
  const [ocjena, setOcjena] = useState(0);
  const [recenzija, setRecenzija] = useState('');

  useEffect(() => {
    setStatus(knjiga.status);
  }, [knjiga]);

  const handleOznaciStatus = (noviStatus) => {
    setStatus(noviStatus);
    switch (noviStatus) {
      case 'Pročitano':
        dispatch(oznaciProcitanu(bookId));
        break;
      case 'Trenutno čitam':
        dispatch(dodajTrenutnoCitam(bookId));
        break;
      case 'Želim pročitati':
        dispatch(dodajZelimProcitati(bookId));
        break;
      default:
        break;
    }
  };

  const handleOcjenjivanje = (novaOcjena) => {
    setOcjena(novaOcjena);
  };

  const handleSlanjeRecenzije = () => {
    const novaRecenzija = {
      bookId,
      ocjena,
      recenzija,
    };

    if (novaRecenzija.ocjena > 0) {
      dispatch(dodajRecenziju(novaRecenzija));
      setRecenzija('');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Image
          source={{ uri: knjiga.coverImg }}
          style={styles.slika}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.bookTitle}>{knjiga.title}</Text>
          <Text style={styles.bookAuthors}>by {knjiga.author}</Text>
        </View>
      </View>
      <Text style={styles.text}>Ocjena: {knjiga.rating /100}/5</Text>
      <Text style={styles.text}>Broj ocjena: {knjiga.numRatings}</Text>
      <Text style={styles.text}>Broj stranica knjige: {knjiga.pages}</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={status}
          style ={styles.pickerText}
          onValueChange={(itemValue) => handleOznaciStatus(itemValue)}>
          <Picker.Item label="Odaberi status" value="" />
          <Picker.Item label="Pročitano" value="Pročitano" />
          <Picker.Item label="Trenutno čitam" value="Trenutno čitam" />
          <Picker.Item label="Želim pročitati" value="Želim pročitati" />
        </Picker>
      </View>
      <View style={styles.ocjenaContainer}>
        <Text style={styles.text}>Ocjeni knjigu:</Text>
        <View style={styles.zvijezdeContainer}>
          {[1, 2, 3, 4, 5].map((brojZvjezdica) => (
            <Icon
              key={brojZvjezdica}
              name={brojZvjezdica <= ocjena ? 'star' : 'star-o'}
              size={width * 0.06}
              style={styles.zvijezdice}
              onPress={() => handleOcjenjivanje(brojZvjezdica)}
            />
          ))}
        </View>
      </View>
      <View style={styles.rating}>
        <TextInput
          style={styles.recenzijaInput}
          placeholder="Napiši recenziju..."
          value={recenzija}
          onChangeText={(text) => setRecenzija(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSlanjeRecenzije}>
          <Text style={styles.buttonText}>Pošalji recenziju</Text>
        </TouchableOpacity>
        <View style={styles.review}>
          <Text style={styles.title}>Korisnikove recenzije:</Text>
          {korisnikoveRecenzije.map((recenzija, index) => (
            <View key={index} style={styles.korisnikovaRecenzija}>
              <Text style={styles.title}>Ocjena: {recenzija.ocjena}</Text>
              <Text style ={styles.title}>Recenzija: {recenzija.recenzija}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Boje.Matcha,
    padding: width * 0.04,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: height * 0.02,
  },
  slika: {
    width: width * 0.4,
    height: height * 0.3,
    borderRadius: width * 0.03,
    marginRight: width * 0.05,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontFamily:'Ruluko',
    fontSize: width * 0.05,
    marginVertical: height * 0.02,
  },
  bookTitle: {
    fontFamily:'Ruluko',
    fontSize: width * 0.06,
    marginBottom: height * 0.01,
  },
  bookAuthors: {
    fontFamily:'Ruluko',
    fontSize: width * 0.04,
    color: '#555',
    marginBottom: height * 0.02,
  },
  text: {
    fontFamily:'Ruluko',
    fontSize: width * 0.04,
    marginBottom: height * 0.01,
  },
  picker: {
    fontFamily:'Ruluko',
    justifyContent: 'center',
    height: height * 0.06,
    width: width * 0.6,
    borderWidth: 1,
    borderColor: Boje.Plava,
    borderRadius: width * 0.03,
    marginVertical: height * 0.02,
  },
  ocjenaContainer: {
    paddingTop: height * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'column',
  },
  zvijezdeContainer: {
    flexDirection: 'row',
    marginLeft: width * 0.02,
  },
  zvijezdice:{
    color: Boje.Zuta,
  },
  recenzijaInput: {
    fontFamily:'Ruluko',
    height: height * 0.1,
    borderWidth: 1,
    borderColor: Boje.Plava,
    borderRadius: width * 0.03,
    marginVertical: height * 0.02,
    padding: width * 0.02,
  },
  korisnikovaRecenzija: {
    marginVertical: height * 0.02,
    fontFamily:'Ruluko',
  },
  button: {
    fontFamily:'Ruluko',
    borderRadius: width * 0.03,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.03,
    marginBottom: height * 0.02,
    width: width * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Boje.Plava,
  },
  buttonText: {
    fontFamily:'Ruluko',
    color: Boje.Bijela,
    fontSize: width * 0.04,
  },
  review: {
    paddingBottom: height * 0.02,
  },
});

export default EkranDetalji;
