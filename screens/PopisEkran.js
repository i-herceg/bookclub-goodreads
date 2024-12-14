import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setKnjige } from '../actions';
import Boje from '../constants/Boje';
import Tipka from '../components/Tipka';

const { width, height } = Dimensions.get('window');

const PopisEkran = ({ navigation }) => {
  const dispatch = useDispatch();
  const knjige = useSelector((state) => state.knjige);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const top10Knjiga = knjige.slice(0, 10);

  const handleKnjigaPress = (bookId) => {
    console.log(bookId);
    navigation.navigate('Detalji', { bookId });
  };
  const handleSearch = () => {
    const regex = new RegExp(`${searchText}`, 'i');
    if (searchText.length > 1) {
      const filteredResults = knjige.filter(
        (item) => regex.test(item.title) || regex.test(item.author)
      );
      setFilteredData(filteredResults);
      //console.log(filteredResults);
    } else {
      setFilteredData([]);
    }
    console.log(searchText);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.bookId}
      onPress={() => handleKnjigaPress(item.bookId)}>
      <View style={styles.bookItem}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthors}>by {item.author}</Text>
      </View>
    </TouchableOpacity>
  );
  const renderTop10Item = ({ item }) => (
    <TouchableOpacity
      key={item.bookId}
      onPress={() => handleKnjigaPress(item.bookId)}>
      <View style={styles.top10Item}>
        <Image style={styles.slikaTop10} source={{ uri: item.coverImg }} />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.search}>
        <Text style={styles.title}>Pretraživanje knjiga</Text>
        <TextInput
          style={styles.input}
          placeholder="Unesite tekst za pretraživanje"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <Tipka onPress={handleSearch} title="Pretraži" style={styles.button} />
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.bookId}
          style={styles.bookList}
        />
      </View>
      <View style={styles.bookCover}>
        <Text style={styles.title}>Top 10 knjiga</Text>
        <FlatList
          data={top10Knjiga}
          renderItem={renderTop10Item}
          keyExtractor={(item) => item.bookId}
          horizontal
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: Boje.Pozadina,
  },
  search: {
    flex: 1,
    flexDirection: 'column',
    padding: height * 0.05,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
    fontSize: width * 0.07, 
    fontFamily: 'Ruluko',
  },
  input: {
    fontSize: width * 0.05,
    fontFamily: 'Ruluko',
    height: height * 0.08,
    width: width * 0.8,
    borderColor: Boje.Plava,
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: height * 0.02,
    paddingHorizontal: width * 0.02,
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: width * 0.1,
    paddingVertical: height * 0.03,
    marginBottom: height * 0.05,
    width: width * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Boje.Plava,
  },
  bookList: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  bookItem: {
    padding: width * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: Boje.Matcha,
  },
  bookTitle: {
    fontSize: height * 0.025,
    fontWeight: 'bold',
  },
  bookAuthors: {
    fontSize: height * 0.02,
    color: '#555',
  },
  top10Item: {
    justifyContent: 'center',
    flex: 1,
    borderColor: Boje.Bijela,
    borderRadius: 10,
    borderWidth: 1,
    padding: width * 0.02,
    margin: width * 0.02,
  },
  slikaTop10: {
    height: height * 0.3,
    width: width * 0.4,
    borderRadius: 10,
  },
});

export default PopisEkran;
