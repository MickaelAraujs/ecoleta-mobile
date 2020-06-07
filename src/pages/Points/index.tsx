import React, { useState, useEffect } from 'react'
import {
  View, TouchableOpacity , Text,
  ScrollView, Image, Alert
} from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import MapView, { Marker } from 'react-native-maps'
import { SvgUri } from 'react-native-svg'
import * as Location from 'expo-location'

import api from '../../services/api'

import styles from './styles'

interface Item {
  id: number
  title: string
  image_url: string
}

interface Point {
  id: number
  image: string
  name: string
  city: string
  uf: string
  latitude: number
  longitude: number
}

const Points = () => {
  const [items, setItems] = useState<Item[]>([])
  const [points, setPoints] = useState<Point[]>([])
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [initialPosition, setInicialPosition] = useState<[number, number]>([0, 0])

  const navigation = useNavigation()

  useEffect(() => {
    async function loadPermission() {
      const { status } = await Location.getPermissionsAsync()

      if (status !== 'granted') {
        Alert.alert('ooops!', 'precisamos da sua permissão para usar a localização do dispositivo.')
        return
      }

      const location = await Location.getCurrentPositionAsync()

      const { latitude, longitude } = location.coords
      
      setInicialPosition([
        latitude,
        longitude
      ])
    }

    loadPermission()
  }, [])

  useEffect(() => {
    api.get('/items')
    .then(response => setItems(response.data))
  }, [])

  useEffect(() => {
    api.get('/points', {
      params: {
        city: 'Patos',
        uf: 'PB',
        items: [2, 5]
      }
    })
    .then(response => setPoints(response.data))
  }, [])

  function handleNavigateBack() {
    navigation.goBack()
  }

  function handleNavigateToDetail(id: number) {
    navigation.navigate('Detail', {
      point_id: id
    })
  }

  function handleSelectedItems(id: number) {
    const alreadySelected = selectedItems.findIndex(itemId => itemId === id)

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(itemId => itemId !== id)

      setSelectedItems(filteredItems)
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
        onPress={handleNavigateBack}
        >
          <Icon name='arrow-left' size={26} color='#34cb79' />
        </TouchableOpacity>

        <Text style={styles.title}>😁 Bem Vindo.</Text>
        <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

        <View style={styles.mapContainer}>
          { initialPosition[0] !== 0 && (
            <MapView
            style={styles.map}
            initialRegion={{
              latitude: initialPosition[0],
              longitude: initialPosition[1],
              latitudeDelta: 0.014,
              longitudeDelta: 0.014
            }}
            >
              { points.map(point => (
                  <Marker
                  key={String(point.id)}
                  style={styles.mapMarker}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}
                  onPress={() => handleNavigateToDetail(point.id)}
                  >
                    <View style={styles.mapMarkerContainer}>
                      <Image
                      source={{ uri: point.image}}
                      style={styles.mapMarkerImage}
                      />
      
                      <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                    </View>
                  </Marker>
              )) }
            </MapView>
          ) }
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          { items.map(item => (
            <TouchableOpacity
            key={String(item.id)}
            style={[
              styles.item,
              selectedItems.includes(item.id) ? styles.selectedItem : {}
            ]}
            activeOpacity={0.6}
            onPress={() => handleSelectedItems(item.id)}
            >
              <SvgUri width={42} height={42} uri={item.image_url} />

              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          )) }

        </ScrollView>
      </View>
    </>
  )
}

export default Points