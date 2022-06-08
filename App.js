import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import Notes from './components/Notes';
import Add from './components/Add';
import Info from './components/Info';
import AddCategory from './components/AddCategory';
import About from './components/About';

const Drawer = createDrawerNavigator();

export default function App() {

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <View style={{ flex: 0.4, alignItems: "center" }}><Image style={{ width: 100, height: 100 }} source={require('./assets/noteico.png')}></Image></View>
        <View style={{ backgroundColor: "#FFE0B2", flex: 1 }}>
          <DrawerItem
            label="Notatki"
            icon={() => <Image style={{ width: 28, height: 28 }} source={require('./assets/noteico.png')} />}
            onPress={() => props.navigation.navigate('Notatki')}
          />
        </View>

        <DrawerItem
          label="Dodaj notatkę"
          icon={() => <Image style={{ width: 28, height: 28 }} source={require('./assets/plusico.png')} />}
          onPress={() => props.navigation.navigate('Dodaj notatkę')}
        />

        <DrawerItem
          label="Nowa kategoria"
          icon={() => <Image style={{ width: 28, height: 28 }} source={require('./assets/plusico.png')} />}
          onPress={() => props.navigation.navigate("Nowa kategoria")}
        />

        <DrawerItem
          label="Informacje"
          icon={() => <Image style={{ width: 28, height: 28 }} source={require('./assets/infoico.png')} />}
          onPress={() => props.navigation.navigate('Informacje')}
        />

      </DrawerContentScrollView>
    );
  }

  return (
    <NavigationContainer >
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} labelStyle={{ color: '#ffffff' }} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#FFE0B2',
            width: 240,
          },
        }}
      >
        <Drawer.Screen name="Notatki" component={Notes}
          headerMode="none"
        />
        <Drawer.Screen name="Dodaj notatkę" component={Add} />
        <Drawer.Screen name="Nowa kategoria" component={AddCategory} />
        <Drawer.Screen name="Informacje" component={About} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
