import {View, Text, FlatList, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../../global/styles/Styles';
import Button from '../../components/button/Button';
import Header from '../../components/button/MyHeader';
import {getApi} from '../../utils/apicalls/apicalls';
import {API} from '../../utils/endpoints/endpoints';
import {errorRes} from '../../utils/helper/helperfunctions';
import Loader from '../../components/button/Loader';
import {useSelector} from 'react-redux';

const Week = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [weekDay, setWeekDay] = useState(navigation.getParam('weekday'));

  const driver_data = useSelector(state => state?.login?.data);

  useEffect(() => {
    getDay_handle();
  }, []);

  const getDay_handle = async () => {
    if (weekDay) {
      const api = API.GET_DAY + driver_data?.id + '/' + weekDay;
      console.log({api});
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
    }
  };

  const ItemView = ({item}) => {
    return (
      <Button
        disabled={item.disable}
        title={item.day}
        onPress={() => {
          if (item.disable == '0') {
            navigation.navigate('Sheet', {item: item, weekDay: weekDay});
          } else {
            alert(`${item.day} Sheet has been already filled`)
          }
        }}
      />
    );
  };

  const submitSheet_handle = async () => {
    const api = API.SUBMIT_SHEET + driver_data?.id;
    try {
      setLoading(true);
      const result = await getApi(api);
      console.log({result: result.data});
      if (result.status == 200) {
        setLoading(false);
        const data = result.data;
        alert(data.message);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      errorRes(e);
    }
  };

  return (
    <View style={st.flex}>
      <Header title={`Weekly Time Sheet - Week ${weekDay}`} />
      {loading && <Loader />}

      <ScrollView>
        <View style={st.pd20}>
          <FlatList
            data={data}
            renderItem={ItemView}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
      <View style={[st.align_C]}>
        <Button title={'Submit'} onPress={() => submitSheet_handle()} disabled={'0'} />
      </View>
    </View>
  );
};

export default Week;
