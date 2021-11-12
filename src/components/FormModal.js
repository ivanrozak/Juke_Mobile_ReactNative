// @ts-nocheck
import React, {useState, useEffect} from 'react';
import {
  Modal,
  Button,
  ScrollView,
  Input,
  FormControl,
  Select,
  Text,
  View,
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import LaunchCamera from './LaunchCamera';
import {registerEmployee} from '../API/API';

// Data Reference
const positionData = ['Manager', 'Supervisor', 'Staff'];
const provinceData = ['Jawa Timur', 'DKI Jakarta'];
const cityData = {
  'Jawa Timur': ['Surabaya', 'Malang', 'Sidoarjo', 'Gresik'],
  'DKI Jakarta': [
    'Jakarta Timur',
    'Jakarta Pusat',
    'Jakarta Selatan',
    'Jakarta Barat',
  ],
};
// Styling Form
const formStyle = {
  color: 'coolGray.800',
  fontSize: 'xs',
  fontWeight: 500,
};

export default function FormModal(props) {
  const {modalVisible, setModalVisible, record} = props;
  const [bankAccNumber, setBankAccNumber] = useState('');
  const [currentBankAcc, setCurrentBankAcc] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [ktpImage, setKtpImage] = useState();
  const [ktpNumber, setKtpNumber] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [position, setPosition] = useState('');
  const [cityAddress, setCityAddress] = useState('');
  const [provinceAddress, setProvinceAddress] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [cities, setCities] = useState(cityData[provinceData[0]]);
  const [fileData, setFileData] = useState();

  useEffect(() => {
    if (provinceAddress !== '') {
      setCities(cityData[provinceAddress]);
    }
  }, [provinceAddress]);

  const formList = [
    {
      id: 1,
      label: 'First Name',
      defaultValue: firstName,
      action: setFirstName,
      type: 'input',
    },
    {
      id: 2,
      label: 'Last Name',
      defaultValue: lastName,
      action: setLastName,
      type: 'input',
    },
    {
      id: 3,
      label: 'Email Address',
      defaultValue: emailAddress,
      action: setEmailAddress,
      type: 'input',
    },
    {
      id: 4,
      label: 'Phone Number',
      defaultValue: phoneNumber,
      action: setPhoneNumber,
      type: 'input',
    },
    {
      id: 5,
      label: 'KTP Number',
      defaultValue: ktpNumber,
      action: setKtpNumber,
      type: 'input',
    },
    {
      id: 6,
      label: 'Attach KTP',
      defaultValue: ktpImage,
      action: setKtpImage,
      type: 'file',
    },
    {
      id: 7,
      label: 'Position',
      defaultValue: position,
      option: positionData,
      action: setPosition,
      type: 'select',
    },
    {
      id: 8,
      label: 'Province',
      defaultValue: provinceAddress,
      option: provinceData,
      action: setProvinceAddress,
      type: 'select',
    },
    {
      id: 9,
      label: 'City',
      defaultValue: cityAddress,
      option: cities,
      action: setCityAddress,
      type: 'select',
    },
    {
      id: 10,
      label: 'Street Address',
      defaultValue: streetAddress,
      action: setStreetAddress,
      type: 'input',
    },
    {
      id: 11,
      label: 'Date of Birth',
      defaultValue: dateOfBirth,
      action: setDateOfBirth,
      type: 'datepicker',
    },
  ];

  const FormSelect = props => {
    const {label, defaultValue, onValueChange, option} = props;
    return (
      <FormControl>
        <FormControl.Label _text={formStyle}>{label}</FormControl.Label>
        <Select
          selectedValue={defaultValue}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          placeholder="Select an option">
          {option.map(item => (
            <Select.Item label={item} value={item} key={item} />
          ))}
        </Select>
      </FormControl>
    );
  };

  function handleOK() {
    // let payload = {
    //   firstName: firstName,
    //   lastName: lastName,
    //   dateOfBirth: dateOfBirth,
    //   phoneNumber: phoneNumber,
    //   emailAddress: emailAddress,
    //   position: position,
    //   provinceAddress: provinceAddress,
    //   cityAddress: cityAddress,
    //   streetAddress: streetAddress,
    //   ktpNumber: ktpNumber,
    //   currentBankAcc: currentBankAcc,
    //   bankAccNumber: bankAccNumber,
    //   fileData: fileData,
    // };
    const datas = new FormData();
    datas.append('firstName', firstName);
    datas.append('lastName', lastName);
    datas.append('dateOfBirth', dateOfBirth);
    datas.append('emailAddress', emailAddress);
    datas.append('currentBankAcc', currentBankAcc);
    datas.append('bankAccNumber', bankAccNumber);
    datas.append('ktpNumber', ktpNumber);
    datas.append('ktpImage', fileData);
    datas.append('provinceAddress', provinceAddress);
    datas.append('cityAddress', cityAddress);
    datas.append('phoneNumber', phoneNumber);
    datas.append('position', position);
    datas.append('streetAddress', streetAddress);
    // console.log(payload);
    registerEmployee(datas).then(result => {
      console.log(result);
    });
  }

  return (
    <>
      <Modal isOpen={modalVisible} onClose={setModalVisible} size="xl">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>
            {record ? 'Edit Employee Data' : 'Add Employee Data'}
          </Modal.Header>
          <Modal.Body>
            <ScrollView>
              {formList.map((item, index) => (
                <View key={index}>
                  {item.type === 'input' ? (
                    <FormControl>
                      <FormControl.Label _text={formStyle}>
                        {item.label}
                      </FormControl.Label>
                      <Input
                        type="text"
                        defaultValue={item.defaultValue}
                        onChangeText={item.action}
                      />
                    </FormControl>
                  ) : item.type === 'select' ? (
                    <FormSelect
                      label={item.label}
                      defaultValue={item.defaultValue}
                      option={item.option}
                      onValueChange={e => item.action(e)}
                    />
                  ) : item.type === 'datepicker' ? (
                    <FormControl>
                      <FormControl.Label _text={formStyle}>
                        {item.label}
                      </FormControl.Label>
                      <DatePicker
                        date={item.defaultValue}
                        mode="date"
                        placeholder="Select Date"
                        format="YYYY-MM-DD"
                        onDateChange={date => {
                          item.action(date);
                        }}
                      />
                    </FormControl>
                  ) : (
                    <FormControl>
                      <FormControl.Label _text={formStyle}>
                        {item.label}
                      </FormControl.Label>
                      <LaunchCamera
                        fileData={fileData}
                        setFileData={setFileData}
                      />
                    </FormControl>
                  )}
                </View>
              ))}
            </ScrollView>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModalVisible(false);
                }}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  handleOK();
                }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
