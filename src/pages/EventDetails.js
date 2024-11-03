import React, {useState} from 'react';
import { View, Text, Image, Linking, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRoute} from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import PhoneModal from '../components/PhoneModal';
import SocialModal from '../components/SocialModal';
import { Asset } from 'expo-asset';

const mapIcon = Asset.fromModule(require('../../assets/map-icon.png')).uri;
const calendarIcon = Asset.fromModule(require('../../assets/calendar-icon.png')).uri;
const phoneIcon = Asset.fromModule(require('../../assets/phone-icon.png')).uri;
const emailIcon = Asset.fromModule(require('../../assets/email-icon.png')).uri;
const socialIcon = Asset.fromModule(require('../../assets/social-icon.png')).uri;
const ticketIcon = Asset.fromModule(require('../../assets/ticket-icon.png')).uri;
const playIcon = Asset.fromModule(require('../../assets/play-icon.png')).uri;


const windowWidth = Dimensions.get('window').width;

const EventDetailsScreen = React.memo(() => {
  const [phoneModalVisible, setPhoneModalVisible] = useState(false);
  const [socialModalVisible, setSocialModalVisible] = useState(false);

  const route = useRoute();
  const { event } = route.params;
  


  const handleEmailPress = React.useCallback(() => {
    const emailUrl = `mailto:${event.email}`;
    Linking.canOpenURL(emailUrl).then(supported => {
      if (supported) {
        return Linking.openURL(emailUrl);
      }
      alert('Não foi possível redirecionar para o app de email.');
    });
  }, [event]);

  const handleVideoPress = React.useCallback(() => {
    Linking.openURL(event.video);
  }, [event]);

  const handleBuyTicketPress = React.useCallback(() => {
    Linking.openURL(event.ingresso);
  }, [event]);


  const renderItem = React.useMemo(() => ({ item }) => {
    return (
      <Image style={styles.carouselImage} source={{ uri: item }} />
    );
  }, []);

  const FlatListItemSeparator = () => {
    return <View style={{ width: 1, marginRight: 2 }} />;
  };


  return (
    <LinearGradient colors={['#B31B1B', '#1E1E1E']} style={styles.container}>
      <Text style={styles.title}>{event.name}</Text>
      <FlatList
        data={event.images}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item}-${index}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={FlatListItemSeparator}
        contentContainerStyle={styles.flatlistContainer}
      />
      <View style={styles.contentContainer}>
        <View style={styles.detailsContainer}>
          <Image style={styles.logo} source={{ uri: event.logo }} />
          <View style={styles.eventInfo}>
            <TouchableOpacity style={styles.locationContainer} onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${event.location.latitude},${event.location.longitude}`)}>
              <Image style={styles.mapIcon} source={{uri: mapIcon}} />
              <Text style={styles.locationText}>{event.location.address}</Text>
            </TouchableOpacity>
            <View style={styles.dateContainer}>
              <Text style={styles.date}>{event.date}</Text>
              <TouchableOpacity onPress={() => Linking.openURL(`https://www.google.com/calendar/render?action=TEMPLATE&text=${event.name}&dates=${event.date}&details=${event.location}`)}>
                <Image style={styles.calendarIcon} source={{uri: calendarIcon}} />
              </TouchableOpacity>
            </View>
            <Text style={styles.value}>Valor: {event.valor}</Text>
          </View>
        </View>
        <View style={styles.contactContainer}>
          <TouchableOpacity style={styles.contactButton} onPress={() => setPhoneModalVisible(true)}>
            <Image style={styles.phoneIcon} source={{uri: phoneIcon}} />
            <Text style={styles.contactText}>Telefone</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton} onPress={handleEmailPress}>
            <Image style={styles.emailIcon} source={{uri: emailIcon}} />
            <Text style={styles.contactText}>E-mail</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton} onPress={() => setSocialModalVisible(true)}>
            <Image style={styles.socialIcon} source={{uri: socialIcon}} />
            <Text style={styles.contactText}>Redes Sociais</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton} onPress={handleBuyTicketPress}>
            <Image style={styles.ticketIcon} source={{uri: ticketIcon}} />
            <Text style={styles.contactText}>Comprar ingresso</Text>
          </TouchableOpacity>
        </View>
        {event.descricao && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Descrição:</Text>
            <Text style={styles.descriptionText}>{event.descricao}</Text>
          </View>
        )}
        <Text style={styles.descriptionTitleVideo}>Vídeo da Edição Passada</Text>
        {event.video && (
          <View style={styles.videoContainer}>
            <TouchableOpacity style={styles.videoButton} onPress={handleVideoPress}>
              <Image style={styles.playIcon} source={{uri: playIcon}} />
            </TouchableOpacity>
          </View>
        )}
        <PhoneModal visible={phoneModalVisible} onClose={() => setPhoneModalVisible(false)} phone={event.contato_telefone} />
        <SocialModal visibleSocial={socialModalVisible} onCloseSocial={() => setSocialModalVisible(false)} redes={event.redes} />
      </View>
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
    borderRadius: 20,
    marginTop: '-92%',
    marginBottom: '1%'
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  eventInfo: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  date: {
    flex: 1,
    color: '#FFFFFF',
  },
  calendarIcon: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  value: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B31B1B',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: '1%',
    marginBottom: 10,
    flex: 1,
    maxWidth: windowWidth > 500 ? '45%' : '90%',
    flexWrap: 'wrap',
  },
  phoneIcon: {
    width: 19,
    height: 25,
  },
  emailIcon: {
    width: 18,
    height: 20,
  },
  socialIcon: {
    width: 18,
    height: 20,
  },
  ticketIcon: {
    width: 18,
    height: 20,
  },
  contactText: {
    color: '#fff',
    fontSize: 10,
    marginLeft: 5,
    flexWrap: 'wrap',
  },
  descriptionContainer: {
    marginTop: 20,
  },
  descriptionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionText: {
    marginBottom: 20,
    color: '#A9A9A9',
  },
  videoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  videoButton: {
    backgroundColor: '#B31B1B',
    marginLeft: '40%',
    marginTop: '-5%',
    borderRadius: 20,
    padding: 15,
  },
  descriptionTitleVideo: {
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: '5%',
    marginLeft: '25%',
    color: '#FFFFFF',
  },
  playIcon: {
    width: 25,
    height: 25,
  },
  carouselImage: {
    height: '50%',
    width: '-45%',
    aspectRatio: 1,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'black',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
    marginLeft: -5
  },
  locationText: {
    color: '#fff',
    fontSize: 16,
    textDecorationLine: 'underline'
  },

});


export default EventDetailsScreen;