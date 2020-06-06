import React from 'react'
import {
  View, TouchableOpacity , Text,
  ScrollView, Image
} from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import MapView, { Marker } from 'react-native-maps'
import { SvgUri } from 'react-native-svg'

import styles from './styles'

const Points = () => {

  const navigation = useNavigation()

  function handleNavigateBack() {
    navigation.goBack()
  }

  function handleNavigateToDetail() {
    navigation.navigate('Detail')
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
          <MapView
          style={styles.map}
          initialRegion={{
            latitude: -7.0084946,
            longitude: -37.2651076,
            latitudeDelta: 0.014,
            longitudeDelta: 0.014
          }}
          >
            <Marker
            style={styles.mapMarker}
            coordinate={{
              latitude: -7.0084946,
              longitude: -37.2651076,
            }}
            onPress={handleNavigateToDetail}
            >
              <View style={styles.mapMarkerContainer}>
                <Image
                source={{ uri: 'https://images.unsplash.com/photo-1565061828011-282424b9ab40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60' }}
                style={styles.mapMarkerImage}
                />

                <Text style={styles.mapMarkerTitle}>Soparia e Lanchonete Vitória</Text>
              </View>
            </Marker>
          </MapView>
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          <TouchableOpacity style={styles.item}>
            <SvgUri width={42} height={42} uri='http://10.0.0.8:3333/uploads/baterias.svg' />

            <Text style={styles.itemTitle}>Pilhas e Baterias</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <SvgUri width={42} height={42} uri='http://10.0.0.8:3333/uploads/baterias.svg' />

            <Text style={styles.itemTitle}>Pilhas e Baterias</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <SvgUri width={42} height={42} uri='http://10.0.0.8:3333/uploads/baterias.svg' />

            <Text style={styles.itemTitle}>Pilhas e Baterias</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <SvgUri width={42} height={42} uri='http://10.0.0.8:3333/uploads/baterias.svg' />

            <Text style={styles.itemTitle}>Pilhas e Baterias</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <SvgUri width={42} height={42} uri='http://10.0.0.8:3333/uploads/baterias.svg' />

            <Text style={styles.itemTitle}>Pilhas e Baterias</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <SvgUri width={42} height={42} uri='http://10.0.0.8:3333/uploads/baterias.svg' />

            <Text style={styles.itemTitle}>Pilhas e Baterias</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  )
}

export default Points