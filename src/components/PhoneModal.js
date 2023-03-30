import React from 'react';
import { Modal, View, TouchableOpacity, Text, Linking, StyleSheet } from 'react-native';

const PhoneModal = ({ visible, onClose, phone }) => {
  const handlePhoneCall = () => {
    Linking.openURL(`tel:${phone}`);
  };

  const handlePhoneWhats = () => {
   Linking.openURL(`whatsapp://send?phone=${phone.replace(/\D/g, '')}`)
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.modalButton} onPress={handlePhoneCall}>
          <Text style={styles.modalButtonText}>Telefone</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalButton} onPress={handlePhoneWhats}>
          <Text style={styles.modalButtonText}>WhatsApp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalCancelButton} onPress={onClose}>
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

export default PhoneModal;