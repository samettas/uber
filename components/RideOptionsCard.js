import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/UberX.png"
  },
  {
    id: "Uber-XL-456",
    title: "UberXL",
    multiplier: 1.2,
    image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/UberXL.png"
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/Lux.png"
  },
]

const RideOptionsCard = () => {

  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const distance = Number(travelTimeInformation.distance.value / 1000).toFixed(1);
  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity 
        onPress={()=> navigation.navigate("NavigateCard")} 
        style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`} >
          <Icon
          name='chevron-left'
          type='fontawesome'
          />
        </TouchableOpacity>
        
        <Text style={tw`text-center py-5 text-xl`} >Select a Ride - {distance} km</Text>
      </View>

    <FlatList data={data}
      keyExtractor={(item)=>item.id}
      renderItem={({item:{id, title, multiplier, image}, item})=> (
        <TouchableOpacity
        onPress={()=> setSelected(item)} 
        style={[tw`flex-row justify-between items-center px-10`, id === selected?.id && tw`bg-gray-200`]}>
          <Image
          style={{
            width: 100,
            height: 85,
            resizeMod: "contain"
          }}
          source={{uri: image}}
          />
          <View style={tw`-ml-6`} >
            <Text style={tw`text-xl font-semibold`} >{title}</Text>
            <Text>{travelTimeInformation.duration.text}</Text>
          </View>
          <Text style={tw`text-xl`} >99₺</Text>
        </TouchableOpacity>
      )}
    />
    <View>
      <TouchableOpacity disabled={!selected} style={[tw`bg-black py-3 m-3`,!selected && tw`bg-gray-300`]} >
        <Text style={tw`text-center text-white text-xl`} >Choose {selected?.title}</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})