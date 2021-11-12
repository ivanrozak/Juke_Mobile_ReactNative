/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {StyleSheet} from 'react-native';
import moment from 'moment';
import Index from './views/Index';

const App = () => {
  return (
    <NativeBaseProvider>
      <Index styles={styles} moment={moment} />
    </NativeBaseProvider>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#3C415C',
  },
  header: {
    backgroundColor: '#1F1D36',
    padding: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  card: {
    marginVertical: 10,
    borderColor: 'whitesmoke',
    borderWidth: 1,
    borderRadius: 20,
    width: '100%',
    backgroundColor: 'white',
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    padding: 20,
  },
  cardAction: {
    borderTopColor: 'whitesmoke',
    borderTopWidth: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  badge: {
    width: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
});
