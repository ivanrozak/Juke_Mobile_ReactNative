// @ts-nocheck
import React from 'react';
import {Text} from 'react-native';
import {Modal, Button, Image, Center} from 'native-base';
import {REACT_APP_IMG_URL} from '../global_variable';

export default function ImageModal(props) {
  const {imageVisible, setImageVisible, record} = props;

  return (
    <>
      <Modal isOpen={imageVisible} onClose={setImageVisible} size="xl">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>View KTP</Modal.Header>
          <Modal.Body>
            <Center>
              {record.ktpImage ? (
                <Image
                  size="2xl"
                  resizeMode="cover"
                  source={{uri: `${REACT_APP_IMG_URL}/${record.ktpImage}`}}
                />
              ) : (
                <Text>Tidak ada gambar</Text>
              )}
            </Center>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setImageVisible(false);
                }}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setImageVisible(false);
                }}>
                Ok
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
