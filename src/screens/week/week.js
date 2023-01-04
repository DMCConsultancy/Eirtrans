import {View, Text, FlatList, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../../global/styles/Styles';
import Button from '../../components/button/Button';
import Header from '../../components/button/MyHeader';
import {getApi} from '../../utils/apicalls/apicalls';
import {API} from '../../utils/endpoints/endpoints';
import {errorRes} from '../../utils/helper/helperfunctions';
import Loader from '../../components/Loader';

const Week = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDay_handle();
  }, []);

  const getDay_handle = async () => {
    const api = API.GET_DAY;
    try {
      setLoading(true);
      const result = await getApi(api);
      // console.log({result: result.data});
      if (result.status == 200) {
        setLoading(false);
        const data = result.data.data;
        setData(data);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      errorRes(e);
    }
  };

  const ItemView = ({item}) => {
    return (
      <Button
        title={item.day}
        onPress={() => navigation.navigate('Sheet', {item: item})}
      />
    );
  };

  const submitSheet_handle = async () => {
    const api = API.SUBMIT_SHEET+'10';
    try {
      setLoading(true);
      const result = await getApi(api);
      console.log({result: result.data});
      if (result.status == 200) {
        setLoading(false);
        const data = result.data;
        alert(data.message)
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      errorRes(e);
    }
  };

  return (
    <View style={st.flex}>
      <Loader visible={loading} />
      <Header title={'Weekly Time Sheet - Week 36'} />
      <ScrollView>
        <View style={st.pd20}>
          <FlatList
            data={data}
            renderItem={ItemView}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={[st.align_C]}>
            <Button title={'Submit'} onPress={() => submitSheet_handle()} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Week;