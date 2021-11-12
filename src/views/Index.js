import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  Badge,
  Input,
  SearchIcon,
  HStack,
} from 'native-base';
import Popover from 'react-native-popover-view';
import {getDataEmployers, deleteUserData} from '../API/API';
import FormModal from '../components/FormModal';
import ImageModal from '../components/ImageModal';

function Index(props) {
  const {styles, moment} = props;
  const touchable = useRef();
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [record, setRecord] = useState({});
  const [showPopover, setShowPopover] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const [loading, setLoading] = useState(false);

  const fetchAPI = () => {
    setLoading(true);
    getDataEmployers(firstName)
      .then(result => {
        console.log(result);
        setData(result.data.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchAPI();
  }, [firstName, trigger]);

  const handleEdit = item => {
    setRecord(item);
    setModalVisible(true);
  };

  const viewKtp = item => {
    setRecord(item);
    console.log(item);
    setImageVisible(true);
  };

  const handleDelete = () => {
    deleteUserData(record).then(result => {
      if (result.status === 200) {
        setShowPopover(false);
        setTrigger(!trigger);
      }
    });
    console.log(record);
  };

  return (
    <>
      <View style={styles.header}>
        <Input
          placeholder="Search"
          defaultValue={firstName}
          onChangeText={e => setFirstName(e)}
          width="80%"
          bg="gray.100"
          borderRadius="10"
          py="1"
          px="2"
          placeholderTextColor="gray.500"
          InputLeftElement={<SearchIcon size="4" ml="3" />}
        />
        <Button>Add</Button>
      </View>
      <ScrollView style={styles.container}>
        <FormModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          record={record}
        />
        <ImageModal
          imageVisible={imageVisible}
          setImageVisible={setImageVisible}
          record={record}
        />
        {data.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text
                  style={
                    styles.titleText
                  }>{`${item.firstName} ${item.lastName}`}</Text>

                <Badge style={styles.badge} colorScheme="success">
                  <Text>{item.position}</Text>
                </Badge>
              </View>
              <Text>{item.phoneNumber}</Text>
              <Text>{moment(item.dateOfBirth).format('DD MMMM YYYY')}</Text>
              <Text>{item.cityAddress}</Text>
            </View>
            <View style={styles.cardAction}>
              <Button onPress={() => viewKtp(item)}>View KTP</Button>
              <Button colorScheme="teal" onPress={() => handleEdit(item)}>
                Edit
              </Button>
              <Button
                ref={touchable}
                onPress={() => {
                  setShowPopover(true);
                  setRecord(item.userId);
                }}
                colorScheme="danger">
                Delete
              </Button>
            </View>
          </View>
        ))}
        <Popover
          isVisible={showPopover}
          from={touchable}
          onRequestClose={() => setShowPopover(false)}>
          <View p="3">
            <Text mb="2">Want to delete this employe?</Text>
            <HStack justifyContent="flex-end">
              <Button
                size="sm"
                variant="ghost"
                mr="3"
                onPress={() => setShowPopover(false)}>
                No
              </Button>
              <Button
                colorScheme="danger"
                size="sm"
                onPress={() => handleDelete()}>
                Yes
              </Button>
            </HStack>
          </View>
        </Popover>
      </ScrollView>
    </>
  );
}

export default Index;
