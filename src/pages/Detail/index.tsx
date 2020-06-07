import React, { useEffect, useState } from 'react'
import {
  View, TouchableOpacity , Text, Image, SafeAreaView
  , Linking
} from 'react-native'
import { Feather as Icon, FontAwesome } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import * as MailComposer from 'expo-mail-composer'

import api from '../../services/api'
import styles from './styles'

interface RouteParams {
  point_id: number
}

interface PointData {
  point: {
    id: number
    image: string
    name: string
    email: string
    whatsapp: string
    city: string
    uf: string
  }

  items: {
    title: string
  }[]
}

const Detail = () => {
  const [data, setData] = useState<PointData>({} as PointData)

  const navigation = useNavigation()
  const route = useRoute()

  const routeParams = route.params as RouteParams

  useEffect(() => {
    api.get(`/points/${routeParams.point_id}`)
    .then(response => setData(response.data))
  }, [])

  function handleNavigateBack() {
    navigation.goBack()
  }

  function handleWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse em coleta de resíduos`)
  }

  function handleMailComposer() {
    MailComposer.composeAsync({
      subject: 'Interesse em utilizar ponto de coleta',
      recipients: [data.point.email]
    })
  }

  if (!data.point) {
    return null
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleNavigateBack}
          >
            <Icon name='arrow-left' size={26} color='#34cb79' />
          </TouchableOpacity>

          <Image style={styles.pointImage} source={{
            uri: data.point.image
          }} />

          <Text style={styles.pointName}>{data.point.name}</Text>
          <Text style={styles.pointItems}>{data.items.map(item => item.title).join(', ')}</Text>

          <View style={styles.address}>
            <Text style={styles.addressTitle}>Endereço</Text>
            <Text style={styles.addressContent}>{data.point.city}, {data.point.uf}</Text>
          </View>
      </View>

      <View style={styles.footer}>
          <RectButton
          style={styles.button}
          onPress={handleWhatsapp}
          >
            <FontAwesome name='whatsapp' size={20} color='#fff' />
            <Text style={styles.buttonText}>Whatsapp</Text>
          </RectButton>

          <RectButton
          style={styles.button}
          onPress={handleMailComposer}
          >
            <Icon name='mail' size={20} color='#fff' />
            <Text style={styles.buttonText}>E-mail</Text>
          </RectButton>
      </View>
    </SafeAreaView>
  )
}

export default Detail