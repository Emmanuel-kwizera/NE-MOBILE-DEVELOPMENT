import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import tw from 'twrnc'
import Button from '../../../components/button'
import { getProfile } from '../../../services/auth'

const Onboard = ({ navigation }) => {
  const [name, setName] = useState('')

  const getUserProfile = async () => {
    const profile = await getProfile()
    if (!profile?.success) return navigation.navigate('Login')
    setName(profile?.data?.user?.name)
  }
  useEffect(() => {
    getUserProfile()
  }, [])

  const handleLogout = () => {
    // SecureStore.deleteItemAsync('token')
    navigation.navigate('Login')
  }

  return (
    <View style={tw`h-full flex justify-around items-center`}>
      <View>
        <Image style={tw`h-1/2 w-1/2`} source={require('../../../../assets/john-rwangombwa.jpg')}/>
        {/* <Text style={tw`font-bold text-xl`}>Welcome Onboard</Text>
        <Text style={tw`font-bold text-xl text-center`}>{name}</Text> */}

        {/* <View style={tw`mt-8`}>
          <Pressable onPress={handleLogout}>
            <Button style={tw`bg-[#097969] text-white w-full rounded-[10px]`}>
              LOGOUT
            </Button>
          </Pressable>
        </View> */}
      </View>
    </View>
  )
}

export default Onboard
