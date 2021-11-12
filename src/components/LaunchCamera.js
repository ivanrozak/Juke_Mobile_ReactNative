import React from 'react';
import {View} from 'react-native';
import {Button, CheckIcon, HStack, Text} from 'native-base';
import * as ImagePicker from 'react-native-image-picker';

const LaunchCamera = props => {
  const {fileData, setFileData} = props;

  const launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let data = {
          name: response.assets[0].fileName,
          type: response.assets[0].type,
          uri: response.assets[0].uri,
        };
        setFileData(data);
      }
    });
  };

  return (
    <View>
      <Button onPress={launchCamera}>Upload Image</Button>
      {fileData ? (
        <HStack space={2}>
          <CheckIcon size="4" mt="1" color="emerald.500" />
          <Text fontSize="sm" color="emerald.500">
            {fileData?.name}
          </Text>
        </HStack>
      ) : null}
    </View>
  );
};

export default LaunchCamera;

// const styles = StyleSheet.create({
//   images: {
//     width: 150,
//     height: 150,
//     borderColor: 'black',
//     borderWidth: 1,
//     marginHorizontal: 3,
//   },
// });
