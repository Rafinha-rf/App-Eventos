import React from 'react';
import { Modal, View, TouchableOpacity, Text, Linking, StyleSheet } from 'react-native';

const SocialModal = ({ visibleSocial, onCloseSocial, redes }) => {
  const handleInstagramPress = React.useCallback(() => {
    Linking.openURL(redes.instagram);
  }, [redes.instagram]);

  const handleFacebookPress = React.useCallback(() => {
    Linking.openURL(redes.facebook);
  }, [redes.facebook]);

  return (
    <Modal
      visible={visibleSocial}
      animationType="slide"
      transparent={true}
      onRequestClose={onCloseSocial}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.modalButton} onPress={handleInstagramPress}>
          <Text style={styles.modalButtonText}>Instagram</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalButton} onPress={handleFacebookPress}>
          <Text style={styles.modalButtonText}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalCancelButton} onPress={onCloseSocial}>
          <Text style={styles.modalCancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  modalButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B31B1B',
  },
  modalCancelButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B31B1B',
  },
  modalCancelButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B31B1B',
  },
});

export default SocialModal;