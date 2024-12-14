import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Boje from '../constants/Boje';

const { width, height } = Dimensions.get('window');

const Profil = ({ navigation }) => {
  const statusKnjiga = useSelector((state) => state.statusKnjiga);
  const recenzije = useSelector((state) => state.recenzije);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedBooks, setSelectedBooks] = useState([]);

  const handleDetaljiKnjige = (bookId) => {
    navigation.navigate('Detalji', { bookId });
    console.log(bookId);
    setModalVisible(false);
  };

  const handleModalPress = (status) => {
    setSelectedStatus(status);
    const books = Object.values(statusKnjiga).filter(
      (knjiga) => knjiga.status === status
    );
    setSelectedBooks(books);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const brojKnjiga = (status) => {
    return Object.values(statusKnjiga).filter(
      (knjiga) => knjiga.status === status
    ).length;
  };

  const renderStars = (knjiga) => {
    const recenzijeZaKnjigu = recenzije[knjiga.bookId];
    if (!recenzijeZaKnjigu || recenzijeZaKnjigu.length === 0) return '/';

    const zadnjaRecenzija = recenzijeZaKnjigu[recenzijeZaKnjigu.length - 1];
    const ocjena = zadnjaRecenzija.ocjena;
    if (knjiga.status === 'Pročitano') {
      return (
        <View style={styles.zvijezdeContainer}>
          {[1, 2, 3, 4, 5].map((brojZvjezdica) => (
            <Icon
              key={brojZvjezdica}
              name={brojZvjezdica <= ocjena ? 'star' : 'star-o'}
              size={width * 0.06}
              style={styles.zvijezdice}
            />
          ))}
        </View>
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={require('../assets/user.jpg')}
          style={styles.userImage}
        />
        <Text style={styles.userName}>Ime Prezime</Text>
      </View>

      <TouchableOpacity onPress={() => handleModalPress('Pročitano')}>
        <Text style={styles.statusText}>
          <Text style={styles.brojKnjiga}>{brojKnjiga('Pročitano')}</Text>{' '}
          Pročitane knjige
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleModalPress('Trenutno čitam')}>
        <Text style={styles.statusText}>
          <Text style={styles.brojKnjiga}>{brojKnjiga('Trenutno čitam')}</Text>{' '}
          Knjige koje trenutno čitam
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleModalPress('Želim pročitati')}>
        <Text style={styles.statusText}>
          <Text style={styles.brojKnjiga}>{brojKnjiga('Želim pročitati')}</Text>{' '}
          Knjige koje želim pročitati
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}>
        <ScrollView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{selectedStatus}</Text>
          {selectedBooks.map((knjiga) => (
            <TouchableOpacity
              key={knjiga.bookId}
              onPress={() => handleDetaljiKnjige(knjiga.bookId)}>
              <View style={styles.contentContainer}>
                <Image source={{ uri: knjiga.coverImg }} style={styles.slika} />
                <View style={styles.infoContainer}>
                  <Text style={styles.title}>{knjiga.title}</Text>
                  <Text style={styles.bookAuthors}>by {knjiga.author}</Text>
                  <Text> {renderStars(knjiga)}</Text>
                </View>
              </View>
              
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.closeButton}>Natrag</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Boje.Pozadina,
    padding: width * 0.05,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  userImage: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: (width * 0.4) / 2,
  },
  userName: {
    fontFamily: 'Ruluko',
    fontSize: width * 0.05,
    marginTop: height * 0.01,
  },
  statusText: {
    fontSize: width * 0.05,
    marginBottom: height * 0.03,
    color: Boje.Bijela,
    fontFamily: 'Ruluko',
  },
  brojKnjiga: {
    marginRight: width * 0.03,
    fontWeight: 'bold',
    fontSize: width * 0.1,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Boje.Matcha,
    padding: width * 0.1,
  },
  modalTitle: {
    fontSize: width * 0.08,
    fontFamily: 'Ruluko',
    marginBottom: height * 0.03,
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
  bookAuthors: {
    fontFamily:'Ruluko',
    fontSize: width * 0.04,
    color: '#555',
    marginBottom: height * 0.02,
  },
  zvijezdeContainer: {
    flexDirection: 'row',
  },
  zvijezdice: {
    color: Boje.Zuta,
  },
  closeButton: {
    fontFamily: 'Ruluko',
    fontSize: width * 0.06,
    color: Boje.Plava,
    marginTop: height * 0.05,
  },
});

export default Profil;
