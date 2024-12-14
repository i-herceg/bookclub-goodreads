import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import Boje from '../constants/Boje';

const { width, height } = Dimensions.get('window');
const booksPerLoad = 4;

const EkranIstrazi = ({ navigation }) => {
  const categories = [
    'Adventure',
    'Comics',
    'Drama',
    'Fiction',
    'History',
    'Romance',
    'Science',
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loadedBooks, setLoadedBooks] = useState(booksPerLoad);
  const knjige = useSelector((state) => state.knjige);

  const handleCategoryPress = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setLoadedBooks(booksPerLoad);
  };

  const handleLoadMore = () => {
    setLoadedBooks((prev) => prev + booksPerLoad);
  };

  const renderBookList = (category) => {
    if (!selectedCategory || selectedCategory !== category) return null;

    const filteredBooks = knjige.filter((knjiga) =>
      knjiga.genres.includes(category)
    );
    const displayedBooks = filteredBooks.slice(0, loadedBooks);

    return (
      <View style={styles.categoryList}>
        <View style={styles.bookListContainer}>
          {displayedBooks.map((knjiga) => (
            <TouchableOpacity
              key={knjiga.bookId}
              onPress={() => handleDetaljiKnjige(knjiga.bookId)}>
              <View style={styles.book}>
                <Image source={{ uri: knjiga.coverImg }} style={styles.slika} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.load}>
          {filteredBooks.length > loadedBooks && (
            <TouchableOpacity
              style={styles.loadMoreButton}
              onPress={handleLoadMore}>
              <Text style={styles.loadMoreText}>Učitaj još</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const handleDetaljiKnjige = (bookId) => {
    navigation.navigate('Detalji', { bookId });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Istraži kategorije</Text>
      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <View key={index} style={styles.categoryItem}>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => handleCategoryPress(category)}>
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
            {renderBookList(category)}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Boje.Matcha,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.05,
  },
  headerText: {
    fontFamily:'Ruluko',
    fontSize: width * 0.06,
    marginBottom: height * 0.02,
  },
  categoriesContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: height * 0.05,
  },
  categoryItem: {
    marginHorizontal: width * 0.02,
    marginBottom: height * 0.02,
  },
  categoryButton: {
    backgroundColor: Boje.Plava,
    borderRadius: 10,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.02,
    marginBottom: height * 0.02,
  },
  categoryText: {
    color: Boje.Bijela,
    fontSize: width * 0.04,
    fontFamily:'Ruluko',
  },
  bookListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  categoryList: {
    flex: 1,
    justifyContent: 'center',
  },
  book: {
    flexDirection: 'row',
    padding: width * 0.02,
  },
  slika: {
    width: width * 0.35,
    height: height * 0.25,
    borderRadius: width * 0.03,
  },
  loadMoreButton: {
    backgroundColor: Boje.Pozadina,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: width * 0.04,
    marginTop: height * 0.02,
  },
  loadMoreText: {
    color: Boje.Bijela,
    fontSize: width * 0.04,
    fontFamily:'Ruluko',
  },
});

export default EkranIstrazi;
